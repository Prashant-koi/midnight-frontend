import type { Skill, Endorsement, UserProfile } from '../types'

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
  deleteSkill: () => Promise.resolve()
}
