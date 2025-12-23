import { useState } from 'react'
import QRCode from 'react-qr-code'
import './App.css'

function App() {
  const [value, setValue] = useState('')
  const [qrValue, setQrValue] = useState('https://github.com/elyor-sh')

  const handleGenerate = () => {
    if (value.trim()) {
      setQrValue(value)
    }
  }

  const handleDownload = () => {
    const svg = document.getElementById('qr-code')
    if (!svg) return

    const svgData = new XMLSerializer().serializeToString(svg)
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const img = new Image()

    img.onload = () => {
      canvas.width = img.width
      canvas.height = img.height
      ctx?.drawImage(img, 0, 0)
      const pngFile = canvas.toDataURL('image/png')

      const downloadLink = document.createElement('a')
      downloadLink.download = 'qrcode.png'
      downloadLink.href = pngFile
      downloadLink.click()
    }

    img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)))
  }

  return (
    <div className="app-container">
      <div className="content-wrapper">
        <div className="header">
          <h1 className="title">
            <span className="gradient-text">QR Code</span> Generator
          </h1>
          <p className="subtitle">Создайте QR код для любого текста или ссылки</p>
        </div>

        <div className="qr-section">
          <div className="qr-display">
            <div className="qr-wrapper">
              <QRCode
                id="qr-code"
                value={qrValue}
                size={256}
                level="H"
                bgColor="#ffffff"
                fgColor="#000000"
              />
            </div>
          </div>

          <div className="controls">
            <div className="input-group">
              <label htmlFor="qr-input" className="input-label">
                Введите текст или URL
              </label>
              <input
                id="qr-input"
                type="text"
                className="qr-input"
                placeholder="https://example.com"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleGenerate()}
              />
            </div>

            <div className="button-group">
              <button
                className="btn btn-primary"
                onClick={handleGenerate}
                disabled={!value.trim()}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Генерировать
              </button>
              <button
                className="btn btn-secondary"
                onClick={handleDownload}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Скачать PNG
              </button>
            </div>

            <div className="current-value">
              <span className="value-label">Текущее значение:</span>
              <span className="value-text">{qrValue}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
