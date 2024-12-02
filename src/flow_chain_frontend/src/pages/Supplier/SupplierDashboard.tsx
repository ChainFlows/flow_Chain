import React from 'react';
import { ChevronDown } from 'lucide-react';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import SalesOverview from '../../components/dashboard/SalesOverview';
import RecentOrdersList from '../../components/dashboard/RecentOrdersList';
import ProductsTable from '../../components/dashboard/ProductsTable';
import PopularCategories from '../../components/dashboard/PopularCategories';
import OrdersStatus from '../../components/dashboard/OrdersStatus';

export default function SupplierDashboard() {
  const salesData = [
    { date: 'SEP 1', value: 200000 },
    { date: 'SEP 14', value: 220000 },
    { date: 'SEP 20', value: 210000 },
    { date: 'SEP 30', value: 298507.50 }
  ];

  const recentOrders = [
    { 
      product: 'iPhone 15 Pro Max',
      image: 'https://images.unsplash.com/photo-1632661674596-df8be070a5c5?w=100&h=100&fit=crop',
      price: 1099.00,
      time: '12 minutes ago'
    },
    {
      product: 'Google Pixel 8 Pro',
      image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=100&h=100&fit=crop',
      price: 599.00,
      time: '16 minutes ago'
    },
    {
      product: 'iPad Pro',
      image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=100&h=100&fit=crop',
      price: 799.00,
      time: '24 minutes ago'
    },
    {
      product: 'Samsung Galaxy S24 Ultra',
      image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=100&h=100&fit=crop',
      price: 849.00,
      time: '32 minutes ago'
    }
  ];

  const products = [
    { 
      id: '01',
      name: 'iPhone 15 Pro Max',
      image: 'https://images.unsplash.com/photo-1632661674596-df8be070a5c5?w=100&h=100&fit=crop',
      category: 'Smartphones',
      totalSales: 90,
      sales: 98910.00,
      stock: 24
    },
    {
      id: '05',
      name: 'Google Pixel 8',
      image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=100&h=100&fit=crop',
      category: 'Smartphones',
      totalSales: 54,
      sales: 32348.50,
      stock: 16
    },
    {
      id: '08',
      name: 'iPad Air',
      image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=100&h=100&fit=crop',
      category: 'Tablets',
      totalSales: 35,
      sales: 27965.00,
      stock: 8
    },
    {
      id: '13',
      name: 'Samsung Galaxy S24',
      image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=100&h=100&fit=crop',
      category: 'Smartphones',
      totalSales: 20,
      sales: 19980.00,
      stock: 49
    }
  ];

  return (
    <DashboardLayout>
      <div className="p-8 bg-gray-50 min-h-screen">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-semibold">Dashboard</h1>
            <p className="text-gray-500">March 24, 2026</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-white rounded-2xl text-sm border border-gray-200">
            Last 30 days <ChevronDown className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <SalesOverview salesData={salesData} />
          </div>
          <div>
            <RecentOrdersList orders={recentOrders} />
          </div>
        </div>

        <div className="mt-6">
          <ProductsTable products={products} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <PopularCategories />
          <OrdersStatus />
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          Copyright © ChainFlow | Designed by Oduor - Powered by Duol Studio
        </div>
      </div>
    </DashboardLayout>
  );
}