import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const p = path.join(__dirname, '..', 'src', 'content', 'blog', 'treatise-1-on-the-preservation-of-knowledge.mdx');
const txt = fs.readFileSync(p, 'utf8');
// Use gray-matter to parse frontmatter so lists and folded blocks are preserved
const parsed = matter(txt, { language: 'yaml' });
const obj = parsed.data || {};
console.log('parsed keys:', Object.keys(obj));
console.log(JSON.stringify(obj, null, 2));

// compute issues like scan
const archiveJson = path.join(__dirname, '..', 'src', 'lib', 'archive-order.json');
// Load the canonical archive-order.json — this check must fail fast if the
// canonical mapping is absent or malformed so the script doesn't silently
// proceed with an empty membership map and hide a broken source of truth.
const sl = {};
if (!fs.existsSync(archiveJson)) {
  console.error(`Missing canonical archive-order.json at ${archiveJson}`);
  process.exit(2);
}
try {
  const arr = JSON.parse(fs.readFileSync(archiveJson, 'utf8'));
  for (const it of arr) {
    if (it && typeof it.slug === 'string') sl[it.slug] = it.archiveId ?? null;
  }
} catch (err) {
  console.error(`Failed to parse archive-order.json at ${archiveJson}:`, err && err.message ? err.message : err);
  process.exit(2);
}
const slug = obj.slug || path.basename(p).replace(/\.mdx$/, '');
const issues = [];
if (!obj.collection) issues.push('missing collection');
if (obj.collection === 'webcraft-archive') {
  const mappedId = Object.prototype.hasOwnProperty.call(sl, slug) ? sl[slug] : undefined;
  if (mappedId && !obj.archiveId) issues.push('missing archiveId');
  if (!obj.mystery) issues.push('missing mystery');
}// If the slug appears in the canonical archive map but collection is still
// set to "blog", flag it so the single-check mirrors the main scanner.
// Use an explicit membership test so a mapped slug with a null archiveId
// (or other falsy value) is still recognized as present in the canonical map.
if (Object.prototype.hasOwnProperty.call(sl, slug) && obj.collection !== 'webcraft-archive') {
  issues.push('should be collection:webcraft-archive');
}
console.log('archiveMap has slug?', Object.prototype.hasOwnProperty.call(sl, slug), 'slug', slug);
console.log('issues:', issues);
if (issues.length > 0) process.exitCode = 1;