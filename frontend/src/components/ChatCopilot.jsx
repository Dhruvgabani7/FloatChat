import React, { useState } from 'react'

export default function ChatCopilot({ onToggleChat }) {
  const [messages, setMessages] = useState([
    { role: 'user', text: 'Show me ARGO floats in the Indian Ocean.' },
    { role: 'ai', text: 'Here are floats in the Indian Ocean. Choose a time frame?' },
  ])
  const [phase, setPhase] = useState('timeframe') // 'timeframe' | 'insight' | 'continue'
  const [input, setInput] = useState('')
  const [uploading, setUploading] = useState(false)

  const send = () => {
    if (!input.trim()) return
    setMessages([...messages, { role: 'user', text: input.trim() }])
    setInput('')
    // Simple progression to insight phase
    if (phase === 'timeframe') {
      setMessages((m) => [
        ...m,
        {
          role: 'ai',
          text: 'Proactive Insight: Did you know? SST is 1.2°C higher average. See historical comparison?',
        },
      ])
      setPhase('insight')
    } else if (phase === 'insight') {
      setMessages((m) => [...m, { role: 'ai', text: 'Okay, continuing exploration.' }])
      setPhase('continue')
    }
  }

  const chooseTimeframe = (v) => {
    setMessages((m) => [...m, { role: 'user', text: v }, { role: 'ai', text: `Applied: ${v}.` }])
    setMessages((m) => [
      ...m,
      {
        role: 'ai',
        text: 'Proactive Insight: Did you know? SST is 1.2°C higher average. See historical comparison?',
      },
    ])
    setPhase('insight')
  }

  const handleInsight = (answer) => {
    if (answer === 'yes') {
      setMessages((m) => [...m, { role: 'user', text: 'Yes, show me.' }, { role: 'ai', text: 'Displaying historical comparison of SST.' }])
    } else {
      setMessages((m) => [...m, { role: 'user', text: 'No, continue.' }, { role: 'ai', text: 'Continuing without historical comparison.' }])
    }
    setPhase('continue')
  }

  const handleFileSelect = async (e) => {
    const file = e.target.files && e.target.files[0]
    if (!file) return
    setUploading(true)
    try {
      const mime = file.type
      if (mime.startsWith('image/')) {
        const url = URL.createObjectURL(file)
        setMessages((m) => [...m, { role: 'user', attachment: { type: 'image', url, name: file.name } }])
      } else if (mime.startsWith('video/')) {
        const url = URL.createObjectURL(file)
        setMessages((m) => [...m, { role: 'user', attachment: { type: 'video', url, name: file.name } }])
      } else {
        const reader = new FileReader()
        reader.onload = () => {
          const text = String(reader.result || '')
          setMessages((m) => [...m, { role: 'user', attachment: { type: 'text', content: text, name: file.name } }])
        }
        reader.readAsText(file)
      }
    } finally {
      setUploading(false)
      e.target.value = ''
    }
  }

  return (
    <div className="chat-wrapper">
      <div className="chat-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div className="chat-title">Conversational Co-pilot Interface</div>
        <button
          className="chat-toggle-btn"
          aria-label="Hide chat"
          title="Hide chat and expand map"
          onClick={() => onToggleChat && onToggleChat(false)}
          style={{
            width: 32,
            height: 32,
            borderRadius: 8,
            border: '1px solid rgba(255,255,255,0.12)',
            background: 'rgba(255,255,255,0.06)',
            color: 'var(--text)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
        >×</button>
      </div>
      <div className="chat-history">
        {messages.map((m, i) => (
          <div key={i} className={`chat-msg ${m.role}`}>
            {m.attachment ? (
              <>
                {m.attachment.type === 'image' && (
                  <img className="attachment-image" src={m.attachment.url} alt={m.attachment.name} />
                )}
                {m.attachment.type === 'video' && (
                  <video className="attachment-video" src={m.attachment.url} controls />
                )}
                {m.attachment.type === 'text' && (
                  <div className="attachment-text">
                    <div className="attachment-name">{m.attachment.name}</div>
                    <pre>{(m.attachment.content || '').slice(0, 800)}</pre>
                  </div>
                )}
                {m.text && <div className="attachment-caption">{m.text}</div>}
              </>
            ) : (
              m.text
            )}
          </div>
        ))}

        {phase === 'timeframe' && (
          <div className="contextual-buttons">
            <button className="context-btn" onClick={() => chooseTimeframe('Last 30 Days')}>Last 30 Days</button>
            <button className="context-btn" onClick={() => chooseTimeframe('Last 6 Months')}>Last 6 Months</button>
          </div>
        )}

        {phase === 'insight' && (
          <div className="contextual-buttons">
            <button className="context-btn primary" onClick={() => handleInsight('yes')}>Yes, show me</button>
            <button className="context-btn" onClick={() => handleInsight('no')}>No, continue</button>
          </div>
        )}
      </div>
      <div className="chat-input-row">
        <label className={`attach-btn ${uploading ? 'disabled' : ''}`} title="Attach image, video or text file">
          📎
          <input
            type="file"
            accept="image/*,video/*,.txt,.csv,.json"
            onChange={handleFileSelect}
            disabled={uploading}
            style={{ display: 'none' }}
          />
        </label>
        <input
          className="chat-input"
          placeholder="Type a query..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && send()}
        />
        <button className="send-btn" aria-label="Send" onClick={send}>✈</button>
      </div>
    </div>
  )
}