import { Link } from 'react-router-dom'
import '../styles/ServicePage.css'

const AppointmentSetting = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="service-hero">
        <div className="container">
          <div className="service-hero-content">
            <h1>Appointment Setting</h1>
            <p className="service-hero-description">
              Fill your calendar with qualified prospects through our professional appointment setting services.
            </p>
            <Link to="/contact" className="btn btn-primary">Get More Appointments</Link>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="section overview-section">
        <div className="container">
          <div className="overview-grid">
            <div className="overview-content">
              <h2>Book More Meetings with Decision-Makers</h2>
              <p>
                Appointment setting is often the most challenging part of the sales process. Our professional 
                appointment setting services remove this burden from your sales team, allowing them to focus 
                on what they do best—closing deals.
              </p>
              <p>
                At Altiora, we connect your business with qualified decision-makers who are genuinely 
                interested in your products or services. Our experienced team uses proven strategies to 
                engage prospects, overcome objections, and secure quality appointments for your sales team.
              </p>
              <div className="overview-stats">
                <div className="stat">
                  <h3>48%</h3>
                  <p>of sales professionals say prospecting is the most challenging part of sales</p>
                </div>
                <div className="stat">
                  <h3>75%</h3>
                  <p>increase in selling time when outsourcing appointment setting</p>
                </div>
                <div className="stat">
                  <h3>35%</h3>
                  <p>higher close rates with pre-qualified appointments</p>
                </div>
              </div>
            </div>
            <div className="overview-image">
              <img src="/images/appointment-setting-overview.svg" alt="Appointment Setting" />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section service-details-section">
        <div className="container">
          <h2 className="section-title text-center">Our Appointment Setting Services</h2>
          <div className="service-details-grid">
            <div className="service-detail-card">
              <div className="service-detail-icon">
                <i className="icon">📞</i>
              </div>
              <h3>B2B Appointment Setting</h3>
              <p>
                We connect your business with qualified decision-makers at target companies 
                through personalized outreach and relationship building.
              </p>
            </div>

            <div className="service-detail-card">
              <div className="service-detail-icon">
                <i className="icon">📧</i>
              </div>
              <h3>Email Appointment Campaigns</h3>
              <p>
                We develop and execute strategic email sequences designed to engage prospects 
                and convert them into scheduled appointments.
              </p>
            </div>

            <div className="service-detail-card">
              <div className="service-detail-icon">
                <i className="icon">🔄</i>
              </div>
              <h3>Follow-Up Management</h3>
              <p>
                We implement consistent follow-up processes to nurture leads and 
                increase appointment conversion rates over time.
              </p>
            </div>

            <div className="service-detail-card">
              <div className="service-detail-icon">
                <i className="icon">🎯</i>
              </div>
              <h3>Target Account Prospecting</h3>
              <p>
                We identify and engage high-value accounts that match your ideal customer 
                profile through specialized outreach strategies.
              </p>
            </div>

            <div className="service-detail-card">
              <div className="service-detail-icon">
                <i className="icon">📅</i>
              </div>
              <h3>Calendar Management</h3>
              <p>
                We handle scheduling logistics, confirmations, and reminders to ensure 
                appointments go smoothly and reduce no-shows.
              </p>
            </div>

            <div className="service-detail-card">
              <div className="service-detail-icon">
                <i className="icon">📊</i>
              </div>
              <h3>Performance Tracking & Reporting</h3>
              <p>
                We provide detailed reports on outreach activities, conversion rates, 
                and appointment quality to continuously improve results.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section process-section">
        <div className="container">
          <h2 className="section-title text-center">Our Appointment Setting Process</h2>
          <div className="process-steps">
            <div className="process-step">
              <div className="process-step-number">1</div>
              <div className="process-step-content">
                <h3>Ideal Customer Profiling</h3>
                <p>
                  We work with you to define your ideal customer profile, including industry, 
                  company size, decision-maker roles, and qualifying criteria.
                </p>
              </div>
            </div>

            <div className="process-step">
              <div className="process-step-number">2</div>
              <div className="process-step-content">
                <h3>Message Development</h3>
                <p>
                  We create compelling scripts and messaging tailored to your target audience, 
                  highlighting your unique value proposition and relevant pain points.
                </p>
              </div>
            </div>

            <div className="process-step">
              <div className="process-step-number">3</div>
              <div className="process-step-content">
                <h3>Prospect Identification</h3>
                <p>
                  We research and identify qualified prospects that match your ideal customer 
                  profile and build targeted outreach lists.
                </p>
              </div>
            </div>

            <div className="process-step">
              <div className="process-step-number">4</div>
              <div className="process-step-content">
                <h3>Multi-Channel Outreach</h3>
                <p>
                  We engage prospects through multiple channels including calls, emails, 
                  and social media to maximize response rates.
                </p>
              </div>
            </div>

            <div className="process-step">
              <div className="process-step-number">5</div>
              <div className="process-step-content">
                <h3>Appointment Scheduling & Handoff</h3>
                <p>
                  We schedule qualified appointments and provide your sales team with detailed 
                  prospect information to ensure productive meetings.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="section why-choose-section">
        <div className="container">
          <h2 className="section-title text-center">Why Choose Our Appointment Setting Services</h2>
          
          <div className="why-choose-grid">
            <div className="why-choose-card">
              <div className="why-choose-icon">
                <i className="icon">⭐</i>
              </div>
              <h3>Quality-Focused Approach</h3>
              <p>
                We prioritize appointment quality over quantity, ensuring your sales team meets 
                with genuinely interested and qualified prospects.
              </p>
            </div>
            
            <div className="why-choose-card">
              <div className="why-choose-icon">
                <i className="icon">🤝</i>
              </div>
              <h3>Professional Representation</h3>
              <p>
                Our appointment setters act as an extension of your team, representing your brand 
                with professionalism and expertise.
              </p>
            </div>
            
            <div className="why-choose-card">
              <div className="why-choose-icon">
                <i className="icon">📱</i>
              </div>
              <h3>Multi-Channel Approach</h3>
              <p>
                We leverage multiple communication channels to reach prospects where they're most responsive.
              </p>
            </div>
            
            <div className="why-choose-card">
              <div className="why-choose-icon">
                <i className="icon">🔄</i>
              </div>
              <h3>Consistent Follow-Up</h3>
              <p>
                We implement persistent but respectful follow-up strategies that convert more prospects 
                into appointments without being pushy.
              </p>
            </div>
            
            <div className="why-choose-card">
              <div className="why-choose-icon">
                <i className="icon">📊</i>
              </div>
              <h3>Data-Driven Optimization</h3>
              <p>
                We continuously analyze performance data to refine messaging, targeting, and outreach 
                strategies for optimal results.
              </p>
            </div>
            
            <div className="why-choose-card">
              <div className="why-choose-icon">
                <i className="icon">⚙️</i>
              </div>
              <h3>Seamless Integration</h3>
              <p>
                We integrate with your existing CRM and sales processes to ensure smooth information 
                flow and appointment handoff.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="section industries-section">
        <div className="container">
          <h2 className="section-title text-center">Industries We Serve</h2>
          <p className="section-description text-center">
            Our appointment setting services are customized for various industries
          </p>
          
          <div className="industries-grid">
            <div className="industry-card">
              <div className="industry-icon">
                <i className="icon">💻</i>
              </div>
              <h3>Technology & SaaS</h3>
            </div>
            
            <div className="industry-card">
              <div className="industry-icon">
                <i className="icon">📊</i>
              </div>
              <h3>Financial Services</h3>
            </div>
            
            <div className="industry-card">
              <div className="industry-icon">
                <i className="icon">🏥</i>
              </div>
              <h3>Healthcare</h3>
            </div>
            
            <div className="industry-card">
              <div className="industry-icon">
                <i className="icon">🏭</i>
              </div>
              <h3>Manufacturing</h3>
            </div>
            
            <div className="industry-card">
              <div className="industry-icon">
                <i className="icon">🏢</i>
              </div>
              <h3>Professional Services</h3>
            </div>
            
            <div className="industry-card">
              <div className="industry-icon">
                <i className="icon">🛒</i>
              </div>
              <h3>Retail & E-commerce</h3>
            </div>
            
            <div className="industry-card">
              <div className="industry-icon">
                <i className="icon">🏗️</i>
              </div>
              <h3>Construction</h3>
            </div>
            
            <div className="industry-card">
              <div className="industry-icon">
                <i className="icon">🎓</i>
              </div>
              <h3>Education</h3>
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
              <h3>How many appointments can I expect each month?</h3>
              <p>
                The number of appointments varies based on factors like your industry, target audience, 
                and the complexity of your offering. During our initial consultation, we'll discuss 
                realistic expectations based on your specific situation and establish clear targets 
                for your campaign.
              </p>
            </div>

            <div className="faq-item">
              <h3>How do you ensure appointment quality?</h3>
              <p>
                We use detailed qualification criteria developed in collaboration with your team to 
                ensure we're booking appointments with the right prospects. We gather key information 
                during our conversations with prospects and only schedule appointments with those who 
                demonstrate genuine interest and fit your ideal customer profile.
              </p>
            </div>

            <div className="faq-item">
              <h3>How quickly can you start setting appointments?</h3>
              <p>
                After our initial consultation and strategy development, we can typically begin 
                outreach within 1-2 weeks. The time to first appointments varies by industry and 
                targeting, but most clients start seeing appointments within the first month of 
                active outreach.
              </p>
            </div>

            <div className="faq-item">
              <h3>Do we need to provide contact lists?</h3>
              <p>
                While we can work with your existing contact lists, we also have extensive research 
                capabilities to build targeted prospect lists based on your ideal customer profile. 
                This combined approach typically yields the best results, leveraging both your existing 
                network and our ability to identify new opportunities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section service-cta-section">
        <div className="container">
          <div className="service-cta-content">
            <h2>Ready to Fill Your Calendar?</h2>
            <p>Let's discuss how our appointment setting services can connect you with qualified prospects.</p>
            <Link to="/contact" className="btn btn-primary">Get Started</Link>
          </div>
        </div>
      </section>
    </>
  )
}

export default AppointmentSetting