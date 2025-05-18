import { Link } from 'react-router-dom'
import '../styles/ServicePage.css'

const LeadGeneration = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="service-hero">
        <div className="container">
          <div className="service-hero-content">
            <h1>Lead Generation</h1>
            <p className="service-hero-description">
              Capture high-quality leads with proven strategies that fill your sales pipeline.
            </p>
            <Link to="/contact" className="btn btn-primary">Get a Lead Generation Strategy</Link>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="section overview-section">
        <div className="container">
          <div className="overview-grid">
            <div className="overview-content">
              <h2>Turn Prospects Into Customers</h2>
              <p>
                Generating high-quality leads is the lifeblood of any successful business. Our comprehensive 
                lead generation services help you identify, attract, and convert potential customers 
                who are genuinely interested in your products or services.
              </p>
              <p>
                At Altiora, we don't just focus on quantity—we prioritize quality leads that have a 
                higher probability of conversion. Our data-driven approach ensures that your sales team 
                spends time on prospects with real potential rather than cold leads.
              </p>
              <div className="overview-stats">
                <div className="stat">
                  <h3>61%</h3>
                  <p>of marketers rank lead generation as their top challenge</p>
                </div>
                <div className="stat">
                  <h3>79%</h3>
                  <p>of leads never convert without proper nurturing</p>
                </div>
                <div className="stat">
                  <h3>10x</h3>
                  <p>higher ROI with targeted lead generation campaigns</p>
                </div>
              </div>
            </div>
            <div className="overview-image">
              <img src="/images/lead-generation-overview.svg" alt="Lead Generation" />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section service-details-section">
        <div className="container">
          <h2 className="section-title text-center">Our Lead Generation Services</h2>
          <div className="service-details-grid">
            <div className="service-detail-card">
              <div className="service-detail-icon">
                <i className="icon">🔍</i>
              </div>
              <h3>Search Engine Marketing</h3>
              <p>
                Capture leads actively searching for your products or services with targeted 
                paid search campaigns on Google, Bing, and other search engines.
              </p>
            </div>

            <div className="service-detail-card">
              <div className="service-detail-icon">
                <i className="icon">📱</i>
              </div>
              <h3>Social Media Lead Generation</h3>
              <p>
                Leverage platforms like LinkedIn, Facebook, and Instagram to target potential 
                customers based on demographics, interests, and behaviors.
              </p>
            </div>

            <div className="service-detail-card">
              <div className="service-detail-icon">
                <i className="icon">📧</i>
              </div>
              <h3>Email Marketing Campaigns</h3>
              <p>
                Develop targeted email sequences that nurture prospects, provide value, 
                and guide them through your sales funnel.
              </p>
            </div>

            <div className="service-detail-card">
              <div className="service-detail-icon">
                <i className="icon">📝</i>
              </div>
              <h3>Content Marketing</h3>
              <p>
                Create valuable content that attracts and engages your target audience, 
                establishing your expertise and building trust with potential customers.
              </p>
            </div>

            <div className="service-detail-card">
              <div className="service-detail-icon">
                <i className="icon">🎯</i>
              </div>
              <h3>Landing Page Optimization</h3>
              <p>
                Design and optimize conversion-focused landing pages that turn visitors 
                into leads with compelling offers and clear calls to action.
              </p>
            </div>

            <div className="service-detail-card">
              <div className="service-detail-icon">
                <i className="icon">📊</i>
              </div>
              <h3>Lead Scoring & Qualification</h3>
              <p>
                Implement systems to evaluate and prioritize leads based on their demographics, 
                behaviors, and engagement level to focus on the most promising prospects.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section process-section">
        <div className="container">
          <h2 className="section-title text-center">Our Lead Generation Process</h2>
          <div className="process-steps">
            <div className="process-step">
              <div className="process-step-number">1</div>
              <div className="process-step-content">
                <h3>Research & Strategy Development</h3>
                <p>
                  We identify your ideal customer profiles, research your market, and develop 
                  a comprehensive lead generation strategy tailored to your business goals.
                </p>
              </div>
            </div>

            <div className="process-step">
              <div className="process-step-number">2</div>
              <div className="process-step-content">
                <h3>Channel Selection & Campaign Setup</h3>
                <p>
                  We identify the most effective channels for your target audience and create 
                  optimized campaigns to capture qualified leads.
                </p>
              </div>
            </div>

            <div className="process-step">
              <div className="process-step-number">3</div>
              <div className="process-step-content">
                <h3>Content Creation & Offer Development</h3>
                <p>
                  We develop compelling lead magnets, content, and offers that provide value 
                  to your prospects and incentivize them to share their contact information.
                </p>
              </div>
            </div>

            <div className="process-step">
              <div className="process-step-number">4</div>
              <div className="process-step-content">
                <h3>Lead Nurturing</h3>
                <p>
                  We implement automated sequences and personalized touchpoints to build 
                  relationships with leads and guide them toward a purchasing decision.
                </p>
              </div>
            </div>

            <div className="process-step">
              <div className="process-step-number">5</div>
              <div className="process-step-content">
                <h3>Analysis & Optimization</h3>
                <p>
                  We continuously monitor campaign performance, analyze results, and make 
                  data-driven adjustments to improve lead quality and conversion rates.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lead Generation Channels Section */}
      <section className="section channels-section">
        <div className="container">
          <h2 className="section-title text-center">Our Lead Generation Channels</h2>
          <p className="section-description text-center">
            We leverage multiple channels to reach your ideal customers where they are most active
          </p>
          
          <div className="channels-grid">
            <div className="channel-card">
              <div className="channel-icon">
                <i className="icon">🔍</i>
              </div>
              <h3>Search</h3>
              <ul className="channel-list">
                <li>Google Ads</li>
                <li>Bing Ads</li>
                <li>SEO</li>
              </ul>
            </div>
            
            <div className="channel-card">
              <div className="channel-icon">
                <i className="icon">📱</i>
              </div>
              <h3>Social</h3>
              <ul className="channel-list">
                <li>LinkedIn</li>
                <li>Facebook/Instagram</li>
                <li>Twitter</li>
              </ul>
            </div>
            
            <div className="channel-card">
              <div className="channel-icon">
                <i className="icon">📧</i>
              </div>
              <h3>Email</h3>
              <ul className="channel-list">
                <li>Newsletters</li>
                <li>Drip Campaigns</li>
                <li>Cold Outreach</li>
              </ul>
            </div>
            
            <div className="channel-card">
              <div className="channel-icon">
                <i className="icon">🖥️</i>
              </div>
              <h3>Display</h3>
              <ul className="channel-list">
                <li>Programmatic Ads</li>
                <li>Remarketing</li>
                <li>Banner Ads</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="section results-section">
        <div className="container">
          <h2 className="section-title text-center">Results You Can Expect</h2>
          
          <div className="results-grid">
            <div className="result-card">
              <div className="result-icon">
                <i className="icon">📈</i>
              </div>
              <h3>Increased Lead Volume</h3>
              <p>Generate more potential customers for your business with targeted campaigns.</p>
            </div>
            
            <div className="result-card">
              <div className="result-icon">
                <i className="icon">⭐</i>
              </div>
              <h3>Higher-Quality Leads</h3>
              <p>Attract prospects who are more likely to convert and become loyal customers.</p>
            </div>
            
            <div className="result-card">
              <div className="result-icon">
                <i className="icon">💰</i>
              </div>
              <h3>Improved ROI</h3>
              <p>Get more value from your marketing budget with efficient lead generation strategies.</p>
            </div>
            
            <div className="result-card">
              <div className="result-icon">
                <i className="icon">🔄</i>
              </div>
              <h3>Shortened Sales Cycle</h3>
              <p>Nurture leads effectively to reduce the time from initial contact to conversion.</p>
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
              <h3>How quickly will I see results from lead generation campaigns?</h3>
              <p>
                The timeline for results varies depending on your industry, target audience, and 
                chosen strategies. Some channels like paid search can generate leads immediately, 
                while others like content marketing may take several weeks or months to build momentum. 
                We focus on both quick wins and sustainable long-term results.
              </p>
            </div>

            <div className="faq-item">
              <h3>How do you measure the success of lead generation campaigns?</h3>
              <p>
                We track key metrics including lead volume, lead quality, cost per lead, conversion 
                rates, and ROI. We provide regular reports with these metrics and actionable insights. 
                Our focus is always on the metrics that matter most to your specific business goals.
              </p>
            </div>

            <div className="faq-item">
              <h3>What makes a good lead generation strategy?</h3>
              <p>
                Effective lead generation strategies are multi-channel, data-driven, and focused on 
                attracting high-quality leads rather than just high quantities. They include compelling 
                offers, clear calls to action, and systematic nurturing processes. Most importantly, 
                they align with your specific business goals and target audience.
              </p>
            </div>

            <div className="faq-item">
              <h3>How do you ensure leads are qualified?</h3>
              <p>
                We implement lead scoring systems that evaluate prospects based on demographic fit, 
                engagement level, and buying signals. We also use targeted messaging and qualification 
                questions in our lead capture forms to filter out prospects who aren't a good fit for 
                your products or services.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section service-cta-section">
        <div className="container">
          <div className="service-cta-content">
            <h2>Ready to Fill Your Sales Pipeline?</h2>
            <p>Let's create a lead generation strategy that drives growth for your business.</p>
            <Link to="/contact" className="btn btn-primary">Get Started</Link>
          </div>
        </div>
      </section>
    </>
  )
}

export default LeadGeneration