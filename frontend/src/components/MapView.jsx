import React from 'react'
import { MapContainer, TileLayer, Polyline, CircleMarker } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

const trajectories = [
  [
    [16.0, 60.0],
    [16.5, 61.5],
    [17.0, 63.0],
    [17.2, 64.5],
    [16.8, 66.0],
    [16.0, 67.5],
  ],
  [
    [14.0, 58.0],
    [14.5, 59.2],
    [15.0, 60.5],
    [15.4, 62.0],
    [15.7, 63.5],
    [16.0, 65.0],
  ],
  [
    [12.0, 62.0],
    [12.8, 63.0],
    [13.5, 64.2],
    [14.0, 65.3],
    [14.6, 66.2],
    [15.0, 67.1],
  ],
]

const pointStyle = {
  color: '#29d3c2',
  opacity: 0.95,
  fillColor: '#29d3c2',
  fillOpacity: 0.95,
}

export default function MapView() {
  const center = [-10.0, 75.0] // Indian Ocean focus

  return (
    <div className="map-wrapper">
      <div className="map-title">Global Ocean Map • ARGO Float Trajectories (Indian Ocean)</div>
      <MapContainer center={center} zoom={4} scrollWheelZoom zoomControl={false} className="map-container">
        <TileLayer
          attribution='&copy; <a href="https://carto.com/attributions">CARTO</a> &copy; OpenStreetMap contributors'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        {trajectories.map((track, i) => (
          <React.Fragment key={i}>
            <Polyline positions={track} pathOptions={{ color: '#4dd6ff', weight: 2, opacity: 0.9 }} />
            {track.map((pt, idx) => (
              <CircleMarker
                key={`${i}-${idx}`}
                center={pt}
                radius={4}
                pathOptions={pointStyle}
                className="glow-point"
              />
            ))}
          </React.Fragment>
        ))}
      </MapContainer>
    </div>
  )
}