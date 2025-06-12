import { useState, useEffect } from 'react'
import { useContent } from '../context/ContentContext'
import '../styles/Contact.css'
import '../styles/LoadingStates.css'

const Contact = () => {
  const { fetchPageContent, getContentSection, loading, error } = useContent()
  const [pageContent, setPageContent] = useState(null)
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: ''
  })

  const [formSubmitted, setFormSubmitted] = useState(false)
  const [formError, setFormError] = useState(false)
  
  useEffect(() => {
    const loadContent = async () => {
      const content = await fetchPageContent('contact')
      setPageContent(content)
    }
    
    loadContent()
  }, [fetchPageContent])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      setFormError(true)
      return
    }
    
    // Here you would typically send the form data to your backend
    // For now, we'll just simulate a successful submission
    setFormError(false)
    setFormSubmitted(true)
    
    // Reset form after submission
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      service: '',
      message: ''
    })
  }
  
  // Get content from API or use defaults
  const heroTitle = getContentSection('contact', 'heroTitle', 'Get In Touch')
  const heroDescription = getContentSection('contact', 'heroDescription', 'We\'d love to hear from you. Let\'s discuss how we can help grow your business.')
  const contactInfoTitle = getContentSection('contact', 'contactInfoTitle', 'Contact Information')
  const contactInfoDescription = getContentSection('contact', 'contactInfoDescription', 'Reach out to us using the contact form or through any of the methods below. Our team is ready to answer your questions and help you achieve your goals.')
  const formTitle = getContentSection('contact', 'formTitle', 'Send Us a Message')
  const thankYouTitle = getContentSection('contact', 'thankYouTitle', 'Thank You!')
  const thankYouMessage = getContentSection('contact', 'thankYouMessage', 'Your message has been sent successfully. We\'ll get back to you shortly.')
  const errorMessage = getContentSection('contact', 'errorMessage', 'Please fill in all required fields.')
  
  // Get contact methods from API or use defaults
  let contactMethods = []
  try {
    contactMethods = JSON.parse(getContentSection('contact', 'contactMethods', '[]'))
  } catch (err) {
    console.error('Error parsing contact methods:', err)
    // Default contact methods
    contactMethods = [
      {
        icon: 'fa-solid fa-location-dot',
        title: 'Address',
        details: '123 Marketing Street, Suite 100<br />Digital City, DC 10101'
      },
      {
        icon: 'fa-solid fa-phone',
        title: 'Phone',
        details: '<a href="tel:+1234567890">(123) 456-7890</a>'
      },
      {
        icon: 'fa-solid fa-envelope',
        title: 'Email',
        details: '<a href="mailto:info@altiora.com">info@altiora.com</a>'
      },
      {
        icon: 'fa-solid fa-clock',
        title: 'Business Hours',
        details: 'Monday - Friday: 9:00 AM - 5:00 PM<br />Saturday & Sunday: Closed'
      }
    ]
  }
  
  // Get social links from API or use defaults
  let socialLinks = []
  try {
    socialLinks = JSON.parse(getContentSection('contact', 'socialLinks', '[]'))
  } catch (err) {
    console.error('Error parsing social links:', err)
    // Default social links
    socialLinks = [
      {
        icon: 'fa-brands fa-facebook-f',
        url: 'https://facebook.com',
        label: 'Facebook'
      },
      {
        icon: 'fa-brands fa-twitter',
        url: 'https://twitter.com',
        label: 'Twitter'
      },
      {
        icon: 'fa-brands fa-linkedin-in',
        url: 'https://linkedin.com',
        label: 'LinkedIn'
      },
      {
        icon: 'fa-brands fa-instagram',
        url: 'https://instagram.com',
        label: 'Instagram'
      }
    ]
  }
  
  // Get service options from API or use defaults
  let serviceOptions = []
  try {
    serviceOptions = JSON.parse(getContentSection('contact', 'serviceOptions', '[]'))
  } catch (err) {
    console.error('Error parsing service options:', err)
    // Default service options
    serviceOptions = [
      { value: 'SEO', label: 'Search Engine Optimization' },
      { value: 'PPC', label: 'PPC Advertising' },
      { value: 'Web Development', label: 'Web Development' },
      { value: 'Mobile Development', label: 'Mobile App Development' },
      { value: 'Lead Generation', label: 'Lead Generation' },
      { value: 'Appointment Setting', label: 'Appointment Setting' },
      { value: 'Other', label: 'Other' }
    ]
  }
  
  // If we're still loading initial content and have no backup data yet, show a loading spinner
  if (loading && !pageContent && contactMethods.length === 0) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading content...</p>
      </div>
    )
  }

  return (
    <section className="page-blue-gold contact-page">
      <section className="contact-hero">
        <div className="container">
          <div className="contact-hero-content">
            <h1>{heroTitle}</h1>
            <p>{heroDescription}</p>
          </div>
        </div>
      </section>

      <section className="section contact-section">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-info">
              <h2>{contactInfoTitle}</h2>
              <p>
                {contactInfoDescription}
              </p>
              
              <div className="contact-methods">
                {contactMethods.map((method, index) => (
                  <div className="contact-method" key={index}>
                    <div className="contact-method-icon">
                      <i className={method.icon}></i>
                    </div>
                    <div className="contact-method-details">
                      <h3>{method.title}</h3>
                      <p dangerouslySetInnerHTML={{ __html: method.details }}></p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="social-links-contact">
                <h3>Connect With Us</h3>
                <div className="social-icons">
                  {socialLinks.map((link, index) => (
                    <a 
                      key={index}
                      href={link.url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      aria-label={link.label}
                    >
                      <i className={link.icon}></i>
                    </a>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="contact-form-container">
              <h2>{formTitle}</h2>
              
              {formSubmitted ? (
                <div className="form-success">
                  <i className="fa-solid fa-circle-check"></i>
                  <h3>{thankYouTitle}</h3>
                  <p>{thankYouMessage}</p>
                  <button className="btn btn-primary" onClick={() => setFormSubmitted(false)}>Send Another Message</button>
                </div>
              ) : (
                <form className="contact-form" onSubmit={handleSubmit}>
                  {formError && (
                    <div className="form-error">
                      <p>{errorMessage}</p>
                    </div>
                  )}
                  
                  <div className="form-group">
                    <label htmlFor="name">Full Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="email">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="company">Company Name</label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="service">Service of Interest</label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                    >
                      <option value="">Select a service</option>
                      {serviceOptions.map((option, index) => (
                        <option key={index} value={option.value}>{option.label}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="message">Message *</label>
                    <textarea
                      id="message"
                      name="message"
                      rows="5"
                      value={formData.message}
                      onChange={handleChange}
                      required
                    ></textarea>
                  </div>
                  
                  <div className="form-submit">
                    <button type="submit" className="btn btn-primary">Send Message</button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="section map-section">
        <div className="container">
          <div className="map-container">
            {/* Replace with actual Google Maps embed code */}
            <div className="map-placeholder">
              <p>Google Map will be embedded here</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Error message if content loading failed */}
      {error && (
        <div className="error-message">
          <p>Some content could not be loaded. Please refresh the page or try again later.</p>
        </div>
      )}
    </section>
  )
}

export default Contact