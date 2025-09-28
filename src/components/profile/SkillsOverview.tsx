import { Star, CheckCircle, Clock } from 'lucide-react'
import type { Skill } from '../../types'
import EmptyState from '../ui/EmptyState'

interface SkillsOverviewProps {
  skills: Skill[]
}

const SkillsOverview = ({ skills }: SkillsOverviewProps) => {
  const verifiedCount = skills.filter(s => s.verified).length

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-white">Skills Overview</h2>
        <div className="flex items-center space-x-2 text-sm text-gray-300">
          <span>{skills.length} skills</span>
          <span>•</span>
          <span>{verifiedCount} verified</span>
        </div>
      </div>

      {skills.length > 0 ? (
        <div className="space-y-3">
          {skills.slice(0, 3).map((skill) => (
            <div key={skill.id} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
              <div>
                <h4 className="font-medium text-white">{skill.name}</h4>
                <p className="text-sm text-gray-300">{skill.description}</p>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${skill.verified
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800'
                  }`}>
                  {skill.verified ? (
                    <>
                      <CheckCircle className="w-3 h-3" />
                      <span>Verified</span>
                    </>
                  ) : (
                    <>
                      <Clock className="w-3 h-3" />
                      <span>Pending</span>
                    </>
                  )}
                </span>
                <span className="text-sm font-medium text-white">
                  Weight: {skill.weight}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState
          icon={Star}
          title="No Skills Added"
          description="Add your professional skills to start building your reputation."
        />
      )}
    </div>
  )
}

export default SkillsOverview

