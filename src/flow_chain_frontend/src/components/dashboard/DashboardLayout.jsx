import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Box,
  BarChart2,
  Package,
  Truck,
  Users,
  Settings,
  FileText,
  Link2,
  Grid,
} from 'lucide-react';
import DashboardHeader from './DashboardHeader';

export default function DashboardLayout({ children }) {
  const location = useLocation();

  const menuItems = [
    { icon: BarChart2, label: 'Dashboard', path: '/dashboard/admin' },
    { icon: FileText, label: 'Reports', path: '/reports' },
    { icon: Package, label: 'Products', path: '/products' },
    { icon: Truck, label: 'Delivery', path: '/delivery' },
    { icon: Users, label: 'Users', path: '/users' },
    { icon: Link2, label: 'Integrations', path: '/integrations' },
    { icon: Settings, label: 'Settings', path: '/settings' },
    { icon: Grid, label: 'Design pages', path: '/design' },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar - Added sticky positioning */}
      <div className="w-64 bg-white border-r flex flex-col sticky top-0 h-screen">
        <div className="p-4 border-b">
          <Link to="/" className="flex items-center gap-2">
            <Box className="w-6 h-6 text-blue-900" />
            <span className="font-semibold">ChainFlow</span>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={index}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                  isActive
                    ? 'bg-blue-50 text-blue-900'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Icon className="w-5 h-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 mt-auto">
          <button className="w-full px-4 py-2 bg-blue-900 text-white rounded-lg flex items-center justify-center gap-2">
            Get design →
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <DashboardHeader />
        <main className="flex-1 overflow-auto bg-gray-50">{children}</main>
      </div>
    </div>
  );
}
