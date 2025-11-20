import type { Skill, Endorsement, UserProfile, Job, CurrentJob } from '../types'

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
    title: 'Build E-commerce Website with React',
    company: 'TechStartup Inc.',
    location: 'Remote',
    type: 'Contract',
    salary: { min: 80, max: 120, currency: 'USD', period: 'hour' },
    description: 'We need an experienced React developer to build a modern e-commerce website from scratch. The project includes product catalog, shopping cart, payment integration, and admin dashboard. Expected duration: 6-8 weeks.',
    requirements: [
      '3+ years of React experience',
      'Experience with e-commerce platforms',
      'Payment gateway integration (Stripe/PayPal)',
      'Responsive design skills',
      'API integration experience',
      'Available to start immediately'
    ],
    skillsRequired: ['React Development', 'TypeScript', 'JavaScript', 'UI/UX Design'],
    postedBy: '0xabcdef1234567890abcdef1234567890abcdef12',
    postedAt: '2024-02-20T10:00:00Z',
    applicants: 12,
    status: 'open',
    tags: ['React', 'E-commerce', 'Frontend', 'Urgent'],
    experienceLevel: 'Mid'
  },
  {
    id: '2',
    title: 'Mobile App UI/UX Design',
    company: 'FinTech Solutions',
    location: 'Remote',
    type: 'Contract',
    salary: { min: 60, max: 90, currency: 'USD', period: 'hour' },
    description: 'Design a complete mobile app interface for a cryptocurrency trading platform. Need wireframes, user flows, and high-fidelity designs. Project duration: 3-4 weeks.',
    requirements: [
      'Portfolio of mobile app designs',
      'Figma/Sketch proficiency',
      'Understanding of fintech/trading interfaces',
      'User research experience',
      'Prototyping skills',
      'Available for client calls'
    ],
    skillsRequired: ['UI/UX Design', 'Figma', 'Mobile Design', 'User Research'],
    postedBy: '0x9876543210987654321098765432109876543210',
    postedAt: '2024-02-18T14:30:00Z',
    applicants: 8,
    status: 'open',
    tags: ['Design', 'Mobile', 'FinTech', 'Crypto'],
    experienceLevel: 'Mid'
  },
  {
    id: '3',
    title: 'Backend API Development',
    company: 'SaaS Company',
    location: 'Remote',
    type: 'Contract',
    salary: { min: 70, max: 100, currency: 'USD', period: 'hour' },
    description: 'Build RESTful APIs for a project management SaaS platform. Include user authentication, data management, and third-party integrations. Duration: 4-6 weeks.',
    requirements: [
      'Node.js and Express expertise',
      'Database design (PostgreSQL/MongoDB)',
      'JWT authentication implementation',
      'API documentation skills',
      'Testing framework experience',
      'AWS deployment knowledge'
    ],
    skillsRequired: ['Node.js Backend', 'API Development', 'Database Design', 'Authentication'],
    postedBy: '0xfedcba0987654321fedcba0987654321fedcba09',
    postedAt: '2024-02-15T09:15:00Z',
    applicants: 15,
    status: 'open',
    tags: ['Backend', 'API', 'SaaS', 'Node.js'],
    experienceLevel: 'Senior'
  },
  {
    id: '4',
    title: 'Smart Contract Development',
    company: 'DeFi Protocol',
    location: 'Remote',
    type: 'Contract',
    salary: { min: 100, max: 150, currency: 'USD', period: 'hour' },
    description: 'Develop smart contracts for a new DeFi lending protocol. Includes token contracts, lending pools, and governance mechanisms. Security audit required. Duration: 8-10 weeks.',
    requirements: [
      'Advanced Solidity programming',
      'DeFi protocol experience',
      'Security best practices',
      'Gas optimization skills',
      'Testing with Hardhat/Truffle',
      'Previous audit experience preferred'
    ],
    skillsRequired: ['Solidity', 'Smart Contracts', 'DeFi', 'Security'],
    postedBy: '0x1111222233334444555566667777888899990000',
    postedAt: '2024-02-22T16:45:00Z',
    applicants: 5,
    status: 'open',
    tags: ['Blockchain', 'DeFi', 'Solidity', 'High-Pay'],
    experienceLevel: 'Senior'
  },
  {
    id: '5',
    title: 'Landing Page Design & Development',
    company: 'Marketing Agency',
    location: 'Remote',
    type: 'Contract',
    salary: { min: 2000, max: 4000, currency: 'USD', period: 'project' },
    description: 'Create a high-converting landing page for a new SaaS product. Includes design, development, and basic SEO optimization. Quick turnaround needed - 1-2 weeks.',
    requirements: [
      'Landing page design experience',
      'HTML/CSS/JavaScript skills',
      'Conversion optimization knowledge',
      'SEO basics',
      'Fast turnaround capability',
      'A/B testing experience'
    ],
    skillsRequired: ['UI/UX Design', 'Frontend Development', 'SEO', 'Conversion Optimization'],
    postedBy: '0x2222333344445555666677778888999900001111',
    postedAt: '2024-02-25T11:20:00Z',
    applicants: 22,
    status: 'open',
    tags: ['Landing Page', 'Quick', 'Marketing', 'SEO'],
    experienceLevel: 'Entry'
  },
  {
    id: '6',
    title: 'DevOps & Cloud Infrastructure Setup',
    company: 'Tech Startup',
    location: 'Remote',
    type: 'Contract',
    salary: { min: 85, max: 120, currency: 'USD', period: 'hour' },
    description: 'Set up complete cloud infrastructure for a new application. Includes CI/CD pipelines, monitoring, security, and auto-scaling. Duration: 3-4 weeks.',
    requirements: [
      'AWS/Azure expertise',
      'Docker and Kubernetes',
      'CI/CD pipeline setup',
      'Infrastructure as Code (Terraform)',
      'Monitoring and logging',
      'Security best practices'
    ],
    skillsRequired: ['DevOps', 'AWS', 'Docker', 'CI/CD'],
    postedBy: '0x3333444455556666777788889999000011112222',
    postedAt: '2024-02-23T13:10:00Z',
    applicants: 9,
    status: 'open',
    tags: ['DevOps', 'Cloud', 'Infrastructure', 'Startup'],
    experienceLevel: 'Senior'
  },
  {
    id: '7',
    title: 'React Native Mobile App',
    company: 'Health Tech Company',
    location: 'Remote',
    type: 'Contract',
    salary: { min: 75, max: 110, currency: 'USD', period: 'hour' },
    description: 'Develop a health tracking mobile app using React Native. Features include user profiles, data visualization, notifications, and health API integrations. Duration: 6-8 weeks.',
    requirements: [
      'React Native expertise',
      'iOS/Android development',
      'Health data integration',
      'Push notifications',
      'App Store deployment',
      'HIPAA compliance knowledge'
    ],
    skillsRequired: ['React Native', 'Mobile Development', 'Health Tech', 'API Integration'],
    postedBy: '0x4444555566667777888899990000111122223333',
    postedAt: '2024-02-21T10:30:00Z',
    applicants: 11,
    status: 'open',
    tags: ['Mobile', 'React Native', 'HealthTech', 'APIs'],
    experienceLevel: 'Mid'
  },
  {
    id: '8',
    title: 'Data Analysis & Visualization',
    company: 'E-commerce Brand',
    location: 'Remote',
    type: 'Contract',
    salary: { min: 50, max: 80, currency: 'USD', period: 'hour' },
    description: 'Analyze customer behavior data and create interactive dashboards for business insights. Includes data cleaning, analysis, and visualization. Duration: 2-3 weeks.',
    requirements: [
      'Python/R for data analysis',
      'SQL database queries',
      'Data visualization (Tableau/PowerBI)',
      'Statistical analysis skills',
      'Business intelligence experience',
      'E-commerce analytics preferred'
    ],
    skillsRequired: ['Data Analysis', 'Python', 'SQL', 'Data Visualization'],
    postedBy: '0x5555666677778888999900001111222233334444',
    postedAt: '2024-02-19T14:45:00Z',
    applicants: 18,
    status: 'open',
    tags: ['Data Science', 'Analytics', 'E-commerce', 'Visualization'],
    experienceLevel: 'Mid'
  },
  {
    id: '9',
    title: 'Technical Writing & Documentation',
    company: 'Developer Tools Startup',
    location: 'Remote',
    type: 'Contract',
    salary: { min: 40, max: 70, currency: 'USD', period: 'hour' },
    description: 'Create comprehensive technical documentation for a new developer API. Includes API docs, tutorials, code examples, and getting started guides. Duration: 3-4 weeks.',
    requirements: [
      'Technical writing experience',
      'API documentation expertise',
      'Developer-focused content',
      'Markdown/Git proficiency',
      'Code example creation',
      'Developer tools knowledge'
    ],
    skillsRequired: ['Technical Writing', 'API Documentation', 'Developer Tools', 'Git'],
    postedBy: '0x6666777788889999000011112222333344445555',
    postedAt: '2024-02-17T12:15:00Z',
    applicants: 14,
    status: 'open',
    tags: ['Writing', 'Documentation', 'API', 'Developer'],
    experienceLevel: 'Mid'
  },
  {
    id: '10',
    title: 'WordPress E-commerce Site',
    company: 'Local Business',
    location: 'Remote',
    type: 'Contract',
    salary: { min: 1500, max: 3000, currency: 'USD', period: 'project' },
    description: 'Build a complete e-commerce website using WordPress and WooCommerce. Include product catalog, payment processing, and basic SEO setup. Duration: 2-3 weeks.',
    requirements: [
      'WordPress development experience',
      'WooCommerce expertise',
      'Custom theme development',
      'Payment gateway setup',
      'SEO optimization',
      'Responsive design skills'
    ],
    skillsRequired: ['WordPress', 'WooCommerce', 'E-commerce', 'SEO'],
    postedBy: '0x7777888899990000111122223333444455556666',
    postedAt: '2024-02-16T16:00:00Z',
    applicants: 25,
    status: 'open',
    tags: ['WordPress', 'E-commerce', 'WooCommerce', 'Local'],
    experienceLevel: 'Entry'
  },
  {
    id: '11',
    title: 'Brand Identity & Logo Design',
    company: 'New Startup',
    location: 'Remote',
    type: 'Contract',
    salary: { min: 800, max: 2000, currency: 'USD', period: 'project' },
    description: 'Create complete brand identity for a new tech startup including logo, color palette, typography, and brand guidelines. Quick turnaround needed. Duration: 1-2 weeks.',
    requirements: [
      'Brand identity design experience',
      'Logo design portfolio',
      'Adobe Creative Suite proficiency',
      'Brand guideline creation',
      'Tech industry experience',
      'Fast turnaround capability'
    ],
    skillsRequired: ['Brand Design', 'Logo Design', 'Adobe Creative Suite', 'Brand Strategy'],
    postedBy: '0x8888999900001111222233334444555566667777',
    postedAt: '2024-02-24T09:30:00Z',
    applicants: 31,
    status: 'open',
    tags: ['Branding', 'Logo', 'Startup', 'Quick'],
    experienceLevel: 'Mid'
  },
  {
    id: '12',
    title: 'Shopify Store Customization',
    company: 'Fashion Brand',
    location: 'Remote',
    type: 'Contract',
    salary: { min: 45, max: 75, currency: 'USD', period: 'hour' },
    description: 'Customize existing Shopify store with new theme, product pages, and checkout optimization. Include mobile optimization and performance improvements. Duration: 2-3 weeks.',
    requirements: [
      'Shopify development experience',
      'Liquid template language',
      'E-commerce optimization',
      'Mobile responsiveness',
      'Performance optimization',
      'Fashion industry preferred'
    ],
    skillsRequired: ['Shopify', 'E-commerce', 'Liquid', 'Performance Optimization'],
    postedBy: '0x9999000011112222333344445555666677778888',
    postedAt: '2024-02-20T15:20:00Z',
    applicants: 19,
    status: 'open',
    tags: ['Shopify', 'E-commerce', 'Fashion', 'Optimization'],
    experienceLevel: 'Mid'
  }
]

export const mockCurrentJobs: CurrentJob[] = [
  {
    id: '1',
    title: 'Build E-commerce Website with React',
    company: 'TechStartup Inc.',
    location: 'Remote',
    type: 'Contract',
    salary: { min: 80, max: 120, currency: 'USD', period: 'hour' },
    description: 'Building a modern e-commerce website with React, including product catalog and payment integration.',
    requirements: ['React', 'TypeScript', 'Payment Integration'],
    skillsRequired: ['React Development', 'TypeScript', 'JavaScript'],
    postedBy: '0xabcdef1234567890abcdef1234567890abcdef12',
    postedAt: '2024-02-20T10:00:00Z',
    applicants: 12,
    status: 'in-progress',
    tags: ['React', 'E-commerce', 'Frontend'],
    experienceLevel: 'Mid',
    applicationDate: '2024-02-21T14:30:00Z',
    startDate: '2024-02-25T09:00:00Z',
    deadline: '2024-04-10T17:00:00Z',
    progress: 65,
    clientFeedback: 'Great progress so far! Really happy with the design and functionality.',
    lastUpdate: '2024-03-01T16:45:00Z',
    paymentStatus: 'partial',
    totalEarned: 4800
  },
  {
    id: '2',
    title: 'Mobile App UI/UX Design',
    company: 'FinTech Solutions',
    location: 'Remote',
    type: 'Contract',
    salary: { min: 60, max: 90, currency: 'USD', period: 'hour' },
    description: 'Design a complete mobile app interface for a cryptocurrency trading platform.',
    requirements: ['Figma', 'Mobile Design', 'User Research'],
    skillsRequired: ['UI/UX Design', 'Figma', 'Mobile Design'],
    postedBy: '0x9876543210987654321098765432109876543210',
    postedAt: '2024-02-18T14:30:00Z',
    applicants: 8,
    status: 'accepted',
    tags: ['Design', 'Mobile', 'FinTech'],
    experienceLevel: 'Mid',
    applicationDate: '2024-02-19T10:15:00Z',
    startDate: '2024-02-26T09:00:00Z',
    deadline: '2024-03-22T17:00:00Z',
    progress: 0,
    clientFeedback: 'Excited to start working with you!',
    lastUpdate: '2024-02-22T11:30:00Z',
    paymentStatus: 'pending',
    totalEarned: 0
  },
  {
    id: '7',
    title: 'React Native Mobile App',
    company: 'Health Tech Company',
    location: 'Remote',
    type: 'Contract',
    salary: { min: 75, max: 110, currency: 'USD', period: 'hour' },
    description: 'Develop a health tracking mobile app using React Native with health API integrations.',
    requirements: ['React Native', 'Mobile Development', 'API Integration'],
    skillsRequired: ['React Native', 'Mobile Development', 'Health Tech'],
    postedBy: '0x4444555566667777888899990000111122223333',
    postedAt: '2024-02-21T10:30:00Z',
    applicants: 11,
    status: 'in-progress',
    tags: ['Mobile', 'React Native', 'HealthTech'],
    experienceLevel: 'Mid',
    applicationDate: '2024-02-22T09:45:00Z',
    startDate: '2024-02-27T09:00:00Z',
    deadline: '2024-04-20T17:00:00Z',
    progress: 40,
    clientFeedback: 'Good work on the initial features. Keep it up!',
    lastUpdate: '2024-03-02T14:20:00Z',
    paymentStatus: 'partial',
    totalEarned: 2800
  },
  {
    id: '13',
    title: 'Landing Page Redesign',
    company: 'SaaS Startup',
    location: 'Remote',
    type: 'Contract',
    salary: { min: 2500, max: 3500, currency: 'USD', period: 'project' },
    description: 'Complete redesign of existing landing page with improved conversion optimization.',
    requirements: ['UI/UX Design', 'Frontend Development', 'SEO'],
    skillsRequired: ['UI/UX Design', 'React Development', 'Conversion Optimization'],
    postedBy: '0xaaaa111122223333444455556666777788889999',
    postedAt: '2024-01-15T10:00:00Z',
    applicants: 18,
    status: 'completed',
    tags: ['Landing Page', 'Design', 'Frontend'],
    experienceLevel: 'Mid',
    applicationDate: '2024-01-16T11:30:00Z',
    startDate: '2024-01-20T09:00:00Z',
    deadline: '2024-02-03T17:00:00Z',
    progress: 100,
    clientFeedback: 'Excellent work! The conversion rate has increased by 40%. Highly recommend!',
    lastUpdate: '2024-02-05T10:00:00Z',
    paymentStatus: 'completed',
    totalEarned: 3500
  },
  {
    id: '14',
    title: 'API Documentation',
    company: 'Developer Tools Inc.',
    location: 'Remote',
    type: 'Contract',
    salary: { min: 40, max: 70, currency: 'USD', period: 'hour' },
    description: 'Create comprehensive API documentation with examples and tutorials.',
    requirements: ['Technical Writing', 'API Documentation', 'Markdown'],
    skillsRequired: ['Technical Writing', 'API Documentation', 'Developer Tools'],
    postedBy: '0xbbbb222233334444555566667777888899990000',
    postedAt: '2024-01-28T14:00:00Z',
    applicants: 7,
    status: 'completed',
    tags: ['Documentation', 'API', 'Writing'],
    experienceLevel: 'Mid',
    applicationDate: '2024-01-29T16:20:00Z',
    startDate: '2024-02-01T09:00:00Z',
    deadline: '2024-02-22T17:00:00Z',
    progress: 100,
    clientFeedback: 'Great documentation! Clear, concise, and helpful. Will work with you again.',
    lastUpdate: '2024-02-23T09:15:00Z',
    paymentStatus: 'completed',
    totalEarned: 1960
  },
  {
    id: '15',
    title: 'Data Visualization Dashboard',
    company: 'Analytics Company',
    location: 'Remote',
    type: 'Contract',
    salary: { min: 50, max: 80, currency: 'USD', period: 'hour' },
    description: 'Build interactive data visualization dashboard for business analytics.',
    requirements: ['React', 'D3.js', 'Data Visualization'],
    skillsRequired: ['React Development', 'Data Visualization', 'TypeScript'],
    postedBy: '0xcccc333344445555666677778888999900001111',
    postedAt: '2024-02-10T11:00:00Z',
    applicants: 9,
    status: 'interviewing',
    tags: ['React', 'Data', 'Visualization'],
    experienceLevel: 'Senior',
    applicationDate: '2024-02-11T13:45:00Z',
    progress: 0,
    lastUpdate: '2024-02-15T10:30:00Z',
    paymentStatus: 'pending',
    totalEarned: 0
  },
  {
    id: '16',
    title: 'WordPress Site Migration',
    company: 'Digital Agency',
    location: 'Remote',
    type: 'Contract',
    salary: { min: 1200, max: 2000, currency: 'USD', period: 'project' },
    description: 'Migrate WordPress site to new hosting with performance optimization.',
    requirements: ['WordPress', 'Server Management', 'Performance Optimization'],
    skillsRequired: ['WordPress', 'Server Administration', 'Performance Optimization'],
    postedBy: '0xdddd444455556666777788889999000011112222',
    postedAt: '2024-02-08T09:30:00Z',
    applicants: 12,
    status: 'applied',
    tags: ['WordPress', 'Migration', 'Performance'],
    experienceLevel: 'Mid',
    applicationDate: '2024-02-09T14:00:00Z',
    progress: 0,
    lastUpdate: '2024-02-09T14:00:00Z',
    paymentStatus: 'pending',
    totalEarned: 0
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
  getCurrentJobs: () => Promise.resolve(mockCurrentJobs),
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
