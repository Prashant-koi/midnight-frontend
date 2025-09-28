declare global {
  interface Window {
    midnight?: {
      mnLace?: {
        apiVersion: string
        isEnabled(): Promise<boolean>
        enable(): Promise<{
          state(): Promise<{
            address?: string
            coinPublicKey?: string
            encryptionPublicKey?: string
            [k: string]: unknown
          }>
        }>
        serviceUriConfig(): Promise<Record<string, unknown>>
      }
    }
  }
}
export { }
