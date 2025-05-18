import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ContentProvider } from './context/ContentContext'
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
  )
}

function App() {
  return (
    <ContentProvider>
      <Router>
        <div className="app">
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
  )
}

export default App