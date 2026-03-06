import { execFileSync } from 'node:child_process'

export interface InstalledRoutine {
  slug: string
  title: string
  body: string
  version: number
}

function centy(...args: string[]): string {
  return execFileSync('centy', args, {
    encoding: 'utf-8',
    stdio: ['pipe', 'pipe', 'pipe'],
  }).trim()
}

export function parseVersion(body: string): number {
  const match = body.match(/<!-- centy-routine-version: (\d+) -->/)
  return match ? parseInt(match[1], 10) : 0
}

export function ensureItemType(): void {
  try {
    centy('list', 'routines', '--json')
  } catch {
    centy(
      'item-type', 'create',
      '--name', 'Routine',
      '--plural', 'routines',
      '--identifier', 'slug',
      '--statuses', 'active,completed',
      '--default-status', 'active',
    )
  }
}

export function listInstalledRoutines(): InstalledRoutine[] {
  try {
    const output = centy('list', 'routines', '--json')
    const items: Array<{
      id: string
      title: string
      body: string
    }> = JSON.parse(output)
    return items.map(item => ({
      slug: item.id,
      title: item.title,
      body: item.body,
      version: parseVersion(item.body),
    }))
  } catch {
    return []
  }
}

export function createRoutine(title: string, body: string): void {
  execFileSync('centy', ['create', 'routine', '--title', title, '--body', body], {
    stdio: 'inherit',
  })
}

export function updateRoutine(slug: string, title: string, body: string): void {
  execFileSync('centy', ['update', 'routine', slug, '--title', title, '--body', body], {
    stdio: 'inherit',
  })
}
