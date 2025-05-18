import { Link } from 'react-router-dom'
import '../styles/ServicePage.css'

const MobileDevelopment = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="service-hero">
        <div className="container">
          <div className="service-hero-content">
            <h1>Mobile App Development</h1>
            <p className="service-hero-description">
              Build innovative mobile applications that engage users and drive business growth.
            </p>
            <Link to="/contact" className="btn btn-primary">Get a Free Consultation</Link>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="section overview-section">
        <div className="container">
          <div className="overview-grid">
            <div className="overview-content">
              <h2>Turn Your Ideas Into Powerful Mobile Experiences</h2>
              <p>
                In today's mobile-first world, a well-designed mobile app can be transformative for your business. 
                Our expert development team creates custom mobile applications that deliver exceptional user 
                experiences while meeting your specific business objectives.
              </p>
              <p>
                Whether you need a native iOS or Android app, a cross-platform solution, or a progressive web app, 
                we have the expertise to develop a mobile solution that engages your users and drives results.
              </p>
              <div className="overview-stats">
                <div className="stat">
                  <h3>6.5b</h3>
                  <p>smartphone users worldwide</p>
                </div>
                <div className="stat">
                  <h3>90%</h3>
                  <p>of mobile time spent in apps</p>
                </div>
                <div className="stat">
                  <h3>230b</h3>
                  <p>mobile app downloads annually</p>
                </div>
              </div>
            </div>
            <div className="overview-image">
              <img src="/images/mobile-development-overview.svg" alt="Mobile App Development" />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section service-details-section">
        <div className="container">
          <h2 className="section-title text-center">Our Mobile Development Services</h2>
          <div className="service-details-grid">
            <div className="service-detail-card">
              <div className="service-detail-icon">
                <i className="icon">📱</i>
              </div>
              <h3>Native iOS Development</h3>
              <p>
                We build high-performance iOS apps using Swift and SwiftUI that fully leverage 
                Apple's platform capabilities and design guidelines.
              </p>
            </div>

            <div className="service-detail-card">
              <div className="service-detail-icon">
                <i className="icon">🤖</i>
              </div>
              <h3>Native Android Development</h3>
              <p>
                Our team creates powerful Android applications using Kotlin that provide 
                exceptional performance and user experience across the Android ecosystem.
              </p>
            </div>

            <div className="service-detail-card">
              <div className="service-detail-icon">
                <i className="icon">🔄</i>
              </div>
              <h3>Cross-Platform Development</h3>
              <p>
                We use React Native and Flutter to build cost-effective apps that work seamlessly 
                across multiple platforms while maintaining a native feel.
              </p>
            </div>

            <div className="service-detail-card">
              <div className="service-detail-icon">
                <i className="icon">🌐</i>
              </div>
              <h3>Progressive Web Apps</h3>
              <p>
                We develop progressive web apps that combine the best of web and mobile apps, 
                offering offline functionality and app-like experiences.
              </p>
            </div>

            <div className="service-detail-card">
              <div className="service-detail-icon">
                <i className="icon">🎨</i>
              </div>
              <h3>UI/UX Design for Mobile</h3>
              <p>
                Our designers create intuitive, engaging mobile interfaces that follow platform-specific 
                design principles and deliver exceptional user experiences.
              </p>
            </div>

            <div className="service-detail-card">
              <div className="service-detail-icon">
                <i className="icon">🔌</i>
              </div>
              <h3>API Development & Integration</h3>
              <p>
                We build robust APIs and integrate with third-party services to ensure your 
                mobile app connects seamlessly with your existing systems.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section process-section">
        <div className="container">
          <h2 className="section-title text-center">Our Mobile App Development Process</h2>
          <div className="process-steps">
            <div className="process-step">
              <div className="process-step-number">1</div>
              <div className="process-step-content">
                <h3>Discovery & Planning</h3>
                <p>
                  We analyze your business goals, target audience, and competition to create 
                  a comprehensive mobile strategy and detailed project roadmap.
                </p>
              </div>
            </div>

            <div className="process-step">
              <div className="process-step-number">2</div>
              <div className="process-step-content">
                <h3>UI/UX Design</h3>
                <p>
                  Our designers create intuitive wireframes, user flows, and interactive prototypes 
                  to visualize the app before development begins.
                </p>
              </div>
            </div>

            <div className="process-step">
              <div className="process-step-number">3</div>
              <div className="process-step-content">
                <h3>Development</h3>
                <p>
                  Our development team builds your application using agile methodologies, 
                  with regular updates and demos throughout the process.
                </p>
              </div>
            </div>

            <div className="process-step">
              <div className="process-step-number">4</div>
              <div className="process-step-content">
                <h3>Testing & QA</h3>
                <p>
                  We conduct thorough testing across devices and operating systems to ensure 
                  your app works flawlessly for all users.
                </p>
              </div>
            </div>

            <div className="process-step">
              <div className="process-step-number">5</div>
              <div className="process-step-content">
                <h3>Deployment & Ongoing Support</h3>
                <p>
                  After launch, we provide ongoing maintenance, updates, and performance 
                  monitoring to ensure your app's continued success.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="section technology-section">
        <div className="container">
          <h2 className="section-title text-center">Technologies We Use</h2>
          <p className="section-description text-center">
            We leverage the latest mobile technologies to build powerful, scalable applications
          </p>
          
          <div className="technology-grid">
            <div className="technology-category">
              <h3>iOS Development</h3>
              <ul className="technology-list">
                <li>Swift</li>
                <li>SwiftUI</li>
                <li>Objective-C</li>
                <li>Xcode</li>
                <li>Core Data</li>
                <li>ARKit</li>
              </ul>
            </div>
            
            <div className="technology-category">
              <h3>Android Development</h3>
              <ul className="technology-list">
                <li>Kotlin</li>
                <li>Java</li>
                <li>Android Studio</li>
                <li>Jetpack Compose</li>
                <li>Room Database</li>
                <li>Android NDK</li>
              </ul>
            </div>
            
            <div className="technology-category">
              <h3>Cross-Platform</h3>
              <ul className="technology-list">
                <li>React Native</li>
                <li>Flutter</li>
                <li>Ionic</li>
                <li>Xamarin</li>
                <li>Capacitor</li>
                <li>Cordova</li>
              </ul>
            </div>
            
            <div className="technology-category">
              <h3>Backend & APIs</h3>
              <ul className="technology-list">
                <li>Node.js</li>
                <li>Firebase</li>
                <li>AWS Mobile</li>
                <li>GraphQL</li>
                <li>REST APIs</li>
                <li>MongoDB</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section faq-section">
        <div className="container">
          <h2 className="section-title text-center">Frequently Asked Questions</h2>
          <div className="faq-grid">
            <div className="faq-item">
              <h3>How long does it take to develop a mobile app?</h3>
              <p>
                Development timelines vary based on complexity. A simple app might take 2-3 months, 
                while a complex application could take 4-6 months or more. We'll provide a detailed 
                timeline during our initial planning phase.
              </p>
            </div>

            <div className="faq-item">
              <h3>Should I build a native app or a cross-platform app?</h3>
              <p>
                It depends on your specific requirements. Native apps offer the best performance and access 
                to platform features, while cross-platform apps can be more cost-effective with faster time-to-market. 
                We'll help you decide which approach best meets your business goals and budget.
              </p>
            </div>

            <div className="faq-item">
              <h3>How much does it cost to develop a mobile app?</h3>
              <p>
                App development costs vary widely based on complexity, features, and platforms. 
                We provide custom quotes after understanding your specific requirements. We're transparent 
                about pricing and offer flexible engagement models to accommodate different budgets.
              </p>
            </div>

            <div className="faq-item">
              <h3>Do you provide app maintenance and updates?</h3>
              <p>
                Yes, we offer ongoing maintenance and support to keep your app running smoothly. 
                This includes regular updates, bug fixes, performance monitoring, and feature enhancements 
                to ensure your app remains compatible with the latest OS versions and devices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section service-cta-section">
        <div className="container">
          <div className="service-cta-content">
            <h2>Ready to Build Your Mobile App?</h2>
            <p>Let's discuss how we can create a mobile solution that drives results for your business.</p>
            <Link to="/contact" className="btn btn-primary">Get Started</Link>
          </div>
        </div>
      </section>
    </>
  )
}

export default MobileDevelopment