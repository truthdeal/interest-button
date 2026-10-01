import { defineConfig, loadEnv, type Plugin } from 'vite'
import { sendInterestNtfy } from './lib/sendNtfy.ts'

function ntfyApiDevPlugin(env: Record<string, string>): Plugin {
  return {
    name: 'ntfy-api-dev',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = req.url?.split('?')[0]
        if (url !== '/api/interest' || req.method !== 'POST') {
          next()
          return
        }

        const topic = env.NTFY_TOPIC || 'dilara'

        try {
          await sendInterestNtfy(topic)
          res.statusCode = 200
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ ok: true }))
        } catch {
          res.statusCode = 502
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ error: 'Notification failed' }))
        }
      })
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [ntfyApiDevPlugin(env)],
  }
})
