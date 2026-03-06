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

function executeSelections(selections: Array<{ action: 'add' | 'update'; slug: string }>): void {
  for (const { action, slug } of selections) {
    const routine = catalog.find(r => r.slug === slug)!
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
      console.error(`Failed to ${action} routine "${routine.title}": ${msg}`)
    }
  }
}

async function main(): Promise<void> {
  console.log('\ncenty-plugin-routines\n')

  try {
    ensureItemType()
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error)
    console.error(`Failed to ensure routine item type: ${msg}`)
    console.error('Make sure centy-cli and centy-daemon are installed and running.')
    process.exit(1)
  }

  const installed = listInstalledRoutines()

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

  const response = await prompts(
    {
      type: 'multiselect',
      name: 'selections',
      message: 'Select routines to add or update (space to toggle, enter to confirm)',
      choices,
      instructions: false,
    },
    { onCancel: () => process.exit(0) },
  )

  const selections: Array<{ action: 'add' | 'update'; slug: string }> | undefined = response.selections

  if (!selections || selections.length === 0) {
    console.log('No routines selected.')
    return
  }

  executeSelections(selections)
}

main()
