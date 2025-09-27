import { Link, useLocation } from 'react-router-dom'
import { User, LogOut, Wallet, TestTube, Award, Briefcase } from 'lucide-react'
import { useAccount, useDisconnect } from 'wagmi'
import { useWeb3Modal } from '@web3modal/wagmi/react'
import { useDemoMode } from '../../hooks/useDemoMode'

const Header = () => {
  const location = useLocation()
  const { address, isConnected } = useAccount()
  const { disconnect } = useDisconnect()
  const { open } = useWeb3Modal()
  const { isDemoMode, demoAddress, enableDemoMode, disableDemoMode } = useDemoMode()

  const navigation = [
    { name: 'Profile', href: '/profile', icon: User },
    { name: 'Skills', href: '/skills' },
    { name: 'Reputation', href: '/reputation', icon: Award },
  ]

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`
  }

  const handleWalletAction = () => {
    if (isDemoMode) {
      disableDemoMode()
    } else if (isConnected) {
      disconnect()
    } else {
      open()
    }
  }

  const handleDemoMode = () => {
    enableDemoMode()
  }

  // Use demo address if in demo mode, otherwise use wallet address
  const currentAddress = isDemoMode ? demoAddress : address
  const isUserConnected = isDemoMode || isConnected

  return (
    <header className="bg-gray-900 border-b border-gray-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <span className="text-black font-bold text-sm">M</span>
            </div>
            <span className="text-xl font-bold text-white">Midnight Skills</span>
          </Link>

          {/* Center Jobs Link - Always visible */}
          <div className="flex items-center">
            <Link
              to="/jobs"
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                location.pathname === '/jobs'
                  ? 'bg-white text-black'
                  : 'text-white hover:bg-gray-700'
              }`}
            >
              <Briefcase className="w-4 h-4" />
              <span>Jobs</span>
            </Link>
          </div>

          {/* Right side - Wallet and Navigation */}
          <div className="flex items-center space-x-4">
            {/* Connected User Navigation */}
            {isUserConnected && (
              <nav className="hidden md:flex space-x-4">
                {navigation.map((item) => {
                  const isActive = location.pathname === item.href
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        isActive
                          ? 'bg-white text-black'
                          : 'text-gray-300 hover:text-white hover:bg-gray-700'
                      }`}
                    >
                      {item.icon && <item.icon className="w-4 h-4" />}
                      <span>{item.name}</span>
                    </Link>
                  )
                })}
              </nav>
            )}

            {/* Wallet Address Display */}
            {isUserConnected && currentAddress && (
              <div className="hidden sm:flex items-center space-x-2 text-sm text-gray-300">
                {isDemoMode && <TestTube className="w-4 h-4 text-blue-400" />}
                <Wallet className="w-4 h-4" />
                <span>{formatAddress(currentAddress)}</span>
                {isDemoMode && <span className="text-blue-400 text-xs">(Demo)</span>}
              </div>
            )}
            
            {/* Demo Mode Button (for non-connected users) */}
            {!isUserConnected && (
              <button
                onClick={handleDemoMode}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors bg-gray-700 text-white hover:bg-gray-600"
              >
                <TestTube className="w-4 h-4" />
                <span>Demo Mode</span>
              </button>
            )}
            
            {/* Wallet Connect/Disconnect Button */}
            <button
              onClick={handleWalletAction}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                isUserConnected
                  ? 'bg-gray-700 text-white hover:bg-gray-600'
                  : 'bg-white text-black hover:bg-gray-200'
              }`}
            >
              {isUserConnected ? (
                <>
                  <LogOut className="w-4 h-4" />
                  <span>{isDemoMode ? 'Exit Demo' : 'Disconnect'}</span>
                </>
              ) : (
                <>
                  <Wallet className="w-4 h-4" />
                  <span>Connect Wallet</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden border-t border-gray-700">
        <div className="px-2 pt-2 pb-3 space-y-1">
          {/* Jobs Link for Mobile - Always visible */}
          <Link
            to="/jobs"
            className={`flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium ${
              location.pathname === '/jobs'
                ? 'bg-white text-black'
                : 'text-gray-300 hover:text-white hover:bg-gray-700'
            }`}
          >
            <Briefcase className="w-5 h-5" />
            <span>Jobs</span>
          </Link>

          {/* Other navigation items (only when connected) */}
          {isUserConnected && (
            <>
              {navigation.map((item) => {
                const isActive = location.pathname === item.href
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium ${
                      isActive
                        ? 'bg-white text-black'
                        : 'text-gray-300 hover:text-white hover:bg-gray-700'
                    }`}
                  >
                    {item.icon && <item.icon className="w-5 h-5" />}
                    <span>{item.name}</span>
                  </Link>
                )
              })}
            </>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
