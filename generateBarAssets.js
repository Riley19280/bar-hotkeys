#!/usr/bin/env node

import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const REPO_URL = "https://github.com/beyond-all-reason/Beyond-All-Reason.git";
const CLONE_DIR = path.join(__dirname, "bar-repo");
const SOURCE_DIR = path.join(CLONE_DIR, "unitpics");
const OUTPUT_DIR = path.join(__dirname, "public", "bar-assets");

/**
 * Run shell commands
 */
function run(cmd, cwd = __dirname) {
  console.log(`> ${cmd}`);
  execSync(cmd, { stdio: "inherit", cwd });
}

/**
 * Recursively walk directories
 */
function walk(dir, callback) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath, callback);
    } else {
      callback(fullPath);
    }
  }
}

/**
 * Ensure directory exists
 */
function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

/**
 * Clone repo if needed
 */
if (!fs.existsSync(CLONE_DIR)) {
  run(`git clone --depth=1 ${REPO_URL} ${CLONE_DIR}`);
} else {
  console.log("Repo already cloned, skipping clone.");
}

/**
 * Convert DDS → PNG preserving structure
 */
walk(SOURCE_DIR, (file) => {
  if (!file.toLowerCase().endsWith(".dds")) return;

  const relative = path.relative(SOURCE_DIR, file);
  const outputDir = path.join(OUTPUT_DIR, path.dirname(relative));

  ensureDir(outputDir);

  // Copy DDS to output dir so mogrify writes PNG next to it
  const tempDDS = path.join(outputDir, path.basename(file));
  fs.copyFileSync(file, tempDDS);

  // Convert
  run(`mogrify -format png "${tempDDS}"`);

  // Remove DDS copy
  fs.unlinkSync(tempDDS);
});

console.log("✅ Conversion complete");
