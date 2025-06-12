import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { ContentProvider, useContent } from './context/ContentContext'
import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import SEO from './pages/SEO'
import PPC from './pages/PPC'
import WebDevelopment from './pages/WebDevelopment'
import MobileDevelopment from './pages/MobileDevelopment'
import LeadGeneration from './pages/LeadGeneration'
import AppointmentSetting from './pages/AppointmentSetting'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'
import './styles/App.css'
import './styles/MobileOptimized.css' 
import './styles/BlackLineFix.css'
import './styles/SingleScroll.css' // Import the new SingleScroll CSS

// ResponsiveMeta component to ensure proper viewport settings
const ResponsiveMeta = () => {
  useEffect(() => {
    // Create or update the viewport meta tag
    let viewportMeta = document.querySelector('meta[name="viewport"]');
    if (!viewportMeta) {
      viewportMeta = document.createElement('meta');
      viewportMeta.name = 'viewport';
      document.head.appendChild(viewportMeta);
    }
    viewportMeta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
  }, []);

  return null; // This component doesn't render anything
};

// ContentLoader component to preload important content
const ContentLoader = () => {
  const { prefetchPages } = useContent();
  const location = useLocation();
  
  // Prefetch common pages on initial load
  useEffect(() => {
    const importantPages = ['home'];
    prefetchPages(importantPages).then(() => {
      console.log('Preloaded common pages');
    });
  }, [prefetchPages]);
  
  // Prefetch related pages based on current route
  useEffect(() => {
    const path = location.pathname.replace('/', '');
    const pagesToLoad = [];
    
    // Determine which pages to preload based on current page
    switch(path) {
      case '':
        // On homepage, preload service pages
        pagesToLoad.push('seo', 'ppc', 'web-development');
        break;
      case 'seo':
        pagesToLoad.push('ppc', 'web-development');
        break;
      case 'ppc':
        pagesToLoad.push('seo', 'lead-generation');
        break;
      case 'web-development':
        pagesToLoad.push('mobile-development');
        break;
      case 'mobile-development':
        pagesToLoad.push('web-development');
        break;
      // Add more cases as needed
      default:
        // For other pages, don't preload anything extra
        break;
    }
    
    if (pagesToLoad.length > 0) {
      prefetchPages(pagesToLoad).then(() => {
        console.log(`Preloaded related pages for ${path || 'home'}`);
      });
    }
  }, [location.pathname, prefetchPages]);
  
  return null; // This component doesn't render anything
};

// Layout component with Navbar and Footer
const MainLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main className="main-content">
        {children}
      </main>
      <Footer />
    </>
  );
};

function App() {
  return (
    <ContentProvider>
      <Router>
        {/* Add ResponsiveMeta to ensure proper viewport settings */}
        <ResponsiveMeta />
        
        <div className="app">
          {/* Add ContentLoader to prefetch content */}
          <ContentLoader />
          
          <Routes>
            {/* Public Routes with Navbar and Footer */}
            <Route path="/" element={
              <MainLayout>
                <Home />
              </MainLayout>
            } />
            <Route path="/seo" element={
              <MainLayout>
                <SEO />
              </MainLayout>
            } />
            <Route path="/ppc" element={
              <MainLayout>
                <PPC />
              </MainLayout>
            } />
            <Route path="/web-development" element={
              <MainLayout>
                <WebDevelopment />
              </MainLayout>
            } />
            <Route path="/mobile-development" element={
              <MainLayout>
                <MobileDevelopment />
              </MainLayout>
            } />
            <Route path="/lead-generation" element={
              <MainLayout>
                <LeadGeneration />
              </MainLayout>
            } />
            <Route path="/appointment-setting" element={
              <MainLayout>
                <AppointmentSetting />
              </MainLayout>
            } />
            <Route path="/contact" element={
              <MainLayout>
                <Contact />
              </MainLayout>
            } />
            
            {/* 404 Route */}
            <Route path="*" element={
              <MainLayout>
                <NotFound />
              </MainLayout>
            } />
          </Routes>
        </div>
      </Router>
    </ContentProvider>
  );
}

export default App;