import { NextResponse } from 'next/server';
import { join } from 'path';
import { promises as fs } from 'fs';

export const contentType = 'image/png';

export default async function handler() {
  const filePath = join(process.cwd(), 'public', 'apple-touch-icon.png');
  const file = await fs.readFile(filePath);
  return new NextResponse(file, {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}
