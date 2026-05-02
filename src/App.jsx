import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Components
import Navbar from './components/Navbar';
import UIDetailPage from './pages/UIDetailPage';
import AdminPage from './pages/AdminPage';
import HomePage from './pages/Homepage';
import Adminlogin from './pages/Adminlogin';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('adminToken');
  if (!token) {
    return <Navigate to="/admin/login" replace />; 
  }
  return children;
};

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#0a0a14] text-gray-200 font-body">
        <Navbar />
        
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/ui/:id" element={<UIDetailPage />} />
          <Route path="/admin/login" element={<Adminlogin />} />

          {/* Protected Routes */}ß
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute>
                <AdminPage />
              </ProtectedRoute>
            } 
          />
        </Routes>

        <Toaster 
          position="bottom-right"
          toastOptions={{
            style: {
              background: '#1a1a2e',
              color: '#fff',
              border: '1px solid #2a2a4a'
            }
          }}
        />
      </div>
    </Router>
  );
}

export default App;