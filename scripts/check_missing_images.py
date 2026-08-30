"""Audit /images/ references in content MDX against public/images.

Read-only: reads MDX files and checks whether the referenced image files
exist. Writes nothing and deletes nothing. Run from anywhere:

    python scripts/check_missing_images.py
"""

from pathlib import Path
from urllib.parse import unquote
import re

root = Path(__file__).resolve().parent.parent
content_root = root / 'src' / 'content'
# Every content collection that renders MDX, not just blog — news and
# archive reference images too, and a missing one breaks those pages
# exactly the same way.
content_dirs = ['blog', 'news', 'archive']
public_images = root / 'public' / 'images'
refs = {}
missing = {}
all_content_files = []
for sub in content_dirs:
    d = content_root / sub
    if not d.is_dir():
        continue
    # The loaders in src/lib/mdx/* accept .md as well as .mdx, so a .md post
    # would publish and reference images just like any other.
    for p in sorted(q for ext in ('*.mdx', '*.md') for q in d.glob(ext)):
        # Label by collection so the same filename in two dirs stays distinct.
        name = f'{sub}/{p.name}'
        all_content_files.append(name)
        txt = p.read_text(encoding='utf-8')
        imgs = re.findall(r"/images/([A-Za-z0-9_./%\-\(\) ]+\.[A-Za-z0-9]+)", txt)
        if imgs:
            refs[name] = imgs
            for img in imgs:
                # Resolve percent-escapes before hitting the filesystem: at
                # least one image in public/images has a space in its name, so
                # a correctly-encoded "%20" reference would otherwise be
                # reported as missing. Report the reference as authored.
                img_path = public_images / unquote(img)
                if not img_path.exists():
                    missing.setdefault(name, []).append(img)

print('Scanned collections:', ', '.join(content_dirs))
print('Found image refs in', len(refs), 'files')
if missing:
    print('\nFiles referencing missing images:')
    for fname, imgs in missing.items():
        print(f'- {fname}:')
        for i in imgs:
            print('   ', i)
else:
    print('\nNo missing images referenced from content MDX files in public/images')

all_imgs = set(i for imgs in refs.values() for i in imgs)
print('\nTotal unique images referenced:', len(all_imgs))
print('Total missing referenced images:', sum(len(v) for v in missing.values()))

# Print which content files have images and which do not
with_imgs = sorted(refs.keys())
without_imgs = [f for f in sorted(all_content_files) if f not in with_imgs]

print('\nContent files that reference images:')
for f in with_imgs:
    print('-', f)

print('\nContent files with NO image references:')
for f in without_imgs:
    print('-', f)
