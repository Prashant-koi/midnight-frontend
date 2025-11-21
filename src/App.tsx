import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createWeb3Modal } from '@web3modal/wagmi/react'

import { config, projectId } from './config/web3'
import Layout from './components/Layout/Layout'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Skills from './pages/Skills'
import Reputation from './pages/Reputation'
import Jobs from './pages/Jobs'
import JobDetails from './pages/JobDetails'
import CurrentJobs from './pages/CurrentJobs'

// Setup queryClient
const queryClient = new QueryClient()

// Create modal with social login options
createWeb3Modal({
  wagmiConfig: config,
  projectId,
  enableAnalytics: true,
  enableOnramp: true,
  // Enable social logins - requires Auth feature from WalletConnect Cloud
  featuredWalletIds: [
    // Add popular wallet IDs here if needed
  ],
  // Allow all wallets
  allWallets: 'SHOW',
  // Enable email and social logins (requires WalletConnect Cloud Auth)
  // Note: To use social logins, you need to:
  // 1. Get a valid WalletConnect Project ID from https://cloud.walletconnect.com
  // 2. Enable Auth in your project settings
  // 3. Set VITE_WALLET_CONNECT_PROJECT_ID in your .env file
})

function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/skills" element={<Skills />} />
              <Route path="/reputation" element={<Reputation />} />
              <Route path="/jobs" element={<Jobs />} />
              <Route path="/jobs/:jobId" element={<JobDetails />} />
              <Route path="/currentjobs" element={<CurrentJobs />} />
            </Routes>
          </Layout>
        </Router>
      </QueryClientProvider>
    </WagmiProvider>
  )
}

export default App
