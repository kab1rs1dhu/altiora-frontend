import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/index.css'
import App from './App'

// Skip problematic imports for now
// import '@fortawesome/fontawesome-free/css/all.min.css'

// Add error handling for rendering
try {
  const root = ReactDOM.createRoot(document.getElementById('root'))
  
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
  
  console.log('React app rendered successfully')
} catch (error) {
  console.error('Error rendering React app:', error)
  
  // Display a fallback UI if rendering fails
  const rootElement = document.getElementById('root')
  if (rootElement) {
    rootElement.innerHTML = `
      <div style="padding: 20px; font-family: sans-serif; color: #333;">
        <h1>Something went wrong</h1>
        <p>We encountered an error while loading the application. Please check the console for details.</p>
        <pre style="background: #f8f8f8; padding: 10px; border-radius: 4px; overflow: auto;">
          ${error.message}
        </pre>
      </div>
    `
  }
}