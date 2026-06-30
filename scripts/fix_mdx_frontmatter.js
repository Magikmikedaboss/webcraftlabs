// Lightweight ESM fixer for MDX frontmatter
// Gray-matter-based ESM fixer for MDX frontmatter
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function readArchiveOrder() {
  const p = path.join(__dirname, '..', 'src', 'lib', 'archive.ts');
  const src = fs.readFileSync(p, 'utf8');
  const slugs = {};
  const arrMatch = src.match(/ARCHIVE_ORDER\s*=\s*\[([\s\S]*?)\] as const;/);
  if (!arrMatch) return slugs;
  const body = arrMatch[1];
  const itemRe = /\{([\s\S]*?)\},?/g;
  let m;
  while ((m = itemRe.exec(body))) {
    const item = m[1];
    const slugMatch = item.match(/slug:\s*"([^"]+)"/);
    const idMatch = item.match(/archiveId:\s*"([^"]+)"/);
    if (slugMatch) slugs[slugMatch[1]] = idMatch ? idMatch[1] : null;
  }
  return slugs;
}

function fixFiles() {
  const archiveMap = readArchiveOrder();
  const blogDir = path.join(__dirname, '..', 'src', 'content', 'blog');
  if (!fs.existsSync(blogDir)) return [];
  const files = fs.readdirSync(blogDir).filter((f) => f.endsWith('.mdx'));
  const fixes = [];
  for (const file of files) {
    const fp = path.join(blogDir, file);
    const raw = fs.readFileSync(fp, 'utf8');
    const parsed = matter(raw, { language: 'yaml' });
    const data = parsed.data || {};
    const content = parsed.content || '';
    const slug = data.slug || file.replace(/\.mdx$/, '');
    let changed = false;
    if (Object.prototype.hasOwnProperty.call(archiveMap, slug)) {
      const mappedId = archiveMap[slug];
      if (data.collection !== 'webcraft-archive') {
        data.collection = 'webcraft-archive';
        changed = true;
      }
      // Only assign an archiveId when a real mapped ID exists. Avoid writing
      // a fabricated fallback like "Unclassified" when the archive mapping
      // explicitly lacks an ID for this slug.
      if (mappedId) {
        if (String(data.archiveId || '') !== String(mappedId)) {
          data.archiveId = mappedId;
          changed = true;
        }
      } else if (data.archiveId !== undefined) {
        delete data.archiveId;
        changed = true;
      }      if (!data.mystery) {
        data.mystery = 'TBD';
        changed = true;
      }
    }
    if (changed) {
      const out = matter.stringify(content, data, { language: 'yaml' });
      fs.writeFileSync(fp, out, 'utf8');
      fixes.push({ file: fp, changes: Object.keys(data) });
    }
  }
  return fixes;
}

if (process.argv[1] === __filename) {
  const fixes = fixFiles();
  if (fixes.length) {
    console.log('Applied fixes to files:');
    for (const f of fixes) console.log(' -', f.file);
    process.exit(0);
  } else {
    console.log('No fixes necessary.');
    process.exit(0);
  }
}

