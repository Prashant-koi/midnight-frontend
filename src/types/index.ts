export interface Skill {
  id: string
  name: string
  description: string
  proofUrl?: string
  proofFile?: File
  weight: number
  verified: boolean
  createdAt: string
}

export interface Endorsement {
  id: string
  fromAddress: string
  toAddress: string
  projectId: string
  message: string
  rating: number
  createdAt: string
}

export interface UserProfile {
  address: string
  skills: Skill[]
  reputationScore: number
  endorsements: Endorsement[]
}

export interface Job {
  id: string
  title: string
  company: string
  location: string
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Remote'
  salary: {
    min: number
    max: number
    currency: string
    period: 'hour' | 'year'
  }
  description: string
  requirements: string[]
  skillsRequired: string[]
  postedBy: string
  postedAt: string
  applicants: number
  status: 'open' | 'closed'
  tags: string[]
  experienceLevel: 'Entry' | 'Mid' | 'Senior' | 'Lead'
}
