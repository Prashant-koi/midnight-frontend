import { Briefcase, CheckCircle, DollarSign } from 'lucide-react'

interface JobStatsProps {
  activeJobs: number
  completedJobs: number
  totalEarnings: number
}

const JobStats = ({ activeJobs, completedJobs, totalEarnings }: JobStatsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="card">
        <div className="flex items-center space-x-4">
          <div className="bg-purple-600 bg-opacity-20 p-3 rounded-lg">
            <Briefcase className="w-6 h-6 text-purple-400" />
          </div>
          <div>
            <p className="text-sm text-gray-400">Active Jobs</p>
            <p className="text-2xl font-bold text-white">{activeJobs}</p>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="flex items-center space-x-4">
          <div className="bg-green-600 bg-opacity-20 p-3 rounded-lg">
            <CheckCircle className="w-6 h-6 text-green-400" />
          </div>
          <div>
            <p className="text-sm text-gray-400">Completed</p>
            <p className="text-2xl font-bold text-white">{completedJobs}</p>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="flex items-center space-x-4">
          <div className="bg-blue-600 bg-opacity-20 p-3 rounded-lg">
            <DollarSign className="w-6 h-6 text-blue-400" />
          </div>
          <div>
            <p className="text-sm text-gray-400">Total Earnings</p>
            <p className="text-2xl font-bold text-white">${totalEarnings.toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default JobStats
