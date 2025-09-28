import type { ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'

interface EmptyStateProps {
  icon: LucideIcon
  title: string
  description: string
  action?: {
    label: string
    onClick: () => void
    variant?: 'primary' | 'secondary'
  }
  children?: ReactNode
}

const EmptyState = ({ icon: Icon, title, description, action, children }: EmptyStateProps) => {
  return (
    <div className="text-center py-12">
      <Icon className="w-16 h-16 text-gray-500 mx-auto mb-4" />
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-gray-300 mb-6">{description}</p>
      {action && (
        <button
          onClick={action.onClick}
          className={action.variant === 'secondary' ? 'btn-secondary' : 'btn-primary'}
        >
          {action.label}
        </button>
      )}
      {children}
    </div>
  )
}

export default EmptyState

