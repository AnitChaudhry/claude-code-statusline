# skill-statusline

Rich, themeable statusline for Claude Code with accurate context tracking, 5 color themes, 3 layout modes, and zero dependencies. Uses a fast Node.js renderer on Windows (no Git Bash overhead), pure bash on Unix.

## Install

```bash
npx skill-statusline install
```

Or install globally:

```bash
npm install -g skill-statusline
ccsl install
```

The installer walks you through choosing a theme and layout. Use `--quick` to skip the wizard and use defaults.

## Layouts

### Compact (2 rows)

```
 Opus 4.6         │ Downloads/Project      │ 47% $1.23
 Context: ████████████████████░░░░░░░░░░░░░░░░░░░░ 47%
```

### Standard (4 rows — default)

```
 Skill: Edit                      │  GitHub: user/repo/main+~
 Model: Opus 4.6                  │  Dir: Downloads/Project
 Tokens: 85k + 12k                │  Cost: $1.23
 Context: ████████████████████░░░░░░░░░░░░░░░░░░░░ 46%
```

### Full (6 rows)

```
 Skill: Edit                      │  GitHub: user/repo/main+~
 Model: Opus 4.6                  │  Dir: Downloads/Project
 Window: 85k + 12k                │  Cost: $1.23 ($0.12/m)
 Session: 125k + 34k              │  +156/-23  12m34s
 Cache: W:5k R:2k                 │  NORMAL @code-reviewer
 Context: ████████████████████░░░░░░░░░░░░░░░░░░░░ 46% 54% left
```

## Themes

| Theme | Palette |
|-------|---------|
| `default` | Classic purple/pink/cyan |
| `nord` | Arctic, blue-tinted |
| `tokyo-night` | Vibrant neon |
| `catppuccin` | Warm pastels (Mocha) |
| `gruvbox` | Retro groovy |

```bash
ccsl theme set nord
```

## Fields

| Field | Color | Description |
|-------|-------|-------------|
| Skill | Pink | Last tool used (Read, Write, Edit, Terminal, Agent...) |
| Model | Purple | Active model name + version |
| GitHub | White | user/repo/branch with `+` staged `~` unstaged indicators |
| Dir | Cyan | Last 3 path segments of working directory |
| Tokens | Yellow | Current context window: input + output |
| Cost | Green | Session cost in USD |
| Context | Adaptive | 40-char bar — white <=40%, orange 41-75%, red 76-90%, deep red >90% |
| Session | Dim | Cumulative tokens across all turns (full layout) |
| Duration | Dim | Session elapsed time (full layout) |
| Lines | Dim | +added/-removed (full layout) |
| Cache | Blue | Write/Read cache token counts (full layout) |
| Vim | Teal | NORMAL/INSERT mode when vim mode is on (full layout) |
| Agent | Blue | @agent-name when running with --agent (full layout) |

## Accurate Context Tracking

v2 computes context percentage from actual token counts (`current_usage.input_tokens + cache_creation + cache_read`) divided by `context_window_size`, instead of relying on the pre-calculated `used_percentage` which can lag behind. This fixes the v1 bug where the bar showed 77% while real usage was 92%.

Compaction warnings appear at configurable thresholds:
- **85%+**: Shows remaining percentage (`15% left`)
- **95%+**: Shows `COMPACTING` warning

## CLI Commands

```
ccsl install              Install with theme/layout wizard
ccsl install --quick      Install with defaults
ccsl uninstall            Remove statusline
ccsl update               Update scripts (preserves config)

ccsl theme                List themes
ccsl theme set <name>     Set active theme
ccsl layout               List layouts
ccsl layout set <name>    Set active layout

ccsl preview              Preview with sample data
ccsl preview --theme x    Preview a specific theme
ccsl preview --layout x   Preview a specific layout

ccsl config               Show current config
ccsl config set k v       Set config option
ccsl doctor               Run diagnostics + benchmark
ccsl version              Show version
```

## Config Options

Stored in `~/.claude/statusline-config.json`:

| Option | Default | Description |
|--------|---------|-------------|
| `compaction_warning_threshold` | `85` | % at which to show remaining context warning |
| `bar_width` | `40` | Width of context bar in characters |
| `cache_ttl_seconds` | `5` | How long to cache git/transcript results |
| `show_burn_rate` | `false` | Show $/min burn rate (full layout) |
| `show_vim_mode` | `true` | Show vim mode indicator |
| `show_agent_name` | `true` | Show --agent name |

## Architecture

Two rendering engines — the installer picks the right one for your platform:

- **Windows**: Node.js renderer (`statusline-node.js`) — single process, no subprocess spawning, ~30-50ms
- **macOS/Linux**: Bash engine (`core.sh`) — pure bash, zero dependencies, <50ms with caching

Git Bash on Windows has ~50-100ms overhead *per subprocess spawn* (awk, sed, grep, git, date). A bash statusline spawning 10-20 subprocesses = 500-1000ms. The Node.js renderer eliminates this by doing everything in a single process.

```
~/.claude/
  statusline-command.sh           # Bash entry point (macOS/Linux)
  statusline-node.js              # Node.js renderer (Windows)
  statusline/
    core.sh                       # Bash engine: parse JSON, compute fields, render
    json-parser.sh                # Nested JSON extraction (no jq)
    helpers.sh                    # Utilities + filesystem caching
    themes/{default,nord,...}.sh  # Color palettes
    layouts/{compact,...}.sh      # Render functions
  statusline-config.json          # User preferences
```

Terminal width is auto-detected — layouts gracefully degrade on narrow terminals.

## Requirements

- Node.js >=16 (installer + Windows renderer)
- Git (for GitHub field)
- Bash (macOS/Linux runtime only — not needed on Windows)
- Works on Windows, macOS, Linux

## Part of the Thinqmesh Skills Ecosystem

This statusline is also bundled with [codebase-context-skill](https://www.npmjs.com/package/codebase-context-skill).

```bash
npx codebase-context-skill init
```

## License

MIT — [Thinqmesh Technologies](https://thinqmesh.com)
