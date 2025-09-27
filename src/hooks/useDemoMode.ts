import { useState, useEffect } from 'react'

// Demo mode hook for testing without wallet connection
export const useDemoMode = () => {
  const [isDemoMode, setIsDemoMode] = useState(false)
  const [demoAddress, setDemoAddress] = useState('0x1234567890123456789012345678901234567890')

  useEffect(() => {
    // Check if demo mode is enabled via URL parameter or localStorage
    const urlParams = new URLSearchParams(window.location.search)
    const demoParam = urlParams.get('demo')
    const storedDemo = localStorage.getItem('midnight-demo-mode')
    
    if (demoParam === 'true' || storedDemo === 'true') {
      setIsDemoMode(true)
      localStorage.setItem('midnight-demo-mode', 'true')
    }
  }, [])

  const enableDemoMode = () => {
    setIsDemoMode(true)
    localStorage.setItem('midnight-demo-mode', 'true')
  }

  const disableDemoMode = () => {
    setIsDemoMode(false)
    localStorage.removeItem('midnight-demo-mode')
  }

  return {
    isDemoMode,
    demoAddress,
    enableDemoMode,
    disableDemoMode,
    setDemoAddress
  }
}
