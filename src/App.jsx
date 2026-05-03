import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import PropertiesPage from './pages/PropertiesPage';
import PropertyDetailsPage from './pages/PropertyDetailsPage';
import AgentDashboardPage from './pages/AgentDashboardPage';

function App() {
  return (
    <div className="font-sans antialiased text-slate-900 bg-slate-50 selection:bg-gold-500 selection:text-white flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/properties" element={<PropertiesPage />} />
          <Route path="/property/:id" element={<PropertyDetailsPage />} />
          <Route path="/dashboard" element={<AgentDashboardPage />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
