import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

export interface CatalogRoutine {
  slug: string
  title: string
  description: string
  version: number
  body: string
}

const routinesDir = join(dirname(fileURLToPath(import.meta.url)), '..', 'routines')

function loadRoutine(filename: string): string {
  return readFileSync(join(routinesDir, filename), 'utf-8')
}

function withVersion(body: string, version: number): string {
  return `${body}\n\n<!-- centy-routine-version: ${version} -->`
}

export const catalog: CatalogRoutine[] = [
  {
    slug: 'replace-custom-with-libs',
    title: 'Replace Custom Logic with Libraries',
    description: 'Scan codebase for custom implementations that can be replaced by existing libraries',
    version: 2,
    body: withVersion(loadRoutine('replace-custom-with-libs.md'), 2),
  },
  {
    slug: 'release-new-version',
    title: 'Release New Version',
    description: 'Prepare and release a new version of the project',
    version: 2,
    body: withVersion(loadRoutine('release-new-version.md'), 2),
  },
  {
    slug: 'add-lint-rules',
    title: 'Add Lint Rules',
    description: 'Analyze code and add new error-level lint rules to improve code quality, then open a PR',
    version: 1,
    body: withVersion(loadRoutine('add-lint-rules.md'), 1),
  },
]
