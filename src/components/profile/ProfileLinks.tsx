import { useState } from 'react'
import { Edit3, Upload, FileText, ExternalLink, Github, BarChart3, User } from 'lucide-react'
import Modal from '../ui/Modal'
import EmptyState from '../ui/EmptyState'

interface ProfileLinks {
  resume?: string
  github?: string
  kaggle?: string
  portfolio?: string
  linkedin?: string
}

interface ProfileLinksProps {
  links: ProfileLinks
  onSaveLinks: (links: ProfileLinks) => Promise<void>
  onUploadResume: (file: File) => Promise<void>
  savingLinks: boolean
  uploadingResume: boolean
}

const ProfileLinksComponent = ({ 
  links, 
  onSaveLinks, 
  onUploadResume, 
  savingLinks, 
  uploadingResume 
}: ProfileLinksProps) => {
  const [showEditLinks, setShowEditLinks] = useState(false)
  const [showResumeUpload, setShowResumeUpload] = useState(false)
  const [profileLinks, setProfileLinks] = useState<ProfileLinks>(links)
  const [resumeFile, setResumeFile] = useState<File | null>(null)

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
    if (!url.trim()) return true
    try {
      new URL(url)
      switch (type) {
        case 'github': return url.includes('github.com/')
        case 'kaggle': return url.includes('kaggle.com/')
        case 'linkedin': return url.includes('linkedin.com/')
        default: return true
      }
    } catch {
      return false
    }
  }

  const handleSaveLinks = async () => {
    await onSaveLinks(profileLinks)
    setShowEditLinks(false)
  }

  const handleResumeUpload = async () => {
    if (!resumeFile) return
    await onUploadResume(resumeFile)
    setShowResumeUpload(false)
    setResumeFile(null)
  }

  return (
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

      {Object.keys(links).length === 0 ? (
        <EmptyState
          icon={FileText}
          title="No Professional Links Added"
          description="Add your resume, GitHub, Kaggle, and other professional links to showcase your work."
          action={{
            label: 'Add Links',
            onClick: () => setShowEditLinks(true)
          }}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(links).map(([type, url]) => (
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

      {/* Edit Links Modal */}
      <Modal
        isOpen={showEditLinks}
        onClose={() => setShowEditLinks(false)}
        title="Edit Professional Links"
        maxWidth="2xl"
        maxHeight
      >
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
              <span>Save Links</span>
            )}
          </button>
        </div>
      </Modal>

      {/* Resume Upload Modal */}
      <Modal
        isOpen={showResumeUpload}
        onClose={() => setShowResumeUpload(false)}
        title="Upload Resume"
        maxWidth="md"
      >
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
      </Modal>
    </div>
  )
}

export default ProfileLinksComponent

