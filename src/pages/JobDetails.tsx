import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import {
  ArrowLeft,
  Briefcase,
  MapPin,
  DollarSign,
  Users,
  Calendar,
  CheckCircle,
  Star,
  Building,
  Globe,
  Award
} from 'lucide-react'
import { mockApiResponses } from '../data/mockData'
import type { Job } from '../types'
import { useMidnightWallet } from '../hooks/useMidnightWallet'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import EmptyState from '../components/ui/EmptyState'
import Modal from '../components/ui/Modal'
import ApplicationForm, { type ApplicationData } from '../components/forms/ApplicationForm'

const JobDetails = () => {
  const { id } = useParams<{ id: string }>()
  const { isConnected } = useMidnightWallet()
  const [job, setJob] = useState<Job | null>(null)
  const [loading, setLoading] = useState(true)
  const [showApplicationForm, setShowApplicationForm] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  // const currentAddress = account
  const isUserConnected = isConnected

  useEffect(() => {
    if (id) {
      loadJobDetails(id)
    }
  }, [id])

  const loadJobDetails = async (jobId: string) => {
    try {
      setLoading(true)
      const jobs = await mockApiResponses.getJobs()
      const jobData = jobs.find(j => j.id === jobId)
      setJob(jobData || null)
    } catch (err) {
      console.error('Failed to load job details:', err)
      setJob(null)
    } finally {
      setLoading(false)
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

  const handleApplyClick = () => {
    if (!isUserConnected) {
      alert('Please connect your wallet to apply for this job.')
      return
    }
    setShowApplicationForm(true)
  }

  const handleApplicationSubmit = async (_data: ApplicationData) => {
    try {
      setSubmitting(true)
      // Real API call when backend is ready:
      // await apiService.submitApplication(job!.id, currentAddress!, data)
      alert('Application submitted successfully! (Mock response)')
      setShowApplicationForm(false)
    } catch (err) {
      console.error('Failed to submit application:', err)
      alert('Failed to submit application. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return <LoadingSpinner message="Loading job details..." />
  }

  if (!job) {
    return (
      <EmptyState
        icon={Briefcase}
        title="Job Not Found"
        description="The job you're looking for doesn't exist or has been removed."
        action={{
          label: 'Browse All Jobs',
          onClick: () => window.location.href = '/jobs'
        }}
      />
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Back Navigation */}
      <div className="mb-6">
        <Link
          to="/jobs"
          className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Jobs</span>
        </Link>
      </div>

      {/* Job Header */}
      <div className="card mb-8">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
          <div className="flex-1">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">{job.title}</h1>
                <div className="flex items-center space-x-4 text-gray-300 mb-3">
                  <div className="flex items-center space-x-1">
                    <Building className="w-4 h-4" />
                    <span>{job.company}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-4 h-4" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Globe className="w-4 h-4" />
                    <span>{job.type}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(job.type)}`}>
                  {job.type}
                </span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getLevelColor(job.experienceLevel)}`}>
                  {job.experienceLevel}
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-6 text-gray-300 mb-6">
              <div className="flex items-center space-x-2">
                <DollarSign className="w-5 h-5" />
                <span className="text-xl font-semibold text-white">{formatSalary(job)}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Users className="w-4 h-4" />
                <span>{job.applicants} applicants</span>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>Posted {new Date(job.postedAt).toLocaleDateString()}</span>
              </div>
            </div>

            <button
              onClick={handleApplyClick}
              className={`btn-primary text-lg px-8 py-3 ${!isUserConnected ? 'opacity-75' : ''}`}
            >
              {isUserConnected ? 'Apply Now' : 'Connect Wallet to Apply'}
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Job Description */}
          <div className="card">
            <h2 className="text-xl font-semibold text-white mb-4">Job Description</h2>
            <div className="text-gray-300 leading-relaxed">
              <p>{job.description}</p>
            </div>
          </div>

          {/* Requirements */}
          <div className="card">
            <h2 className="text-xl font-semibold text-white mb-4">Requirements</h2>
            <ul className="space-y-2">
              {job.requirements.map((req, index) => (
                <li key={index} className="flex items-start space-x-2 text-gray-300">
                  <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>{req}</span>
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
                  className="px-3 py-2 bg-gray-800 text-gray-300 rounded-lg border border-gray-700"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div className="card">
            <h2 className="text-xl font-semibold text-white mb-4">Tags</h2>
            <div className="flex flex-wrap gap-2">
              {job.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-blue-900 text-blue-300 text-sm rounded-md"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Job Summary */}
          <div className="card">
            <h3 className="text-lg font-semibold text-white mb-4">Job Summary</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Job Type:</span>
                <span className="text-white">{job.type}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Experience:</span>
                <span className="text-white">{job.experienceLevel}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Location:</span>
                <span className="text-white">{job.location}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Salary:</span>
                <span className="text-white">{formatSalary(job)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Posted:</span>
                <span className="text-white">{new Date(job.postedAt).toLocaleDateString()}</span>
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
                <Award className="w-4 h-4 text-gray-400" />
                <span className="text-gray-300">Verified Employer</span>
              </div>
            </div>
          </div>

          {/* Application Stats */}
          <div className="card">
            <h3 className="text-lg font-semibold text-white mb-4">Application Stats</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Total Applicants:</span>
                <span className="text-white font-medium">{job.applicants}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Your Match:</span>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-400" />
                  <span className="text-white font-medium">85%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Apply Button (Sticky) */}
          <div className="sticky top-6">
            <button
              onClick={handleApplyClick}
              className={`w-full btn-primary text-lg py-3 ${!isUserConnected ? 'opacity-75' : ''}`}
            >
              {isUserConnected ? 'Apply Now' : 'Connect Wallet to Apply'}
            </button>
            {!isUserConnected && (
              <p className="text-yellow-400 text-sm mt-2 text-center">
                💡 Connect your wallet to apply for this position
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Application Form Modal */}
      <Modal
        isOpen={showApplicationForm}
        onClose={() => setShowApplicationForm(false)}
        title={`Apply for ${job.title}`}
        maxWidth="2xl"
        maxHeight
      >
        <ApplicationForm
          job={job}
          onSubmit={handleApplicationSubmit}
          onCancel={() => setShowApplicationForm(false)}
          submitting={submitting}
        />
      </Modal>
    </div>
  )
}

export default JobDetails