import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const p = path.join(
  __dirname,
  '..',
  'src',
  'content',
  'blog',
  'treatise-1-on-the-preservation-of-knowledge.mdx',
);
const txt = fs.readFileSync(p, 'utf8');const parsed = matter(txt, { language: 'yaml' });
console.log('hasFrontmatter:', !!parsed.data && Object.keys(parsed.data).length > 0);
if (parsed.data && Object.keys(parsed.data).length) {
  console.log('--- frontmatter (raw) ---');
  console.log(parsed.matter || '(raw matter not available)');
  console.log('--- parsed frontmatter keys ---');
  console.log(Object.keys(parsed.data));
  console.log(parsed.data);
}
