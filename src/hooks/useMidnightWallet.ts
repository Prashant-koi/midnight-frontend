import { useCallback, useEffect, useRef, useState } from 'react'
import { getMidnightConnector, hasCompatibleVersion, type MidnightConnector, type MidnightWallet } from '../config/midnight'

export function useMidnightWallet() {
  const [account, setAccount] = useState<string | undefined>()
  const [isConnected, setConnected] = useState(false)
  const [connecting, setConnecting] = useState(false)
  const [error, setError] = useState<string | undefined>()

  const connectorRef = useRef<MidnightConnector | undefined>(undefined)
  const walletRef = useRef<MidnightWallet | undefined>(undefined)

  useEffect(() => {
    connectorRef.current = getMidnightConnector()
  }, [])

  const connect = useCallback(async () => {
    const conn = connectorRef.current ?? getMidnightConnector()
    if (!conn) {
      const msg = 'Midnight Lace wallet not detected'
      console.error('[Midnight] connect aborted:', msg)
      setError(msg)
      return
    }
    if (!hasCompatibleVersion(conn.apiVersion)) {
      const msg = `Incompatible wallet connector API version: ${conn.apiVersion} (expected 1.x)`
      console.error('[Midnight] version check failed:', msg)
      setError(msg)
      return
    }

    setConnecting(true)
    setError(undefined)
    try {
      // Optional presence check (mirrors reference flow)
      await conn.isEnabled().catch(() => false)

      // Enable returns wallet API
      const wallet = await conn.enable()
      walletRef.current = wallet

      // Optionally fetch service URIs (debug/info)
      void conn.serviceUriConfig().then((u) => console.debug('[Midnight] serviceUriConfig', u)).catch(() => { })

      const st = await wallet.state()
      const addr = st?.address
      if (addr) {
        setAccount(addr)
        setConnected(true)
      } else {
        setError('Connected but no address returned from wallet.state()')
      }
    } catch (e) {
      console.error('[Midnight] connect error:', e)
      setError(e instanceof Error ? e.message : 'Connect failed')
    } finally {
      setConnecting(false)
    }
  }, [])

  const disconnect = useCallback(async () => {
    try {
      // Reference API doesn’t expose an explicit disconnect; clear local state
      walletRef.current = undefined
    } finally {
      setAccount(undefined)
      setConnected(false)
    }
  }, [])

  // No standard events exposed in reference; if added later, wire them here.

  return { account, isConnected, connecting, error, connect, disconnect }
}
