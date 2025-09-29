import React, { useState, useCallback, useRef } from 'react'

export default function ResizableSplitter({ 
  children, 
  defaultSplit = 50, 
  minSize = 20, 
  maxSize = 80,
  direction = 'horizontal' // 'horizontal' | 'vertical'
}) {
  const [split, setSplit] = useState(defaultSplit)
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef(null)

  const handleMouseDown = useCallback((e) => {
    setIsDragging(true)
    e.preventDefault()
  }, [])

  const handleMouseMove = useCallback((e) => {
    if (!isDragging) return

    const container = containerRef.current
    if (!container) return

    const rect = container.getBoundingClientRect()
    let percentage

    if (direction === 'horizontal') {
      percentage = ((e.clientY - rect.top) / rect.height) * 100
    } else {
      percentage = ((e.clientX - rect.left) / rect.width) * 100
    }

    percentage = Math.max(minSize, Math.min(maxSize, percentage))
    setSplit(percentage)
  }, [isDragging, direction, minSize, maxSize])

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
  }, [])

  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      return () => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
      }
    }
  }, [isDragging, handleMouseMove, handleMouseUp])

  const [firstChild, secondChild] = React.Children.toArray(children)

  return (
    <div ref={containerRef} className={`resizable-container ${direction}`}>
      <div 
        className="resizable-pane first"
        style={{ 
          [direction === 'horizontal' ? 'height' : 'width']: `${split}%` 
        }}
      >
        {firstChild}
      </div>
      
      <div 
        className={`resizable-splitter ${direction} ${isDragging ? 'dragging' : ''}`}
        onMouseDown={handleMouseDown}
      >
        <div className="splitter-handle">
          {direction === 'horizontal' ? '⋯' : '⋮'}
        </div>
      </div>
      
      <div 
        className="resizable-pane second"
        style={{ 
          [direction === 'horizontal' ? 'height' : 'width']: `${100 - split}%` 
        }}
      >
        {secondChild}
      </div>
    </div>
  )
}