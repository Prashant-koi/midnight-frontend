import { useState, useEffect } from 'react'
import { useAccount } from 'wagmi'
import { Link } from 'react-router-dom'
import { Briefcase, MapPin, DollarSign, Clock, Users, Star, Filter, Search, Plus } from 'lucide-react'
import { useDemoMode } from '../hooks/useDemoMode'
import { mockApiResponses } from '../data/mockData'
import type { Job } from '../types'

const Jobs = () => {
  const { address, isConnected } = useAccount()
  const { isDemoMode, demoAddress } = useDemoMode()
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState<string>('all')
  const [selectedLevel, setSelectedLevel] = useState<string>('all')
  const [showPostForm, setShowPostForm] = useState(false)

  const currentAddress = isDemoMode ? demoAddress : address
  const isUserConnected = isDemoMode || isConnected

  useEffect(() => {
    loadJobs()
  }, [])

  const loadJobs = async () => {
    try {
      setLoading(true)
      // Always load mock jobs for now, regardless of connection status
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
      alert('Please connect your wallet or enable demo mode to apply for jobs.')
    } else {
      alert('Application functionality coming soon!')
    }
  }

  const handlePostJobClick = () => {
    if (!isUserConnected) {
      alert('Please connect your wallet or enable demo mode to post jobs.')
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
              💡 Connect your wallet or try demo mode to apply for jobs and post opportunities.
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

      {/* Search and Filters */}
      <div className="card mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search jobs, companies, skills, or tags..."
                className="input-field pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-300" />
              <select
                className="input-field min-w-32"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
              >
                <option value="all">All Types</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Remote">Remote</option>
              </select>
            </div>
            <select
              className="input-field min-w-32"
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
            >
              <option value="all">All Levels</option>
              <option value="Entry">Entry</option>
              <option value="Mid">Mid</option>
              <option value="Senior">Senior</option>
              <option value="Lead">Lead</option>
            </select>
          </div>
        </div>
      </div>

      {/* Job Listings */}
      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin w-8 h-8 border-2 border-white border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-300">Loading job opportunities...</p>
        </div>
      ) : filteredJobs.length === 0 ? (
        <div className="text-center py-12">
          <Briefcase className="w-16 h-16 text-gray-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">
            {searchTerm || selectedType !== 'all' || selectedLevel !== 'all' ? 'No Jobs Found' : 'No Jobs Available'}
          </h3>
          <p className="text-gray-300">
            {searchTerm || selectedType !== 'all' || selectedLevel !== 'all'
              ? 'Try adjusting your search or filters.' 
              : 'Check back later for new opportunities.'}
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredJobs.map((job) => (
            <div key={job.id} className="card hover:shadow-lg transition-shadow">
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
                  <button 
                    onClick={handleApplyClick}
                    className={`text-sm px-4 py-2 rounded-lg font-medium transition-colors ${
                      isUserConnected 
                        ? 'btn-primary' 
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    {isUserConnected ? 'Apply Now' : 'Connect to Apply'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Post Job Form Modal */}
      {showPostForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-900 rounded-lg p-6 w-full max-w-2xl max-h-96 overflow-y-auto">
            <h2 className="text-xl font-semibold text-white mb-4">Post a New Job</h2>
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
          </div>
        </div>
      )}
    </div>
  )
}

export default Jobs