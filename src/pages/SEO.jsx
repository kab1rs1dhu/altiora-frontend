import { Link } from 'react-router-dom'
import '../styles/ServicePage.css'

const SEO = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="service-hero">
        <div className="container">
          <div className="service-hero-content">
            <h1>Search Engine Optimization</h1>
            <p className="service-hero-description">
              Drive organic traffic and boost your website's visibility with our data-driven SEO strategies.
            </p>
            <Link to="/contact" className="btn btn-primary">Get a Free SEO Audit</Link>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="section overview-section">
        <div className="container">
          <div className="overview-grid">
            <div className="overview-content">
              <h2>Elevate Your Online Presence</h2>
              <p>
                In today's digital landscape, ranking high in search engines is crucial for your business's success. 
                Our comprehensive SEO services are designed to increase your website's visibility, drive targeted 
                traffic, and improve conversion rates.
              </p>
              <p>
                At Altiora, we take a holistic approach to SEO, combining technical optimization, content strategy, 
                and link building to create sustainable growth for your business. We don't just focus on rankings—we 
                deliver real business results.
              </p>
              <div className="overview-stats">
                <div className="stat">
                  <h3>93%</h3>
                  <p>of online experiences begin with a search engine</p>
                </div>
                <div className="stat">
                  <h3>75%</h3>
                  <p>of users never scroll past the first page of search results</p>
                </div>
                <div className="stat">
                  <h3>70%</h3>
                  <p>higher conversion rate for SEO leads compared to other channels</p>
                </div>
              </div>
            </div>
            <div className="overview-image">
              <img src="/images/seo-overview.svg" alt="SEO Strategy" />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section service-details-section">
        <div className="container">
          <h2 className="section-title text-center">Our SEO Services</h2>
          <div className="service-details-grid">
            <div className="service-detail-card">
              <div className="service-detail-icon">
                <i className="fa-solid fa-magnifying-glass-chart"></i>
              </div>
              <h3>SEO Audit & Strategy</h3>
              <p>
                We analyze your website's current performance, identify issues, and create a comprehensive 
                SEO strategy tailored to your business goals and target audience.
              </p>
            </div>

            <div className="service-detail-card">
              <div className="service-detail-icon">
                <i className="fa-solid fa-gears"></i>
              </div>
              <h3>Technical SEO</h3>
              <p>
                We optimize your website's technical aspects, including site speed, mobile-friendliness, 
                crawlability, indexation, and site architecture to ensure search engines can effectively 
                crawl and index your content.
              </p>
            </div>

            <div className="service-detail-card">
              <div className="service-detail-icon">
                <i className="fa-solid fa-keyboard"></i>
              </div>
              <h3>Keyword Research</h3>
              <p>
                We identify high-value keywords that your target audience is searching for, analyzing search 
                volume, competition, and user intent to prioritize the most impactful opportunities.
              </p>
            </div>

            <div className="service-detail-card">
              <div className="service-detail-icon">
                <i className="fa-solid fa-pen"></i>
              </div>
              <h3>Content Optimization</h3>
              <p>
                We create and optimize content that resonates with both users and search engines, 
                focusing on relevance, quality, and strategic keyword integration.
              </p>
            </div>

            <div className="service-detail-card">
              <div className="service-detail-icon">
                <i className="fa-solid fa-link"></i>
              </div>
              <h3>Link Building</h3>
              <p>
                We develop and execute strategic link building campaigns to increase your website's 
                authority, focusing on quality over quantity to drive sustainable results.
              </p>
            </div>

            <div className="service-detail-card">
              <div className="service-detail-icon">
                <i className="fa-solid fa-chart-line"></i>
              </div>
              <h3>Performance Tracking</h3>
              <p>
                We monitor key performance indicators, providing regular reports and insights to track 
                progress and continuously refine our strategy for optimal results.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section process-section">
        <div className="container">
          <h2 className="section-title text-center">Our SEO Process</h2>
          <div className="process-steps">
            <div className="process-step">
              <div className="process-step-number">1</div>
              <div className="process-step-content">
                <h3>Discovery & Audit</h3>
                <p>
                  We analyze your website, competitors, and industry to identify 
                  opportunities and challenges for your SEO campaign.
                </p>
              </div>
            </div>

            <div className="process-step">
              <div className="process-step-number">2</div>
              <div className="process-step-content">
                <h3>Strategy Development</h3>
                <p>
                  We create a customized SEO roadmap based on the audit findings, 
                  business goals, and target audience.
                </p>
              </div>
            </div>

            <div className="process-step">
              <div className="process-step-number">3</div>
              <div className="process-step-content">
                <h3>On-Page Optimization</h3>
                <p>
                  We optimize your website's content, structure, and technical elements 
                  to improve search engine visibility.
                </p>
              </div>
            </div>

            <div className="process-step">
              <div className="process-step-number">4</div>
              <div className="process-step-content">
                <h3>Off-Page Optimization</h3>
                <p>
                  We implement strategic link building and brand mention strategies to 
                  boost your website's authority.
                </p>
              </div>
            </div>

            <div className="process-step">
              <div className="process-step-number">5</div>
              <div className="process-step-content">
                <h3>Monitoring & Reporting</h3>
                <p>
                  We continuously track performance, provide regular reports, and make 
                  data-driven adjustments to improve results.
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
              <h3>How long does it take to see results from SEO?</h3>
              <p>
                SEO is a long-term strategy. While some improvements can be seen within a few weeks, 
                significant results typically take 3-6 months, depending on your industry, competition, 
                and website's current state. We focus on sustainable growth rather than quick fixes.
              </p>
            </div>

            <div className="faq-item">
              <h3>How do you measure SEO success?</h3>
              <p>
                We track various metrics, including organic traffic, keyword rankings, engagement metrics, 
                conversion rates, and ROI. We provide regular reports showing these metrics and what they 
                mean for your business.
              </p>
            </div>

            <div className="faq-item">
              <h3>Do you guarantee first-page rankings?</h3>
              <p>
                No reputable SEO agency can guarantee specific rankings, as search algorithms consider 
                hundreds of factors outside our control. We focus on improving your overall organic 
                visibility and business results rather than promising specific positions.
              </p>
            </div>

            <div className="faq-item">
              <h3>How is your SEO service different from others?</h3>
              <p>
                We take a holistic, data-driven approach focused on your business goals, not just rankings. 
                Our strategies are customized to your specific needs, and we prioritize transparency 
                throughout the process.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section service-cta-section">
        <div className="container">
          <div className="service-cta-content">
            <h2>Ready to Boost Your Search Rankings?</h2>
            <p>Get a free SEO audit and discover how we can help grow your business.</p>
            <Link to="/contact" className="btn btn-primary">Get Started</Link>
          </div>
        </div>
      </section>
    </>
  )
}

export default SEO