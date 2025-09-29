import React from 'react'

export default function HomePage({ onLaunch }) {
  return (
    <div className="home-root">
      {/* Navbar */}
      <nav className="home-nav">
        <div className="nav-inner">
          <div className="nav-left">
            <div className="logo">
              <span className="logo-wave">〰</span>
              <span className="logo-text">FloatChat</span>
            </div>
          </div>
          <div className="nav-center">
            <a href="#features" className="nav-link">Features</a>
            <a href="#sources" className="nav-link">Data Sources</a>
            <a href="#about" className="nav-link">About</a>
          </div>
          <div className="nav-right">
            <button className="nav-cta" onClick={() => onLaunch && onLaunch()}>Launch App</button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <header className="home-hero">
        <div className="hero-bg" />
        <div className="hero-anim">
          <div className="anim-layer l1" />
          <div className="anim-layer l2" />
          <div className="anim-layer l3" />
        </div>
        <div className="hero-content animate-fade">
          <h1 className="hero-title">Ask Questions. Get Ocean Insights. Instantly.</h1>
          <p className="hero-sub">
            FloatChat is an AI-powered co-pilot that makes exploring complex ARGO ocean data as simple as having a conversation.
          </p>
          <button className="hero-cta" onClick={() => onLaunch && onLaunch()}>Start Exploring Now →</button>
        </div>
      </header>

      {/* How It Works */}
      <section id="how" className="home-section light">
        <div className="section-inner">
          <h2 className="section-title">How It Works</h2>
          <div className="cards-3">
            <div className="card hover-float">
              <img className="card-hero" src="/ask.svg" alt="Ask in chat" />
              <div className="card-icon">💬</div>
              <div className="card-title">ASK</div>
              <p className="card-desc">Ask natural-language questions to explore ocean datasets.</p>
            </div>
            <div className="card hover-float">
              <img className="card-hero" src="/visualize.svg" alt="Visualize data" />
              <div className="card-icon">📊</div>
              <div className="card-title">VISUALIZE</div>
              <p className="card-desc">Easily plot, map, and compare insights.</p>
            </div>
            <div className="card hover-float">
              <img className="card-hero" src="/discover.svg" alt="Discover insights" />
              <div className="card-icon">💡</div>
              <div className="card-title">DISCOVER</div>
              <p className="card-desc">Uncover trends and anomalies with AI guidance.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="home-section white">
        <div className="section-inner">
          <h2 className="section-title">Powerful Features</h2>
          <div className="features-grid">
            <div className="feature-card hover-float">
              <div className="feature-icon">💬</div>
              <div className="feature-title">Conversational Querying</div>
              <div className="feature-desc">Chat with your data to filter, slice, and explore instantly.</div>
            </div>
            <div className="feature-card hover-float">
              <div className="feature-icon">🗺️</div>
              <div className="feature-title">Interactive Geospatial Analysis</div>
              <div className="feature-desc">Pan, zoom, and overlay ARGO trajectories and anomalies.</div>
            </div>
            <div className="feature-card hover-float">
              <div className="feature-icon">🧠</div>
              <div className="feature-title">AI‑Powered Insights</div>
              <div className="feature-desc">Automatic highlights and context-aware suggestions as you explore.</div>
            </div>
            <div className="feature-card hover-float">
              <div className="feature-icon">⬇</div>
              <div className="feature-title">Seamless Data Export</div>
              <div className="feature-desc">Export views and tables for reporting and collaboration.</div>
            </div>
          </div>
        </div>
      </section>

     

      

      {/* Footer */}
      <footer className="home-footer">
        <div className="footer-inner">
          <div className="footer-left">© 2025 FloatChat</div>
          <div className="footer-right">
            <a href="#about" className="footer-link">About</a>
            <a href="#privacy" className="footer-link">Privacy Policy</a>
            <a href="#contact" className="footer-link">Contact Us</a>
          </div>
        </div>
      </footer>
    </div>
  )
}