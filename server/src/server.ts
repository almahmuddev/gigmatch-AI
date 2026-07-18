import 'dotenv/config'
import app from './app'
import { connectDB } from './config/db'

const PORT = process.env.PORT || 5000

connectDB()
  .then(() => {
    app.listen(PORT, () => console.log(`gigmatch api running on port ${PORT}`))
  })
  .catch((err) => {
    console.error('could not connect to mongodb, shutting down:', err.message)
    process.exit(1)
  })
