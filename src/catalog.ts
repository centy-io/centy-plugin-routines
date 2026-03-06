export interface CatalogRoutine {
  slug: string
  title: string
  description: string
  version: number
  body: string
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
    body: withVersion(
      `# Replace Custom Logic with Libraries

Scan the codebase for hand-rolled implementations that duplicate functionality already available in well-maintained, existing libraries. For each finding, create a centy issue describing the custom code, the suggested replacement, and the benefit of switching.

## What to Look For
- Any custom utility, helper, or module that reimplements functionality available in an established library
- Wrapper code that adds little value over using a library directly
- Complex logic that a battle-tested library handles more reliably (parsing, validation, networking, crypto, etc.)

## Process
1. Walk through the source tree file by file
2. For each piece of custom logic, consider whether a well-known library already solves the same problem
3. For each finding, create a centy issue with:
   - Title: short description of what to replace
   - Body: file path, what the custom code does, suggested library, and migration notes
4. Mark this routine as completed when the full scan is done`,
      2,
    ),
  },
  {
    slug: 'release-new-version',
    title: 'Release New Version',
    description: 'Prepare and release a new version of the project',
    version: 1,
    body: withVersion(
      `# Release New Version

Prepare and release a new version of the project. Walk through the full release checklist, ensuring every step is completed before publishing.

## Process
1. Determine the next version number based on the changes since the last release (follow semver conventions)
2. Update the version in all relevant files (package.json, lock files, etc.)
3. Update the changelog (or create one if missing) with a summary of changes since the last release
4. Ensure all tests pass and the project builds cleanly
5. Create a git commit with the version bump and changelog update
6. Create a git tag for the new version
7. Push the commit and tag to the remote
8. Publish the package if applicable (npm, PyPI, etc.)
9. Create a GitHub release with the changelog entry as the body

## Notes
- If any step fails, stop and create a centy issue describing the failure
- Do not skip the changelog — every release should be documented
- Mark this routine as completed once the release is published`,
      1,
    ),
  },
]
