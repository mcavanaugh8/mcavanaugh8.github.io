const fs = require('fs');
const path = require('path');

const INPUT_FILE = path.resolve(__dirname, 'data.html');
const OUTPUT_FILE = path.resolve(__dirname, 'prospects.js');
const BASE_URL = 'https://www.nfldraftbuzz.com';

function normalizeUrl(url) {
  if (!url) return '';
  return url.startsWith('http') ? url : BASE_URL + url;
}

function stripTags(str) {
  return String(str || '')
    .replace(/<br\s*\/?>/gi, ' ')
    .replace(/<[^>]+>/g, '')
    .replace(/&gt;/g, '>')
    .replace(/&lt;/g, '<')
    .replace(/&amp;/g, '&')
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, ' ')
    .trim();
}

function matchOne(str, re) {
  const m = str.match(re);
  return m ? m[1].trim() : '';
}

function parseRows(html) {
  const rows = [...html.matchAll(/<tr\b[^>]*data-href="[^"]*"[^>]*>([\s\S]*?)<\/tr>/gi)];
  const prospects = [];

  for (const rowMatch of rows) {
    const rowHtml = rowMatch[1];

    const tdMatches = [...rowHtml.matchAll(/<td\b[^>]*>([\s\S]*?)<\/td>/gi)];
    if (tdMatches.length < 10) continue;

    const cells = tdMatches.map(m => m[1]);

    const overallRank = parseInt(stripTags(cells[0]), 10) || null;

    const firstName = stripTags(matchOne(cells[1], /<span class="firstName">([\s\S]*?)<\/span>/i));
    const lastName = stripTags(matchOne(cells[1], /<span class="lastName">([\s\S]*?)<\/span>/i));
    const name = `${firstName} ${lastName}`.replace(/\s+/g, ' ').trim();

    const image = normalizeUrl(matchOne(cells[1], /<img[^>]*src="([^"]+)"/i));

    const position = stripTags(cells[3]);

    const teamLogoUrl = normalizeUrl(matchOne(cells[4], /<img[^>]*src="([^"]+)"/i));
    const team = stripTags(matchOne(cells[4], /<img[^>]*alt="([^"]*?)\s+Mascot"/i));

    const weight = stripTags(cells[5]);
    const height = stripTags(cells[6]);
    const fortyYd = stripTags(cells[7]);
    const positionRank = parseInt(stripTags(cells[8]), 10) || null;
    const overallRankAvg = stripTags(cells[9]); // available if you want it
    const rating = stripTags(cells[10]);

    prospects.push({
      name,
      position,
      teamLogoUrl,
      height,
      weight,
      fortyYd,
      rating,
      image,
      RAS: 'N/A',
      team,
      overallRank,
      positionRank
    });
  }

  return prospects;
}

function main() {
  const html = fs.readFileSync(INPUT_FILE, 'utf8');
  const prospects = parseRows(html);

  const output =
    'const prospects = ' +
    JSON.stringify(prospects, null, 2) +
    ';\n';

  fs.writeFileSync(OUTPUT_FILE, output, 'utf8');
  console.log(`Wrote ${prospects.length} prospects to ${OUTPUT_FILE}`);
}

main();