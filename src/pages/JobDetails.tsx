import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useAccount } from 'wagmi'
import { 
  ArrowLeft, 
  Briefcase, 
  MapPin, 
  DollarSign, 
  Clock, 
  Users, 
  Building, 
  Star,
  CheckCircle,
  AlertTriangle,
  ExternalLink,
  Share2,
  BookmarkPlus,
  Flag
} from 'lucide-react'
import { useDemoMode } from '../hooks/useDemoMode'
import { mockApiResponses } from '../data/mockData'
import type { Job } from '../types'

const JobDetails = () => {
  const { jobId } = useParams<{ jobId: string }>()
  const navigate = useNavigate()
  const { address, isConnected } = useAccount()
  const { isDemoMode, demoAddress } = useDemoMode()
  const [job, setJob] = useState<Job | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showApplicationForm, setShowApplicationForm] = useState(false)
  const [applicationData, setApplicationData] = useState({
    coverLetter: '',
    portfolioUrl: '',
    expectedSalary: '',
    availableFrom: ''
  })
  const [submitting, setSubmitting] = useState(false)

  const currentAddress = isDemoMode ? demoAddress : address
  const isUserConnected = isDemoMode || isConnected

  useEffect(() => {
    if (jobId) {
      loadJobDetails()
    }
  }, [jobId])

  const loadJobDetails = async () => {
    if (!jobId) return

    try {
      setLoading(true)
      setError(null)
      
      // Get all jobs and find the specific one
      const jobsData = await mockApiResponses.getJobs()
      const foundJob = jobsData.find(j => j.id === jobId)
      
      if (!foundJob) {
        setError('Job not found')
        return
      }
      
      setJob(foundJob)
    } catch (err) {
      console.error('Failed to load job details:', err)
      setError('Failed to load job details')
    } finally {
      setLoading(false)
    }
  }

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isUserConnected || !job) {
      alert('Please connect your wallet or enable demo mode to apply.')
      return
    }

    try {
      setSubmitting(true)
      
      // Simulate application submission
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      alert('Application submitted successfully! The employer will review your application.')
      setShowApplicationForm(false)
      setApplicationData({
        coverLetter: '',
        portfolioUrl: '',
        expectedSalary: '',
        availableFrom: ''
      })
    } catch (err) {
      console.error('Failed to submit application:', err)
      alert('Failed to submit application. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const formatSalary = (job: Job) => {
    const { min, max, currency, period } = job.salary
    if (period === 'hour') {
      return `$${min}-${max}/hour`
    }
    return `$${min.toLocaleString()}-${max.toLocaleString()}/${currency.toLowerCase()}`
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Full-time': return 'bg-green-100 text-green-800'
      case 'Part-time': return 'bg-blue-100 text-blue-800'
      case 'Contract': return 'bg-yellow-100 text-yellow-800'
      case 'Remote': return 'bg-purple-100 text-purple-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Entry': return 'bg-blue-100 text-blue-800'
      case 'Mid': return 'bg-green-100 text-green-800'
      case 'Senior': return 'bg-orange-100 text-orange-800'
      case 'Lead': return 'bg-purple-100 text-purple-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: job?.title,
        text: `Check out this job opportunity: ${job?.title} at ${job?.company}`,
        url: window.location.href
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert('Job link copied to clipboard!')
    }
  }

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="text-center py-12">
          <div className="animate-spin w-8 h-8 border-2 border-white border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-300">Loading job details...</p>
        </div>
      </div>
    )
  }

  if (error || !job) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="text-center py-12">
          <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Job Not Found</h2>
          <p className="text-gray-300 mb-6">{error || 'The job you\'re looking for doesn\'t exist.'}</p>
          <Link to="/jobs" className="btn-primary">
            ← Back to Jobs
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={() => navigate('/jobs')}
          className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Jobs</span>
        </button>
        
        <div className="flex items-center space-x-3">
          <button
            onClick={handleShare}
            className="flex items-center space-x-2 px-4 py-2 rounded-lg border border-gray-600 text-gray-300 hover:text-white hover:border-gray-500 transition-colors"
          >
            <Share2 className="w-4 h-4" />
            <span>Share</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 rounded-lg border border-gray-600 text-gray-300 hover:text-white hover:border-gray-500 transition-colors">
            <BookmarkPlus className="w-4 h-4" />
            <span>Save</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 rounded-lg border border-gray-600 text-red-400 hover:text-red-300 hover:border-red-500 transition-colors">
            <Flag className="w-4 h-4" />
            <span>Report</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Job Header */}
          <div className="card">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-white mb-2">{job.title}</h1>
                <div className="flex items-center space-x-4 text-gray-300 mb-4">
                  <div className="flex items-center space-x-1">
                    <Building className="w-4 h-4" />
                    <span className="font-medium">{job.company}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-4 h-4" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>Posted {new Date(job.postedAt).toLocaleDateString()}</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 mb-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(job.type)}`}>
                    {job.type}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getLevelColor(job.experienceLevel)}`}>
                    {job.experienceLevel}
                  </span>
                  <div className="flex items-center space-x-1 text-gray-300">
                    <DollarSign className="w-4 h-4" />
                    <span className="font-semibold">{formatSalary(job)}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-4 text-sm text-gray-400">
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4" />
                    <span>{job.applicants} applicants</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-green-400">Actively hiring</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Job Description */}
          <div className="card">
            <h2 className="text-xl font-semibold text-white mb-4">Job Description</h2>
            <div className="prose prose-invert max-w-none">
              <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                {job.description}
              </p>
            </div>
          </div>

          {/* Requirements */}
          <div className="card">
            <h2 className="text-xl font-semibold text-white mb-4">Requirements</h2>
            <ul className="space-y-3">
              {job.requirements.map((requirement, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">{requirement}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Skills Required */}
          <div className="card">
            <h2 className="text-xl font-semibold text-white mb-4">Skills Required</h2>
            <div className="flex flex-wrap gap-3">
              {job.skillsRequired.map((skill, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-gray-800 text-gray-300 rounded-lg border border-gray-600 hover:border-gray-500 transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Tags */}
          {job.tags.length > 0 && (
            <div className="card">
              <h2 className="text-xl font-semibold text-white mb-4">Tags</h2>
              <div className="flex flex-wrap gap-2">
                {job.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-900 text-blue-300 text-sm rounded-md"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Apply Card */}
          <div className="card">
            <div className="text-center mb-6">
              <div className="text-2xl font-bold text-white mb-2">
                {formatSalary(job)}
              </div>
              <p className="text-gray-300">
                {job.type} • {job.experienceLevel}
              </p>
            </div>

            {!isUserConnected ? (
              <div className="text-center">
                <p className="text-gray-300 mb-4">Connect your wallet to apply for this job</p>
                <Link to="/" className="btn-primary w-full block text-center">
                  Connect Wallet
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                <button
                  onClick={() => setShowApplicationForm(true)}
                  className="btn-primary w-full"
                >
                  Apply Now
                </button>
                <button className="btn-secondary w-full">
                  Save for Later
                </button>
              </div>
            )}

            <div className="mt-6 pt-6 border-t border-gray-700">
              <div className="flex items-center justify-between text-sm text-gray-400 mb-2">
                <span>Application Status</span>
                <span className="text-green-400">Open</span>
              </div>
              <div className="flex items-center justify-between text-sm text-gray-400">
                <span>Positions Available</span>
                <span>Multiple</span>
              </div>
            </div>
          </div>

          {/* Company Info */}
          <div className="card">
            <h3 className="text-lg font-semibold text-white mb-4">About {job.company}</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Building className="w-4 h-4 text-gray-400" />
                <span className="text-gray-300">{job.company}</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span className="text-gray-300">{job.location}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-gray-400" />
                <span className="text-gray-300">Actively hiring</span>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-700">
              <button className="flex items-center space-x-2 text-white hover:underline">
                <ExternalLink className="w-4 h-4" />
                <span>View Company Profile</span>
              </button>
            </div>
          </div>

          {/* Job Stats */}
          <div className="card">
            <h3 className="text-lg font-semibold text-white mb-4">Job Statistics</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Total Applicants</span>
                <span className="font-semibold text-white">{job.applicants}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Posted</span>
                <span className="font-semibold text-white">
                  {new Date(job.postedAt).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Status</span>
                <span className="font-semibold text-green-400">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Application Form Modal */}
      {showApplicationForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-900 rounded-lg p-6 w-full max-w-2xl max-h-96 overflow-y-auto">
            <h2 className="text-xl font-semibold text-white mb-4">
              Apply for {job.title}
            </h2>
            <form onSubmit={handleApply} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Cover Letter *
                </label>
                <textarea
                  required
                  rows={4}
                  className="input-field resize-none"
                  placeholder="Tell us why you're perfect for this role..."
                  value={applicationData.coverLetter}
                  onChange={(e) => setApplicationData(prev => ({ ...prev, coverLetter: e.target.value }))}
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
                  value={applicationData.portfolioUrl}
                  onChange={(e) => setApplicationData(prev => ({ ...prev, portfolioUrl: e.target.value }))}
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
                    value={applicationData.expectedSalary}
                    onChange={(e) => setApplicationData(prev => ({ ...prev, expectedSalary: e.target.value }))}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Available From
                  </label>
                  <input
                    type="date"
                    className="input-field"
                    value={applicationData.availableFrom}
                    onChange={(e) => setApplicationData(prev => ({ ...prev, availableFrom: e.target.value }))}
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
                  onClick={() => setShowApplicationForm(false)}
                  className="btn-secondary"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default JobDetails