import { Search, Filter } from 'lucide-react'

interface JobFiltersProps {
  searchTerm: string
  onSearchChange: (value: string) => void
  selectedType: string
  onTypeChange: (value: string) => void
  selectedLevel: string
  onLevelChange: (value: string) => void
}

const JobFilters = ({
  searchTerm,
  onSearchChange,
  selectedType,
  onTypeChange,
  selectedLevel,
  onLevelChange
}: JobFiltersProps) => {
  return (
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
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gray-300" />
            <select
              className="input-field min-w-32"
              value={selectedType}
              onChange={(e) => onTypeChange(e.target.value)}
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
            onChange={(e) => onLevelChange(e.target.value)}
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
  )
}

export default JobFilters

