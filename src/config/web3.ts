import { defaultWagmiConfig } from '@web3modal/wagmi/react/config'
import { cookieStorage, createStorage } from 'wagmi'
import { mainnet, sepolia } from 'wagmi/chains'

// Get projectId from WalletConnect Cloud
// IMPORTANT: To enable social logins (Google, Email, etc.):
// 1. Get a valid project ID from https://cloud.walletconnect.com (not 'demo-project-id')
// 2. Enable the "Auth" feature in your WalletConnect Cloud project settings
// 3. Add your domain to the allowed list (e.g., localhost:5173 for dev)
// Without Auth enabled, only crypto wallet connections will be available
export const projectId = import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID || 'demo-project-id'

if (projectId === 'demo-project-id') {
  console.warn(
    '⚠️ Using demo project ID. Social logins (Google, Email) will not be available.\n' +
    'To enable social logins:\n' +
    '1. Get a project ID from https://cloud.walletconnect.com\n' +
    '2. Enable Auth feature in your project\n' +
    '3. Set VITE_WALLET_CONNECT_PROJECT_ID in your .env file'
  )
}

const metadata = {
  name: 'Midnight Skills',
  description: 'Professional Skills Verification Platform',
  url: 'https://midnight-skills.com',
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}

// Create wagmiConfig
const chains = [mainnet, sepolia] as const
export const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
  ssr: true,
  storage: createStorage({
    storage: cookieStorage
  })
})
