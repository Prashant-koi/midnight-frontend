import { useState } from 'react'
import { Github, Upload } from 'lucide-react'

interface SubmissionFormProps {
  onSubmit: (data: SubmissionData) => Promise<void>
  onCancel: () => void
  submitting: boolean
}

export interface SubmissionData {
  repoUrl: string
  description: string
  notes: string
}

const SubmissionForm = ({ onSubmit, onCancel, submitting }: SubmissionFormProps) => {
  const [formData, setFormData] = useState<SubmissionData>({
    repoUrl: '',
    description: '',
    notes: ''
  })

  const handleSubmit = async () => {
    if (!formData.repoUrl.trim()) {
      alert('Please provide a GitHub repository URL.')
      return
    }

    const githubUrlPattern = /^https:\/\/github\.com\/[\w\-\.]+\/[\w\-\.]+\/?$/
    if (!githubUrlPattern.test(formData.repoUrl.trim())) {
      alert('Please provide a valid GitHub repository URL (e.g., https://github.com/username/repository)')
      return
    }

    await onSubmit(formData)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2 mb-6">
        <Github className="w-6 h-6 text-white" />
        <h2 className="text-xl font-semibold text-white">Submit Job Deliverable</h2>
      </div>

      <div>
        <label className="block text-sm font-medium text-white mb-2">
          GitHub Repository URL *
        </label>
        <input
          type="url"
          required
          className="input-field"
          placeholder="https://github.com/username/repository"
          value={formData.repoUrl}
          onChange={(e) => setFormData(prev => ({ ...prev, repoUrl: e.target.value }))}
        />
        <p className="text-xs text-gray-400 mt-1">
          Please provide the GitHub repository containing your completed work
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-white mb-2">
          Project Description
        </label>
        <textarea
          rows={3}
          className="input-field resize-none"
          placeholder="Briefly describe what you've delivered..."
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-white mb-2">
          Additional Notes
        </label>
        <textarea
          rows={2}
          className="input-field resize-none"
          placeholder="Any additional notes for the client..."
          value={formData.notes}
          onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
        />
      </div>

      <div className="bg-blue-900 border border-blue-600 rounded-lg p-4">
        <p className="text-blue-200 text-sm">
          <strong>📋 Submission Guidelines:</strong><br />
          • Ensure your repository is public or accessible to the client<br />
          • Include a comprehensive README with setup instructions<br />
          • Make sure all requirements from the job description are met<br />
          • Your submission will be reviewed within 2-3 business days
        </p>
      </div>

      <div className="flex items-center justify-end space-x-4 mt-6 pt-4 border-t border-gray-700">
        <button
          type="button"
          onClick={onCancel}
          className="btn-secondary"
          disabled={submitting}
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          disabled={submitting || !formData.repoUrl.trim()}
          className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
        >
          {submitting ? (
            <>
              <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
              <span>Submitting...</span>
            </>
          ) : (
            <>
              <Upload className="w-4 h-4" />
              <span>Submit Job</span>
            </>
          )}
        </button>
      </div>
    </div>
  )
}

export default SubmissionForm

