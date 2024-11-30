import React from 'react';
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
import { Link, useLocation } from 'react-router-dom';

export default function DashboardLayout({ children }) {
  const location = useLocation();

  const menuItems = [
    { icon: BarChart2, label: 'Dashboard', path: '' },
    { icon: FileText, label: 'Reports', path: 'reports' },
    { icon: Package, label: 'Products', path: 'products' },
    { icon: Truck, label: 'Delivery', path: 'delivery' },
    { icon: Users, label: 'Users', path: 'users' },
    { icon: Link2, label: 'Integrations', path: 'integrations' },
    { icon: Settings, label: 'Settings', path: 'settings' },
    { icon: Grid, label: 'Design pages', path: 'design' },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 border-r bg-white">
        <div className="p-4 border-b">
          <Link to="/" className="flex items-center gap-2">
            <Box className="w-6 h-6 text-blue-900" />
            <span className="font-semibold">ChainFlow</span>
          </Link>
        </div>

        <nav className="p-4 space-y-1">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <Link
                key={index}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm ${
                  location.pathname.includes(item.path)
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
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <header className="bg-white border-b px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <input
              type="text"
              placeholder="Search for..."
              className="px-4 py-2 border rounded-lg w-64"
            />
          </div>

          <div className="flex items-center gap-4">
            <button className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
              🔔
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-blue-900 text-white flex items-center justify-center">
                JC
              </div>
              <div>
                <div className="text-sm font-medium">John Carter</div>
                <div className="text-xs text-gray-500">Account settings</div>
              </div>
            </div>
          </div>
        </header>

        <main className="p-8">{children}</main>
      </div>
    </div>
  );
}
