import { useState, useEffect } from 'react'
import { useAccount } from 'wagmi'
import { Star, Award, Users, TrendingUp, MessageSquare, Plus } from 'lucide-react'
import { apiService } from '../services/api'
import type { Endorsement } from '../types'
import { useDemoMode } from '../hooks/useDemoMode'
import { mockApiResponses } from '../data/mockData'

const Reputation = () => {
  const { address, isConnected } = useAccount()
  const { isDemoMode, demoAddress } = useDemoMode()
  const [endorsements, setEndorsements] = useState<Endorsement[]>([])
  const [reputationScore, setReputationScore] = useState(0)
  const [loading, setLoading] = useState(true)
  const [showEndorseForm, setShowEndorseForm] = useState(false)
  const [endorseForm, setEndorseForm] = useState({
    toAddress: '',
    projectId: '',
    message: '',
    rating: 5
  })
  const [submitting, setSubmitting] = useState(false)

  const currentAddress = isDemoMode ? demoAddress : address
  const isUserConnected = isDemoMode || isConnected

  useEffect(() => {
    if (isUserConnected && currentAddress) {
      loadReputationData()
    }
  }, [isUserConnected, currentAddress, isDemoMode])

  const loadReputationData = async () => {
    if (!currentAddress) return
    
    try {
      setLoading(true)
      if (isDemoMode) {
        // Use mock data in demo mode
        const [endorsementsData, reputationData] = await Promise.all([
          mockApiResponses.getEndorsements(),
          mockApiResponses.getReputationScore()
        ])
        setEndorsements(endorsementsData)
        setReputationScore(reputationData.score)
      } else {
        // For real wallet mode, use empty data for now
        // You'll replace this with real API calls:
        // const [endorsementsData, reputationData] = await Promise.all([
        //   apiService.getEndorsements(currentAddress),
        //   apiService.getReputationScore(currentAddress)
        // ])
        setEndorsements([])
        setReputationScore(0)
      }
    } catch (err) {
      console.error('Failed to load reputation data:', err)
      setEndorsements([])
      setReputationScore(0)
    } finally {
      setLoading(false)
    }
  }

  const handleEndorse = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!currentAddress || !endorseForm.toAddress.trim() || !endorseForm.message.trim()) return

    try {
      setSubmitting(true)
      
      if (isDemoMode) {
        // Simulate endorsement in demo mode
        const newEndorsement = await mockApiResponses.addEndorsement({
          fromAddress: currentAddress,
          toAddress: endorseForm.toAddress.trim(),
          projectId: endorseForm.projectId.trim() || `project-${Date.now()}`,
          message: endorseForm.message.trim(),
          rating: endorseForm.rating
        })
        setEndorsements(prev => [newEndorsement, ...prev])
      } else {
        // For real wallet mode, just add to local state for now
        // You'll replace this with: const newEndorsement = await apiService.addEndorsement({...})
        const newEndorsement: Endorsement = {
          id: Date.now().toString(),
          fromAddress: currentAddress,
          toAddress: endorseForm.toAddress.trim(),
          projectId: endorseForm.projectId.trim() || `project-${Date.now()}`,
          message: endorseForm.message.trim(),
          rating: endorseForm.rating,
          createdAt: new Date().toISOString()
        }
        setEndorsements(prev => [newEndorsement, ...prev])
      }
      
      setEndorseForm({ toAddress: '', projectId: '', message: '', rating: 5 })
      setShowEndorseForm(false)
      alert('Endorsement submitted successfully!')
    } catch (err) {
      console.error('Failed to submit endorsement:', err)
      alert('Failed to submit endorsement. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const getReputationLevel = (score: number) => {
    if (score >= 90) return { level: 'Expert', color: 'text-purple-600', bg: 'bg-purple-100' }
    if (score >= 75) return { level: 'Advanced', color: 'text-blue-600', bg: 'bg-blue-100' }
    if (score >= 50) return { level: 'Intermediate', color: 'text-green-600', bg: 'bg-green-100' }
    if (score >= 25) return { level: 'Beginner', color: 'text-yellow-600', bg: 'bg-yellow-100' }
    return { level: 'New', color: 'text-primary-600', bg: 'bg-primary-100' }
  }

  const averageRating = endorsements.length > 0 
    ? endorsements.reduce((sum, e) => sum + e.rating, 0) / endorsements.length 
    : 0

  if (!isUserConnected) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-white mb-2">Wallet Not Connected</h2>
        <p className="text-gray-300">Please connect your wallet to view your reputation.</p>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Reputation & Endorsements</h1>
          <p className="text-gray-300">Track your professional reputation and endorse others.</p>
        </div>
        <button
          onClick={() => setShowEndorseForm(true)}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Endorse Someone</span>
        </button>
      </div>

      {/* Endorsement Form */}
      {showEndorseForm && (
        <div className="card mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">Endorse a Professional</h2>
          <form onSubmit={handleEndorse} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Wallet Address *
              </label>
              <input
                type="text"
                required
                className="input-field font-mono"
                placeholder="0x..."
                value={endorseForm.toAddress}
                onChange={(e) => setEndorseForm(prev => ({ ...prev, toAddress: e.target.value }))}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Project ID (Optional)
              </label>
              <input
                type="text"
                className="input-field"
                placeholder="Project or collaboration identifier"
                value={endorseForm.projectId}
                onChange={(e) => setEndorseForm(prev => ({ ...prev, projectId: e.target.value }))}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Rating *
              </label>
              <div className="flex items-center space-x-2">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button
                    key={rating}
                    type="button"
                    onClick={() => setEndorseForm(prev => ({ ...prev, rating }))}
                    className="focus:outline-none"
                  >
                    <Star
                      className={`w-8 h-8 transition-colors ${
                        rating <= endorseForm.rating
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-500'
                      }`}
                    />
                  </button>
                ))}
                <span className="text-sm text-gray-300 ml-2">
                  ({endorseForm.rating}/5)
                </span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Endorsement Message *
              </label>
              <textarea
                required
                rows={4}
                className="input-field resize-none"
                placeholder="Share your experience working with this professional..."
                value={endorseForm.message}
                onChange={(e) => setEndorseForm(prev => ({ ...prev, message: e.target.value }))}
              />
            </div>

            <div className="flex items-center space-x-4 pt-4">
              <button
                type="submit"
                disabled={submitting}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? 'Submitting...' : 'Submit Endorsement'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowEndorseForm(false)
                  setEndorseForm({ toAddress: '', projectId: '', message: '', rating: 5 })
                }}
                className="btn-secondary"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin w-8 h-8 border-2 border-white border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-300">Loading reputation data...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Reputation Overview */}
          <div className="lg:col-span-1 space-y-6">
            {/* Reputation Score */}
            <div className="card text-center">
              <Award className="w-12 h-12 text-white mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-white mb-2">Reputation Score</h3>
              <div className="text-4xl font-bold text-white mb-2">{reputationScore}</div>
              <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getReputationLevel(reputationScore).bg} ${getReputationLevel(reputationScore).color}`}>
                {getReputationLevel(reputationScore).level}
              </div>
            </div>

            {/* Stats */}
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-4">Statistics</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-gray-300" />
                    <span className="text-sm text-gray-300">Total Endorsements</span>
                  </div>
                  <span className="font-semibold text-white">{endorsements.length}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Star className="w-4 h-4 text-gray-300" />
                    <span className="text-sm text-gray-300">Average Rating</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className="font-semibold text-white">
                      {averageRating.toFixed(1)}
                    </span>
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="w-4 h-4 text-gray-300" />
                    <span className="text-sm text-gray-300">Growth Trend</span>
                  </div>
                  <span className="font-semibold text-green-600">+12%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Endorsements List */}
          <div className="lg:col-span-2">
            <div className="card">
              <div className="flex items-center space-x-2 mb-6">
                <MessageSquare className="w-5 h-5 text-white" />
                <h3 className="text-lg font-semibold text-white">Received Endorsements</h3>
              </div>

              {endorsements.length === 0 ? (
                <div className="text-center py-8">
                  <MessageSquare className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                  <h4 className="text-lg font-medium text-white mb-2">No Endorsements Yet</h4>
                  <p className="text-gray-300">
                    Complete projects and collaborate with others to receive endorsements.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {endorsements.map((endorsement) => (
                    <div key={endorsement.id} className="border border-gray-700 rounded-lg p-4 hover:bg-gray-800 transition-colors">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="font-medium text-white">
                              {endorsement.fromAddress.slice(0, 8)}...{endorsement.fromAddress.slice(-6)}
                            </span>
                            {endorsement.projectId && (
                              <span className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded">
                                {endorsement.projectId}
                              </span>
                            )}
                          </div>
                          <div className="flex items-center space-x-1">
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
                            <span className="text-sm text-gray-300 ml-1">
                              ({endorsement.rating}/5)
                            </span>
                          </div>
                        </div>
                        <span className="text-xs text-gray-400">
                          {new Date(endorsement.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-gray-300 leading-relaxed">
                        "{endorsement.message}"
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Reputation
