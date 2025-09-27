import { useState, useEffect } from 'react'
import { useAccount } from 'wagmi'
import { Plus, Upload, ExternalLink, CheckCircle, Clock, Trash2 } from 'lucide-react'
import { apiService } from '../services/api'
import type { Skill } from '../types'
import { useDemoMode } from '../hooks/useDemoMode'
import { mockApiResponses, mockSkills } from '../data/mockData'

const Skills = () => {
  const { address, isConnected } = useAccount()
  const { isDemoMode, demoAddress } = useDemoMode()
  const [skills, setSkills] = useState<Skill[]>([])
  const [loading, setLoading] = useState(true)
  const [showAddForm, setShowAddForm] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    proofUrl: '',
    proofFile: null as File | null
  })
  const [submitting, setSubmitting] = useState(false)

  const currentAddress = isDemoMode ? demoAddress : address
  const isUserConnected = isDemoMode || isConnected

  useEffect(() => {
    if (isUserConnected && currentAddress) {
      loadSkills()
    }
  }, [isUserConnected, currentAddress, isDemoMode])

  const loadSkills = async () => {
    if (!currentAddress) return
    
    try {
      setLoading(true)
      if (isDemoMode) {
        // Use mock data in demo mode
        const skillsData = await mockApiResponses.getSkills()
        setSkills(skillsData)
      } else {
        // For now, just use empty array for real wallet mode
        // You'll replace this with: const skillsData = await apiService.getSkills(currentAddress)
        setSkills([])
      }
    } catch (err) {
      console.error('Failed to load skills:', err)
      setSkills([])
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!currentAddress || !formData.name.trim() || !formData.description.trim()) return

    try {
      setSubmitting(true)
      
      if (isDemoMode) {
        // Simulate adding skill in demo mode
        const newSkill = await mockApiResponses.addSkill({
          name: formData.name.trim(),
          description: formData.description.trim(),
          proofUrl: formData.proofUrl.trim() || undefined,
          proofFile: formData.proofFile || undefined
        })
        setSkills(prev => [newSkill, ...prev])
      } else {
        // For real wallet mode, just add to local state for now
        // You'll replace this with: const newSkill = await apiService.addSkill(currentAddress, {...})
        const newSkill: Skill = {
          id: Date.now().toString(),
          name: formData.name.trim(),
          description: formData.description.trim(),
          proofUrl: formData.proofUrl.trim() || undefined,
          weight: 0, // Will be determined by your backend algorithm
          verified: false, // Will be determined by your backend algorithm
          createdAt: new Date().toISOString()
        }
        setSkills(prev => [newSkill, ...prev])
      }
      
      setFormData({ name: '', description: '', proofUrl: '', proofFile: null })
      setShowAddForm(false)
    } catch (err) {
      console.error('Failed to add skill:', err)
      alert('Failed to add skill. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData(prev => ({ ...prev, proofFile: file }))
    }
  }

  const handleDeleteSkill = async (skillId: string) => {
    if (!currentAddress || !confirm('Are you sure you want to delete this skill?')) return

    try {
      if (isDemoMode) {
        // Simulate deletion in demo mode
        await mockApiResponses.deleteSkill()
      } else {
        // For real wallet mode, just remove from local state for now
        // You'll replace this with: await apiService.deleteSkill(currentAddress, skillId)
      }
      setSkills(prev => prev.filter(skill => skill.id !== skillId))
    } catch (err) {
      console.error('Failed to delete skill:', err)
      alert('Failed to delete skill. Please try again.')
    }
  }

  if (!isUserConnected) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-white mb-2">Wallet Not Connected</h2>
        <p className="text-gray-300">Please connect your wallet to manage your skills.</p>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">My Skills</h1>
          <p className="text-gray-300">Manage your professional skills and verification proofs.</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Skill</span>
        </button>
      </div>

      {/* Add Skill Form */}
      {showAddForm && (
        <div className="card mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">Add New Skill</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Skill Name *
              </label>
              <input
                type="text"
                required
                className="input-field"
                placeholder="e.g., React Development, Data Analysis, UI/UX Design"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Description *
              </label>
              <textarea
                required
                rows={3}
                className="input-field resize-none"
                placeholder="Describe your expertise and experience with this skill..."
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Proof URL (Optional)
              </label>
              <input
                type="url"
                className="input-field"
                placeholder="https://github.com/username/project or portfolio link"
                value={formData.proofUrl}
                onChange={(e) => setFormData(prev => ({ ...prev, proofUrl: e.target.value }))}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Upload Proof File (Optional)
              </label>
              <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center hover:border-gray-500 transition-colors">
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <div className="text-sm text-gray-300 mb-2">
                  Drop a file here or click to browse
                </div>
                <input
                  type="file"
                  className="hidden"
                  id="proof-file"
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.gif"
                  onChange={handleFileChange}
                />
                <label
                  htmlFor="proof-file"
                  className="btn-secondary cursor-pointer inline-block"
                >
                  Choose File
                </label>
                {formData.proofFile && (
                  <p className="text-sm text-white mt-2">
                    Selected: {formData.proofFile.name}
                  </p>
                )}
              </div>
              <p className="text-xs text-gray-400 mt-2">
                Supported formats: PDF, DOC, DOCX, JPG, PNG, GIF (Max 10MB)
              </p>
            </div>

            <div className="flex items-center space-x-4 pt-4">
              <button
                type="submit"
                disabled={submitting}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? 'Adding...' : 'Add Skill'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowAddForm(false)
                  setFormData({ name: '', description: '', proofUrl: '', proofFile: null })
                }}
                className="btn-secondary"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Skills List */}
      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin w-8 h-8 border-2 border-white border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-300">Loading your skills...</p>
        </div>
      ) : skills.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <Plus className="w-8 h-8 text-gray-300" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">No Skills Added Yet</h3>
          <p className="text-gray-300 mb-4">Start building your professional profile by adding your first skill.</p>
          <button
            onClick={() => setShowAddForm(true)}
            className="btn-primary"
          >
            Add Your First Skill
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill) => (
            <div key={skill.id} className="card hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-2">
                  {skill.verified ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : (
                    <Clock className="w-5 h-5 text-yellow-500" />
                  )}
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    skill.verified 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {skill.verified ? 'Verified' : 'Pending'}
                  </span>
                </div>
                <button
                  onClick={() => handleDeleteSkill(skill.id)}
                  className="text-red-500 hover:text-red-700 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <h3 className="text-lg font-semibold text-white mb-2">{skill.name}</h3>
              <p className="text-sm text-gray-300 mb-4 line-clamp-3">{skill.description}</p>

              <div className="flex items-center justify-between text-sm">
                <div className="text-gray-400">
                  Weight: <span className="font-medium text-white">{skill.weight}</span>
                </div>
                <div className="text-gray-400">
                  Added: {new Date(skill.createdAt).toLocaleDateString()}
                </div>
              </div>

              {skill.proofUrl && (
                <div className="mt-4 pt-4 border-t border-gray-700">
                  <a
                    href={skill.proofUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-sm text-white hover:underline"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>View Proof</span>
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Skills
