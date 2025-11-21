import { useState, useEffect } from 'react'
import { useAccount } from 'wagmi'
import { 
  User, 
  Award, 
  Star, 
  ExternalLink, 
  Plus, 
  Edit3, 
  Github, 
  FileText, 
  BarChart3,
  Save,
  X,
  Upload
} from 'lucide-react'
import { apiService } from '../services/api'
import type { UserProfile } from '../types'
import { useDemoMode } from '../hooks/useDemoMode'
import { mockApiResponses } from '../data/mockData'

interface ProfileLinks {
  resume?: string
  github?: string
  kaggle?: string
  portfolio?: string
  linkedin?: string
}

const Profile = () => {
  const { address, isConnected } = useAccount()
  const { isDemoMode, demoAddress } = useDemoMode()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [showEditLinks, setShowEditLinks] = useState(false)
  const [showResumeUpload, setShowResumeUpload] = useState(false)
  const [profileLinks, setProfileLinks] = useState<ProfileLinks>({})
  const [resumeFile, setResumeFile] = useState<File | null>(null)
  const [savingLinks, setSavingLinks] = useState(false)
  const [uploadingResume, setUploadingResume] = useState(false)

  const currentAddress = isDemoMode ? demoAddress : address
  const isUserConnected = isDemoMode || isConnected

  // Mock profile links data
  const mockProfileLinks: ProfileLinks = {
    resume: 'https://drive.google.com/file/d/1a2b3c4d5e6f/resume.pdf',
    github: 'https://github.com/johndoe',
    kaggle: 'https://kaggle.com/johndoe',
    portfolio: 'https://johndoe.dev',
    linkedin: 'https://linkedin.com/in/johndoe'
  }

  useEffect(() => {
    if (isUserConnected && currentAddress) {
      loadProfile()
      loadProfileLinks()
    }
  }, [isUserConnected, currentAddress, isDemoMode])

  const loadProfile = async () => {
    if (!currentAddress) return

    try {
      setLoading(true)
      const profileData = isDemoMode 
        ? await mockApiResponses.getProfile()
        : await apiService.getProfile(currentAddress)
      
      setProfile(profileData)
    } catch (err) {
      console.error('Failed to load profile:', err)
    } finally {
      setLoading(false)
    }
  }

  const loadProfileLinks = async () => {
    if (!currentAddress) return

    try {
      if (isDemoMode) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500))
        setProfileLinks(mockProfileLinks)
      } else {
        // Real API call would go here
        // const links = await apiService.getProfileLinks(currentAddress)
        setProfileLinks({})
      }
    } catch (err) {
      console.error('Failed to load profile links:', err)
    }
  }

  const handleSaveLinks = async () => {
    if (!currentAddress) return

    try {
      setSavingLinks(true)
      
      if (isDemoMode) {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500))
        alert('Profile links updated successfully!')
      } else {
        // Real API call would go here
        // await apiService.updateProfileLinks(currentAddress, profileLinks)
        alert('Profile links will be updated when connected to wallet.')
      }
      
      setShowEditLinks(false)
    } catch (err) {
      console.error('Failed to save profile links:', err)
      alert('Failed to update profile links. Please try again.')
    } finally {
      setSavingLinks(false)
    }
  }

  const handleResumeUpload = async () => {
    if (!resumeFile || !currentAddress) return

    try {
      setUploadingResume(true)
      
      if (isDemoMode) {
        // Simulate file upload in demo mode
        await new Promise(resolve => setTimeout(resolve, 2000))
        
        const mockResumeUrl = `https://storage.example.com/resumes/${resumeFile.name}`
        setProfileLinks(prev => ({ ...prev, resume: mockResumeUrl }))
        
        alert('Resume uploaded successfully! (Demo Mode)')
      } else {
        // Real file upload - call the middleware API at localhost:3001
        console.log('📤 Uploading resume to middleware API...')
        console.log('  - File:', resumeFile.name)
        console.log('  - Size:', resumeFile.size, 'bytes')
        console.log('  - Candidate ID:', currentAddress)
        
        // Extract GitHub username from profile links if available
        const githubUsername = profileLinks.github 
          ? profileLinks.github.split('/').pop() 
          : undefined
        
        console.log('  - GitHub username:', githubUsername || 'none')
        
        // Call the middleware API
        const result = await apiService.uploadResume(
          currentAddress,
          resumeFile,
          githubUsername
        )
        
        console.log('✅ Resume upload successful:', result)
        
        // Check if we got verified skills back
        if (result.verification && result.verification.skills) {
          const skillCount = result.verification.skills.length
          const highConfidenceSkills = result.verification.skills.filter(
            (s: any) => s.confidence >= 70
          ).length
          
          alert(
            `Resume uploaded and analyzed! 🎉\n\n` +
            `Found ${skillCount} skills\n` +
            `${highConfidenceSkills} with high confidence (≥70%)\n\n` +
            `Check your Skills page to see the results!`
          )
          
          // Optionally refresh the profile to show new skills
          // await loadProfile()
        } else {
          alert('Resume uploaded successfully!')
        }
        
        // Store the resume URL in profile links
        const resumeUrl = `uploaded-${resumeFile.name}`
        setProfileLinks(prev => ({ ...prev, resume: resumeUrl }))
      }
      
      setShowResumeUpload(false)
      setResumeFile(null)
    } catch (err) {
      console.error('❌ Failed to upload resume:', err)
      const errorMessage = err instanceof Error ? err.message : 'Unknown error'
      alert(
        `Failed to upload resume:\n\n${errorMessage}\n\n` +
        `Make sure the middleware API is running:\n` +
        `cd middleware-api && npm run dev`
      )
    } finally {
      setUploadingResume(false)
    }
  }

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`
  }

  const getLinkIcon = (type: string) => {
    switch (type) {
      case 'github': return <Github className="w-4 h-4" />
      case 'kaggle': return <BarChart3 className="w-4 h-4" />
      case 'resume': return <FileText className="w-4 h-4" />
      case 'portfolio': return <ExternalLink className="w-4 h-4" />
      case 'linkedin': return <User className="w-4 h-4" />
      default: return <ExternalLink className="w-4 h-4" />
    }
  }

  const getLinkLabel = (type: string) => {
    switch (type) {
      case 'github': return 'GitHub Profile'
      case 'kaggle': return 'Kaggle Profile'
      case 'resume': return 'Resume/CV'
      case 'portfolio': return 'Portfolio Website'
      case 'linkedin': return 'LinkedIn Profile'
      default: return type.charAt(0).toUpperCase() + type.slice(1)
    }
  }

  const validateUrl = (url: string, type: string) => {
    if (!url.trim()) return true // Empty is valid
    
    try {
      new URL(url)
      switch (type) {
        case 'github':
          return url.includes('github.com/')
        case 'kaggle':
          return url.includes('kaggle.com/')
        case 'linkedin':
          return url.includes('linkedin.com/')
        default:
          return true
      }
    } catch {
      return false
    }
  }

  if (!isUserConnected) {
    return (
      <div className="text-center py-12">
        <User className="w-16 h-16 text-gray-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-white mb-2">Connect to View Profile</h2>
        <p className="text-gray-300">Please connect your wallet or try demo mode to view your professional profile.</p>
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
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Profile Header */}
      <div className="card">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white mb-1">
                Professional Profile
              </h1>
              <p className="text-gray-300 font-mono text-sm">
                {currentAddress ? formatAddress(currentAddress) : 'No address'}
              </p>
              {isDemoMode && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-900 text-blue-300 mt-2">
                  Demo Mode
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Reputation Score */}
        <div className="flex items-center justify-center p-6 bg-gradient-to-br from-yellow-900 to-orange-900 rounded-lg mb-6">
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Award className="w-8 h-8 text-yellow-400 mr-2" />
              <span className="text-3xl font-bold text-white">{profile?.reputationScore || 0}</span>
            </div>
            <p className="text-yellow-200 text-sm font-medium">Reputation Score</p>
          </div>
        </div>
      </div>

      {/* Professional Links Section */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">Professional Links</h2>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowResumeUpload(true)}
              className="flex items-center space-x-2 px-3 py-2 rounded-lg border border-gray-600 text-gray-300 hover:text-white hover:border-gray-500 transition-colors text-sm"
            >
              <Upload className="w-4 h-4" />
              <span>Upload Resume</span>
            </button>
            <button
              onClick={() => setShowEditLinks(true)}
              className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-white text-black hover:bg-gray-200 transition-colors text-sm"
            >
              <Edit3 className="w-4 h-4" />
              <span>Edit Links</span>
            </button>
          </div>
        </div>

        {Object.keys(profileLinks).length === 0 ? (
          <div className="text-center py-8">
            <FileText className="w-12 h-12 text-gray-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">No Professional Links Added</h3>
            <p className="text-gray-300 text-sm mb-4">
              Add your resume, GitHub, Kaggle, and other professional links to showcase your work.
            </p>
            <button
              onClick={() => setShowEditLinks(true)}
              className="btn-primary"
            >
              Add Links
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(profileLinks).map(([type, url]) => (
              url && (
                <div key={type} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                  <div className="flex items-center space-x-3">
                    {getLinkIcon(type)}
                    <div>
                      <p className="text-white font-medium text-sm">{getLinkLabel(type)}</p>
                      <p className="text-gray-400 text-xs truncate max-w-48">{url}</p>
                    </div>
                  </div>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              )
            ))}
          </div>
        )}
      </div>

      {/* Skills Overview */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">Skills Overview</h2>
          <div className="flex items-center space-x-2 text-sm text-gray-300">
            <span>{profile?.skills.length || 0} skills</span>
            <span>•</span>
            <span>{profile?.skills.filter(s => s.verified).length || 0} verified</span>
          </div>
        </div>

        {profile?.skills && profile.skills.length > 0 ? (
          <div className="space-y-3">
            {profile.skills.slice(0, 3).map((skill) => (
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
        ) : (
          <div className="text-center py-8">
            <Star className="w-12 h-12 text-gray-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">No Skills Added</h3>
            <p className="text-gray-300 text-sm">Add your professional skills to start building your reputation.</p>
          </div>
        )}
      </div>

      {/* Recent Endorsements */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">Recent Endorsements</h2>
          <span className="text-sm text-gray-300">{profile?.endorsements.length || 0} total</span>
        </div>

        {profile?.endorsements && profile.endorsements.length > 0 ? (
          <div className="space-y-4">
            {profile.endorsements.slice(0, 3).map((endorsement) => (
              <div key={endorsement.id} className="p-4 bg-gray-800 rounded-lg">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < endorsement.rating
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-600'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-400">
                      {new Date(endorsement.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <p className="text-gray-300 text-sm italic mb-2">"{endorsement.message}"</p>
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <span>Project: {endorsement.projectId}</span>
                  <span>From: {formatAddress(endorsement.fromAddress)}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <Award className="w-12 h-12 text-gray-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">No Endorsements Yet</h3>
            <p className="text-gray-300 text-sm">Complete projects to receive endorsements from clients.</p>
          </div>
        )}
      </div>

      {/* Edit Links Modal */}
      {showEditLinks && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-900 rounded-lg p-6 w-full max-w-2xl max-h-96 overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white">Edit Professional Links</h2>
              <button
                onClick={() => setShowEditLinks(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              {['resume', 'github', 'kaggle', 'portfolio', 'linkedin'].map((type) => (
                <div key={type}>
                  <label className="block text-sm font-medium text-white mb-2">
                    {getLinkLabel(type)} {type === 'resume' ? '(Upload separately above)' : ''}
                  </label>
                  <div className="flex items-center space-x-2">
                    {getLinkIcon(type)}
                    <input
                      type="url"
                      className="input-field flex-1"
                      placeholder={`https://${type === 'github' ? 'github.com/username' : 
                                                type === 'kaggle' ? 'kaggle.com/username' : 
                                                type === 'linkedin' ? 'linkedin.com/in/username' :
                                                type === 'resume' ? 'drive.google.com/file/...' : 'your-website.com'}`}
                      value={profileLinks[type as keyof ProfileLinks] || ''}
                      onChange={(e) => setProfileLinks(prev => ({ ...prev, [type]: e.target.value }))}
                      disabled={type === 'resume'}
                    />
                  </div>
                  {profileLinks[type as keyof ProfileLinks] && !validateUrl(profileLinks[type as keyof ProfileLinks]!, type) && (
                    <p className="text-red-400 text-xs mt-1">Please enter a valid {type} URL</p>
                  )}
                </div>
              ))}
            </div>

            <div className="flex items-center justify-end space-x-4 mt-6 pt-4 border-t border-gray-700">
              <button
                onClick={() => setShowEditLinks(false)}
                className="btn-secondary"
                disabled={savingLinks}
              >
                Cancel
              </button>
              <button
                onClick={handleSaveLinks}
                disabled={savingLinks}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                {savingLinks ? (
                  <>
                    <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>Save Links</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Resume Upload Modal */}
      {showResumeUpload && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-900 rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white">Upload Resume</h2>
              <button
                onClick={() => setShowResumeUpload(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Select Resume File (PDF, DOC, DOCX)
                </label>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => setResumeFile(e.target.files?.[0] || null)}
                  className="input-field"
                />
                {resumeFile && (
                  <p className="text-sm text-gray-300 mt-2">
                    Selected: {resumeFile.name} ({(resumeFile.size / 1024 / 1024).toFixed(2)} MB)
                  </p>
                )}
              </div>

              <div className="bg-blue-900 border border-blue-600 rounded-lg p-4">
                <p className="text-blue-200 text-sm">
                  <strong>📋 Upload Guidelines:</strong><br />
                  • Maximum file size: 10MB<br />
                  • Supported formats: PDF, DOC, DOCX<br />
                  • Your resume will be stored securely and can be shared with potential employers
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-4 mt-6 pt-4 border-t border-gray-700">
              <button
                onClick={() => setShowResumeUpload(false)}
                className="btn-secondary"
                disabled={uploadingResume}
              >
                Cancel
              </button>
              <button
                onClick={handleResumeUpload}
                disabled={uploadingResume || !resumeFile}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                {uploadingResume ? (
                  <>
                    <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                    <span>Uploading...</span>
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4" />
                    <span>Upload Resume</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Profile
