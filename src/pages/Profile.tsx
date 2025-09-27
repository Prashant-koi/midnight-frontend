import { useState, useEffect, useCallback } from 'react'
import { useAccount } from 'wagmi'
import { User, Wallet, Star, Award } from 'lucide-react'
import { apiService } from '../services/api'
import type { UserProfile } from '../types'
import { useDemoMode } from '../hooks/useDemoMode'
import { mockApiResponses } from '../data/mockData'

const Profile = () => {
  const { address, isConnected } = useAccount()
  const { isDemoMode, demoAddress } = useDemoMode()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const currentAddress = isDemoMode ? demoAddress : address
  const isUserConnected = isDemoMode || isConnected

  const loadProfile = useCallback(async () => {
    if (!currentAddress) return
    
    try {
      setLoading(true)
      setError(null)
      
      if (isDemoMode) {
        // Use mock data in demo mode
        const profileData = await mockApiResponses.getProfile()
        setProfile(profileData)
      } else {
        const profileData = await apiService.getProfile(currentAddress)
        setProfile(profileData)
      }
    } catch (err) {
      console.error('Failed to load profile:', err)
      if (!isDemoMode) {
        setError('Failed to load profile. This might be your first visit!')
        // Create a default profile for new users
        setProfile({
          address: currentAddress,
          skills: [],
          reputationScore: 0,
          endorsements: []
        })
      }
    } finally {
      setLoading(false)
    }
  }, [currentAddress, isDemoMode])

  useEffect(() => {
    if (isUserConnected && currentAddress) {
      loadProfile()
    }
  }, [isUserConnected, currentAddress, loadProfile])

  if (!isUserConnected) {
    return (
      <div className="text-center py-12">
        <Wallet className="w-16 h-16 text-gray-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-white mb-2">Wallet Not Connected</h2>
        <p className="text-gray-300">Please connect your wallet to view your profile.</p>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin w-8 h-8 border-2 border-white border-t-transparent rounded-full mx-auto mb-4"></div>
        <p className="text-gray-300">Loading your profile...</p>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">My Profile</h1>
        <p className="text-gray-300">Manage your professional information and track your reputation.</p>
      </div>

      {error && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <p className="text-yellow-800">{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Info */}
        <div className="lg:col-span-1">
          <div className="card">
            <div className="text-center">
              <div className="w-20 h-20 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-10 h-10 text-gray-300" />
              </div>
              <h2 className="text-xl font-semibold text-white mb-2">Your Profile</h2>
              <div className="bg-gray-800 rounded-lg p-3 mb-4">
                <p className="text-sm text-gray-300 font-mono break-all">
                  {currentAddress}
                </p>
                {isDemoMode && (
                  <p className="text-xs text-blue-500 mt-1">Demo Mode - Sample Data</p>
                )}
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-300">Verified Skills</span>
                  <span className="font-semibold text-white">
                    {profile?.skills.filter(skill => skill.verified).length || 0}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-300">Total Skills</span>
                  <span className="font-semibold text-white">
                    {profile?.skills.length || 0}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-300">Endorsements</span>
                  <span className="font-semibold text-white">
                    {profile?.endorsements.length || 0}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Reputation Score */}
          <div className="card mt-6">
            <div className="text-center">
              <Award className="w-12 h-12 text-white mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-white mb-2">Reputation Score</h3>
              <div className="text-3xl font-bold text-white mb-2">
                {profile?.reputationScore || 0}
              </div>
              <div className="flex justify-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor((profile?.reputationScore || 0) / 20)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-500'
                    }`}
                  />
                ))}
              </div>
              <p className="text-sm text-gray-300 mt-2">
                Based on verified skills and endorsements
              </p>
            </div>
          </div>
        </div>

        {/* Skills & Endorsements */}
        <div className="lg:col-span-2 space-y-6">
          {/* Recent Skills */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Recent Skills</h3>
              <button className="text-sm text-white hover:underline">
                View All Skills →
              </button>
            </div>
            
            {profile?.skills.length === 0 ? (
              <div className="text-center py-8 text-gray-400">
                <p>No skills added yet.</p>
                <button className="btn-primary mt-4">Add Your First Skill</button>
              </div>
            ) : (
              <div className="space-y-3">
                {profile?.skills.slice(0, 3).map((skill) => (
                  <div key={skill.id} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                    <div>
                      <h4 className="font-medium text-white">{skill.name}</h4>
                      <p className="text-sm text-gray-300">{skill.description}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        skill.verified 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {skill.verified ? 'Verified' : 'Pending'}
                      </span>
                      <span className="text-sm font-medium text-white">
                        Weight: {skill.weight}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Recent Endorsements */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Recent Endorsements</h3>
              <button className="text-sm text-white hover:underline">
                View All Endorsements →
              </button>
            </div>
            
            {profile?.endorsements.length === 0 ? (
              <div className="text-center py-8 text-gray-400">
                <p>No endorsements received yet.</p>
                <p className="text-sm mt-2">Complete projects to receive endorsements from clients.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {profile?.endorsements.slice(0, 3).map((endorsement) => (
                  <div key={endorsement.id} className="p-3 bg-gray-800 rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-medium text-white">
                          From: {endorsement.fromAddress.slice(0, 8)}...{endorsement.fromAddress.slice(-6)}
                        </p>
                        <div className="flex items-center mt-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < endorsement.rating
                                  ? 'text-yellow-400 fill-current'
                                  : 'text-gray-500'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <span className="text-xs text-gray-400">
                        {new Date(endorsement.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-300">{endorsement.message}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
