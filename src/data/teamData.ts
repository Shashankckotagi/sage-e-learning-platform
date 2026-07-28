export interface TeamMember {
  id: string;
  name: string;
  role: string;
  photo: string;
  group: 'executive' | 'advisory' | 'youth' | 'associates';
  bio?: string;
}

export const EXECUTIVE_BOARD: TeamMember[] = [
  {
    id: 'exec-1',
    name: 'Dr. Prasad Shastry',
    role: 'Founder & Managing Director',
    group: 'executive',
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    bio: 'Professor of RF and Microwave Engineering with over 35 years of academic and industrial research experience.'
  },
  {
    id: 'exec-2',
    name: 'Dr. M.H. Kori',
    role: 'Executive Board Member',
    group: 'executive',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    bio: 'Former Director at IETE and veteran wireless communication systems consultant.'
  },
  {
    id: 'exec-3',
    name: 'Ms. Scarlet Daoud',
    role: 'Executive Vice President',
    group: 'executive',
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    bio: 'Global operations and corporate educational outreach specialist.'
  },
  {
    id: 'exec-4',
    name: 'Ms. Aparna Sankarasubram',
    role: 'Executive Board Director',
    group: 'executive',
    photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
    bio: 'Strategic partnerships and technology dissemination leader.'
  },
  {
    id: 'exec-5',
    name: 'Dr. K.D. Nayak',
    role: 'Executive Technical Advisor',
    group: 'executive',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    bio: 'Former Chief Controller R&D (DRDO) specializing in defense electronics and radar.'
  }
];

export const ADVISORY_BOARD: TeamMember[] = [
  {
    id: 'adv-1',
    name: 'Dr. Surendra Pal',
    role: 'Senior Advisory Board Member',
    group: 'advisory',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'adv-2',
    name: 'Dr. Paul Draxler',
    role: 'RF System Design Advisor',
    group: 'advisory',
    photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'adv-3',
    name: 'Ms. Deb Dendy',
    role: 'Educational Strategy Advisor',
    group: 'advisory',
    photo: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'adv-4',
    name: 'Prof. V. Mahadevan',
    role: 'Electromagnetics Curriculum Chair',
    group: 'advisory',
    photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'adv-5',
    name: 'Dr. Raghavan',
    role: 'Applied Microwave Technology Advisor',
    group: 'advisory',
    photo: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=400&q=80'
  }
];

export const YOUTH_WING: TeamMember[] = [
  {
    id: 'youth-1',
    name: 'Safiya Khalid',
    role: 'Youth Wing Lead Coordinator',
    group: 'youth',
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'youth-2',
    name: 'Neha Kantikar',
    role: 'RF Community Engagement',
    group: 'youth',
    photo: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'youth-3',
    name: 'Preeti K',
    role: 'Student & Academic Ambassador',
    group: 'youth',
    photo: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'youth-4',
    name: 'Visvajit',
    role: 'Wireless Systems Youth Representative',
    group: 'youth',
    photo: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'youth-5',
    name: 'MSV',
    role: 'Technical Operations Specialist',
    group: 'youth',
    photo: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'youth-6',
    name: 'Shreya',
    role: 'Educational Outreach Assistant',
    group: 'youth',
    photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80'
  }
];

export const ASSOCIATES: TeamMember[] = [
  {
    id: 'assoc-1',
    name: 'Mr. Bala Sundaram',
    role: 'Associate Consultant',
    group: 'associates',
    photo: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'assoc-2',
    name: 'Mr. Krishna Katragadda',
    role: 'Senior Associate',
    group: 'associates',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'assoc-3',
    name: 'Mr. Shrinivasa Ponnala',
    role: 'Technical Associate',
    group: 'associates',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'assoc-4',
    name: 'Mr. Sasidhar Vajha',
    role: 'Electromagnetics Specialist',
    group: 'associates',
    photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'assoc-5',
    name: 'Dr. I. Rosaline',
    role: 'Academic Associate',
    group: 'associates',
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'assoc-6',
    name: 'Dr. G. Boopalan',
    role: 'Research Associate',
    group: 'associates',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'assoc-7',
    name: 'Mr. Neelakantan',
    role: 'Industry Consultant',
    group: 'associates',
    photo: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'assoc-8',
    name: 'Prof. C. Murali',
    role: 'Education Associate',
    group: 'associates',
    photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'assoc-9',
    name: 'Dr. Parimala Prabhakar',
    role: 'Senior Academic Advisor',
    group: 'associates',
    photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'assoc-10',
    name: 'Dr. Sanjay Moghe',
    role: 'RFIC Technology Associate',
    group: 'associates',
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'assoc-11',
    name: 'Mr. James O\'Donnell',
    role: 'International Relations Associate',
    group: 'associates',
    photo: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'assoc-12',
    name: 'Mr. Nicholas Manos',
    role: 'Engineering Systems Associate',
    group: 'associates',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'assoc-13',
    name: 'Prof. S. L. Nisha',
    role: 'Academic Associate',
    group: 'associates',
    photo: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'assoc-14',
    name: 'Dr. YoungSoo Kim',
    role: 'Global Technology Associate',
    group: 'associates',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'assoc-15',
    name: 'Dr. P. Shanthi',
    role: 'Senior Research Associate',
    group: 'associates',
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80'
  }
];

export const ALL_TEAM_MEMBERS: TeamMember[] = [
  ...EXECUTIVE_BOARD,
  ...ADVISORY_BOARD,
  ...YOUTH_WING,
  ...ASSOCIATES
];
