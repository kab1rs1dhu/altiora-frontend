import { useState } from 'react'
import '../styles/Contact.css'

const Contact = () => {
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

  return (
    <>
      <section className="contact-hero">
        <div className="container">
          <div className="contact-hero-content">
            <h1>Get In Touch</h1>
            <p>We'd love to hear from you. Let's discuss how we can help grow your business.</p>
          </div>
        </div>
      </section>

      <section className="section contact-section">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-info">
              <h2>Contact Information</h2>
              <p>
                Reach out to us using the contact form or through any of the methods below. 
                Our team is ready to answer your questions and help you achieve your goals.
              </p>
              
              <div className="contact-methods">
                <div className="contact-method">
                  <div className="contact-method-icon">
                    <i className="fa-solid fa-location-dot"></i>
                  </div>
                  <div className="contact-method-details">
                    <h3>Address</h3>
                    <p>123 Marketing Street, Suite 100<br />Digital City, DC 10101</p>
                  </div>
                </div>
                
                <div className="contact-method">
                  <div className="contact-method-icon">
                    <i className="fa-solid fa-phone"></i>
                  </div>
                  <div className="contact-method-details">
                    <h3>Phone</h3>
                    <p><a href="tel:+1234567890">(123) 456-7890</a></p>
                  </div>
                </div>
                
                <div className="contact-method">
                  <div className="contact-method-icon">
                    <i className="fa-solid fa-envelope"></i>
                  </div>
                  <div className="contact-method-details">
                    <h3>Email</h3>
                    <p><a href="mailto:info@altiora.com">info@altiora.com</a></p>
                  </div>
                </div>
                
                <div className="contact-method">
                  <div className="contact-method-icon">
                    <i className="fa-solid fa-clock"></i>
                  </div>
                  <div className="contact-method-details">
                    <h3>Business Hours</h3>
                    <p>Monday - Friday: 9:00 AM - 5:00 PM<br />Saturday & Sunday: Closed</p>
                  </div>
                </div>
              </div>
              
              <div className="social-links-contact">
                <h3>Connect With Us</h3>
                <div className="social-icons">
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                    <i className="fa-brands fa-facebook-f"></i>
                  </a>
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                    <i className="fa-brands fa-twitter"></i>
                  </a>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                    <i className="fa-brands fa-linkedin-in"></i>
                  </a>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                    <i className="fa-brands fa-instagram"></i>
                  </a>
                </div>
              </div>
            </div>
            
            <div className="contact-form-container">
              <h2>Send Us a Message</h2>
              
              {formSubmitted ? (
                <div className="form-success">
                  <i className="fa-solid fa-circle-check"></i>
                  <h3>Thank You!</h3>
                  <p>Your message has been sent successfully. We'll get back to you shortly.</p>
                  <button className="btn btn-primary" onClick={() => setFormSubmitted(false)}>Send Another Message</button>
                </div>
              ) : (
                <form className="contact-form" onSubmit={handleSubmit}>
                  {formError && (
                    <div className="form-error">
                      <p>Please fill in all required fields.</p>
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
                      <option value="SEO">Search Engine Optimization</option>
                      <option value="PPC">PPC Advertising</option>
                      <option value="Web Development">Web Development</option>
                      <option value="Mobile Development">Mobile App Development</option>
                      <option value="Lead Generation">Lead Generation</option>
                      <option value="Appointment Setting">Appointment Setting</option>
                      <option value="Other">Other</option>
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
    </>
  )
}

export default Contact