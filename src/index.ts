#!/usr/bin/env node

import prompts from 'prompts'
import { catalog } from './catalog.js'
import { ensureItemType, listInstalledRoutines, createRoutine, updateRoutine } from './centy.js'

interface Choice {
  title: string
  description: string
  value: { action: 'add' | 'update'; slug: string } | null
  disabled?: boolean
}

async function main(): Promise<void> {
  console.log('\ncenty-plugin-routines\n')

  // Step 1: Ensure the routine item type is registered
  try {
    ensureItemType()
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error)
    console.error(`Failed to ensure routine item type: ${msg}`)
    console.error('Make sure centy-cli and centy-daemon are installed and running.')
    process.exit(1)
  }

  // Step 2: List installed routines
  const installed = listInstalledRoutines()

  // Step 3: Build choices
  const choices: Choice[] = catalog.map(routine => {
    const existing = installed.find(r => r.slug === routine.slug)

    if (!existing) {
      return {
        title: `[Add] ${routine.title}`,
        description: routine.description,
        value: { action: 'add' as const, slug: routine.slug },
      }
    }

    if (existing.version < routine.version) {
      return {
        title: `[Update] ${routine.title}  (v${existing.version} → v${routine.version})`,
        description: routine.description,
        value: { action: 'update' as const, slug: routine.slug },
      }
    }

    return {
      title: `[Installed] ${routine.title}  (v${routine.version})`,
      description: routine.description,
      value: null,
      disabled: true,
    }
  })

  const actionable = choices.filter(c => !c.disabled)

  if (actionable.length === 0) {
    console.log('All routines are installed and up to date.')
    return
  }

  // Step 4: Prompt user to select a routine
  const response = await prompts(
    {
      type: 'select',
      name: 'selection',
      message: 'Select a routine to add or update',
      choices,
    },
    { onCancel: () => process.exit(0) },
  )

  if (!response.selection) {
    return
  }

  const { action, slug } = response.selection as { action: 'add' | 'update'; slug: string }
  const routine = catalog.find(r => r.slug === slug)!

  // Step 5: Execute the action
  try {
    if (action === 'add') {
      console.log(`\nAdding "${routine.title}"...`)
      createRoutine(routine.title, routine.body)
      console.log(`Routine "${routine.title}" added.`)
    } else {
      console.log(`\nUpdating "${routine.title}"...`)
      updateRoutine(slug, routine.title, routine.body)
      console.log(`Routine "${routine.title}" updated.`)
    }
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error)
    console.error(`Failed to ${action} routine: ${msg}`)
    process.exit(1)
  }
}

main()
