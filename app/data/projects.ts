export interface GalleryAsset {
  url: string;
  type: 'video' | 'image';
}

export interface Project {
  id: string;
  title: string;
  category: 'Finished Art & Campaigns' | 'Motion Design & End-Boards' | 'Creative Direction & Editing';
  desc: string;
  longDesc: string;
  tags: string[];
  mediaUrl: string;             
  mediaType: 'video' | 'image';
  gallery: GalleryAsset[]; // Overgraded to support dynamic mixed media types
}

export const PROJECTS: Project[] = [
  {
    id: 'sbs-campaign-art',
    title: 'Finished Art & Campaigns',
    category: 'Finished Art & Campaigns',
    desc: 'Key asset modifications, show art layouts, and commercial network display campaigns.',
    longDesc: 'Executed digital campaign assets and show art treatments for major broadcasting titles. Balanced high-density text layout metrics with striking photography style frames to align across multi-platform out-of-home (OOH) digital displays.',
    tags: ['Key Art Expansion', 'Campaign Layouts', 'Finished Art', 'Asset Control'],
    mediaUrl: '/media/sbs-campaign.jpg',
    mediaType: 'image',
    gallery: [
      { url: '/media/gallery-01.jpg', type: 'image' },
      { url: '/media/campaign-process-loop.mp4', type: 'video' }, // Custom video loop sitting right in your layout row!
      { url: '/media/gallery-03.jpg', type: 'image' }
    ]
  },
  {
    id: 'sbs-motion-endboards',
    title: 'Motion Design',
    category: 'Motion Design & End-Boards',
    desc: 'Promotional packaging elements, on-air network assets, and end-board variations.',
    longDesc: 'Developed dynamic animated end-boards and on-air motion packages across national television flights. Handled swift workflow iterations to enforce strict technical design guidelines while keeping text visibility perfectly sharp on screen.',
    tags: ['Motion Design', 'On-Air End-Boards', 'Broadcast Graphics', 'Kinetic Type'],
    mediaUrl: '/media/sbs-endboard.mp4',
    mediaType: 'video',
    gallery: [
      { url: '/media/endboard-process-01.jpg', type: 'image' },
      { url: '/media/endboard-reel-02.mp4', type: 'video' }
    ]
  },
  {
    id: 'music-video-direction',
    title: 'Creative Direction Music Clip',
    category: 'Creative Direction & Editing',
    desc: 'Comprehensive visual direction, video editing pipeline execution, and post-production flow.',
    longDesc: 'An independent visual project mapping end-to-end creative execution. Structured the initial look development storyboards, designed text treatments, and cut the full cinematic rhythm matching sound waveforms.',
    tags: ['Creative Direction', 'Film Editing', 'Color Grading', 'Visual Continuity'],
    mediaUrl: '/media/music-video.mp4',
    mediaType: 'video',
    gallery: [
      { url: '/media/mv-broll.mp4', type: 'video' },
      { url: '/media/mv-frame-02.jpg', type: 'image' }
    ]
  }
];



