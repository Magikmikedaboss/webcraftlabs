import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function findMdxFiles(dir) {
  const files = [];
  if (!fs.existsSync(dir)) return files;
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    const stat = fs.statSync(p);
    if (stat.isDirectory()) files.push(...findMdxFiles(p));
    else if (stat.isFile() && p.endsWith('.mdx')) files.push(p);
  }
  return files;
}

function migrate() {
  const root = path.join(__dirname, '..', 'src', 'content');
  const files = findMdxFiles(root);
  const changed = [];
  const ambiguous = [];
  for (const f of files) {
    const raw = fs.readFileSync(f, 'utf8');
    const parsed = matter(raw, { language: 'yaml' });
    const data = parsed.data || {};
    if (data.published !== undefined && typeof data.published !== 'boolean') {
      const normalized = String(data.published).trim().toLowerCase();
      if (['true', '1', 'yes', 'published'].includes(normalized)) data.published = true;
      else if (['false', '0', 'no'].includes(normalized)) data.published = false;
      else {
        ambiguous.push({ file: f, value: data.published });
        continue;
      }
      const out = matter.stringify(parsed.content || '', data, { language: 'yaml' });
      fs.writeFileSync(f, out, 'utf8');      changed.push(f);
    }
  }
  return { changed, ambiguous };
}

if (process.argv[1] === __filename) {
  const result = migrate();
  if (result.changed.length) {
    console.log('Migrated published -> boolean for files:');
    for (const f of result.changed) console.log(' -', path.relative(process.cwd(), f));
  }
  if (result.ambiguous.length) {
    console.error('\nFound ambiguous `published` values that require manual review:');
    for (const a of result.ambiguous) {
      console.error(' -', path.relative(process.cwd(), a.file), '=>', JSON.stringify(a.value));
    }
    // Fail so CI / developer notices and inspects the reported files
    process.exit(2);
  }

  if (!result.changed.length) {
    console.log('No published migrations necessary.');
  }
  process.exit(0);
}
