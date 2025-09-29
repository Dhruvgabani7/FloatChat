import { Router } from 'express'
import loader from '../datasetLoader.js'

const router = Router()

router.get('/dataset', (req, res) => {
  const { q = '', limit = '100', offset = '0' } = req.query
  const rows = loader.getDataset()
  let filtered = rows
  if (q) {
    const qLower = String(q).toLowerCase()
    filtered = rows.filter((r) =>
      Object.values(r || {}).some((v) => String(v).toLowerCase().includes(qLower))
    )
  }
  const off = Math.max(0, parseInt(offset, 10) || 0)
  const lim = Math.max(1, parseInt(limit, 10) || 100)
  const slice = filtered.slice(off, off + lim)
  res.json({ total: filtered.length, offset: off, limit: lim, rows: slice })
})

router.get('/dataset/columns', (req, res) => {
  res.json({ columns: loader.getColumns() })
})

router.get('/dataset/stats', (req, res) => {
  res.json(loader.stats())
})

router.get('/dataset/:id', (req, res) => {
  const item = loader.findByIdOrIndex(req.params.id)
  if (!item) return res.status(404).json({ error: 'Not found' })
  res.json(item)
})

export default router