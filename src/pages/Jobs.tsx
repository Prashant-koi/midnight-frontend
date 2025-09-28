import { useState, useEffect } from 'react'
import { Plus } from 'lucide-react'
import { mockApiResponses } from '../data/mockData'
import type { Job } from '../types'
import { useMidnightWallet } from '../hooks/useMidnightWallet'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import EmptyState from '../components/ui/EmptyState'
import Modal from '../components/ui/Modal'
import JobCard from '../components/jobs/JobCard'
import JobFilters from '../components/jobs/JobFilters'
import { Briefcase } from 'lucide-react'

const Jobs = () => {
  const { isConnected } = useMidnightWallet()
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState<string>('all')
  const [selectedLevel, setSelectedLevel] = useState<string>('all')
  const [showPostForm, setShowPostForm] = useState(false)

  // const currentAddress = account
  const isUserConnected = isConnected

  useEffect(() => {
    loadJobs()
  }, [])

  const loadJobs = async () => {
    try {
      setLoading(true)
      const jobsData = await mockApiResponses.getJobs()
      setJobs(jobsData)
    } catch (err) {
      console.error('Failed to load jobs:', err)
      setJobs([])
    } finally {
      setLoading(false)
    }
  }

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.skillsRequired.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase())) ||
      job.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesType = selectedType === 'all' || job.type === selectedType
    const matchesLevel = selectedLevel === 'all' || job.experienceLevel === selectedLevel
    return matchesSearch && matchesType && matchesLevel && job.status === 'open'
  })

  const handleApplyClick = () => {
    if (!isUserConnected) {
      alert('Please connect your wallet to apply for jobs.')
    } else {
      alert('Application functionality coming soon!')
    }
  }

  const handlePostJobClick = () => {
    if (!isUserConnected) {
      alert('Please connect your wallet to post jobs.')
    } else {
      setShowPostForm(true)
    }
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Job Opportunities</h1>
          <p className="text-gray-300">Find jobs that match your verified skills and expertise.</p>
          {!isUserConnected && (
            <p className="text-yellow-400 text-sm mt-2">
              💡 Connect your wallet to apply for jobs and post opportunities.
            </p>
          )}
        </div>
        <button
          onClick={handlePostJobClick}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Post Job</span>
        </button>
      </div>

      <JobFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedType={selectedType}
        onTypeChange={setSelectedType}
        selectedLevel={selectedLevel}
        onLevelChange={setSelectedLevel}
      />

      {loading ? (
        <LoadingSpinner message="Loading job opportunities..." />
      ) : filteredJobs.length === 0 ? (
        <EmptyState
          icon={Briefcase}
          title={searchTerm || selectedType !== 'all' || selectedLevel !== 'all' ? 'No Jobs Found' : 'No Jobs Available'}
          description={searchTerm || selectedType !== 'all' || selectedLevel !== 'all'
            ? 'Try adjusting your search or filters.'
            : 'Check back later for new opportunities.'}
        />
      ) : (
        <div className="space-y-6">
          {filteredJobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              onApply={handleApplyClick}
              isUserConnected={isUserConnected}
              showApplyButton={true}
            />
          ))}
        </div>
      )}

      <Modal
        isOpen={showPostForm}
        onClose={() => setShowPostForm(false)}
        title="Post a New Job"
        maxWidth="2xl"
        maxHeight
      >
        <p className="text-gray-300 mb-4">
          Job posting functionality will be available soon. This feature allows you to post job opportunities for skilled professionals.
        </p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={() => setShowPostForm(false)}
            className="btn-secondary"
          >
            Close
          </button>
          <button
            onClick={() => {
              setShowPostForm(false)
              alert('Job posting feature coming soon!')
            }}
            className="btn-primary"
          >
            Coming Soon
          </button>
        </div>
      </Modal>
    </div>
  )
}

export default Jobs