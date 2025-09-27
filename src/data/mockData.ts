import type { Skill, Endorsement, UserProfile, Job } from '../types'

export const mockSkills: Skill[] = [
  {
    id: '1',
    name: 'React Development',
    description: 'Expert in building modern React applications with hooks, context, and state management.',
    proofUrl: 'https://github.com/username/react-project',
    weight: 85,
    verified: true,
    createdAt: '2024-01-15T10:30:00Z'
  },
  {
    id: '2',
    name: 'TypeScript',
    description: 'Proficient in TypeScript for type-safe JavaScript development.',
    proofUrl: 'https://github.com/username/typescript-project',
    weight: 78,
    verified: true,
    createdAt: '2024-01-20T14:15:00Z'
  },
  {
    id: '3',
    name: 'UI/UX Design',
    description: 'Experienced in creating user-centered designs and prototypes.',
    weight: 65,
    verified: false,
    createdAt: '2024-02-01T09:45:00Z'
  },
  {
    id: '4',
    name: 'Node.js Backend',
    description: 'Building scalable backend services with Node.js and Express.',
    proofUrl: 'https://github.com/username/api-project',
    weight: 72,
    verified: true,
    createdAt: '2024-02-10T16:20:00Z'
  }
]

export const mockEndorsements: Endorsement[] = [
  {
    id: '1',
    fromAddress: '0xabcdef1234567890abcdef1234567890abcdef12',
    toAddress: '0x1234567890123456789012345678901234567890',
    projectId: 'ecommerce-website',
    message: 'Excellent work on the e-commerce platform. Great attention to detail and delivered on time.',
    rating: 5,
    createdAt: '2024-01-25T12:00:00Z'
  },
  {
    id: '2',
    fromAddress: '0x9876543210987654321098765432109876543210',
    toAddress: '0x1234567890123456789012345678901234567890',
    projectId: 'mobile-app',
    message: 'Outstanding React Native development skills. The app performance is excellent.',
    rating: 5,
    createdAt: '2024-02-05T15:30:00Z'
  },
  {
    id: '3',
    fromAddress: '0xfedcba0987654321fedcba0987654321fedcba09',
    toAddress: '0x1234567890123456789012345678901234567890',
    projectId: 'dashboard-redesign',
    message: 'Great collaboration and problem-solving skills. Delivered a beautiful dashboard.',
    rating: 4,
    createdAt: '2024-02-15T11:45:00Z'
  }
]

export const mockJobs: Job[] = [
  {
    id: '1',
    title: 'Senior React Developer',
    company: 'TechCorp Solutions',
    location: 'San Francisco, CA',
    type: 'Full-time',
    salary: { min: 120000, max: 160000, currency: 'USD', period: 'year' },
    description: 'We are looking for an experienced React developer to join our growing team. You will be responsible for building scalable web applications, mentoring junior developers, and working closely with our design team to create exceptional user experiences.',
    requirements: [
      '5+ years of React experience',
      'Strong TypeScript skills',
      'Experience with state management (Redux/Context)',
      'Knowledge of testing frameworks (Jest, React Testing Library)',
      'Familiarity with modern build tools (Webpack, Vite)',
      'Experience with RESTful APIs and GraphQL'
    ],
    skillsRequired: ['React Development', 'TypeScript', 'JavaScript', 'Node.js'],
    postedBy: '0xabcdef1234567890abcdef1234567890abcdef12',
    postedAt: '2024-02-20T10:00:00Z',
    applicants: 23,
    status: 'open',
    tags: ['Frontend', 'JavaScript', 'React', 'Remote-friendly'],
    experienceLevel: 'Senior'
  },
  {
    id: '2',
    title: 'Full Stack Engineer',
    company: 'StartupXYZ',
    location: 'Remote',
    type: 'Remote',
    salary: { min: 90000, max: 130000, currency: 'USD', period: 'year' },
    description: 'Join our fast-paced startup environment as a full stack engineer. Work on cutting-edge projects with modern technologies and help shape the future of our platform. You\'ll be working with a small, tight-knit team where your contributions will have immediate impact.',
    requirements: [
      '3+ years full stack experience',
      'React and Node.js proficiency',
      'Database design experience (PostgreSQL, MongoDB)',
      'DevOps knowledge preferred (Docker, AWS)',
      'Experience with API design and development',
      'Strong problem-solving skills'
    ],
    skillsRequired: ['React Development', 'Node.js Backend', 'TypeScript', 'UI/UX Design'],
    postedBy: '0x9876543210987654321098765432109876543210',
    postedAt: '2024-02-18T14:30:00Z',
    applicants: 15,
    status: 'open',
    tags: ['Full-stack', 'Startup', 'Remote', 'Growth'],
    experienceLevel: 'Mid'
  },
  {
    id: '3',
    title: 'UI/UX Designer',
    company: 'Design Studio Pro',
    location: 'New York, NY',
    type: 'Contract',
    salary: { min: 80, max: 120, currency: 'USD', period: 'hour' },
    description: 'Create beautiful and intuitive user interfaces for web and mobile applications. Collaborate with development teams to bring designs to life and ensure consistent user experiences across all platforms.',
    requirements: [
      'Portfolio of UI/UX work',
      'Figma/Sketch proficiency',
      'User research experience',
      'Responsive design knowledge',
      'Prototyping skills',
      'Understanding of design systems'
    ],
    skillsRequired: ['UI/UX Design', 'Figma', 'User Research', 'Prototyping'],
    postedBy: '0xfedcba0987654321fedcba0987654321fedcba09',
    postedAt: '2024-02-15T09:15:00Z',
    applicants: 31,
    status: 'open',
    tags: ['Design', 'UX', 'Contract', 'Creative'],
    experienceLevel: 'Mid'
  },
  {
    id: '4',
    title: 'Blockchain Developer',
    company: 'CryptoTech Labs',
    location: 'Austin, TX',
    type: 'Full-time',
    salary: { min: 140000, max: 200000, currency: 'USD', period: 'year' },
    description: 'Build the future of decentralized applications. Work with smart contracts, DeFi protocols, and cutting-edge blockchain technology. You\'ll be part of a team creating next-generation financial products.',
    requirements: [
      'Solidity programming experience',
      'Web3 development knowledge',
      'Smart contract security awareness',
      'DeFi protocol understanding',
      'Experience with testing frameworks (Hardhat, Truffle)',
      'Knowledge of blockchain fundamentals'
    ],
    skillsRequired: ['Solidity', 'Web3', 'Smart Contracts', 'JavaScript'],
    postedBy: '0x1111222233334444555566667777888899990000',
    postedAt: '2024-02-22T16:45:00Z',
    applicants: 8,
    status: 'open',
    tags: ['Blockchain', 'Web3', 'DeFi', 'Solidity'],
    experienceLevel: 'Senior'
  },
  {
    id: '5',
    title: 'Junior Frontend Developer',
    company: 'Digital Agency Inc',
    location: 'Chicago, IL',
    type: 'Full-time',
    salary: { min: 55000, max: 75000, currency: 'USD', period: 'year' },
    description: 'Perfect opportunity for a junior developer to grow their skills in a supportive environment. You\'ll work on client projects, learn from experienced developers, and contribute to exciting web applications.',
    requirements: [
      '1-2 years of frontend experience',
      'HTML, CSS, JavaScript fundamentals',
      'Basic React knowledge',
      'Understanding of responsive design',
      'Git version control experience',
      'Eagerness to learn and grow'
    ],
    skillsRequired: ['JavaScript', 'React Development', 'HTML/CSS'],
    postedBy: '0x2222333344445555666677778888999900001111',
    postedAt: '2024-02-25T11:20:00Z',
    applicants: 42,
    status: 'open',
    tags: ['Entry-level', 'Frontend', 'Mentorship', 'Growth'],
    experienceLevel: 'Entry'
  },
  {
    id: '6',
    title: 'DevOps Engineer',
    company: 'CloudTech Solutions',
    location: 'Seattle, WA',
    type: 'Full-time',
    salary: { min: 110000, max: 150000, currency: 'USD', period: 'year' },
    description: 'Lead our infrastructure and deployment processes. Manage cloud environments, implement CI/CD pipelines, and ensure our applications are scalable, secure, and highly available.',
    requirements: [
      '4+ years DevOps experience',
      'AWS/Azure cloud platforms',
      'Docker and Kubernetes',
      'CI/CD pipeline experience',
      'Infrastructure as Code (Terraform)',
      'Monitoring and logging tools'
    ],
    skillsRequired: ['DevOps', 'AWS', 'Docker', 'Kubernetes'],
    postedBy: '0x3333444455556666777788889999000011112222',
    postedAt: '2024-02-23T13:10:00Z',
    applicants: 19,
    status: 'open',
    tags: ['DevOps', 'Cloud', 'Infrastructure', 'AWS'],
    experienceLevel: 'Senior'
  },
  {
    id: '7',
    title: 'Mobile App Developer',
    company: 'MobileFirst Studio',
    location: 'Los Angeles, CA',
    type: 'Part-time',
    salary: { min: 60, max: 90, currency: 'USD', period: 'hour' },
    description: 'Develop cross-platform mobile applications using React Native. Work with a creative team to build engaging mobile experiences for iOS and Android platforms.',
    requirements: [
      '3+ years mobile development',
      'React Native expertise',
      'iOS/Android development knowledge',
      'App Store deployment experience',
      'Understanding of mobile UI/UX',
      'Experience with native modules'
    ],
    skillsRequired: ['React Native', 'Mobile Development', 'JavaScript', 'UI/UX Design'],
    postedBy: '0x4444555566667777888899990000111122223333',
    postedAt: '2024-02-21T10:30:00Z',
    applicants: 27,
    status: 'open',
    tags: ['Mobile', 'React Native', 'Part-time', 'Cross-platform'],
    experienceLevel: 'Mid'
  },
  {
    id: '8',
    title: 'Data Scientist',
    company: 'Analytics Pro',
    location: 'Boston, MA',
    type: 'Full-time',
    salary: { min: 95000, max: 135000, currency: 'USD', period: 'year' },
    description: 'Analyze complex datasets to drive business decisions. Build machine learning models, create data visualizations, and work with stakeholders to translate data insights into actionable strategies.',
    requirements: [
      'Masters in Data Science or related field',
      'Python/R programming skills',
      'Machine learning frameworks (TensorFlow, PyTorch)',
      'SQL and database knowledge',
      'Data visualization tools (Tableau, PowerBI)',
      'Statistical analysis expertise'
    ],
    skillsRequired: ['Python', 'Machine Learning', 'SQL', 'Data Analysis'],
    postedBy: '0x5555666677778888999900001111222233334444',
    postedAt: '2024-02-19T14:45:00Z',
    applicants: 33,
    status: 'open',
    tags: ['Data Science', 'ML', 'Python', 'Analytics'],
    experienceLevel: 'Mid'
  },
  {
    id: '9',
    title: 'Technical Lead',
    company: 'Enterprise Solutions Corp',
    location: 'Dallas, TX',
    type: 'Full-time',
    salary: { min: 150000, max: 190000, currency: 'USD', period: 'year' },
    description: 'Lead a team of developers in building enterprise-grade applications. Define technical architecture, mentor team members, and drive engineering best practices across the organization.',
    requirements: [
      '7+ years software development',
      '3+ years leadership experience',
      'Full-stack development expertise',
      'System architecture knowledge',
      'Team management skills',
      'Enterprise software experience'
    ],
    skillsRequired: ['Leadership', 'Full-stack Development', 'System Architecture', 'Team Management'],
    postedBy: '0x6666777788889999000011112222333344445555',
    postedAt: '2024-02-17T12:15:00Z',
    applicants: 12,
    status: 'open',
    tags: ['Leadership', 'Architecture', 'Enterprise', 'Management'],
    experienceLevel: 'Lead'
  },
  {
    id: '10',
    title: 'Product Designer',
    company: 'InnovateLab',
    location: 'Portland, OR',
    type: 'Contract',
    salary: { min: 70, max: 110, currency: 'USD', period: 'hour' },
    description: 'Shape the user experience of innovative products from concept to launch. Conduct user research, create wireframes and prototypes, and collaborate with cross-functional teams.',
    requirements: [
      '4+ years product design experience',
      'Design thinking methodology',
      'User research and testing',
      'Prototyping tools (Figma, Principle)',
      'Cross-functional collaboration',
      'Portfolio showcasing end-to-end projects'
    ],
    skillsRequired: ['Product Design', 'User Research', 'Prototyping', 'Design Thinking'],
    postedBy: '0x7777888899990000111122223333444455556666',
    postedAt: '2024-02-16T16:00:00Z',
    applicants: 25,
    status: 'open',
    tags: ['Product Design', 'UX Research', 'Innovation', 'Contract'],
    experienceLevel: 'Senior'
  }
]

export const mockUserProfile: UserProfile = {
  address: '0x1234567890123456789012345678901234567890',
  skills: mockSkills,
  reputationScore: 87,
  endorsements: mockEndorsements
}

// Mock API responses
export const mockApiResponses = {
  getProfile: () => Promise.resolve(mockUserProfile),
  getSkills: () => Promise.resolve(mockSkills),
  getEndorsements: () => Promise.resolve(mockEndorsements),
  getReputationScore: () => Promise.resolve({ score: 87 }),
  getJobs: () => Promise.resolve(mockJobs),
  addSkill: (skill: Omit<Skill, 'id' | 'createdAt' | 'verified' | 'weight'>) => {
    const newSkill: Skill = {
      ...skill,
      id: Date.now().toString(),
      weight: Math.floor(Math.random() * 40) + 60, // Random weight 60-100
      verified: Math.random() > 0.5, // Random verification
      createdAt: new Date().toISOString()
    }
    return Promise.resolve(newSkill)
  },
  addEndorsement: (endorsement: Omit<Endorsement, 'id' | 'createdAt'>) => {
    const newEndorsement: Endorsement = {
      ...endorsement,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    }
    return Promise.resolve(newEndorsement)
  },
  addJob: (job: Omit<Job, 'id' | 'createdAt' | 'applicants' | 'status'>) => {
    const newJob: Job = {
      ...job,
      id: Date.now().toString(),
      postedAt: new Date().toISOString(),
      applicants: 0,
      status: 'open'
    }
    return Promise.resolve(newJob)
  },
  deleteSkill: () => Promise.resolve()
}
