import express from 'express'
import cors from 'cors'
import datasetRouter from './routes/dataset.js'

const PORT = process.env.PORT || 3001

const app = express()
app.use(cors({ origin: true }))
app.use(express.json())

app.get('/api/health', (req, res) => res.json({ ok: true }))
app.use('/api', datasetRouter)

app.listen(PORT, () => {
  console.log(`[server] Listening on http://localhost:${PORT}`)
})