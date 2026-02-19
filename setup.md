# Claude Code Statusline v2

Rich, themeable statusline for Claude Code with accurate context tracking, 5 themes, 3 layouts.

## Quick Install

```bash
npx skill-statusline install
```

## Manual Install

1. Copy files to `~/.claude/`:
   ```bash
   mkdir -p ~/.claude/statusline/{themes,layouts}
   cp lib/*.sh ~/.claude/statusline/
   cp themes/*.sh ~/.claude/statusline/themes/
   cp layouts/*.sh ~/.claude/statusline/layouts/
   cp bin/statusline.sh ~/.claude/statusline-command.sh
   ```

2. Create config at `~/.claude/statusline-config.json`:
   ```json
   {"version":2,"theme":"default","layout":"standard","options":{}}
   ```

3. Add to `~/.claude/settings.json`:
   ```json
   {
     "statusLine": {
       "type": "command",
       "command": "bash ~/.claude/statusline-command.sh"
     }
   }
   ```

4. Restart Claude Code.

## Change Theme

```bash
ccsl theme set nord
```

## Change Layout

```bash
ccsl layout set full
```

## Diagnose Issues

```bash
ccsl doctor
```
