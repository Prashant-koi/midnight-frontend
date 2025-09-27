import { defaultWagmiConfig } from '@web3modal/wagmi/react/config'
import { cookieStorage, createStorage } from 'wagmi'
import { mainnet, sepolia } from 'wagmi/chains'

// Get projectId from WalletConnect Cloud
export const projectId = process.env.VITE_WALLET_CONNECT_PROJECT_ID || 'demo-project-id'

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
