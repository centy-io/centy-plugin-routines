# Release New Version

Prepare and release a new version of the project. Walk through the full release checklist, ensuring every step is completed before publishing.

## Process
1. Determine the next version number based on the changes since the last release (follow semver conventions)
2. Update the version in all relevant files (package.json, lock files, etc.)
3. Update the changelog (or create one if missing) with a summary of changes since the last release
4. Ensure all tests pass and the project builds cleanly
5. Create a git commit with the version bump and changelog update
6. Create a git tag for the new version
7. Push the commit and tag to the remote
8. Ensure there is a CI/CD workflow (e.g. GitHub Actions) that automatically publishes the package on new tags/releases. If one doesn't exist, create it for the project's platform (npm, PyPI, etc.)
9. Create a GitHub release with the changelog entry as the body — this should trigger the CI/CD publish workflow

## Notes
- If any step fails, stop and create a centy issue describing the failure
- Do not skip the changelog — every release should be documented
- Mark this routine as completed once the release is published