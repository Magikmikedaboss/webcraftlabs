import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function findMdx(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((f) => f.endsWith('.mdx')).map((f) => path.join(dir, f));
}

function readArchiveOrder() {
  const p = path.join(__dirname, '..', 'src', 'lib', 'archive.ts');
  if (!fs.existsSync(p)) return {};
  const src = fs.readFileSync(p, 'utf8');
  const slugs = {};
  const arrMatch = src.match(/ARCHIVE_ORDER\s*=\s*\[([\s\S]*?)\] as const;/);
  if (!arrMatch) return slugs;
  const body = arrMatch[1];
  const itemRe = /\{([\s\S]*?)\},?/g;
  let m;
  while ((m = itemRe.exec(body))) {
    const item = m[1];
    const slugMatch = item.match(/slug:\s*"([^\"]+)"/);
    if (slugMatch) slugs[slugMatch[1]] = true;
  }
  return slugs;
}

function ensureCollection(filePath, collection) {
  const raw = fs.readFileSync(filePath, 'utf8');
  const parsed = matter(raw, { language: 'yaml' });
  const data = parsed.data || {};
  // Skip files that are part of the webcraft archive mapping when setting blog collection
  if (collection === 'blog') {
    const archiveMap = readArchiveOrder();
    const slug = data.slug || path.basename(filePath).replace(/\.mdx$/, '');
    if (archiveMap[slug]) return null;
  }
  if (data.collection) return null; // already set
  data.collection = collection;
  const out = matter.stringify(parsed.content || '', data, { language: 'yaml' });
  fs.writeFileSync(filePath, out, 'utf8');
  return filePath;
}

function run() {
  const contentRoot = path.join(__dirname, '..', 'src', 'content');
  const blogDir = path.join(contentRoot, 'blog');
  const newsDir = path.join(contentRoot, 'news');
  const changed = [];

  for (const f of findMdx(blogDir)) {
    const r = ensureCollection(f, 'blog');
    if (r) changed.push(r);
  }
  for (const f of findMdx(newsDir)) {
    const r = ensureCollection(f, 'news');
    if (r) changed.push(r);
  }

  if (changed.length) {
    console.log('Updated files:');
    for (const c of changed) console.log(' -', path.relative(process.cwd(), c));
    process.exit(0);
  } else {
    console.log('No collection updates necessary.');
    process.exit(0);
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) run();
