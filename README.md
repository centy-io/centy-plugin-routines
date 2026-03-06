# centy-plugin-routines

A Centy plugin that ships with a curated pool of **routines** — predefined repeatable processes, checklists, and workflows. Run the CLI to browse the catalog and add or update routines in your project.

## What is a Routine?

A routine is a recurring process — things like deployment checklists, sprint ceremonies, onboarding steps, or release workflows. This plugin provides a built-in catalog of ready-to-use routines so you don't have to write them from scratch.

## Installation

```bash
# Install globally
pnpm add -g centy-plugin-routines

# Or run directly
pnpm dlx centy-plugin-routines
```

Requires [centy-cli](https://github.com/centy-io/centy-cli) and [centy-daemon](https://github.com/centy-io/centy-daemon) to be installed and running.

## Usage

Run the CLI in any centy-initialized project:

```bash
centy-plugin-routines
```

The interactive prompt will:

1. Display the catalog of available routines
2. Show which routines are already installed in your project and whether updates are available
3. Let you select a routine to **add** (if not yet installed) or **update** (if a newer version exists in the catalog)

The selected routine is then created or updated in your project as a `routine` item type via the centy CLI.

## How It Works

Under the hood, the plugin:

1. **Registers a custom item type** called `routine` via `centy item-type create` (first run only)
2. **Lists existing routines** in the project via `centy list routines` to detect what's already installed
3. **Compares** installed routines against the built-in catalog to determine available additions and updates
4. **Creates** new routines via `centy create routine`
5. **Updates** existing routines via `centy update routine <id>`

### Routine Item Type

The `routine` item type is created with the following configuration:

| Property   | Value           |
| ---------- | --------------- |
| Name       | Routine         |
| Identifier | slug            |
| Features   | move, duplicate |

## Commands

| Command                     | Description                               |
| --------------------------- | ----------------------------------------- |
| `centy-plugin-routines`     | Browse catalog and add or update routines |
| `centy list routines`       | List installed routines in your project   |
| `centy get routine <id>`    | View a specific installed routine         |
| `centy update routine <id>` | Update a routine directly via centy CLI   |
| `centy delete routine <id>` | Remove a routine from your project        |

Once routines are installed, you can also manage them directly with the `centy` CLI.

## License

MIT
