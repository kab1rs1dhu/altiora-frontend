import { Link } from 'react-router-dom'
import '../styles/ServicePage.css'

const PPC = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="service-hero">
        <div className="container">
          <div className="service-hero-content">
            <h1>PPC Advertising</h1>
            <p className="service-hero-description">
              Drive targeted traffic and generate immediate results with our data-driven pay-per-click campaigns.
            </p>
            <Link to="/contact" className="btn btn-primary">Get a Free PPC Analysis</Link>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="section overview-section">
        <div className="container">
          <div className="overview-grid">
            <div className="overview-content">
              <h2>Drive Immediate Results with Targeted PPC</h2>
              <p>
                In today's competitive digital landscape, pay-per-click (PPC) advertising offers an 
                immediate way to reach your target audience and drive qualified traffic to your website. 
                Our expert PPC management services ensure your ads appear in front of the right people 
                at the right time.
              </p>
              <p>
                At Altiora, we develop and manage high-performing paid advertising campaigns across 
                Google Ads, Bing Ads, social media platforms, and more. Our data-driven approach focuses 
                on maximizing your return on ad spend (ROAS) while minimizing costs.
              </p>
              <div className="overview-stats">
                <div className="stat">
                  <h3>80%</h3>
                  <p>of businesses run PPC campaigns for brand exposure</p>
                </div>
                <div className="stat">
                  <h3>200%</h3>
                  <p>average ROI for Google Ads campaigns</p>
                </div>
                <div className="stat">
                  <h3>65%</h3>
                  <p>of clicks go to ads for high-commercial intent searches</p>
                </div>
              </div>
            </div>
            <div className="overview-image">
              <img src="/images/ppc-overview.svg" alt="PPC Advertising" />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section service-details-section">
        <div className="container">
          <h2 className="section-title text-center">Our PPC Services</h2>
          <div className="service-details-grid">
            <div className="service-detail-card">
              <div className="service-detail-icon">
                <i className="fa-solid fa-magnifying-glass-dollar"></i>
              </div>
              <h3>Google Ads Management</h3>
              <p>
                We create and optimize campaigns across Google's search, display, shopping, and 
                video networks to reach your target audience at every stage of the buying journey.
              </p>
            </div>

            <div className="service-detail-card">
              <div className="service-detail-icon">
                <i className="fa-brands fa-microsoft"></i>
              </div>
              <h3>Microsoft Advertising</h3>
              <p>
                Expand your reach on Bing, Yahoo, and other Microsoft partner networks to 
                capture valuable leads that your competitors might be missing.
              </p>
            </div>

            <div className="service-detail-card">
              <div className="service-detail-icon">
                <i className="fa-solid fa-hashtag"></i>
              </div>
              <h3>Social Media Advertising</h3>
              <p>
                We develop targeted campaigns on platforms like Facebook, Instagram, LinkedIn, and 
                Twitter to reach your ideal audience based on demographics, interests, and behaviors.
              </p>
            </div>

            <div className="service-detail-card">
              <div className="service-detail-icon">
                <i className="fa-solid fa-bullseye"></i>
              </div>
              <h3>Retargeting/Remarketing</h3>
              <p>
                Re-engage visitors who have previously interacted with your website but haven't 
                converted, bringing them back to complete their journey.
              </p>
            </div>

            <div className="service-detail-card">
              <div className="service-detail-icon">
                <i className="fa-solid fa-store"></i>
              </div>
              <h3>Shopping Campaigns</h3>
              <p>
                Showcase your products with visually-appealing shopping ads that drive qualified 
                traffic and sales for e-commerce businesses.
              </p>
            </div>

            <div className="service-detail-card">
              <div className="service-detail-icon">
                <i className="fa-solid fa-chart-line"></i>
              </div>
              <h3>Performance Tracking & Analysis</h3>
              <p>
                We monitor campaign performance, provide comprehensive reporting, and continuously 
                optimize your ads to maximize return on investment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section process-section">
        <div className="container">
          <h2 className="section-title text-center">Our PPC Management Process</h2>
          <div className="process-steps">
            <div className="process-step">
              <div className="process-step-number">1</div>
              <div className="process-step-content">
                <h3>Discovery & Research</h3>
                <p>
                  We analyze your business, competitors, target audience, and industry trends 
                  to understand your unique challenges and opportunities.
                </p>
              </div>
            </div>

            <div className="process-step">
              <div className="process-step-number">2</div>
              <div className="process-step-content">
                <h3>Campaign Strategy</h3>
                <p>
                  We develop a custom PPC strategy with the right platforms, targeting options, 
                  ad formats, and budget allocation to meet your business goals.
                </p>
              </div>
            </div>

            <div className="process-step">
              <div className="process-step-number">3</div>
              <div className="process-step-content">
                <h3>Campaign Setup</h3>
                <p>
                  We build well-structured campaigns with compelling ad copy, relevant keywords, 
                  and targeted audience segments to drive qualified traffic.
                </p>
              </div>
            </div>

            <div className="process-step">
              <div className="process-step-number">4</div>
              <div className="process-step-content">
                <h3>Optimization</h3>
                <p>
                  We continuously monitor and refine your campaigns, adjusting bids, keywords, 
                  ad copy, and audience targeting to improve performance.
                </p>
              </div>
            </div>

            <div className="process-step">
              <div className="process-step-number">5</div>
              <div className="process-step-content">
                <h3>Reporting & Analysis</h3>
                <p>
                  We provide transparent, detailed reports on campaign performance and insights 
                  for continuous improvement.
                </p>
              </div>
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
              <h3>How much should I budget for PPC advertising?</h3>
              <p>
                PPC budgets vary widely based on industry, competition, and goals. We recommend 
                starting with a test budget that allows for statistically significant data collection. 
                After analyzing initial results, we can provide recommendations for optimal budget 
                allocation based on your ROI targets.
              </p>
            </div>

            <div className="faq-item">
              <h3>How quickly will I see results from PPC campaigns?</h3>
              <p>
                Unlike SEO, PPC can generate immediate traffic and leads. However, campaign optimization 
                takes time. Initial results are typically visible within days, but expect 2-4 weeks of 
                optimization to achieve peak performance as we gather data and refine the campaigns.
              </p>
            </div>

            <div className="faq-item">
              <h3>What platforms should I advertise on?</h3>
              <p>
                The best platforms depend on your business type, target audience, and goals. Google Ads 
                works well for most businesses, while social platforms like Facebook, Instagram, or 
                LinkedIn might be more effective for specific industries or B2B companies. We'll 
                recommend the optimal mix based on your specific situation.
              </p>
            </div>

            <div className="faq-item">
              <h3>How do you measure PPC success?</h3>
              <p>
                We track conversions, cost-per-acquisition (CPA), return on ad spend (ROAS), 
                click-through rate (CTR), quality score, and other relevant metrics. Most importantly, 
                we focus on the KPIs that directly impact your business goals, whether that's lead 
                generation, sales, or brand awareness.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section service-cta-section">
        <div className="container">
          <div className="service-cta-content">
            <h2>Ready to Accelerate Your Growth with PPC?</h2>
            <p>Get a free PPC analysis and discover untapped opportunities for your business.</p>
            <Link to="/contact" className="btn btn-primary">Get Started</Link>
          </div>
        </div>
      </section>
    </>
  )
}

export default PPC