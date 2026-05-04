import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { CurrencyProvider } from './contexts/CurrencyContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import PropertiesPage from './pages/PropertiesPage';
import PropertyDetailsPage from './pages/PropertyDetailsPage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import ProtectedAdminRoute from './components/ProtectedAdminRoute';

const PublicLayout = ({ children }) => (
  <>
    <Navbar />
    <div className="flex-grow">{children}</div>
    <Footer />
  </>
);

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <CurrencyProvider>
      <div className="font-sans antialiased text-slate-900 bg-slate-50 flex flex-col min-h-screen">
        <Routes>
          {/* Public Routes */}
          <Route
            path="/"
            element={
              <PublicLayout>
                <HomePage />
              </PublicLayout>
            }
          />
          <Route
            path="/properties"
            element={
              <PublicLayout>
                <PropertiesPage />
              </PublicLayout>
            }
          />
          <Route
            path="/property/:id"
            element={
              <PublicLayout>
                <PropertyDetailsPage />
              </PublicLayout>
            }
          />

          {/* Admin Routes (no public layout) */}
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedAdminRoute>
                <AdminDashboardPage />
              </ProtectedAdminRoute>
            }
          />
          {/* Redirect /admin to login */}
          <Route path="/admin" element={<AdminLoginPage />} />
        </Routes>
      </div>
    </CurrencyProvider>
  );
}

export default App;
