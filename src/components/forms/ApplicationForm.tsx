import { useState } from 'react'
import type { Job } from '../../types'

interface ApplicationFormProps {
  job: Job
  onSubmit: (data: ApplicationData) => Promise<void>
  onCancel: () => void
  submitting: boolean
}

export interface ApplicationData {
  coverLetter: string
  portfolioUrl: string
  expectedSalary: string
  availableFrom: string
}

const ApplicationForm = ({ onSubmit, onCancel, submitting }: ApplicationFormProps) => {
  const [formData, setFormData] = useState<ApplicationData>({
    coverLetter: '',
    portfolioUrl: '',
    expectedSalary: '',
    availableFrom: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-white mb-2">
          Cover Letter *
        </label>
        <textarea
          required
          rows={4}
          className="input-field resize-none"
          placeholder="Tell us why you're perfect for this role..."
          value={formData.coverLetter}
          onChange={(e) => setFormData(prev => ({ ...prev, coverLetter: e.target.value }))}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-white mb-2">
          Portfolio/Website URL
        </label>
        <input
          type="url"
          className="input-field"
          placeholder="https://your-portfolio.com"
          value={formData.portfolioUrl}
          onChange={(e) => setFormData(prev => ({ ...prev, portfolioUrl: e.target.value }))}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Expected Salary
          </label>
          <input
            type="text"
            className="input-field"
            placeholder="e.g., $120,000"
            value={formData.expectedSalary}
            onChange={(e) => setFormData(prev => ({ ...prev, expectedSalary: e.target.value }))}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Available From
          </label>
          <input
            type="date"
            className="input-field"
            value={formData.availableFrom}
            onChange={(e) => setFormData(prev => ({ ...prev, availableFrom: e.target.value }))}
          />
        </div>
      </div>

      <div className="flex items-center space-x-4 pt-4">
        <button
          type="submit"
          disabled={submitting}
          className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {submitting ? 'Submitting...' : 'Submit Application'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="btn-secondary"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}

export default ApplicationForm

