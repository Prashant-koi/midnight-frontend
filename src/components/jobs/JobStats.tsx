import { Play, CheckCircle, DollarSign } from 'lucide-react'

interface JobStatsProps {
  activeJobs: number
  completedJobs: number
  totalEarnings: number
}

const JobStats = ({ activeJobs, completedJobs, totalEarnings }: JobStatsProps) => {
  return (
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
  )
}

export default JobStats

