import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Briefcase, ArrowRight } from 'lucide-react'
import { mockApiResponses } from '../data/mockData'
import type { Job } from '../types'
import { useMidnightWallet } from '../hooks/useMidnightWallet'
import LoadingSpinner from './ui/LoadingSpinner'
import EmptyState from './ui/EmptyState'
import JobCard from './jobs/JobCard'

const SuggestedJobs = () => {
  const { account, isConnected } = useMidnightWallet()
  const [suggestedJobs, setSuggestedJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)

  const currentAddress = account
  const isUserConnected = isConnected

  useEffect(() => {
    loadSuggestedJobs()
  }, [currentAddress])

  const loadSuggestedJobs = async () => {
    try {
      setLoading(true)
      const allJobs = await mockApiResponses.getJobs()
      // Filter to get suggested jobs (mock logic - in real app this would be based on user skills)
      const suggested = allJobs
        .filter(job => job.status === 'open')
        .slice(0, 3) // Show top 3 suggestions
      setSuggestedJobs(suggested)
    } catch (err) {
      console.error('Failed to load suggested jobs:', err)
      setSuggestedJobs([])
    } finally {
      setLoading(false)
    }
  }

  const handleApplyClick = () => {
    if (!isUserConnected) {
      alert('Please connect your wallet to apply for jobs.')
    } else {
      alert('Application functionality coming soon!')
    }
  }

  if (loading) {
    return (
      <div className="card">
        <LoadingSpinner message="Loading job suggestions..." size="sm" />
      </div>
    )
  }

  if (suggestedJobs.length === 0) {
    return (
      <div className="card">
        <EmptyState
          icon={Briefcase}
          title="No Job Suggestions"
          description="Complete your profile and add skills to get personalized job recommendations."
        />
      </div>
    )
  }

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-white">Suggested Jobs</h2>
        <Link
          to="/jobs"
          className="flex items-center space-x-1 text-sm text-gray-300 hover:text-white transition-colors"
        >
          <span>View All</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="space-y-4">
        {suggestedJobs.map((job) => (
          <JobCard
            key={job.id}
            job={job}
            onApply={handleApplyClick}
            isUserConnected={isUserConnected}
            showApplyButton={true}
          />
        ))}
      </div>

      {!isUserConnected && (
        <div className="mt-6 p-4 bg-blue-900 border border-blue-600 rounded-lg">
          <p className="text-blue-200 text-sm">
            💡 <strong>Connect your wallet</strong> to get personalized job recommendations based on your verified skills and experience.
          </p>
        </div>
      )}
    </div>
  )
}

export default SuggestedJobs