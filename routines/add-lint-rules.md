# Add Lint Rules

Analyze the codebase, identify opportunities for stricter linting, add new error-level lint rules, fix all violations, and open a PR to main.

**Important: This routine must be executed fully autonomously. Do not ask the user for input. Determine everything from the project context.**

## Step 0 — Detect Ecosystem and Linter

1. Identify the project type by inspecting manifest and config files:
   - **Rust**: `Cargo.toml` — linter is `clippy` (configured via `clippy.toml`, `Cargo.toml [lints]`, or `#![deny(...)]` / `#![warn(...)]` attributes)
   - **JavaScript/TypeScript**: `package.json` — linter is `eslint` (configured via `eslint.config.*`, `.eslintrc.*`)
   - **Python**: `pyproject.toml` / `setup.py` — linter is `ruff` or `pylint` / `flake8` (configured via `pyproject.toml [tool.ruff]`, `ruff.toml`, `.pylintrc`, etc.)
   - **Go**: `go.mod` — linter is `golangci-lint` (configured via `.golangci.yml`)
   - Other ecosystems: adapt accordingly
2. Read the existing lint configuration to understand which rules are already enabled and at what severity
3. Run the linter as-is and note any existing warnings or errors — the codebase must be clean before proceeding

## Step 1 — Analyze the Code

1. Read through the source files and identify recurring patterns, code smells, or risky practices that a lint rule could catch. Focus on:
   - Correctness issues (e.g., unused variables, unreachable code, implicit type coercions)
   - Safety and security (e.g., unwrap in Rust, eval in JS, bare except in Python)
   - Consistency (e.g., naming conventions, import ordering, brace style)
   - Maintainability (e.g., overly complex functions, deeply nested logic, missing return types)
2. Note which of these are already covered by existing lint rules and which are not

## Step 2 — Research and Select New Rules

1. Search the web for the linter's full rule catalog and any recent additions relevant to the detected ecosystem version
2. Cross-reference with the patterns found in Step 1 to select rules that would catch real issues in this codebase — do not add rules that would produce zero findings or are purely stylistic noise
3. Also consider broadly recommended rule sets or presets that the project has not yet adopted (e.g., clippy::pedantic, eslint recommended configs, ruff's extended rule sets)
4. Aim for a focused set of **3-10 new rules** promoted to error level. Quality over quantity — each rule should have a clear benefit for this specific codebase
5. For each selected rule, note:
   - The rule identifier
   - What it catches
   - Why it is beneficial for this codebase specifically

## Step 3 — Apply the Rules and Fix Violations

1. Create a new branch named `lint/<short-description>` (e.g., `lint/stricter-clippy`, `lint/eslint-no-implicit-coercion`)
2. Update the lint configuration to add the new rules at error level:
   - **Rust**: add `#![deny(...)]` attributes or `[lints.clippy]` entries in `Cargo.toml`
   - **JS/TS**: add rule entries with `"error"` severity in the ESLint config
   - **Python (ruff)**: add rule codes to `select` in `pyproject.toml` or `ruff.toml`
   - **Go**: add linter entries and rule settings in `.golangci.yml`
3. Run the linter and fix every violation. Prefer automated fixes where the linter supports `--fix`. For remaining violations, fix them manually — do not suppress or disable rules to pass
4. Run the project's test suite to ensure nothing broke
5. If a rule causes too many false positives or would require invasive refactoring, remove it from the set and document why in the PR description

## Step 4 — Commit and Open a PR

1. Stage all changes (config + code fixes)
2. Write a clear commit message: `chore(lint): add <N> new error-level <linter> rules`
3. Commit and push the branch
4. Open a pull request to `main` with:
   - **Title**: `chore(lint): add stricter <linter> rules`
   - **Body**: a summary listing each new rule, what it catches, and a count of violations that were fixed
5. Verify CI passes on the PR. If it fails, inspect logs and fix.

## Notes

- Do not prompt the user for any input — infer everything from the project context
- Do not downgrade any existing error-level rules
- Do not add rules that are already enabled at any severity
- If the codebase has no linter configured at all, set one up following current best practices for the ecosystem before adding rules
- If any step fails, stop and create a centy issue describing the failure
- Mark this routine as completed once the PR is open and CI has passed
