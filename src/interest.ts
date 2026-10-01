export async function sendInterestPing(): Promise<void> {
  const response = await fetch('/api/interest', { method: 'POST' })

  if (!response.ok) {
    throw new Error('interest request failed')
  }
}
