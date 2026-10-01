export async function sendInterestNtfy(topic: string): Promise<void> {
  const params = new URLSearchParams({
    title: 'İlgi isteği',
    priority: 'high',
    tags: 'heart',
  })

  const response = await fetch(`https://ntfy.sh/${topic}?${params}`, {
    method: 'POST',
    body: 'Dilara ilgi isteme butonuna bastı.',
  })

  if (!response.ok) {
    throw new Error(`ntfy responded with ${response.status}`)
  }
}
