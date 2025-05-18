import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import SEO from './pages/SEO'
import PPC from './pages/PPC'
//import WebDevelopment from './pages/WebDevelopment'
import MobileDevelopment from './pages/MobileDevelopment'
import LeadGeneration from './pages/LeadGeneration'
import AppointmentSetting from './pages/AppointmentSetting'
import Contact from './pages/Contact'
//import AdminLogin from './pages/AdminLogin'
import NotFound from './pages/NotFound'
import './styles/App.css'

// Temporary placeholder for AdminDashboard until it's created
const AdminDashboard = () => {
  return (
    <div style={{ padding: '40px 20px' }}>
      <h1>Admin Dashboard</h1>
      <p>This is a placeholder for the admin dashboard that will be implemented later.</p>
      <button onClick={() => {
        localStorage.removeItem('isAuthenticated');
        window.location.href = '/admin';
      }}>Logout</button>
    </div>
  );
};

// Protected Route component
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true'
  const location = useLocation()
  
  if (!isAuthenticated) {
    // Redirect to login page if not authenticated
    return <Navigate to="/admin" state={{ from: location }} replace />
  }
  
  return children
}

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

// Admin Layout without Navbar and Footer
const AdminLayout = ({ children }) => {
  return <div className="admin-layout">{children}</div>
}

function App() {
  return (
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
          {/* <Route path="/web-development" element={
            <MainLayout>
              <WebDevelopment />
            </MainLayout>
          } /> */}
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
          
          {/* Admin Routes */}
          {/* <Route path="/admin" element={
            <AdminLayout>
              <AdminLogin />
            </AdminLayout>
          } />
          <Route path="/admin/dashboard" element={
            <ProtectedRoute>
              <AdminLayout>
                <AdminDashboard />
              </AdminLayout>
            </ProtectedRoute>
          } /> */}
          
          {/* 404 Route */}
          <Route path="*" element={
            <MainLayout>
              <NotFound />
            </MainLayout>
          } />
        </Routes>
      </div>
    </Router>
  )
}

export default App