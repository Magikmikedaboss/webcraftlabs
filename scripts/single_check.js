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
const archiveSrc = fs.readFileSync(path.join(__dirname, '..', 'src', 'lib', 'archive.ts'), 'utf8');
const arrMatch = archiveSrc.match(/ARCHIVE_ORDER\s*=\s*\[([\s\S]*?)\] as const;/);
const sl = {};
if (arrMatch) {
  const body = arrMatch[1];
  const itemRe = /\{([\s\S]*?)\},?/g;
  let m;
  while ((m = itemRe.exec(body))) {
    const item = m[1];
    const slugMatch = item.match(/slug:\s*"([^"]+)"/);
    const idMatch = item.match(/archiveId:\s*"([^"]+)"/);
    if (slugMatch) sl[slugMatch[1]] = idMatch ? idMatch[1] : null;
  }
}
const slug = obj.slug || path.basename(p).replace(/\.mdx$/, '');
const issues = [];
if (!obj.collection) issues.push('missing collection');
if (obj.collection === 'webcraft-archive') {
  if (!obj.archiveId) issues.push('missing archiveId');
  if (!obj.mystery) issues.push('missing mystery');
}
// If the slug appears in the canonical archive map but collection is still
// set to "blog", flag it so the single-check mirrors the main scanner.
// Use an explicit membership test so a mapped slug with a null archiveId
// (or other falsy value) is still recognized as present in the canonical map.
if (Object.prototype.hasOwnProperty.call(sl, slug) && obj.collection !== 'webcraft-archive') {
  issues.push('should be collection:webcraft-archive');
}
console.log('archiveMap has slug?', Object.prototype.hasOwnProperty.call(sl, slug), 'slug', slug);
console.log('issues:', issues);
if (issues.length > 0) process.exitCode = 1;