import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import TechnologyPage from './pages/Navbar-Items/Technology';
import Header from './components/Header';
import Footer from './components/Footer';
import ResourcesPage from './pages/Navbar-Items/ResourcesPage';
import EvaluationSDK from './pages/Navbar-Items/EvaluationSDK';
import SpecificationsPage from './pages/Navbar-Items/SpecificationsPage';
import ApplicationPage from './pages/Navbar-Items/ApplicationPage';
import ContactPage from './pages/Navbar-Items/ContactPage';
import MyGestures from './pages/Navbar-Items/MyGestures';
import ScrollToTop from './components/ScrollToTop';
import Login from './pages/LoginScreen';
import Register from './pages/Register';
import LoginOTP from './pages/LoginOTP';
const AppContent = () => {
  const location = useLocation();

 
  const noHeaderFooterRoutes = ['/','/login','/login-otp'];
  const showHeaderFooter = !noHeaderFooterRoutes.includes(location.pathname);

  return (
    <>
      {showHeaderFooter && <Header />}
      

      <ScrollToTop/>

      <Routes>
        <Route path="/home-page" element={<LandingPage />} />
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/login-otp" element={<LoginOTP />} />
        <Route path="/technology" element={<TechnologyPage />} />
        <Route path="/resources" element={<ResourcesPage />} />
        <Route path="/evaluation-sdk" element={<EvaluationSDK />} />
        <Route path="/specification" element={<SpecificationsPage />} />
        <Route path="/applications" element={<ApplicationPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/my-gestures" element={<MyGestures />} />
      </Routes>

      {showHeaderFooter && <Footer />}
    </>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
