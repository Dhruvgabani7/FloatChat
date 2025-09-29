import React from 'react'
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceDot,
} from 'recharts'

const data = [
  { month: 'Apr', SST: 27.3 },
  { month: 'May', SST: 27.8 },
  { month: 'Jun', SST: 28.1 },
  { month: 'Jul', SST: 28.9 },
  { month: 'Aug', SST: 29.2 },
  { month: 'Sep', SST: 29.5 },
]

export default function PlotView() {
  return (
    <div className="plot-wrapper">
      <div className="plot-title">BGC Parameter Comparison (Indian Ocean — Last 6 Months)</div>
      <div className="plot-container">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 20, right: 30, left: 10, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#2b4a5f" />
            <XAxis dataKey="month" tick={{ fill: '#cde7f2' }} axisLine={{ stroke: '#2b4a5f' }} />
            <YAxis tick={{ fill: '#cde7f2' }} axisLine={{ stroke: '#2b4a5f' }} />
            <Tooltip contentStyle={{ background: '#0b1e2d', border: '1px solid #244b61' }} />
            <Line type="monotone" dataKey="SST" stroke="#4dd6ff" strokeWidth={3} dot={false} />
            <ReferenceDot x="Aug" y={29.2} r={6} fill="#ff9f43" stroke="none" />
          </LineChart>
        </ResponsiveContainer>
        <div className="plot-annotation">Anomaly: +1.2°C</div>
      </div>
    </div>
  )
}