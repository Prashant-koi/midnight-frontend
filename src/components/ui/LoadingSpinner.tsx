interface LoadingSpinnerProps {
  message?: string
  size?: 'sm' | 'md' | 'lg'
}

const LoadingSpinner = ({ message = 'Loading...', size = 'md' }: LoadingSpinnerProps) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  }

  return (
    <div className="text-center py-12">
      <div className={`animate-spin ${sizeClasses[size]} border-2 border-white border-t-transparent rounded-full mx-auto mb-4`}></div>
      <p className="text-gray-300">{message}</p>
    </div>
  )
}

export default LoadingSpinner

