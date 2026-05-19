export interface Project {
  id: string;
  title: string;
  category: 'Flagship Shows' | 'Motion & BAU' | 'Builds';
  desc: string;
  longDesc: string;
  tags: string[];
  mediaUrl: string;
  mediaType: 'video' | 'image';
}

export const PROJECTS: Project[] = [
  {
    id: 'sbs-art-show',
    title: 'SBS Original Art Show',
    category: 'Flagship Shows',
    desc: 'Full creative direction, broadcast brand identity, and packaging.',
    longDesc: 'Led the comprehensive visual identity for SBS flagship broadcasting frames. This case study blueprints the evolutionary design arc spanning character sketches to final broadcast packaging layouts across national flights.',
    tags: ['Creative Direction', 'Motion Graphics', 'Broadcast'],
    mediaUrl: 'https://mixkit.co',
    mediaType: 'video'
  },
  {
    id: 'sbs-ideation',
    title: 'Show Concept Development',
    category: 'Flagship Shows',
    desc: 'Pre-production pitch decks and conceptual style frames.',
    longDesc: 'High-level pre-production ideation asset files. While final pixel artwork was not greenlit for air execution, this project tracks structural type design and graphic direction used to lock down executive approvals.',
    tags: ['Ideation', 'Style Frames', 'Concept Art'],
    mediaUrl: 'https://unsplash.com',
    mediaType: 'image'
  },
  {
    id: 'elevated-bau',
    title: 'Elevated Motion BAU Portfolio',
    category: 'Motion & BAU',
    desc: 'High-density kinetic typography assets and social promotional layouts.',
    longDesc: 'A fast-turnaround catalog indexing business-as-usual asset flights. Re-architected workflow files to enforce an elevated aesthetic rule system while delivering motion pieces under strict weekly layout deadlines.',
    tags: ['Kinetic Type', 'Social Layouts', 'BAU Automation'],
    mediaUrl: 'https://mixkit.co',
    mediaType: 'video'
  }
];
