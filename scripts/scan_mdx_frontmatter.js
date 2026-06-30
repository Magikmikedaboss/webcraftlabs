// Repo-wide MDX frontmatter scanner (ESM)
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function findMdxFiles(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const e of entries) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) {
      files.push(...findMdxFiles(p));
    } else if (e.isFile() && p.endsWith('.mdx')) {
      files.push(p);
    }
  }
  return files;
}

function parseFrontmatter(text) {
  const parsed = matter(text, { language: 'yaml' });
  if (!parsed || !parsed.data || !Object.keys(parsed.data).length) return null;
  return { raw: parsed.matter || null, obj: parsed.data };
}

// Known collection values aligned with frontmatter schema
const validCollections = new Set(['webcraft-archive', 'news', 'blog']);

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
    const slugMatch = item.match(/slug:\s*"([^"]+)"/);
    const idMatch = item.match(/archiveId:\s*"([^"]+)"/);
    if (slugMatch) slugs[slugMatch[1]] = idMatch ? idMatch[1] : null;
  }
  return slugs;
}

function isValidDateString(s) {
  if (!s) return false;
  // Require exact YYYY-MM-DD format and verify real calendar date
  if (!/^\d{4}-\d{2}-\d{2}$/.test(s)) return false;
  const [y, m, d] = s.split('-').map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d));
  return (
    dt.getUTCFullYear() === y &&
    dt.getUTCMonth() === m - 1 &&
    dt.getUTCDate() === d
  );
}

function scan() {
  const root = path.join(__dirname, '..', 'src', 'content');
  if (!fs.existsSync(root)) {
    console.error('No src/content directory found.');
    process.exit(2);
  }
  const files = findMdxFiles(root);
  const report = [];
  for (const f of files) {
    const txt = fs.readFileSync(f, 'utf8');
    const parsed = parseFrontmatter(txt);
    const issues = [];
    if (!parsed) {
      issues.push('missing frontmatter');
    } else {
      const fm = parsed.obj;
      if (!fm.collection) issues.push('missing collection');
      else if (!validCollections.has(String(fm.collection))) {
        issues.push(`invalid collection: ${fm.collection}`);
      }      if (fm.collection === 'webcraft-archive') {
        // Mirror the fixer behavior: only require archiveId when the
        // ARCHIVE_ORDER mapping provides a non-null archiveId for this slug.
        const archiveMap = readArchiveOrder();
        const slug = fm.slug || path.basename(f).replace(/\.mdx$/, '');
        const mappedId = Object.prototype.hasOwnProperty.call(archiveMap, slug)
          ? archiveMap[slug]
          : undefined;
        if (mappedId) {
          if (!fm.archiveId) issues.push('missing archiveId');
        }
        if (!fm.mystery) issues.push('missing mystery');
      }
      if (fm.date) {
        let dateStr = fm.date;
        if (dateStr instanceof Date) dateStr = dateStr.toISOString().slice(0, 10);
        if (!isValidDateString(String(dateStr))) issues.push(`invalid date: ${fm.date}`);
      }
      // Warn on legacy/non-boolean published values — any non-boolean is a legacy
      // form and should be surfaced for remediation.
      if (fm.published !== undefined && typeof fm.published !== 'boolean') {
        issues.push(`legacy published value: ${fm.published}`);
      }
    }
    if (issues.length) report.push({ file: f, issues });
  }

  console.log('MDX Frontmatter Scan');
  console.log('====================');
  console.log('Scanned files:', files.length);
  console.log('Files with issues:', report.length);
  console.log('');
  for (const r of report) {
    console.log('-', path.relative(process.cwd(), r.file));
    for (const i of r.issues) console.log('   •', i);
  }
  if (report.length === 0) console.log('\nNo frontmatter problems detected.');
  // Signal failure to the caller when issues were found so CI can fail.
  process.exitCode = report.length > 0 ? 1 : 0;
}

if (process.argv[1] === __filename) scan();
