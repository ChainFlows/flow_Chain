import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import AdminDashboard from './pages/dashboard/AdminDashboard';
import SupplierDashboard from './pages/dashboard/SupplierDashboard';
import DriverDashboard from './pages/dashboard/DriverDashboard';
import FieldWorkerDashboard from './pages/dashboard/FieldWorkerDashboard';
import Client from './pages/Client';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/clients" element={<Client />} />
        <Route path="/dashboard/admin" element={<AdminDashboard />} />
        <Route path="/dashboard/supplier" element={<SupplierDashboard />} />
        <Route path="/dashboard/driver" element={<DriverDashboard />} />
        <Route path="/dashboard/field-worker" element={<FieldWorkerDashboard />} />
      </Routes>
    </Router>
  );
}