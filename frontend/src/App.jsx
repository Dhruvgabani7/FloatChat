import React, { useState, useEffect } from 'react'
import './index.css'
import MapView from './components/MapView'
import PlotView from './components/PlotView'
import TableView from './components/TableView'
import ChatCopilot from './components/ChatCopilot'
import ResizableSplitter from './components/ResizableSplitter'
import HomePage from './components/HomePage'

function App() {
  const [mode, setMode] = useState('home') // 'home' | 'app'
  const [activeView, setActiveView] = useState('plot') // 'map' | 'plot' | 'table'
  const [theme, setTheme] = useState('theme-ocean')
  const [chatOpen, setChatOpen] = useState(true)

  // Push a history entry when entering app mode so browser Back returns to home.
  useEffect(() => {
    if (mode === 'app') {
      window.history.pushState({ mode: 'app' }, '', '#app')
    }
  }, [mode])

  // Handle browser back/forward to restore homepage.
  useEffect(() => {
    const onPop = () => {
      setMode('home')
    }
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  return (
    <div className={mode === 'home' ? '' : `app-root ${theme}`}>
      {mode === 'home' ? (
        <HomePage onLaunch={() => setMode('app')} />
      ) : (
        <>
        <div className="panel panel-left">
          <div className="panel-header">
            <div className="brand">
              <span className="brand-mark">FloatChat</span>
              <span className="brand-sub">Guided Discovery Co-pilot</span>
            </div>
          <div className="header-actions">
            <label className="theme-label" htmlFor="theme-select">Theme</label>
            <select
              id="theme-select"
              className="theme-select"
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              title="Switch UI theme"
            >
              <option value="theme-ocean">Ocean</option>
              <option value="theme-sunset">Sunset</option>
              <option value="theme-forest">Forest</option>
              <option value="theme-slate">Slate</option>
              <option value="theme-neon">Neon</option>
            </select>
          </div>
        </div>

        <div className="visualization-canvas">
          {activeView === 'map' ? (
            <div className="canvas-section map-section single">
              <MapView />
              <div className="view-switcher top">
                <button
                  className={`switch-btn ${activeView === 'map' ? 'active' : ''}`}
                  onClick={() => setActiveView('map')}
                  title="Show only the map (full screen)"
                >🗺️ Map View</button>
                <button
                  className={`switch-btn ${activeView === 'plot' ? 'active' : ''}`}
                  onClick={() => setActiveView('plot')}
                  title="Show plot below the map"
                >📈 Plot Below</button>
                <button
                  className={`switch-btn ${activeView === 'table' ? 'active' : ''}`}
                  onClick={() => setActiveView('table')}
                  title="Show table below the map"
                >📋 Table Below</button>
                <button className="switch-btn primary" title="Share or export current view">⤴ Share/Export</button>
              </div>
            </div>
          ) : (
            <ResizableSplitter defaultSplit={58} minSize={28} maxSize={82} direction="horizontal">
              <div className="canvas-section map-section">
                <MapView />
                <div className="view-switcher top">
                  <button
                    className={`switch-btn ${activeView === 'map' ? 'active' : ''}`}
                    onClick={() => setActiveView('map')}
                    title="Show only the map (full screen)"
                  >🗺️ Map View</button>
                  <button
                    className={`switch-btn ${activeView === 'plot' ? 'active' : ''}`}
                    onClick={() => setActiveView('plot')}
                    title="Show plot below the map"
                  >📈 Plot Below</button>
                  <button
                    className={`switch-btn ${activeView === 'table' ? 'active' : ''}`}
                    onClick={() => setActiveView('table')}
                    title="Show table below the map"
                  >📋 Table Below</button>
                  <button className="switch-btn primary" title="Share or export current view">⤴ Share/Export</button>
                </div>
              </div>
              <div className="canvas-section plot-section">
                {activeView === 'table' ? <TableView /> : <PlotView />}
              </div>
            </ResizableSplitter>
          )}
        </div>
      </div>

      <div className="panel panel-right" style={{ display: chatOpen ? 'flex' : 'none' }}>
        <ChatCopilot onToggleChat={setChatOpen} />
      </div>
        {!chatOpen && (
          <button
            className="chat-fab"
            title="Show chat"
            onClick={() => setChatOpen(true)}
            style={{
              position: 'absolute',
              bottom: 16,
              right: 16,
              zIndex: 1600,
              width: 44,
              height: 44,
              borderRadius: '50%',
              background: 'linear-gradient(180deg, var(--cyan), var(--aqua))',
              color: '#042437',
              fontWeight: 900,
              border: '1px solid rgba(77, 214, 255, 0.25)',
              boxShadow: '0 12px 24px rgba(0,0,0,0.35)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >💬</button>
        )}
      </>
      )}
      </div>
  )
}

export default App
