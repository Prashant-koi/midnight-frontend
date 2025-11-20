import { Loader2 } from 'lucide-react'

interface LoadingSpinnerProps {
  message?: string
  size?: 'sm' | 'md' | 'lg'
}

const LoadingSpinner = ({ message, size = 'md' }: LoadingSpinnerProps) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  }

  return (
    <div className="flex flex-col items-center justify-center py-12">
      <Loader2 className={`${sizeClasses[size]} text-white animate-spin mb-4`} />
      {message && (
        <p className="text-gray-300 text-center">{message}</p>
      )}
    </div>
  )
}

export default LoadingSpinner
