import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import routes from './routes'
import { errorHandler } from './middleware/errorHandler'

const app = express()

app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    credentials: true,
  })
)
app.use(express.json())
app.use(cookieParser())

app.get('/api/health', (req, res) => {
  res.json({ ok: true, msg: 'gigmatch api is alive' })
})

app.use('/api', routes)

// keep this last so it catches anything thrown above
app.use(errorHandler)

export default app
