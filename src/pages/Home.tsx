import { useAccount } from 'wagmi'
import { useWeb3Modal } from '@web3modal/wagmi/react'
import { Shield, Users, Award, TrendingUp, TestTube } from 'lucide-react'
import { useDemoMode } from '../hooks/useDemoMode'

const Home = () => {
  const { isConnected } = useAccount()
  const { open } = useWeb3Modal()
  const { isDemoMode, enableDemoMode } = useDemoMode()

  const features = [
    {
      icon: Shield,
      title: 'Verified Skills',
      description: 'Upload proof and get your professional skills verified through our advanced algorithm.',
    },
    {
      icon: Users,
      title: 'Peer Endorsements',
      description: 'Receive endorsements from colleagues and clients to build your professional reputation.',
    },
    {
      icon: Award,
      title: 'Reputation Score',
      description: 'Build a comprehensive reputation score based on verified skills and endorsements.',
    },
    {
      icon: TrendingUp,
      title: 'Career Growth',
      description: 'Track your professional growth and showcase your expertise to potential employers.',
    },
  ]

  const isUserConnected = isDemoMode || isConnected

  if (isUserConnected) {
    return (
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-6">
          Welcome to Midnight Skills
        </h1>
        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Your professional skills verification platform. Manage your skills, build your reputation, and grow your career.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          {features.map((feature, index) => (
            <div key={index} className="card text-center">
              <div className="flex justify-center mb-4">
                <feature.icon className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-300 text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="text-center">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold text-white mb-6">
          Professional Skills
          <span className="block">Verification Platform</span>
        </h1>
        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Verify your professional skills, build your reputation, and showcase your expertise 
          with blockchain-powered credentials.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <button
            onClick={() => open()}
            className="btn-primary text-lg px-8 py-4"
          >
            Connect Wallet to Get Started
          </button>
          <button
            onClick={enableDemoMode}
            className="btn-secondary text-lg px-8 py-4 flex items-center justify-center space-x-2"
          >
            <TestTube className="w-5 h-5" />
            <span>Try Demo Mode</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="card text-center">
              <div className="flex justify-center mb-4">
                <feature.icon className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-300 text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 card">
          <h2 className="text-2xl font-bold text-white mb-4">
            Why Choose Midnight Skills?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div>
              <h3 className="font-semibold text-white mb-2">Decentralized Verification</h3>
              <p className="text-gray-300 text-sm">
                Your skills are verified using blockchain technology, ensuring transparency and immutability.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-2">AI-Powered Assessment</h3>
              <p className="text-gray-300 text-sm">
                Our advanced algorithms analyze your proof submissions to determine skill authenticity.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-2">Professional Network</h3>
              <p className="text-gray-300 text-sm">
                Connect with other professionals and build meaningful endorsement relationships.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
