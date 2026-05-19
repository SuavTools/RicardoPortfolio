import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Lock down your exact professional career verticals
const CATEGORY_MAP: Record<string, { title: string; category: 'Finished Art & Campaigns' | 'Motion Design & End-Boards' | 'Creative Direction & Editing'; desc: string; longDesc: string; tags: string[] }> = {
  'sbs-campaign-art': {
    title: 'SBS Selected Campaign Art',
    category: 'Finished Art & Campaigns',
    desc: 'Key asset modifications, show art layouts, and commercial network display campaigns.',
    longDesc: 'Executed digital campaign assets and show art treatments for major broadcasting titles. Balanced high-density text layout metrics with striking photography style frames to align across multi-platform out-of-home (OOH) digital displays.',
    tags: ['Key Art Expansion', 'Campaign Layouts', 'Finished Art', 'Asset Control']
  },
  'sbs-motion-endboards': {
    title: 'SBS Network Broadcast Motion Packages',
    category: 'Motion Design & End-Boards',
    desc: 'Promotional packaging elements, on-air network assets, and end-board variations.',
    longDesc: 'Developed dynamic animated end-boards and on-air motion packages across national television flights. Handled swift workflow iterations to enforce strict technical design guidelines while keeping text visibility perfectly sharp on screen.',
    tags: ['Motion Design', 'On-Air End-Boards', 'Broadcast Graphics', 'Kinetic Type']
  },
  'music-video-direction': {
    title: 'Self-Directed Editorial Music Clip',
    category: 'Creative Direction & Editing',
    desc: 'Comprehensive visual direction, video editing pipeline execution, and post-production flow.',
    longDesc: 'An independent visual project mapping end-to-end creative execution. Structured the initial look development storyboards, designed text treatments, and cut the full cinematic rhythm matching sound waveforms.',
    tags: ['Creative Direction', 'Film Editing', 'Color Grading', 'Visual Continuity']
  }
};

export async function GET() {
  try {
    const mediaRoot = path.join(process.cwd(), 'public', 'media');
    
    // Explicit array lookup loop parameters to bypass hidden system folder drops completely
    const hardcodedFolderIds = ['sbs-campaign-art', 'sbs-motion-endboards', 'music-video-direction'];

    const compiledProjects = hardcodedFolderIds.map(folderId => {
      const folderPath = path.join(mediaRoot, folderId);
      
      // If you haven't created the folder yet locally, initialize structural fallbacks gracefully
      if (!fs.existsSync(folderPath)) {
        const meta = CATEGORY_MAP[folderId];
        return {
          id: folderId,
          ...meta,
          mediaUrl: '',
          mediaType: 'image' as 'image' | 'video',
          gallery: []
        };
      }

      // Read files within the target folder
      const allFiles = fs.readdirSync(folderPath).filter(f => !f.startsWith('.'));

      // Scan for your exact primary preview asset token banner names
      const heroFile = allFiles.find(f => f.startsWith('hero.'));
      const mediaUrl = heroFile ? `/media/${folderId}/${heroFile}` : '';
      const mediaType = heroFile?.toLowerCase().endsWith('.mp4') ? ('video' as const) : ('image' as const);

      // Parse interior file lists for the drawer tracks
      const galleryFiles = allFiles.filter(f => !f.startsWith('hero.'));
      const gallery = galleryFiles.map(file => {
        const lower = file.toLowerCase();
        const type = (lower.endsWith('.mp4') || lower.endsWith('.mov')) ? ('video' as const) : ('image' as const);
        return {
          url: `/media/${folderId}/${file}`,
          type
        };
      });

      const meta = CATEGORY_MAP[folderId];

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
    return NextResponse.json({ error: 'FAILED_TO_EXECUTE_DIRECTORY_SCAN' }, { status: 500 });
  }
}
