import { NextResponse } from 'next/server';
import { list } from '@vercel/blob';

// Lock down your exact professional career verticals
const CATEGORY_MAP: Record<string, { title: string; category: 'Finished Art & Campaigns' | 'Motion Design & End-Boards' | 'Creative Direction & Editing'; desc: string; longDesc: string; tags: string[] }> = {
  'sbs-campaign-art': {
    title: 'Selected Campaign Art',
    category: 'Finished Art & Campaigns',
    desc: 'Show art and campaign layouts for TV.',
    longDesc: 'Show art and campaign assets for major broadcast titles, adapted across digital, social and outdoor placements. Lots of type, strong photography, and making it all hold together at every size.',
    tags: ['Key Art Expansion', 'Campaign Layouts', 'Finished Art', 'Asset Control']
  },
  'sbs-motion-endboards': {
    title: 'Motion Design',
    category: 'Motion Design & End-Boards',
    desc: 'On-air promos and end boards.',
    longDesc: 'Animated end boards and on-air graphics for national TV campaigns. Fast turnarounds, tight brand guidelines, and type that stays readable on screen.',
    tags: ['Motion Design', 'On-Air End-Boards', 'Broadcast Graphics', 'Kinetic Type']
  },
  'music-video-direction': {
    title: 'Creative Direction Music Clip',
    category: 'Creative Direction & Editing',
    desc: 'Direction and edit for a music video.',
    longDesc: 'An independent music video I directed and edited. I did the storyboards and look, designed the titles, and cut it to the track.',
    tags: ['Creative Direction', 'Film Editing', 'Color Grading', 'Visual Continuity']
  }
};

export async function GET() {
  try {
    // 1. Instantly read all cloud media elements over the edge network
    const { blobs } = await list();
    
    // EXACT CASE-SENSITIVE DASHBOARD MATCHING
    const folderMapping = [
      { id: 'sbs-campaign-art', folderName: 'Selected Campaign Art' },
      { id: 'sbs-motion-endboards', folderName: 'Motion Design' },
      { id: 'music-video-direction', folderName: 'Creative Direction Music Clip' }
    ];

    const compiledProjects = folderMapping.map(({ id, folderName }) => {
      const meta = CATEGORY_MAP[id];

      // 2. Filter files inside folder namespace prefix, stripping out the empty root folder placeholder
      const projectFiles = blobs.filter(blob => 
        blob.pathname.startsWith(`${folderName}/`) && 
        blob.pathname !== `${folderName}/`
      );

      // 3. Scan the folder contents for your designated main teaser tile asset (e.g. hero.mp4 or hero.jpg)
      const heroBlob = projectFiles.find(blob => {
        const fileName = blob.pathname.split('/').pop() || '';
        return fileName.startsWith('hero.');
      });

      const mediaUrl = heroBlob ? heroBlob.url : '';
      const mediaType = heroBlob?.pathname.toLowerCase().endsWith('.mp4') ? ('video' as const) : ('image' as const);

      // 4. Capture all other assets inside the folder to dynamically fuel the internal drawer track
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
        id,
        ...meta,
        mediaUrl,
        mediaType,
        gallery
      };
    });

    return NextResponse.json(compiledProjects);
  } catch (error) {
    console.error('VERCEL_PATH_RESOLUTION_EXCEPTION', error);
    return NextResponse.json({ error: 'FAILED_TO_RESOLVE_LIVE_STORAGE_RELIABLY' }, { status: 500 });
  }
}



