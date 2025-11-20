import { useState } from 'react'
import { Upload, Link as LinkIcon, FileText } from 'lucide-react'

export interface SubmissionData {
  description: string
  deliverableUrl: string
  files: File[]
  notes?: string
}

interface SubmissionFormProps {
  onSubmit: (data: SubmissionData) => void
  onCancel: () => void
  submitting: boolean
}

const SubmissionForm = ({ onSubmit, onCancel, submitting }: SubmissionFormProps) => {
  const [description, setDescription] = useState('')
  const [deliverableUrl, setDeliverableUrl] = useState('')
  const [notes, setNotes] = useState('')
  const [files, setFiles] = useState<File[]>([])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      description,
      deliverableUrl,
      files,
      notes
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Description *
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          rows={4}
          className="input-field"
          placeholder="Describe what you've completed and any important details..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          <LinkIcon className="w-4 h-4 inline mr-1" />
          Deliverable URL
        </label>
        <input
          type="url"
          value={deliverableUrl}
          onChange={(e) => setDeliverableUrl(e.target.value)}
          className="input-field"
          placeholder="https://github.com/yourrepo or https://yourdemo.com"
        />
        <p className="text-xs text-gray-400 mt-1">
          Link to GitHub repository, live demo, or documentation
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          <Upload className="w-4 h-4 inline mr-1" />
          Upload Files (Optional)
        </label>
        <input
          type="file"
          onChange={handleFileChange}
          multiple
          className="input-field"
        />
        {files.length > 0 && (
          <div className="mt-2 space-y-1">
            {files.map((file, index) => (
              <div key={index} className="flex items-center space-x-2 text-sm text-gray-400">
                <FileText className="w-4 h-4" />
                <span>{file.name}</span>
                <span className="text-xs">({(file.size / 1024).toFixed(2)} KB)</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Additional Notes
        </label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={3}
          className="input-field"
          placeholder="Any additional comments or notes for the client..."
        />
      </div>

      <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-700">
        <button
          type="button"
          onClick={onCancel}
          disabled={submitting}
          className="px-4 py-2 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={submitting || !description}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
        >
          {submitting ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
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
    </form>
  )
}

export default SubmissionForm
