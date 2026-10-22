import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import tags from './routes/tags.js'
import auth from './routes/auth.js'
import notes from './routes/notes.js'
import { optionalAuth } from './middleware/auth.js'

const app = new Hono()

app.use("*", optionalAuth)

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.route('/auth', auth)
app.route('/tags', tags)
app.route('/notes', notes)

serve({
  fetch: app.fetch,
  port: 3000
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
