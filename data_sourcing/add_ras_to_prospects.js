const fs = require('fs');
const path = require('path');

// ---- FILE PATHS ----
const TSV_FILE = path.resolve(__dirname, 'ras_scores.tsv');
const PROSPECTS_FILE = path.resolve(__dirname, 'prospects.js');

// ---- HELPERS ----
function normalizeName(name) {
  return String(name)
    .toLowerCase()
    .replace(/[^a-z\s]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function parseTSV(tsv) {
  const lines = tsv.split('\n').filter(Boolean);

  const headers = lines[0].split('\t');
  const nameIdx = headers.indexOf('Name');
  const rasIdx = headers.indexOf('RAS');

  const map = new Map();

  for (let i = 1; i < lines.length; i++) {
    const cols = lines[i].split('\t');

    const name = normalizeName(cols[nameIdx]);
    const ras = cols[rasIdx]?.trim();

    if (!name || !ras) continue;

    map.set(name, ras);
  }

  return map;
}

function loadProspects() {
  const raw = fs.readFileSync(PROSPECTS_FILE, 'utf8');

  const cleaned = raw
    .replace(/const\s+prospects\s*=\s*/, '')
    .replace(/;?\s*$/, '');

  return eval(cleaned);
}

// ---- MAIN ----
function main() {
  const tsv = fs.readFileSync(TSV_FILE, 'utf8');
  const rasMap = parseTSV(tsv);

  const prospects = loadProspects();

  let matchCount = 0;

  for (const p of prospects) {
    const normalized = normalizeName(p.name);

    if (rasMap.has(normalized)) {
      p.RAS = rasMap.get(normalized);
      matchCount++;
    }
  }

  // ---- BACKUP FIRST ----
  const backupPath = PROSPECTS_FILE.replace('.js', '.backup.js');
  fs.writeFileSync(backupPath, fs.readFileSync(PROSPECTS_FILE, 'utf8'));

  // ---- OVERWRITE ORIGINAL ----
  const output =
    'const prospects = ' +
    JSON.stringify(prospects, null, 2) +
    ';\n';

  fs.writeFileSync(PROSPECTS_FILE, output, 'utf8');

  console.log(`✅ Updated ${matchCount} players with RAS`);
  console.log(`🛟 Backup saved to: ${backupPath}`);
}

main();