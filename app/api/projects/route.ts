import { NextResponse } from 'next/server';
import { list } from '@vercel/blob'; // ⚡ Dynamically loops through your live cloud bucket assets

// Lock down your exact professional career verticals
const CATEGORY_MAP: Record<string, { title: string; category: 'Finished Art & Campaigns' | 'Motion Design & End-Boards' | 'Creative Direction & Editing'; desc: string; longDesc: string; tags: string[] }> = {
  'sbs-campaign-art': {
    title: 'Selected Campaign Art',
    category: 'Finished Art & Campaigns',
    desc: 'Key asset modifications, show art layouts, and commercial network display campaigns.',
    longDesc: 'Executed digital campaign assets and show art treatments for major broadcasting titles. Balanced high-density text layout metrics with striking photography style frames to align across multi-platform out-of-home (OOH) digital displays.',
    tags: ['Key Art Expansion', 'Campaign Layouts', 'Finished Art', 'Asset Control']
  },
  'sbs-motion-endboards': {
    title: 'Motion Design',
    category: 'Motion Design & End-Boards',
    desc: 'Promotional packaging elements, on-air network assets, and end-board variations.',
    longDesc: 'Developed dynamic animated end-boards and on-air motion graphics across national television flights. Handled swift workflow iterations to enforce strict technical design guidelines while keeping text visibility perfectly sharp on screen.',
    tags: ['Motion Design', 'On-Air End-Boards', 'Broadcast Graphics', 'Kinetic Type']
  },
  'music-video-direction': {
    title: 'Creative Direction Music Clip',
    category: 'Creative Direction & Editing',
    desc: 'Comprehensive visual direction, video editing pipeline execution, and post-production flow.',
    longDesc: 'An independent visual project mapping end-to-end creative execution. Structured the initial look development storyboards, designed text treatments, and cut the full cinematic rhythm matching sound waveforms.',
    tags: ['Creative Direction', 'Film Editing', 'Color Grading', 'Visual Continuity']
  }
};

export async function GET() {
  try {
    // 1. Fetch all blobs currently stored in your Vercel Blob store over the edge network
    const { blobs } = await list();
    
    // Explicit folder mapping parameters matching your virtual directories in the dashboard
    const hardcodedFolderIds = ['sbs-campaign-art', 'sbs-motion-endboards', 'music-video-direction'];

    const compiledProjects = hardcodedFolderIds.map(folderId => {
      const meta = CATEGORY_MAP[folderId];

      // 2. Filter file URLs that are nested inside this folder namespace prefix
      const projectFiles = blobs.filter(blob => blob.pathname.startsWith(`${folderId}/`));

      // 3. Scan folder contents for your primary video/image preview tile named "hero"
      const heroBlob = projectFiles.find(blob => {
        const fileName = blob.pathname.split('/').pop() || '';
        return fileName.startsWith('hero.');
      });

      const mediaUrl = heroBlob ? heroBlob.url : '';
      const mediaType = heroBlob?.pathname.toLowerCase().endsWith('.mp4') ? ('video' as const) : ('image' as const);

      // 4. Group all remaining assets straight into the inner scrolling drawer gallery track
      const gallery = projectFiles
        .filter(blob => {
          const fileName = blob.pathname.split('/').pop() || '';
          return !fileName.startsWith('hero.');
        })
        .map(blob => {
          const lower = blob.pathname.toLowerCase();
          const type = (lower.endsWith('.mp4') || lower.endsWith('.mov')) ? ('video' as const) : ('image' as const);
          return {
            url: blob.url,
            type
          };
        });

      return {
        id: folderId,
        ...meta,
        mediaUrl,
        mediaType,
        gallery
      };
    });

    return NextResponse.json(compiledProjects);
  } catch (error) {
    console.error('CLOUD_SCAN_INTERNAL_EXCEPTION_CAUGHT', error);
    return NextResponse.json({ error: 'FAILED_TO_EXECUTE_CLOUD_DIRECTORY_SCAN' }, { status: 500 });
  }
}

