# Claude Code Statusline

A rich, customizable statusline for Claude Code with colored legends, context progress bar, GitHub info, token tracking, and active skill display.

## Layout

```
 Skill: Edit                      │  GitHub: User/Repo/master+~
 Model: Opus 4.6                  │  Dir: Downloads/Project
 Tokens: 25k + 12k = 37k         │  Cost: $1.23
 Context: ████████████████████░░░░░░░░░░░░░░░░░░░░ 50%
```

## Install

```bash
npx claude-code-statusline install
```

Or install globally:

```bash
npm install -g claude-code-statusline
ccsl install
```

Then restart Claude Code.

## Uninstall

```bash
ccsl uninstall
```

## Fields

| Field   | Color            | Description |
|---------|------------------|-------------|
| Skill   | Pink             | Last tool used (Read, Write, Edit, Terminal, Agent, etc.) |
| Model   | Purple           | Active model name and version |
| GitHub  | White            | username/repo/branch with +~ dirty indicators |
| Dir     | Cyan             | Last 3 segments of working directory |
| Tokens  | Yellow           | Input + Output = Total (e.g., 25k + 12k = 37k) |
| Cost    | Green            | Session cost in USD |
| Context | White/Orange/Red | 40-char progress bar (white ≤40%, orange 41-75%, red >75%) |

## Requirements

- Bash shell (Git Bash on Windows, or any Unix shell)
- Git (for GitHub field)
- Works on Windows, macOS, Linux

## What it installs

- `~/.claude/statusline-command.sh` — the statusline script
- Updates `~/.claude/settings.json` — adds `statusLine` config

## Part of the Thinqmesh Skills Ecosystem

This statusline is also bundled with [codebase-context-skill](https://www.npmjs.com/package/codebase-context-skill) — context engineering middleware for Claude Code with 23 slash commands, 6 agents, and session persistence.

```bash
npx codebase-context-skill init
```

## License

MIT — [Thinqmesh Technologies](https://thinqmesh.com)
