
import { Link } from 'react-router-dom'
import '../styles/NotFound.css'

const NotFound = () => {
  return (
    <section className="not-found">
      <div className="container not-found-container">
        <div className="not-found-content">
          <h1>404</h1>
          <h2>Page Not Found</h2>
          <p>The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.</p>
          <Link to="/" className="btn btn-primary">Back to Homepage</Link>
        </div>
        <div className="not-found-image">
          <img src="/images/404-illustration.svg" alt="Page not found" />
        </div>
      </div>
    </section>
  )
}

export default NotFound