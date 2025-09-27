import { useState, useEffect } from 'react'
import { useAccount } from 'wagmi'
import { Link } from 'react-router-dom'
import { 
  Briefcase, 
  MapPin, 
  DollarSign, 
  Clock, 
  Users, 
  Calendar,
  CheckCircle,
  AlertCircle,
  Play,
  Pause,
  FileText,
  MessageCircle,
  ExternalLink,
  Upload,
  Github,
  X
} from 'lucide-react'
import { useDemoMode } from '../hooks/useDemoMode'
import { mockApiResponses } from '../data/mockData'
import type { Job } from '../types'

// Interface for current jobs with application-specific fields
interface CurrentJob {
  // Core job fields (from Job interface)
  id: string
  title: string
  company: string
  location: string
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Remote'
  salary: {
    min: number
    max: number
    currency: string
    period: 'hour' | 'year' | 'project'
  }
  description: string
  requirements: string[]
  skillsRequired: string[]
  postedBy: string
  postedAt: string
  applicants: number
  tags: string[]
  experienceLevel: 'Entry' | 'Mid' | 'Senior' | 'Lead'
  
  // Application-specific fields
  applicationDate: string
  status: 'applied' | 'interviewing' | 'accepted' | 'in-progress' | 'completed' | 'cancelled'
  startDate?: string
  deadline?: string
  progress: number
  clientFeedback?: string
  lastUpdate: string
  paymentStatus: 'pending' | 'partial' | 'completed'
  totalEarned: number
}

interface SubmissionData {
  repoUrl: string
  description: string
  notes: string
}

const CurrentJobs = () => {
  const { address, isConnected } = useAccount()
  const { isDemoMode, demoAddress } = useDemoMode()
  const [currentJobs, setCurrentJobs] = useState<CurrentJob[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedStatus, setSelectedStatus] = useState<string>('all')
  const [showSubmitForm, setShowSubmitForm] = useState<string | null>(null)
  const [submissionData, setSubmissionData] = useState<SubmissionData>({
    repoUrl: '',
    description: '',
    notes: ''
  })
  const [submitting, setSubmitting] = useState(false)

  const currentAddress = isDemoMode ? demoAddress : address
  const isUserConnected = isDemoMode || isConnected

  // Mock current jobs data
  const mockCurrentJobs: CurrentJob[] = [
    {
      id: '1',
      title: 'Build E-commerce Website with React',
      company: 'TechStartup Inc.',
      location: 'Remote',
      type: 'Contract',
      salary: { min: 80, max: 120, currency: 'USD', period: 'hour' },
      description: 'Building a modern e-commerce website with React, including product catalog and payment integration.',
      requirements: ['React', 'TypeScript', 'Payment Integration'],
      skillsRequired: ['React Development', 'TypeScript', 'JavaScript'],
      postedBy: '0xabcdef1234567890abcdef1234567890abcdef12',
      postedAt: '2024-02-20T10:00:00Z',
      applicants: 12,
      status: 'in-progress',
      tags: ['React', 'E-commerce', 'Frontend'],
      experienceLevel: 'Mid',
      applicationDate: '2024-02-21T14:30:00Z',
      startDate: '2024-02-25T09:00:00Z',
      deadline: '2024-04-10T17:00:00Z',
      progress: 65,
      clientFeedback: 'Great progress so far! Really happy with the design and functionality.',
      lastUpdate: '2024-03-01T16:45:00Z',
      paymentStatus: 'partial',
      totalEarned: 4800
    },
    {
      id: '2',
      title: 'Mobile App UI/UX Design',
      company: 'FinTech Solutions',
      location: 'Remote',
      type: 'Contract',
      salary: { min: 60, max: 90, currency: 'USD', period: 'hour' },
      description: 'Designing a complete mobile app interface for a cryptocurrency trading platform.',
      requirements: ['Figma', 'Mobile Design', 'User Research'],
      skillsRequired: ['UI/UX Design', 'Figma', 'Mobile Design'],
      postedBy: '0x9876543210987654321098765432109876543210',
      postedAt: '2024-02-18T14:30:00Z',
      applicants: 8,
      status: 'completed',
      tags: ['Design', 'Mobile', 'FinTech'],
      experienceLevel: 'Mid',
      applicationDate: '2024-02-19T10:15:00Z',
      startDate: '2024-02-22T09:00:00Z',
      deadline: '2024-03-15T17:00:00Z',
      progress: 100,
      clientFeedback: 'Excellent work! The designs exceeded our expectations.',
      lastUpdate: '2024-03-14T18:30:00Z',
      paymentStatus: 'completed',
      totalEarned: 3200
    },
    {
      id: '3',
      title: 'WordPress E-commerce Site',
      company: 'Local Business',
      location: 'Remote',
      type: 'Contract',
      salary: { min: 1500, max: 3000, currency: 'USD', period: 'project' },
      description: 'Building a complete e-commerce website using WordPress and WooCommerce.',
      requirements: ['WordPress', 'WooCommerce', 'SEO'],
      skillsRequired: ['WordPress', 'WooCommerce', 'E-commerce'],
      postedBy: '0x7777888899990000111122223333444455556666',
      postedAt: '2024-02-16T16:00:00Z',
      applicants: 25,
      status: 'accepted',
      tags: ['WordPress', 'E-commerce', 'WooCommerce'],
      experienceLevel: 'Entry',
      applicationDate: '2024-02-17T11:20:00Z',
      startDate: '2024-03-05T09:00:00Z',
      deadline: '2024-03-25T17:00:00Z',
      progress: 0,
      clientFeedback: 'Looking forward to working with you!',
      lastUpdate: '2024-02-28T14:00:00Z',
      paymentStatus: 'pending',
      totalEarned: 0
    },
    {
      id: '4',
      title: 'Brand Identity & Logo Design',
      company: 'New Startup',
      location: 'Remote',
      type: 'Contract',
      salary: { min: 800, max: 2000, currency: 'USD', period: 'project' },
      description: 'Creating complete brand identity for a new tech startup.',
      requirements: ['Brand Design', 'Logo Design', 'Adobe Creative Suite'],
      skillsRequired: ['Brand Design', 'Logo Design', 'Adobe Creative Suite'],
      postedBy: '0x8888999900001111222233334444555566667777',
      postedAt: '2024-02-24T09:30:00Z',
      applicants: 31,
      status: 'interviewing',
      tags: ['Branding', 'Logo', 'Startup'],
      experienceLevel: 'Mid',
      applicationDate: '2024-02-25T15:45:00Z',
      lastUpdate: '2024-02-27T10:30:00Z',
      paymentStatus: 'pending',
      totalEarned: 0,
      progress: 0
    }
  ]

  useEffect(() => {
    if (isUserConnected && currentAddress) {
      loadCurrentJobs()
    }
  }, [isUserConnected, currentAddress, isDemoMode])

  const loadCurrentJobs = async () => {
    try {
      setLoading(true)
      if (isDemoMode) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000))
        setCurrentJobs(mockCurrentJobs)
      } else {
        // For real wallet mode, use empty data for now
        // You'll replace this with: const jobsData = await apiService.getCurrentJobs(currentAddress)
        setCurrentJobs([])
      }
    } catch (err) {
      console.error('Failed to load current jobs:', err)
      setCurrentJobs([])
    } finally {
      setLoading(false)
    }
  }

  const filteredJobs = currentJobs.filter(job => {
    if (selectedStatus === 'all') return true
    return job.status === selectedStatus
  })

  const formatSalary = (job: CurrentJob) => {
    const { min, max, currency, period } = job.salary
    if (period === 'hour') {
      return `$${min}-${max}/hr`
    }
    if (period === 'project') {
      return `$${min.toLocaleString()}-${max.toLocaleString()} fixed`
    }
    return `$${min.toLocaleString()}-${max.toLocaleString()}`
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'applied': return 'bg-blue-100 text-blue-800'
      case 'interviewing': return 'bg-yellow-100 text-yellow-800'
      case 'accepted': return 'bg-green-100 text-green-800'
      case 'in-progress': return 'bg-purple-100 text-purple-800'
      case 'completed': return 'bg-emerald-100 text-emerald-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'applied': return <Clock className="w-4 h-4" />
      case 'interviewing': return <MessageCircle className="w-4 h-4" />
      case 'accepted': return <CheckCircle className="w-4 h-4" />
      case 'in-progress': return <Play className="w-4 h-4" />
      case 'completed': return <CheckCircle className="w-4 h-4" />
      case 'cancelled': return <AlertCircle className="w-4 h-4" />
      default: return <Clock className="w-4 h-4" />
    }
  }

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'text-yellow-400'
      case 'partial': return 'text-blue-400'
      case 'completed': return 'text-green-400'
      default: return 'text-gray-400'
    }
  }

  const handleSubmitJob = async (jobId: string) => {
    if (!submissionData.repoUrl.trim()) {
      alert('Please provide a GitHub repository URL.')
      return
    }

    // Basic URL validation
    const githubUrlPattern = /^https:\/\/github\.com\/[\w\-\.]+\/[\w\-\.]+\/?$/
    if (!githubUrlPattern.test(submissionData.repoUrl.trim())) {
      alert('Please provide a valid GitHub repository URL (e.g., https://github.com/username/repository)')
      return
    }

    try {
      setSubmitting(true)
      
      if (isDemoMode) {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000))
        
        // Update job status to completed in local state
        setCurrentJobs(prevJobs => 
          prevJobs.map(job => 
            job.id === jobId 
              ? { 
                  ...job, 
                  status: 'completed' as const,
                  progress: 100,
                  lastUpdate: new Date().toISOString(),
                  clientFeedback: 'Job submission received! We\'ll review your work and provide feedback soon.'
                }
              : job
          )
        )
        
        alert('Job submitted successfully! The client will review your work.')
      } else {
        // Real API call would go here
        // await apiService.submitJob(jobId, submissionData)
        alert('Job submission functionality will be available with wallet integration.')
      }

      // Reset form and close modal
      setSubmissionData({ repoUrl: '', description: '', notes: '' })
      setShowSubmitForm(null)
    } catch (err) {
      console.error('Failed to submit job:', err)
      alert('Failed to submit job. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const handleSubmitFormOpen = (jobId: string) => {
    setShowSubmitForm(jobId)
    setSubmissionData({ repoUrl: '', description: '', notes: '' })
  }

  const handleSubmitFormClose = () => {
    setShowSubmitForm(null)
    setSubmissionData({ repoUrl: '', description: '', notes: '' })
  }

  const totalEarnings = currentJobs.reduce((sum, job) => sum + job.totalEarned, 0)
  const activeJobs = currentJobs.filter(job => job.status === 'in-progress').length
  const completedJobs = currentJobs.filter(job => job.status === 'completed').length

  if (!isUserConnected) {
    return (
      <div className="text-center py-12">
        <Briefcase className="w-16 h-16 text-gray-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-white mb-2">Connect to View Current Jobs</h2>
        <p className="text-gray-300">Please connect your wallet or try demo mode to see your current job projects.</p>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Current Jobs</h1>
          <p className="text-gray-300">Track your ongoing projects and applications.</p>
        </div>
        <Link to="/jobs" className="btn-primary">
          Browse More Jobs
        </Link>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="card text-center">
          <Play className="w-8 h-8 text-white mx-auto mb-2" />
          <div className="text-2xl font-bold text-white">{activeJobs}</div>
          <p className="text-gray-300 text-sm">Active Projects</p>
        </div>
        <div className="card text-center">
          <CheckCircle className="w-8 h-8 text-green-400 mx-auto mb-2" />
          <div className="text-2xl font-bold text-white">{completedJobs}</div>
          <p className="text-gray-300 text-sm">Completed</p>
        </div>
        <div className="card text-center">
          <DollarSign className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
          <div className="text-2xl font-bold text-white">${totalEarnings.toLocaleString()}</div>
          <p className="text-gray-300 text-sm">Total Earned</p>
        </div>
      </div>

      {/* Status Filter */}
      <div className="card mb-8">
        <div className="flex flex-wrap gap-4">
          <select
            className="input-field w-auto min-w-48"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option value="all">All Statuses</option>
            <option value="applied">Applied</option>
            <option value="interviewing">Interviewing</option>
            <option value="accepted">Accepted</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Jobs List */}
      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin w-8 h-8 border-2 border-white border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-300">Loading your current jobs...</p>
        </div>
      ) : filteredJobs.length === 0 ? (
        <div className="text-center py-12">
          <Briefcase className="w-16 h-16 text-gray-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">
            {selectedStatus === 'all' ? 'No Current Jobs' : `No ${selectedStatus.charAt(0).toUpperCase() + selectedStatus.slice(1)} Jobs`}
          </h3>
          <p className="text-gray-300 mb-6">
            {selectedStatus === 'all' 
              ? 'You haven\'t applied to any jobs yet.' 
              : `No jobs with ${selectedStatus} status found.`}
          </p>
          <Link to="/jobs" className="btn-primary">
            Browse Available Jobs
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredJobs.map((job) => (
            <div key={job.id} className="card hover:shadow-lg transition-shadow">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-1">{job.title}</h3>
                      <p className="text-gray-300">{job.company}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getStatusColor(job.status)}`}>
                        {getStatusIcon(job.status)}
                        <span className="capitalize">{job.status.replace('-', ' ')}</span>
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-gray-400 text-sm mb-4">
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <DollarSign className="w-4 h-4" />
                      <span>{formatSalary(job)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>Applied {new Date(job.applicationDate).toLocaleDateString()}</span>
                    </div>
                  </div>

                  {/* Progress Bar (for in-progress jobs) */}
                  {job.status === 'in-progress' && (
                    <div className="mb-4">
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span className="text-gray-300">Progress</span>
                        <span className="text-white font-medium">{job.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-white h-2 rounded-full transition-all duration-300" 
                          style={{ width: `${job.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}

                  {/* Timeline */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 text-sm">
                    {job.startDate && (
                      <div>
                        <span className="text-gray-400">Start Date:</span>
                        <p className="text-white">{new Date(job.startDate).toLocaleDateString()}</p>
                      </div>
                    )}
                    {job.deadline && (
                      <div>
                        <span className="text-gray-400">Deadline:</span>
                        <p className="text-white">{new Date(job.deadline).toLocaleDateString()}</p>
                      </div>
                    )}
                    <div>
                      <span className="text-gray-400">Earnings:</span>
                      <p className={`font-medium ${getPaymentStatusColor(job.paymentStatus)}`}>
                        ${job.totalEarned.toLocaleString()} ({job.paymentStatus})
                      </p>
                    </div>
                  </div>

                  {/* Client Feedback */}
                  {job.clientFeedback && (
                    <div className="bg-gray-800 rounded-lg p-3 mb-4">
                      <p className="text-xs text-gray-400 mb-1">Latest Client Feedback:</p>
                      <p className="text-gray-300 text-sm italic">"{job.clientFeedback}"</p>
                    </div>
                  )}

                  {/* Skills */}
                  <div className="flex flex-wrap gap-2">
                    {job.skillsRequired.slice(0, 3).map((skill, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded-md"
                      >
                        {skill}
                      </span>
                    ))}
                    {job.skillsRequired.length > 3 && (
                      <span className="px-2 py-1 bg-gray-700 text-gray-400 text-xs rounded-md">
                        +{job.skillsRequired.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                <div className="text-xs text-gray-400">
                  Last updated: {new Date(job.lastUpdate).toLocaleDateString()}
                </div>
                
                <div className="flex items-center space-x-3">
                  <Link 
                    to={`/jobs/${job.id}`}
                    className="flex items-center space-x-1 text-xs px-3 py-1.5 rounded-lg border border-gray-600 text-gray-300 hover:text-white hover:border-gray-500 transition-colors"
                  >
                    <ExternalLink className="w-3 h-3" />
                    <span>View Details</span>
                  </Link>
                  
                  {job.status === 'in-progress' && (
                    <>
                      <button className="flex items-center space-x-1 text-xs px-3 py-1.5 rounded-lg border border-gray-600 text-gray-300 hover:text-white hover:border-gray-500 transition-colors">
                        <FileText className="w-3 h-3" />
                        <span>Update Progress</span>
                      </button>
                      
                      <button 
                        onClick={() => handleSubmitFormOpen(job.id)}
                        className="flex items-center space-x-1 text-xs px-3 py-1.5 rounded-lg bg-green-600 text-white hover:bg-green-700 transition-colors font-medium"
                      >
                        <Upload className="w-3 h-3" />
                        <span>Submit Job</span>
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Submit Job Modal */}
      {showSubmitForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-900 rounded-lg p-6 w-full max-w-2xl max-h-96 overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <Github className="w-6 h-6 text-white" />
                <h2 className="text-xl font-semibold text-white">Submit Job Deliverable</h2>
              </div>
              <button
                onClick={handleSubmitFormClose}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  GitHub Repository URL *
                </label>
                <input
                  type="url"
                  required
                  className="input-field"
                  placeholder="https://github.com/username/repository"
                  value={submissionData.repoUrl}
                  onChange={(e) => setSubmissionData(prev => ({ ...prev, repoUrl: e.target.value }))}
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
                  value={submissionData.description}
                  onChange={(e) => setSubmissionData(prev => ({ ...prev, description: e.target.value }))}
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
                  value={submissionData.notes}
                  onChange={(e) => setSubmissionData(prev => ({ ...prev, notes: e.target.value }))}
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
            </div>

            <div className="flex items-center justify-end space-x-4 mt-6 pt-4 border-t border-gray-700">
              <button
                type="button"
                onClick={handleSubmitFormClose}
                className="btn-secondary"
                disabled={submitting}
              >
                Cancel
              </button>
              <button
                onClick={() => handleSubmitJob(showSubmitForm)}
                disabled={submitting || !submissionData.repoUrl.trim()}
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
        </div>
      )}
    </div>
  )
}

export default CurrentJobs