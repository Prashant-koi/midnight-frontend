import { useState, useEffect } from 'react'
import { Plus, Star, CheckCircle, Clock, Award, TrendingUp } from 'lucide-react'
import { apiService } from '../services/api'
import type { Skill } from '../types'
import { useMidnightWallet } from '../hooks/useMidnightWallet'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import EmptyState from '../components/ui/EmptyState'
import Modal from '../components/ui/Modal'

const Skills = () => {
  const { account, isConnected } = useMidnightWallet()
  const [skills, setSkills] = useState<Skill[]>([])
  const [loading, setLoading] = useState(true)
  const [showAddForm, setShowAddForm] = useState(false)
  const [newSkill, setNewSkill] = useState({ name: '', description: '' })
  const [submitting, setSubmitting] = useState(false)

  const currentAddress = account
  const isUserConnected = isConnected

  useEffect(() => {
    if (isUserConnected && currentAddress) {
      loadSkills()
    }
  }, [isUserConnected, currentAddress])

  const loadSkills = async () => {
    if (!currentAddress) return
    try {
      setLoading(true)
      const skillsData = await apiService.getSkills(currentAddress)
      setSkills(skillsData)
    } catch (err) {
      console.error('Failed to load skills:', err)
      setSkills([])
    } finally {
      setLoading(false)
    }
  }

  const handleAddSkill = async () => {
    if (!currentAddress || !newSkill.name.trim()) return
    try {
      setSubmitting(true)
      // Real API call when backend is ready:
      // await apiService.addSkill(currentAddress, newSkill)
      alert('Skill addition will be available when connected to backend.')
      setNewSkill({ name: '', description: '' })
      setShowAddForm(false)
    } catch (err) {
      console.error('Failed to add skill:', err)
      alert('Failed to add skill. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const getStatusIcon = (verified: boolean) => {
    return verified ? (
      <CheckCircle className="w-4 h-4 text-green-400" />
    ) : (
      <Clock className="w-4 h-4 text-yellow-400" />
    )
  }

  const getStatusText = (verified: boolean) => {
    return verified ? 'Verified' : 'Pending Verification'
  }

  const getStatusColor = (verified: boolean) => {
    return verified
      ? 'bg-green-100 text-green-800'
      : 'bg-yellow-100 text-yellow-800'
  }

  const verifiedCount = skills.filter(s => s.verified).length
  const totalWeight = skills.reduce((sum, skill) => sum + skill.weight, 0)
  const avgWeight = skills.length > 0 ? (totalWeight / skills.length).toFixed(1) : '0'

  if (!isUserConnected) {
    return (
      <EmptyState
        icon={Star}
        title="Connect to Manage Skills"
        description="Please connect your Midnight wallet to view and manage your professional skills."
      />
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Professional Skills</h1>
          <p className="text-gray-300">Manage and verify your professional skills to build reputation.</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Skill</span>
        </button>
      </div>

      {/* Skills Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="card text-center">
          <Star className="w-8 h-8 text-white mx-auto mb-2" />
          <div className="text-2xl font-bold text-white">{skills.length}</div>
          <p className="text-gray-300 text-sm">Total Skills</p>
        </div>
        <div className="card text-center">
          <CheckCircle className="w-8 h-8 text-green-400 mx-auto mb-2" />
          <div className="text-2xl font-bold text-white">{verifiedCount}</div>
          <p className="text-gray-300 text-sm">Verified Skills</p>
        </div>
        <div className="card text-center">
          <TrendingUp className="w-8 h-8 text-blue-400 mx-auto mb-2" />
          <div className="text-2xl font-bold text-white">{avgWeight}</div>
          <p className="text-gray-300 text-sm">Average Weight</p>
        </div>
      </div>

      {loading ? (
        <LoadingSpinner message="Loading your skills..." />
      ) : skills.length === 0 ? (
        <EmptyState
          icon={Star}
          title="No Skills Added Yet"
          description="Start building your professional profile by adding your skills and expertise."
          action={{
            label: 'Add Your First Skill',
            onClick: () => setShowAddForm(true)
          }}
        />
      ) : (
        <div className="space-y-6">
          {/* Skills List */}
          <div className="card">
            <h2 className="text-xl font-semibold text-white mb-6">Your Skills</h2>
            <div className="space-y-4">
              {skills.map((skill) => (
                <div key={skill.id} className="flex items-start justify-between p-4 bg-gray-800 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-medium text-white">{skill.name}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getStatusColor(skill.verified)}`}>
                        {getStatusIcon(skill.verified)}
                        <span>{getStatusText(skill.verified)}</span>
                      </span>
                    </div>
                    <p className="text-gray-300 text-sm mb-3">{skill.description}</p>
                    <div className="flex items-center space-x-4 text-sm">
                      <div className="flex items-center space-x-1">
                        <Award className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-400">Weight: <span className="text-white font-medium">{skill.weight}</span></span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-400">Added: {new Date(skill.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    <button className="text-gray-400 hover:text-white transition-colors text-sm px-3 py-1 rounded border border-gray-600 hover:border-gray-500">
                      Edit
                    </button>
                    {!skill.verified && (
                      <button className="text-blue-400 hover:text-blue-300 transition-colors text-sm px-3 py-1 rounded border border-blue-600 hover:border-blue-500">
                        Verify
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Verification Tips */}
          <div className="card">
            <h2 className="text-xl font-semibold text-white mb-4">Skill Verification Tips</h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-white font-medium">Link Professional Profiles</p>
                  <p className="text-gray-300">Connect your GitHub, LinkedIn, and portfolio to automatically verify skills.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-white font-medium">Upload Certificates</p>
                  <p className="text-gray-300">Add professional certifications and course completions as proof.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-white font-medium">Complete Projects</p>
                  <p className="text-gray-300">Successfully completing jobs builds skill verification and reputation.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Skill Modal */}
      <Modal
        isOpen={showAddForm}
        onClose={() => setShowAddForm(false)}
        title="Add New Skill"
        maxWidth="md"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Skill Name *
            </label>
            <input
              type="text"
              required
              className="input-field"
              placeholder="e.g., React Development, Data Analysis, UI/UX Design"
              value={newSkill.name}
              onChange={(e) => setNewSkill(prev => ({ ...prev, name: e.target.value }))}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Description
            </label>
            <textarea
              rows={3}
              className="input-field resize-none"
              placeholder="Briefly describe your experience and proficiency with this skill..."
              value={newSkill.description}
              onChange={(e) => setNewSkill(prev => ({ ...prev, description: e.target.value }))}
            />
          </div>

          <div className="bg-blue-900 border border-blue-600 rounded-lg p-4">
            <p className="text-blue-200 text-sm">
              <strong>💡 Skill Verification:</strong><br />
              After adding a skill, you can verify it by linking professional profiles, uploading certificates, or completing relevant projects. Verified skills carry more weight in your reputation score.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-end space-x-4 mt-6 pt-4 border-t border-gray-700">
          <button
            onClick={() => setShowAddForm(false)}
            className="btn-secondary"
            disabled={submitting}
          >
            Cancel
          </button>
          <button
            onClick={handleAddSkill}
            disabled={submitting || !newSkill.name.trim()}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            {submitting ? (
              <>
                <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                <span>Adding...</span>
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                <span>Add Skill</span>
              </>
            )}
          </button>
        </div>
      </Modal>
    </div>
  )
}

export default Skills