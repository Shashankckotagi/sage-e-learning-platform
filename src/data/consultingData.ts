export interface ConsultingTrack {
  id: string;
  category: 'Recent Graduate' | 'Industry Engineer' | 'Team/Organization Training';
  title: string;
  subtitle: string;
  description: string;
  targetAudience: string;
  keyBenefits: string[];
  recommendedCourses: string[];
}

export interface ConsultingStep {
  stepNumber: number;
  title: string;
  description: string;
  iconName: 'MessageSquare' | 'PhoneCall' | 'FileText' | 'Headphones';
}

export const CONSULTING_TRACKS: ConsultingTrack[] = [
  {
    id: 'graduate-track',
    category: 'Recent Graduate',
    title: 'Foundational Bridge & Career Accelerator',
    subtitle: 'Transitioning from University Theory to Hands-on RF Engineering',
    description: 'Designed specifically for Bachelor and Master graduates looking to fill practical skill gaps in RF, Microwave, and Wireless circuit modeling, Smith chart analysis, and test measurement techniques.',
    targetAudience: 'Electrical & Electronics Graduates, M.Tech Scholars, Early-career Researchers',
    keyBenefits: [
      'Personalized course & laboratory syllabus mapping',
      'One-on-one resume & skill-gap review by Dr. Shastry & SAGE experts',
      'Practical guidance on RF design tools (ADS, HFSS, CST)'
    ],
    recommendedCourses: [
      'Fundamentals of RF Circuit Design',
      'Microwave Transmission Line Theory & Smith Charts',
      'Introduction to Antenna Systems & Propagation'
    ]
  },
  {
    id: 'engineer-track',
    category: 'Industry Engineer',
    title: 'Advanced System & Design Optimization',
    subtitle: 'Deep Technical Guidance for Active RF Professionals',
    description: 'Targeted technical consulting for practicing engineers working on 5G/6G RF transceivers, power amplifier linearization, phased array antennas, and high-frequency PCB layout troubleshooting.',
    targetAudience: 'Senior RF Engineers, Microwave Hardware Designers, Systems Architects',
    keyBenefits: [
      'Direct technical problem-solving on active engineering challenges',
      'Advanced specialization courses and custom workshop paths',
      'Industry standard compliance & measurement optimization guidance'
    ],
    recommendedCourses: [
      'High-Power RF Amplifier Design & Linearization',
      '5G/6G Phased Array Antenna Architectures',
      'Signal Integrity & High-Speed Circuit Design'
    ]
  },
  {
    id: 'corporate-track',
    category: 'Team/Organization Training',
    title: 'Enterprise Upskilling & Custom Workshop Programs',
    subtitle: 'Tailored Technical Training for Corporate Engineering Teams',
    description: 'Comprehensive workforce development programs, customized on-site or virtual workshops, and lab setup consulting tailored to your enterprise engineering goals.',
    targetAudience: 'R&D Teams, Defense Contractors, Telecom Operators, Aerospace Enterprises',
    keyBenefits: [
      'Customized corporate training roadmaps matching company tech stack',
      'On-site workshops or interactive virtual lab sessions',
      'Dedicated post-training mentorship and technical support'
    ],
    recommendedCourses: [
      'Custom Corporate RF & Wireless Bootcamp',
      'Radar Systems & EW Modeling Workshop',
      'Enterprise EMI/EMC Mitigation & Testing'
    ]
  }
];

export const CONSULTING_STEPS: ConsultingStep[] = [
  {
    stepNumber: 1,
    title: 'Reach out with your requirement',
    description: 'Contact our team via phone or email outlining your technical background, team goals, or specific RF engineering challenges.',
    iconName: 'MessageSquare'
  },
  {
    stepNumber: 2,
    title: 'Initial consultation call/discussion',
    description: 'Participate in a preliminary discussion with a SAGE advisor to assess your goals, technical scope, and schedule requirements.',
    iconName: 'PhoneCall'
  },
  {
    stepNumber: 3,
    title: 'Customized guidance, course, or training plan',
    description: 'Receive a tailored recommendation plan encompassing specific courses, custom workshops, or direct advisory sessions.',
    iconName: 'FileText'
  },
  {
    stepNumber: 4,
    title: 'Ongoing support',
    description: 'Benefit from continuous technical check-ins, lab credential access, and follow-up guidance as you apply learnings.',
    iconName: 'Headphones'
  }
];
