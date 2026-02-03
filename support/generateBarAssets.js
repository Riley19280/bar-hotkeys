#!/usr/bin/env node

import { execSync } from 'child_process'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const REPO_URL = 'https://github.com/beyond-all-reason/Beyond-All-Reason.git'
const BASE_DIR = path.join(__dirname, '..')
const CLONE_DIR = path.join(BASE_DIR, 'bar-repo')
const SOURCE_DIR = path.join(CLONE_DIR, 'unitpics')
const OUTPUT_DIR = path.join(BASE_DIR, 'public', 'bar-assets')


/**
 * Run shell commands
 */
function run(cmd, cwd = __dirname) {
  console.log(`> ${cmd}`)
  execSync(cmd, { stdio: 'inherit', cwd })
}

/**
 * Recursively walk directories
 */
function walk(dir, callback) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      walk(fullPath, callback)
    } else {
      callback(fullPath)
    }
  }
}

/**
 * Ensure directory exists
 */
function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true })
}


function copyDirSync(src, dest) {
  if (!fs.existsSync(dest)) fs.mkdirSync(dest)

  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name)
    const destPath = path.join(dest, entry.name)

    if (entry.isDirectory()) {
      copyDirSync(srcPath, destPath)
    } else {
      fs.copyFileSync(srcPath, destPath)
    }
  }
}


/**
 * Clone repo if needed
 */
if (!fs.existsSync(CLONE_DIR)) {
  run(`git clone --depth=1 ${REPO_URL} ${CLONE_DIR}`)
} else {
  console.log('Repo already cloned, skipping clone.')
}

// /**
//  * Convert DDS → PNG preserving structure
//  */
// walk(SOURCE_DIR, (file) => {
//   if (!file.toLowerCase().endsWith('.dds')) return
//
//   const relative = path.relative(SOURCE_DIR, file)
//   const outputDir = path.join(OUTPUT_DIR, path.dirname(relative))
//
//   ensureDir(outputDir)
//
//   // Copy DDS to output dir so mogrify writes PNG next to it
//   const tempDDS = path.join(outputDir, path.basename(file))
//   fs.copyFileSync(file, tempDDS)
//
//   // Convert
//   run(`mogrify -format png "${tempDDS}"`)
//
//   // Remove DDS copy
//   fs.unlinkSync(tempDDS)
// })

// Faction Icons
ensureDir(OUTPUT_DIR + '/factions')
fs.copyFileSync(CLONE_DIR + '/luaui/images/advplayerslist/armada_default.png', OUTPUT_DIR + '/factions/armada_default.png')
fs.copyFileSync(CLONE_DIR + '/luaui/images/advplayerslist/cortex_default.png', OUTPUT_DIR + '/factions/cortex_default.png')
fs.copyFileSync(CLONE_DIR + '/luaui/images/advplayerslist/legion_default.png', OUTPUT_DIR + '/factions/legion_default.png')


// Translations
const LOCALE_DIR = BASE_DIR + '/src/i18n/locales'

copyDirSync(CLONE_DIR + '/language', LOCALE_DIR)
fs.rmSync(LOCALE_DIR + '/test_unicode.lua')
fs.rmSync(LOCALE_DIR + '/transifex.yml')

const locales = fs.readdirSync(LOCALE_DIR).map(l => `"${l}"`).join(',')
fs.writeFileSync(CLONE_DIR + '/../src/i18n/supportedLocales.ts', `export const supportedLocales = [${locales}]`)


// Keybinds
const defaultFile = fs.readFileSync(CLONE_DIR + '/luaui/configs/hotkeys/gridmenu_keys.txt').toString()
fs.writeFileSync(CLONE_DIR + '/../src/bar/gridmenu_keys.json', JSON.stringify({default: defaultFile}, null, 4))


console.log('✅ Conversion complete')
