import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAccount } from 'wagmi'
import { Briefcase, MapPin, DollarSign, Clock, Users, Star, Sparkles } from 'lucide-react'
import { useDemoMode } from '../hooks/useDemoMode'
import { mockApiResponses } from '../data/mockData'
import type { Job, Skill } from '../types'

interface SuggestedJobsProps {
  maxJobs?: number
  showTitle?: boolean
  className?: string
}

const SuggestedJobs = ({ maxJobs = 4, showTitle = true, className = '' }: SuggestedJobsProps) => {
  const { address, isConnected } = useAccount()
  const { isDemoMode, demoAddress } = useDemoMode()
  const [suggestedJobs, setSuggestedJobs] = useState<(Job & { matchScore: number; matchedSkills: string[] })[]>([])
  const [userSkills, setUserSkills] = useState<Skill[]>([])
  const [loading, setLoading] = useState(true)

  const currentAddress = isDemoMode ? demoAddress : address
  const isUserConnected = isDemoMode || isConnected

  useEffect(() => {
    if (isUserConnected && currentAddress) {
      loadSuggestedJobs()
    } else {
      setLoading(false)
    }
  }, [isUserConnected, currentAddress, isDemoMode])

  const loadSuggestedJobs = async () => {
    if (!currentAddress) return

    try {
      setLoading(true)
      
      // Get user skills and all jobs
      const [skillsData, jobsData] = await Promise.all([
        isDemoMode ? mockApiResponses.getSkills() : Promise.resolve([]),
        mockApiResponses.getJobs()
      ])

      setUserSkills(skillsData)

      if (skillsData.length === 0) {
        setSuggestedJobs([])
        return
      }

      // Calculate job match scores based on skill overlap
      const jobsWithScores = jobsData.map(job => {
        const matchedSkills = job.skillsRequired.filter(jobSkill => 
          skillsData.some(userSkill => 
            userSkill.name.toLowerCase() === jobSkill.toLowerCase()
          )
        )

        const matchScore = matchedSkills.length / job.skillsRequired.length * 100

        return {
          ...job,
          matchScore: Math.round(matchScore),
          matchedSkills
        }
      })

      // Filter jobs with at least 1 matching skill and sort by match score
      const relevantJobs = jobsWithScores
        .filter(job => job.matchScore > 0 && job.status === 'open')
        .sort((a, b) => {
          // Primary sort: match score (higher is better)
          if (b.matchScore !== a.matchScore) {
            return b.matchScore - a.matchScore
          }
          // Secondary sort: number of matched skills (higher is better)
          if (b.matchedSkills.length !== a.matchedSkills.length) {
            return b.matchedSkills.length - a.matchedSkills.length
          }
          // Tertiary sort: fewer total applicants (better chances)
          return a.applicants - b.applicants
        })
        .slice(0, maxJobs)

      setSuggestedJobs(relevantJobs)
    } catch (err) {
      console.error('Failed to load suggested jobs:', err)
      setSuggestedJobs([])
    } finally {
      setLoading(false)
    }
  }

  const formatSalary = (job: Job) => {
    const { min, max, currency, period } = job.salary
    if (period === 'hour') {
      return `$${min}-${max}/hr`
    }
    return `$${min.toLocaleString()}-${max.toLocaleString()}`
  }

  const getMatchColor = (score: number) => {
    if (score >= 80) return 'bg-green-100 text-green-800'
    if (score >= 60) return 'bg-blue-100 text-blue-800'
    if (score >= 40) return 'bg-yellow-100 text-yellow-800'
    return 'bg-gray-100 text-gray-800'
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

  const handleApplyClick = () => {
    if (!isUserConnected) {
      alert('Please connect your wallet or enable demo mode to apply for jobs.')
    } else {
      alert('Application functionality coming soon!')
    }
  }

  if (!isUserConnected) {
    return (
      <div className={`${className}`}>
        {showTitle && (
          <div className="flex items-center space-x-2 mb-6">
            <Sparkles className="w-5 h-5 text-white" />
            <h2 className="text-xl font-semibold text-white">Suggested Jobs</h2>
          </div>
        )}
        <div className="card text-center py-8">
          <Briefcase className="w-12 h-12 text-gray-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-white mb-2">Connect to See Suggestions</h3>
          <p className="text-gray-300 text-sm">
            Connect your wallet or try demo mode to see personalized job recommendations based on your skills.
          </p>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className={`${className}`}>
        {showTitle && (
          <div className="flex items-center space-x-2 mb-6">
            <Sparkles className="w-5 h-5 text-white" />
            <h2 className="text-xl font-semibold text-white">Suggested Jobs</h2>
          </div>
        )}
        <div className="text-center py-8">
          <div className="animate-spin w-6 h-6 border-2 border-white border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-300 text-sm">Finding jobs that match your skills...</p>
        </div>
      </div>
    )
  }

  if (userSkills.length === 0) {
    return (
      <div className={`${className}`}>
        {showTitle && (
          <div className="flex items-center space-x-2 mb-6">
            <Sparkles className="w-5 h-5 text-white" />
            <h2 className="text-xl font-semibold text-white">Suggested Jobs</h2>
          </div>
        )}
        <div className="card text-center py-8">
          <Briefcase className="w-12 h-12 text-gray-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-white mb-2">Add Skills First</h3>
          <p className="text-gray-300 text-sm mb-4">
            Add your skills to your profile to get personalized job recommendations.
          </p>
          <Link to="/skills" className="btn-primary">
            Add Skills
          </Link>
        </div>
      </div>
    )
  }

  if (suggestedJobs.length === 0) {
    return (
      <div className={`${className}`}>
        {showTitle && (
          <div className="flex items-center space-x-2 mb-6">
            <Sparkles className="w-5 h-5 text-white" />
            <h2 className="text-xl font-semibold text-white">Suggested Jobs</h2>
          </div>
        )}
        <div className="card text-center py-8">
          <Briefcase className="w-12 h-12 text-gray-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-white mb-2">No Matching Jobs</h3>
          <p className="text-gray-300 text-sm mb-4">
            No jobs found that match your current skills. Try adding more skills or check back later for new opportunities.
          </p>
          <div className="flex justify-center space-x-4">
            <Link to="/skills" className="btn-secondary text-sm px-4 py-2">
              Add More Skills
            </Link>
            <Link to="/jobs" className="btn-primary text-sm px-4 py-2">
              Browse All Jobs
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`${className}`}>
      {showTitle && (
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-white" />
            <h2 className="text-xl font-semibold text-white">Suggested Jobs</h2>
          </div>
          <Link to="/jobs" className="text-sm text-white hover:underline">
            View All Jobs →
          </Link>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {suggestedJobs.map((job) => (
          <div key={job.id} className="card hover:shadow-lg transition-all duration-200 hover:scale-105">
            {/* Header with match score */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white mb-1">{job.title}</h3>
                <p className="text-gray-300 text-sm">{job.company}</p>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getMatchColor(job.matchScore)}`}>
                  {job.matchScore}% Match
                </span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(job.type)}`}>
                  {job.type}
                </span>
              </div>
            </div>

            {/* Job details */}
            <div className="flex items-center space-x-4 text-gray-400 text-sm mb-3">
              <div className="flex items-center space-x-1">
                <MapPin className="w-3 h-3" />
                <span>{job.location}</span>
              </div>
              <div className="flex items-center space-x-1">
                <DollarSign className="w-3 h-3" />
                <span>{formatSalary(job)}</span>
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-300 text-sm mb-4 line-clamp-2">
              {job.description}
            </p>

            {/* Matched skills */}
            <div className="mb-4">
              <p className="text-xs text-gray-400 mb-2">Your matching skills:</p>
              <div className="flex flex-wrap gap-1">
                {job.matchedSkills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-green-900 text-green-300 text-xs rounded-md border border-green-700"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-700">
              <div className="flex items-center space-x-4 text-xs text-gray-400">
                <div className="flex items-center space-x-1">
                  <Users className="w-3 h-3" />
                  <span>{job.applicants}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="w-3 h-3" />
                  <span>{new Date(job.postedAt).toLocaleDateString()}</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Link 
                  to={`/jobs/${job.id}`}
                  className="text-xs px-3 py-1.5 rounded-lg border border-gray-600 text-gray-300 hover:text-white hover:border-gray-500 transition-colors"
                >
                  Details
                </Link>
                <button 
                  onClick={handleApplyClick}
                  className="text-xs px-3 py-1.5 rounded-lg bg-white text-black hover:bg-gray-200 transition-colors font-medium"
                >
                  Apply Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Show link to view more if there might be more matches */}
      {suggestedJobs.length === maxJobs && (
        <div className="text-center mt-6">
          <Link 
            to="/jobs"
            className="text-sm text-white hover:underline inline-flex items-center space-x-1"
          >
            <span>View more job recommendations</span>
            <Sparkles className="w-4 h-4" />
          </Link>
        </div>
      )}
    </div>
  )
}

export default SuggestedJobs