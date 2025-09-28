export type MidnightConnector = {
  apiVersion: string
  isEnabled(): Promise<boolean>
  enable(): Promise<MidnightWallet>
  serviceUriConfig(): Promise<Record<string, unknown>>
}
export type MidnightWallet = {
  state(): Promise<{ address?: string;[k: string]: unknown }>
}

export function getMidnightConnector(): MidnightConnector | undefined {
  const md = typeof window !== 'undefined' ? (window as any).midnight : undefined
  const conn = md?.mnLace as MidnightConnector | undefined
  if (!conn) console.warn('[Midnight] window.midnight.mnLace not found')
  return conn
}

export function hasCompatibleVersion(v: string): boolean {
  // Reference expects 1.x (see battleship connectToWallet)
  return /^1\./.test(v)
}
