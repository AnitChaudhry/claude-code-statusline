#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const os = require('os');

const args = process.argv.slice(2);
const command = args[0];
const VERSION = '1.0.0';

const PKG_DIR = path.resolve(__dirname, '..');
const HOME = os.homedir();

// Terminal colors
const R = '\x1b[0m';
const B = '\x1b[1m';
const D = '\x1b[2m';
const GRN = '\x1b[32m';
const YLW = '\x1b[33m';
const CYN = '\x1b[36m';
const WHT = '\x1b[97m';
const PURPLE = '\x1b[38;2;168;85;247m';
const PINK = '\x1b[38;2;236;72;153m';
const TEAL = '\x1b[38;2;6;182;212m';
const GRAY = '\x1b[38;2;90;90;99m';

function log(msg) { console.log(msg); }
function success(msg) { log(`  ${GRAY}\u2502${R}  ${GRN}\u2713${R} ${msg}`); }
function warn(msg) { log(`  ${GRAY}\u2502${R}  ${YLW}\u26A0${R} ${msg}`); }
function info(msg) { log(`  ${GRAY}\u2502${R}  ${CYN}\u2139${R} ${msg}`); }
function bar(msg) { log(`  ${GRAY}\u2502${R}  ${D}${msg}${R}`); }
function blank() { log(`  ${GRAY}\u2502${R}`); }

function header() {
  log('');
  log(`  ${GRAY}\u250C${''.padEnd(58, '\u2500')}\u2510${R}`);
  log(`  ${GRAY}\u2502${R}                                                          ${GRAY}\u2502${R}`);
  log(`  ${GRAY}\u2502${R}   ${PURPLE}${B}\u2588\u2588\u2588${R} ${PINK}${B}\u2588\u2588\u2588${R}  ${WHT}${B}claude-code-statusline${R}  ${D}v${VERSION}${R}          ${GRAY}\u2502${R}`);
  log(`  ${GRAY}\u2502${R}   ${PURPLE}\u2588${R} ${PINK}\u2588${R} ${PURPLE}\u2588${R}  ${D}Rich statusline for Claude Code${R}           ${GRAY}\u2502${R}`);
  log(`  ${GRAY}\u2502${R}   ${PURPLE}${B}\u2588\u2588\u2588${R} ${PINK}${B}\u2588\u2588\u2588${R}                                           ${GRAY}\u2502${R}`);
  log(`  ${GRAY}\u2502${R}                                                          ${GRAY}\u2502${R}`);
  log(`  ${GRAY}\u2502${R}   ${TEAL}Thinqmesh Technologies${R}                                ${GRAY}\u2502${R}`);
  log(`  ${GRAY}\u2502${R}   ${GRAY}skills.thinqmesh.com${R}                              ${GRAY}\u2502${R}`);
  log(`  ${GRAY}\u2502${R}                                                          ${GRAY}\u2502${R}`);
  log(`  ${GRAY}\u251C${''.padEnd(58, '\u2500')}\u2524${R}`);
}

function footer() {
  log(`  ${GRAY}\u2502${R}`);
  log(`  ${GRAY}\u2514${''.padEnd(58, '\u2500')}\u2518${R}`);
  log('');
}

function install() {
  header();
  blank();
  info(`${B}Installing statusline${R} to ~/.claude/`);
  blank();

  const claudeDir = path.join(HOME, '.claude');
  if (!fs.existsSync(claudeDir)) fs.mkdirSync(claudeDir, { recursive: true });

  // Copy statusline script
  const slSrc = path.join(PKG_DIR, 'bin', 'statusline.sh');
  const slDest = path.join(claudeDir, 'statusline-command.sh');
  fs.copyFileSync(slSrc, slDest);
  success(`${B}statusline-command.sh${R} copied to ~/.claude/`);

  // Merge into ~/.claude/settings.json
  const settingsPath = path.join(claudeDir, 'settings.json');
  let settings = {};
  if (fs.existsSync(settingsPath)) {
    try { settings = JSON.parse(fs.readFileSync(settingsPath, 'utf8')); } catch (e) {}
  }
  if (!settings.statusLine) {
    settings.statusLine = {
      type: 'command',
      command: 'bash ~/.claude/statusline-command.sh'
    };
    fs.writeFileSync(settingsPath, JSON.stringify(settings, null, 2) + '\n');
    success(`${B}statusLine${R} config added to ~/.claude/settings.json`);
  } else {
    success(`statusLine already configured in settings.json`);
  }

  blank();
  log(`  ${GRAY}\u251C${''.padEnd(58, '\u2500')}\u2524${R}`);
  blank();
  log(`  ${GRAY}\u2502${R}   ${GRN}${B}Ready.${R} Restart Claude Code to see the statusline.`);
  blank();
  log(`  ${GRAY}\u2502${R}   ${WHT}${B}Layout:${R}`);
  blank();
  log(`  ${GRAY}\u2502${R}    ${PINK}Skill:${R} Edit               ${GRAY}\u2502${R}  ${WHT}GitHub:${R} User/Repo/main`);
  log(`  ${GRAY}\u2502${R}    ${PURPLE}Model:${R} Opus 4.6            ${GRAY}\u2502${R}  ${CYN}Dir:${R} Downloads/Project`);
  log(`  ${GRAY}\u2502${R}    ${YLW}Tokens:${R} 25k + 12k = 37k   ${GRAY}\u2502${R}  ${GRN}Cost:${R} $1.23`);
  log(`  ${GRAY}\u2502${R}    ${WHT}Context:${R} ${GRN}\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588${R}${D}\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591${R} 50%`);
  blank();
  bar(`${R}${D}Script:${R}    ${CYN}~/.claude/statusline-command.sh${R}`);
  bar(`${R}${D}Settings:${R}  ${CYN}~/.claude/settings.json${R}`);
  blank();
  bar(`Docs     ${R}${TEAL}https://skills.thinqmesh.com${R}`);
  bar(`GitHub   ${R}${PURPLE}https://github.com/AnitChaudhry/claude-code-statusline${R}`);

  footer();
}

function uninstall() {
  header();
  blank();
  info(`${B}Uninstalling statusline${R}`);
  blank();

  const claudeDir = path.join(HOME, '.claude');

  // Remove script
  const slDest = path.join(claudeDir, 'statusline-command.sh');
  if (fs.existsSync(slDest)) {
    fs.unlinkSync(slDest);
    success(`Removed ~/.claude/statusline-command.sh`);
  } else {
    warn(`statusline-command.sh not found`);
  }

  // Remove from settings.json
  const settingsPath = path.join(claudeDir, 'settings.json');
  if (fs.existsSync(settingsPath)) {
    try {
      const settings = JSON.parse(fs.readFileSync(settingsPath, 'utf8'));
      if (settings.statusLine) {
        delete settings.statusLine;
        fs.writeFileSync(settingsPath, JSON.stringify(settings, null, 2) + '\n');
        success(`Removed statusLine from settings.json`);
      }
    } catch (e) {
      warn(`Could not parse settings.json`);
    }
  }

  blank();
  log(`  ${GRAY}\u2502${R}   ${GRN}${B}Done.${R} Restart Claude Code to apply.`);

  footer();
}

function showHelp() {
  header();
  blank();
  log(`  ${GRAY}\u2502${R}   ${WHT}${B}Usage:${R}`);
  blank();
  log(`  ${GRAY}\u2502${R}      ${CYN}ccsl install${R}       Install statusline to ~/.claude/`);
  log(`  ${GRAY}\u2502${R}      ${CYN}ccsl uninstall${R}     Remove statusline`);
  log(`  ${GRAY}\u2502${R}      ${CYN}ccsl help${R}          Show this help`);
  blank();
  log(`  ${GRAY}\u2502${R}   ${WHT}${B}What it shows:${R}`);
  blank();
  log(`  ${GRAY}\u2502${R}      ${PINK}Skill${R}      Last tool used (Read, Write, Terminal...)`);
  log(`  ${GRAY}\u2502${R}      ${PURPLE}Model${R}      Active model name and version`);
  log(`  ${GRAY}\u2502${R}      ${WHT}GitHub${R}     username/repo/branch with dirty indicators`);
  log(`  ${GRAY}\u2502${R}      ${CYN}Dir${R}        Last 3 segments of working directory`);
  log(`  ${GRAY}\u2502${R}      ${YLW}Tokens${R}     Input + Output = Total`);
  log(`  ${GRAY}\u2502${R}      ${GRN}Cost${R}       Session cost in USD`);
  log(`  ${GRAY}\u2502${R}      ${WHT}Context${R}    40-char progress bar with color thresholds`);
  blank();
  log(`  ${GRAY}\u2502${R}   ${WHT}${B}Quick install:${R}`);
  blank();
  log(`  ${GRAY}\u2502${R}      ${CYN}npx claude-code-statusline install${R}`);
  blank();
  bar(`Docs     ${R}${TEAL}https://skills.thinqmesh.com${R}`);
  bar(`GitHub   ${R}${PURPLE}https://github.com/AnitChaudhry/claude-code-statusline${R}`);

  footer();
}

// Main
if (command === 'install' || command === 'init') {
  install();
} else if (command === 'uninstall' || command === 'remove') {
  uninstall();
} else if (command === 'help' || command === '--help' || command === '-h') {
  showHelp();
} else {
  if (command) {
    log('');
    warn(`Unknown command: ${command}`);
  }
  showHelp();
}
