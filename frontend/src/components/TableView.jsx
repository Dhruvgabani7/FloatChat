import React from 'react'

const rows = [
  { date: '2024-04-18', depth: 10, sst: 27.3, chlorophyll: 1.2 },
  { date: '2024-05-18', depth: 25, sst: 27.8, chlorophyll: 1.1 },
  { date: '2024-06-18', depth: 40, sst: 28.1, chlorophyll: 1.0 },
  { date: '2024-07-18', depth: 55, sst: 28.9, chlorophyll: 1.3 },
  { date: '2024-08-18', depth: 70, sst: 29.2, chlorophyll: 1.5 },
  { date: '2024-09-18', depth: 85, sst: 29.5, chlorophyll: 1.4 },
]

export default function TableView() {
  return (
    <div className="table-wrapper">
      <div className="table-title">BGC Parameters Table (Indian Ocean — Sample)</div>
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Depth (m)</th>
              <th>SST (°C)</th>
              <th>Chlorophyll</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i}>
                <td>{r.date}</td>
                <td>{r.depth}</td>
                <td>{r.sst}</td>
                <td>{r.chlorophyll}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}