import { User, Award } from 'lucide-react'

interface ProfileHeaderProps {
  address: string
  reputationScore?: number
}

const ProfileHeader = ({ address, reputationScore = 0 }: ProfileHeaderProps) => {
  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`
  }

  return (
    <div className="card">
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <User className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white mb-1">
              Professional Profile
            </h1>
            <p className="text-gray-300 font-mono text-sm">
              {formatAddress(address)}
            </p>
          </div>
        </div>
      </div>

      {/* Reputation Score */}
      <div className="flex items-center justify-center p-6 bg-gradient-to-br from-yellow-900 to-orange-900 rounded-lg mb-6">
        <div className="text-center">
          <div className="flex items-center justify-center mb-2">
            <Award className="w-8 h-8 text-yellow-400 mr-2" />
            <span className="text-3xl font-bold text-white">{reputationScore}</span>
          </div>
          <p className="text-yellow-200 text-sm font-medium">Reputation Score</p>
        </div>
      </div>
    </div>
  )
}

export default ProfileHeader

