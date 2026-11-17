import { NextResponse } from 'next/server';
import { list } from '@vercel/blob';

// Lists everything uploaded to the "About/" folder in Vercel Blob.
// Files are shown in filename order, so name them 01.jpg, 02.jpg, etc.
export async function GET() {
  try {
    const { blobs } = await list({ prefix: 'About/' });

    const items = blobs
      .filter((blob) => blob.pathname !== 'About/' && !blob.pathname.endsWith('/'))
      .sort((a, b) => a.pathname.localeCompare(b.pathname, undefined, { numeric: true }))
      .map((blob) => {
        const lower = blob.pathname.toLowerCase();
        const type = lower.endsWith('.mp4') || lower.endsWith('.mov') ? ('video' as const) : ('image' as const);
        return { url: blob.url, type };
      });

    return NextResponse.json(items);
  } catch (error) {
    console.error('Failed to list About images', error);
    return NextResponse.json([], { status: 500 });
  }
}
