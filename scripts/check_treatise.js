import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const p = path.join(__dirname, '..', 'src', 'content', 'blog', 'treatise-1-on-the-preservation-of-knowledge.mdx');
const txt = fs.readFileSync(p, 'utf8');
const parsed = matter(txt, { language: 'yaml' });
if (!Object.keys(parsed.data || {}).length) console.log('no frontmatter');
else {
  const fm = parsed.data || {};  console.log('fm keys:', Object.keys(fm));
  const archiveMap = (function () {
    // Read a structured JSON source of truth instead of scraping TypeScript.
    const pjson = path.join(__dirname, '..', 'src', 'lib', 'archive-order.json');
    if (!fs.existsSync(pjson)) return {};
    try {
      const data = JSON.parse(fs.readFileSync(pjson, 'utf8'));
      const slugs = {};
      for (const item of data) {
        if (item && item.slug) slugs[item.slug] = item.archiveId || null;
      }
      return slugs;
    } catch {
      return {};
    }
  })();
  const slug = fm.slug || path.basename(p).replace(/\.mdx$/, '');
  const inArchiveMap = Object.prototype.hasOwnProperty.call(archiveMap, slug);
  console.log('slug', slug, 'in archiveMap?', inArchiveMap);
  console.log('fm.collection=', fm.collection);
  console.log('fm.archiveId=', fm.archiveId);
  console.log('fm.mystery=', fm.mystery);
  const issues = [];
  if (!fm.title) issues.push('missing title');
  if (!fm.slug) issues.push('missing slug');
  if (!fm.collection) issues.push('missing collection');
  if (inArchiveMap && fm.collection !== 'webcraft-archive') issues.push('should be collection:webcraft-archive');
  if (inArchiveMap && archiveMap[slug] && !fm.archiveId) issues.push('missing archiveId for webcraft-archive');
  if (fm.collection === 'webcraft-archive' && !fm.mystery) issues.push('missing mystery for webcraft-archive');
  console.log('issues', issues);
  if (issues.length > 0) process.exitCode = 1;
}