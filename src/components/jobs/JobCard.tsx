import { Link } from 'react-router-dom'
import { Briefcase, MapPin, DollarSign, Clock, Users } from 'lucide-react'
import type { Job } from '../../types'

interface JobCardProps {
  job: Job
  onApply?: () => void
  isUserConnected?: boolean
  showApplyButton?: boolean
}

const JobCard = ({ job, onApply, isUserConnected = false, showApplyButton = true }: JobCardProps) => {
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

  return (
    <div className="card hover:shadow-lg transition-shadow">
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-xl font-semibold text-white">{job.title}</h3>
            <div className="flex items-center space-x-2">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(job.type)}`}>
                {job.type}
              </span>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getLevelColor(job.experienceLevel)}`}>
                {job.experienceLevel}
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-4 text-gray-300 mb-3">
            <div className="flex items-center space-x-1">
              <Briefcase className="w-4 h-4" />
              <span>{job.company}</span>
            </div>
            <div className="flex items-center space-x-1">
              <MapPin className="w-4 h-4" />
              <span>{job.location}</span>
            </div>
            <div className="flex items-center space-x-1">
              <DollarSign className="w-4 h-4" />
              <span>{formatSalary(job)}</span>
            </div>
          </div>

          <p className="text-gray-300 mb-4 line-clamp-2">{job.description}</p>

          <div className="flex flex-wrap gap-2 mb-4">
            {job.skillsRequired.map((skill, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded-md"
              >
                {skill}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {job.tags.map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-blue-900 text-blue-300 text-xs rounded-md"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-700">
        <div className="flex items-center space-x-4 text-sm text-gray-400">
          <div className="flex items-center space-x-1">
            <Users className="w-4 h-4" />
            <span>{job.applicants} applicants</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span>{new Date(job.postedAt).toLocaleDateString()}</span>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <Link
            to={`/jobs/${job.id}`}
            className="btn-secondary text-sm px-4 py-2"
          >
            View Details
          </Link>
          {showApplyButton && (
            <button
              onClick={onApply}
              className={`text-sm px-4 py-2 rounded-lg font-medium transition-colors ${isUserConnected
                  ? 'btn-primary'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
            >
              {isUserConnected ? 'Apply Now' : 'Connect to Apply'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default JobCard

