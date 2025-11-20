import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  Briefcase,
  MapPin,
  DollarSign,
  Clock,
  Calendar,
  CheckCircle,
  AlertCircle,
  Play,
  FileText,
  MessageCircle,
  ExternalLink,
  Upload
} from 'lucide-react'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import EmptyState from '../components/ui/EmptyState'
import Modal from '../components/ui/Modal'
import JobStats from '../components/jobs/JobStats'
import SubmissionForm, { type SubmissionData } from '../components/forms/SubmissionForm'
import { useDemoMode } from '../hooks/useDemoMode'
import { mockApiResponses } from '../data/mockData'
import type { CurrentJob } from '../types'

const CurrentJobs = () => {
  const [currentJobs, setCurrentJobs] = useState<CurrentJob[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedStatus, setSelectedStatus] = useState<string>('all')
  const [showSubmitForm, setShowSubmitForm] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const { isDemoMode } = useDemoMode()
  const isUserConnected = isDemoMode

  useEffect(() => {
    if (isUserConnected) {
      loadCurrentJobs()
    }
  }, [isUserConnected])

  const loadCurrentJobs = async () => {
    try {
      setLoading(true)
      
      if (isDemoMode) {
        // Load mock data in demo mode
        const jobs = await mockApiResponses.getCurrentJobs()
        setCurrentJobs(jobs)
      } else {
        // TODO: Load real data from API/blockchain when wallet is connected
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
    const { min, max, period } = job.salary
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

  const handleSubmitJob = async (_data: SubmissionData) => {
    try {
      setSubmitting(true)
      alert('Job submission functionality will be available with wallet integration.')
      setShowSubmitForm(null)
    } catch (err) {
      console.error('Failed to submit job:', err)
      alert('Failed to submit job. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const totalEarnings = currentJobs.reduce((sum, job) => sum + job.totalEarned, 0)
  const activeJobs = currentJobs.filter(job => job.status === 'in-progress').length
  const completedJobs = currentJobs.filter(job => job.status === 'completed').length

  if (!isUserConnected) {
    return (
      <EmptyState
        icon={Briefcase}
        title="Enable Demo Mode to View Current Jobs"
        description="Add ?demo=true to the URL or connect your wallet to see your current job projects."
      />
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

      <JobStats
        activeJobs={activeJobs}
        completedJobs={completedJobs}
        totalEarnings={totalEarnings}
      />

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

      {loading ? (
        <LoadingSpinner message="Loading your current jobs..." />
      ) : filteredJobs.length === 0 ? (
        <EmptyState
          icon={Briefcase}
          title={selectedStatus === 'all' ? 'No Current Jobs' : `No ${selectedStatus.charAt(0).toUpperCase() + selectedStatus.slice(1)} Jobs`}
          description={selectedStatus === 'all'
            ? 'You haven\'t applied to any jobs yet.'
            : `No jobs with ${selectedStatus} status found.`}
          action={{
            label: 'Browse Available Jobs',
            onClick: () => window.location.href = '/jobs'
          }}
        />
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
                        onClick={() => setShowSubmitForm(job.id)}
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

      <Modal
        isOpen={!!showSubmitForm}
        onClose={() => setShowSubmitForm(null)}
        title="Submit Job Deliverable"
        maxWidth="2xl"
        maxHeight
      >
        <SubmissionForm
          onSubmit={handleSubmitJob}
          onCancel={() => setShowSubmitForm(null)}
          submitting={submitting}
        />
      </Modal>
    </div>
  )
}

export default CurrentJobs