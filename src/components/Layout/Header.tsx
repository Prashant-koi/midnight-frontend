import { Link, useLocation } from 'react-router-dom'
import { User, Wallet, Award, Briefcase, FolderOpen } from 'lucide-react'
import { useMidnightWallet } from '../../hooks/useMidnightWallet'

const Header = () => {
  const location = useLocation()
  const { account: midnightAddress, isConnected: isMidnightConnected, connecting: isMidnightConnecting, error: midnightError, connect: connectMidnight, disconnect: disconnectMidnight } = useMidnightWallet()

  const navigation = [
    { name: 'Profile', href: '/profile', icon: User },
    { name: 'Skills', href: '/skills' },
    { name: 'Reputation', href: '/reputation', icon: Award },
    { name: 'Current Jobs', href: '/currentjobs', icon: FolderOpen },
  ]

  const formatAddress = (addr: string) => {
    if (!addr) return ''
    if (addr.length <= 10) return addr
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`
  }

  const handleMidnightAction = () => {
    if (isMidnightConnected) {
      disconnectMidnight()
    } else {
      connectMidnight()
    }
  }

  const isUserConnected = isMidnightConnected

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
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${location.pathname === '/jobs'
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
                      className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive
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

            {/* Midnight Wallet Address Display */}
            {isMidnightConnected && midnightAddress && (
              <div className="hidden sm:flex items-center space-x-2 text-sm text-purple-300">
                <Wallet className="w-4 h-4" />
                <span>{formatAddress(midnightAddress)}</span>
                <span className="text-purple-400 text-xs">(Midnight)</span>
              </div>
            )}

            {/* Midnight Connect/Disconnect */}
            <div className="flex flex-col items-end">
              <button
                onClick={handleMidnightAction}
                disabled={isMidnightConnecting}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${isMidnightConnected
                    ? 'bg-gray-700 text-white hover:bg-gray-600'
                    : 'bg-white text-black hover:bg-gray-200'
                  } ${isMidnightConnecting ? 'opacity-60 cursor-not-allowed' : ''}`}
              >
                <Wallet className="w-4 h-4" />
                <span>{isMidnightConnecting ? 'Connecting…' : (isMidnightConnected ? 'Disconnect Midnight' : 'Connect Midnight')}</span>
              </button>
              {midnightError && (
                <span className="text-xs text-red-400 mt-1 max-w-[16rem] text-right">
                  {midnightError}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden border-t border-gray-700">
        <div className="px-2 pt-2 pb-3 space-y-1">
          {/* Jobs Link for Mobile - Always visible */}
          <Link
            to="/jobs"
            className={`flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium ${location.pathname === '/jobs'
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
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium ${isActive
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
