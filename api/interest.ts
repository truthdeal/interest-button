import type { VercelRequest, VercelResponse } from '@vercel/node'
import { sendInterestNtfy } from '../lib/sendNtfy'

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const topic = process.env.NTFY_TOPIC ?? 'dilara'

  try {
    await sendInterestNtfy(topic)
    return res.status(200).json({ ok: true })
  } catch {
    return res.status(502).json({ error: 'Notification failed' })
  }
}
