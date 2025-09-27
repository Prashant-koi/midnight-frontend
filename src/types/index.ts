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
