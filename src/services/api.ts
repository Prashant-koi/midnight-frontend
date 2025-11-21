import type { Skill, Endorsement, UserProfile } from '../types'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api'

// Re-export types for convenience
export type { Skill, Endorsement, UserProfile }

class ApiService {
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    }

    try {
      const response = await fetch(url, config)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      return await response.json()
    } catch (error) {
      console.error('API request failed:', error)
      throw error
    }
  }

  // Profile endpoints
  async getProfile(address: string): Promise<UserProfile> {
    return this.request<UserProfile>(`/profile/${address}`)
  }

  async updateProfile(address: string, profile: Partial<UserProfile>): Promise<UserProfile> {
    return this.request<UserProfile>(`/profile/${address}`, {
      method: 'PUT',
      body: JSON.stringify(profile),
    })
  }

  // Skills endpoints
  async addSkill(address: string, skill: Omit<Skill, 'id' | 'createdAt' | 'verified' | 'weight'>): Promise<Skill> {
    const formData = new FormData()
    formData.append('name', skill.name)
    formData.append('description', skill.description)
    if (skill.proofUrl) {
      formData.append('proofUrl', skill.proofUrl)
    }
    if (skill.proofFile) {
      formData.append('proofFile', skill.proofFile)
    }

    return this.request<Skill>(`/profile/${address}/skills`, {
      method: 'POST',
      body: formData,
      headers: {}, // Remove Content-Type to let browser set it for FormData
    })
  }

  async getSkills(address: string): Promise<Skill[]> {
    return this.request<Skill[]>(`/profile/${address}/skills`)
  }

  async deleteSkill(address: string, skillId: string): Promise<void> {
    return this.request<void>(`/profile/${address}/skills/${skillId}`, {
      method: 'DELETE',
    })
  }

  // Endorsement endpoints
  async getEndorsements(address: string): Promise<Endorsement[]> {
    return this.request<Endorsement[]>(`/profile/${address}/endorsements`)
  }

  async addEndorsement(endorsement: Omit<Endorsement, 'id' | 'createdAt'>): Promise<Endorsement> {
    return this.request<Endorsement>('/endorsements', {
      method: 'POST',
      body: JSON.stringify(endorsement),
    })
  }

  // Reputation endpoints
  async getReputationScore(address: string): Promise<{ score: number }> {
    return this.request<{ score: number }>(`/profile/${address}/reputation`)
  }

  // Resume upload endpoint
  async uploadResume(candidateId: string, resumeFile: File, githubUsername?: string): Promise<any> {
    const formData = new FormData()
    formData.append('candidateId', candidateId)
    formData.append('resumeFile', resumeFile)
    if (githubUsername) {
      formData.append('githubUsername', githubUsername)
    }

    // Make request directly to skills/verify endpoint
    const url = `${API_BASE_URL}/skills/verify`
    const response = await fetch(url, {
      method: 'POST',
      body: formData,
      // Don't set Content-Type header - let browser set it with boundary for multipart/form-data
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Upload failed' }))
      throw new Error(error.message || `HTTP error! status: ${response.status}`)
    }

    return await response.json()
  }
}

export const apiService = new ApiService()
