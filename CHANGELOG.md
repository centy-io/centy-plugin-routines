# Changelog

## 0.2.1 (2026-03-06)

### Docs

- Enhance release routine documentation for autonomous versioning and CI/CD verification

## 0.2.0 (2026-03-06)

Initial public release of `centy-plugin-routines`.

### Features

- Plugin structure with CLI integration for discovering and executing routines
- Interactive routine selection with multi-select support
- Curated routine catalog with separate markdown files for each routine:
  - **release-new-version** — full release checklist with semver, changelog, and CI/CD
  - **replace-custom-with-libs** — identify and replace custom code with well-maintained libraries
- OIDC-based npm publish workflow via GitHub Actions
- Centy configuration files and issue templates
