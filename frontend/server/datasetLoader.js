import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

let cache = { rows: [], columns: [] }

function resolveDatasetPath() {
  const envPath = process.env.DATASET_PATH
  if (envPath && fs.existsSync(envPath)) return envPath
  const localPath = path.join(__dirname, 'data', 'dataset.json')
  if (fs.existsSync(localPath)) return localPath
  const samplePath = path.join(__dirname, 'data', 'dataset.sample.json')
  return samplePath
}

export function loadDataset() {
  const p = resolveDatasetPath()
  let rows = []
  try {
    const raw = fs.readFileSync(p, 'utf8')
    rows = JSON.parse(raw)
  } catch (e) {
    console.error('[datasetLoader] Failed to read dataset:', e.message)
    rows = []
  }
  const columns = Array.from(rows.reduce((set, row) => {
    Object.keys(row || {}).forEach((k) => set.add(k))
    return set
  }, new Set()))
  cache = { rows, columns }
  return cache
}

export function getDataset() {
  if (!cache.rows.length) loadDataset()
  return cache.rows
}

export function getColumns() {
  if (!cache.columns.length) loadDataset()
  return cache.columns
}

function isNumeric(n) {
  return typeof n === 'number' && Number.isFinite(n)
}

export function stats() {
  const rows = getDataset()
  const columns = getColumns()
  const numericCols = columns.filter((c) => rows.some((r) => isNumeric(r[c])))
  const numeric = {}
  for (const col of numericCols) {
    let min = Infinity,
      max = -Infinity,
      sum = 0,
      count = 0
    for (const r of rows) {
      const v = r[col]
      if (isNumeric(v)) {
        if (v < min) min = v
        if (v > max) max = v
        sum += v
        count++
      }
    }
    numeric[col] = count ? { min, max, mean: sum / count, count } : { count: 0 }
  }
  return { count: rows.length, columns, numeric }
}

export function findByIdOrIndex(id) {
  const rows = getDataset()
  const numId = Number(id)
  if (!Number.isNaN(numId)) {
    const byId = rows.find((r) => String(r.id) === String(id))
    if (byId) return byId
    const idx = numId - 1
    if (idx >= 0 && idx < rows.length) return rows[idx]
  }
  const byStringId = rows.find((r) => String(r.id) === String(id))
  return byStringId || null
}

export default {
  loadDataset,
  getDataset,
  getColumns,
  stats,
  findByIdOrIndex,
}