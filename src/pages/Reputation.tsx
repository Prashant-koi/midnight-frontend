import { useState, useEffect } from 'react'
import { Award, TrendingUp, Users, Star, CheckCircle, Clock, Trophy } from 'lucide-react'
import { apiService } from '../services/api'
import type { UserProfile } from '../types'
import { useMidnightWallet } from '../hooks/useMidnightWallet'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import EmptyState from '../components/ui/EmptyState'

interface Endorsement {
  id: string
  endorser: string
  skill: string
  message: string
  timestamp: string
  verified: boolean
}

const Reputation = () => {
  const { account, isConnected } = useMidnightWallet()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [, setEndorsements] = useState<Endorsement[]>([])
  const [loading, setLoading] = useState(true)

  const currentAddress = account
  const isUserConnected = isConnected

  useEffect(() => {
    if (isUserConnected && currentAddress) {
      loadReputationData()
    }
  }, [isUserConnected, currentAddress])

  const loadReputationData = async () => {
    if (!currentAddress) return
    try {
      setLoading(true)
      const [profileData] = await Promise.all([
        apiService.getProfile(currentAddress),
        // apiService.getEndorsements(currentAddress)
      ])
      setProfile(profileData)
      setEndorsements(mockEndorsements)
    } catch (err) {
      console.error('Failed to load reputation data:', err)
      setProfile(null)
      setEndorsements([])
    } finally {
      setLoading(false)
    }
  }

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  const getReputationLevel = (score: number) => {
    if (score >= 90) return { level: 'Expert', color: 'text-purple-400', bgColor: 'bg-purple-900' }
    if (score >= 75) return { level: 'Advanced', color: 'text-blue-400', bgColor: 'bg-blue-900' }
    if (score >= 50) return { level: 'Intermediate', color: 'text-green-400', bgColor: 'bg-green-900' }
    if (score >= 25) return { level: 'Beginner', color: 'text-yellow-400', bgColor: 'bg-yellow-900' }
    return { level: 'New', color: 'text-gray-400', bgColor: 'bg-gray-800' }
  }

  const mockEndorsements: Endorsement[] = [
    {
      id: '1',
      endorser: '0x1234567890abcdef1234567890abcdef12345678',
      skill: 'React Development',
      message: 'Excellent work on the e-commerce project. Clean code and great attention to detail.',
      timestamp: '2024-02-15T10:30:00Z',
      verified: true
    },
    {
      id: '2',
      endorser: '0xabcdef1234567890abcdef1234567890abcdef12',
      skill: 'TypeScript',
      message: 'Strong TypeScript skills demonstrated throughout the project.',
      timestamp: '2024-02-10T14:20:00Z',
      verified: true
    }
  ]

  if (!isUserConnected) {
    return (
      <EmptyState
        icon={Award}
        title="Connect to View Reputation"
        description="Please connect your Midnight wallet to view your reputation score and endorsements."
      />
    )
  }

  if (loading) {
    return <LoadingSpinner message="Loading your reputation data..." />
  }

  const reputationScore = profile?.reputationScore || 0
  const reputationInfo = getReputationLevel(reputationScore)
  const verifiedSkills = profile?.skills?.filter(s => s.verified).length || 0
  // const totalEndorsements = mockEndorsements.length
  const verifiedEndorsements = mockEndorsements.filter(e => e.verified).length

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Reputation Score</h1>
        <p className="text-gray-300">Your professional reputation based on verified skills and peer endorsements.</p>
      </div>

      {/* Reputation Overview */}
      <div className="card mb-8">
        <div className="text-center mb-8">
          <div className={`inline-flex items-center justify-center w-32 h-32 rounded-full ${reputationInfo.bgColor} mb-4`}>
            <div className="text-center">
              <div className={`text-4xl font-bold ${reputationInfo.color}`}>{reputationScore}</div>
              <div className={`text-sm ${reputationInfo.color}`}>{reputationInfo.level}</div>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Reputation Score</h2>
          <p className="text-gray-300">Based on verified skills, completed projects, and peer endorsements</p>
        </div>

        {/* Progress to Next Level */}
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-gray-400">Progress to Next Level</span>
            <span className="text-white font-medium">{Math.min(reputationScore + 10, 100)}/100</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${Math.min(reputationScore + 10, 100)}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Reputation Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="card text-center">
          <Award className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
          <div className="text-2xl font-bold text-white">{reputationScore}</div>
          <p className="text-gray-300 text-sm">Overall Score</p>
        </div>
        <div className="card text-center">
          <CheckCircle className="w-8 h-8 text-green-400 mx-auto mb-2" />
          <div className="text-2xl font-bold text-white">{verifiedSkills}</div>
          <p className="text-gray-300 text-sm">Verified Skills</p>
        </div>
        <div className="card text-center">
          <Users className="w-8 h-8 text-blue-400 mx-auto mb-2" />
          <div className="text-2xl font-bold text-white">{verifiedEndorsements}</div>
          <p className="text-gray-300 text-sm">Endorsements</p>
        </div>
        <div className="card text-center">
          <Trophy className="w-8 h-8 text-purple-400 mx-auto mb-2" />
          <div className="text-2xl font-bold text-white">0</div>
          <p className="text-gray-300 text-sm">Completed Jobs</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Endorsements */}
        <div className="card">
          <h2 className="text-xl font-semibold text-white mb-6">Recent Endorsements</h2>
          {mockEndorsements.length === 0 ? (
            <EmptyState
              icon={Star}
              title="No Endorsements Yet"
              description="Complete jobs and build relationships to receive endorsements from clients and peers."
            />
          ) : (
            <div className="space-y-4">
              {mockEndorsements.map((endorsement) => (
                <div key={endorsement.id} className="p-4 bg-gray-800 rounded-lg">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                        <Users className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <p className="text-white font-medium text-sm">{formatAddress(endorsement.endorser)}</p>
                        <p className="text-gray-400 text-xs">endorsed your {endorsement.skill}</p>
                      </div>
                    </div>
                    {endorsement.verified && (
                      <CheckCircle className="w-4 h-4 text-green-400" />
                    )}
                  </div>
                  <p className="text-gray-300 text-sm italic">"{endorsement.message}"</p>
                  <p className="text-gray-500 text-xs mt-2">
                    {new Date(endorsement.timestamp).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Reputation Breakdown */}
        <div className="card">
          <h2 className="text-xl font-semibold text-white mb-6">Reputation Breakdown</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <div>
                  <p className="text-white font-medium">Verified Skills</p>
                  <p className="text-gray-400 text-sm">{verifiedSkills} skills verified</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-white font-bold">+{verifiedSkills * 10}</p>
                <p className="text-gray-400 text-xs">points</p>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
              <div className="flex items-center space-x-3">
                <Users className="w-5 h-5 text-blue-400" />
                <div>
                  <p className="text-white font-medium">Peer Endorsements</p>
                  <p className="text-gray-400 text-sm">{verifiedEndorsements} verified endorsements</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-white font-bold">+{verifiedEndorsements * 15}</p>
                <p className="text-gray-400 text-xs">points</p>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
              <div className="flex items-center space-x-3">
                <Trophy className="w-5 h-5 text-purple-400" />
                <div>
                  <p className="text-white font-medium">Completed Jobs</p>
                  <p className="text-gray-400 text-sm">0 jobs completed successfully</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-white font-bold">+0</p>
                <p className="text-gray-400 text-xs">points</p>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-yellow-400" />
                <div>
                  <p className="text-white font-medium">Account Age</p>
                  <p className="text-gray-400 text-sm">New account</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-white font-bold">+5</p>
                <p className="text-gray-400 text-xs">points</p>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-gray-700">
            <div className="flex items-center justify-between">
              <span className="text-gray-300 font-medium">Total Reputation Score</span>
              <span className="text-2xl font-bold text-white">{reputationScore}</span>
            </div>
          </div>
        </div>
      </div>

      {/* How to Improve */}
      <div className="card mt-8">
        <h2 className="text-xl font-semibold text-white mb-6">How to Improve Your Reputation</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-white font-medium">Verify Your Skills</p>
                <p className="text-gray-300 text-sm">Link professional profiles and upload certificates to verify your expertise.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Trophy className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-white font-medium">Complete Quality Work</p>
                <p className="text-gray-300 text-sm">Successfully complete jobs to build trust and earn positive reviews.</p>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <Users className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-white font-medium">Build Relationships</p>
                <p className="text-gray-300 text-sm">Network with other professionals to receive endorsements and referrals.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <TrendingUp className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-white font-medium">Stay Active</p>
                <p className="text-gray-300 text-sm">Regular activity and engagement helps maintain and improve your reputation.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Reputation