import React from 'react';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ArrowUpRight } from 'lucide-react';

export default function SupplierDashboard() {
  const salesData = [
    { date: 'SEP 1', value: 200000 },
    { date: 'SEP 14', value: 220000 },
    { date: 'SEP 20', value: 210000 },
    { date: 'SEP 30', value: 298507.50 }
  ];

  const products = [
    { 
      id: '01',
      name: 'iPhone 15 Pro Max',
      image: '/images/iphone.png',
      category: 'Smartphones',
      totalSales: 90,
      revenue: 98910.00,
      sales: 24,
      stock: true
    },
    {
      id: '05',
      name: 'Google Pixel 8',
      image: '/images/pixel.png',
      category: 'Smartphones',
      totalSales: 54,
      revenue: 32348.50,
      sales: 16,
      stock: true
    },
    {
      id: '08',
      name: 'iPad Air',
      image: '/images/ipad.png',
      category: 'Tablets',
      totalSales: 35,
      revenue: 27965.00,
      sales: 9,
      stock: true
    },
    {
      id: '13',
      name: 'Samsung Galaxy S24',
      image: '/images/samsung.png',
      category: 'Smartphones',
      totalSales: 20,
      revenue: 19980.00,
      sales: 49,
      stock: true
    }
  ];

  const recentOrders = [
    { 
      product: 'iPhone 15 Pro Max',
      image: '/images/iphone.png',
      price: 1098.00,
      time: '12 minutes ago'
    },
    {
      product: 'Google Pixel 8 Pro',
      image: '/images/pixel.png',
      price: 899.00,
      time: '18 minutes ago'
    },
    {
      product: 'iPad Pro',
      image: '/images/ipad.png',
      price: 799.00,
      time: '24 minutes ago'
    },
    {
      product: 'Samsung Galaxy S24 Ultra',
      image: '/images/samsung.png',
      price: 849.00,
      time: '25 minutes ago'
    }
  ];

  const orders = [
    {
      id: 'Order #2927',
      amount: '$5,870.56',
      customer: 'John Carter',
      email: 'hello@johncarter.com',
      date: 'Oct 12, 2026',
      status: 'Shipping'
    },
    {
      id: 'Order #6480',
      amount: '$1,540.23',
      customer: 'Sophie Moore',
      email: 'info@sophiemoore.com',
      date: 'Oct 10, 2026',
      status: 'Delivered'
    },
    {
      id: 'Order #5480',
      amount: '$3,058.98',
      customer: 'Andy Smith',
      email: 'contact@andysmith.com',
      date: 'Sep 8, 2026',
      status: 'Delayed'
    },
    {
      id: 'Order #3580',
      amount: '$2,670.00',
      customer: 'Matt Cannon',
      email: 'hi@mattcannon.com',
      date: 'Aug 24, 2026',
      status: 'Delivered'
    },
    {
      id: 'Order #2927',
      amount: '$4,878.56',
      customer: 'John Carter',
      email: 'hello@johncarter.com',
      date: 'Jun 13, 2026',
      status: 'Delayed'
    }
  ];

  const categories = {
    total: '196K',
    breakdown: [
      { name: 'SMARTPHONES', value: 153143.00 },
      { name: 'LAPTOPS', value: 15390.34 },
      { name: 'TABLETS', value: 27965.00 }
    ]
  };

  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-semibold">Dashboard</h1>
            <p className="text-gray-500">March 24, 2026</p>
          </div>
          <select className="border rounded-lg px-4 py-2">
            <option>Last 30 days</option>
          </select>
        </div>

        {/* Sales Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="md:col-span-2">
            <div className="bg-white rounded-xl p-6">
              <div className="mb-6">
                <h2 className="text-sm text-gray-500 mb-1">Total sales</h2>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-semibold">${Number(298507.50).toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                  <span className="text-green-500 text-sm">+6.9% ↑</span>
                </div>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis 
                      dataKey="date" 
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis 
                      axisLine={false}
                      tickLine={false}
                      tickFormatter={(value) => `${value / 1000}k`}
                    />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#004AAD" 
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-semibold">Recent orders</h2>
              <button className="text-blue-900 text-sm">See all</button>
            </div>
            <div className="space-y-4">
              {recentOrders.map((order, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img src={order.image} alt={order.product} className="w-10 h-10 object-cover rounded-lg" />
                    <div>
                      <div className="text-sm font-medium">{order.product}</div>
                      <div className="text-xs text-gray-500">{order.time}</div>
                    </div>
                  </div>
                  <div className="text-green-500">${order.price}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-xl p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-semibold">Products</h2>
            <button className="text-blue-900 text-sm">Browse products</button>
          </div>
          <table className="w-full">
            <thead>
              <tr className="text-sm text-gray-500">
                <th className="text-left pb-4">ID ↑</th>
                <th className="text-left pb-4">PRODUCT ↑</th>
                <th className="text-left pb-4">CATEGORY ↑</th>
                <th className="text-right pb-4">TOTAL SALES ↑</th>
                <th className="text-right pb-4">SALES ↑</th>
                <th className="text-center pb-4">STOCK ↑</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-t">
                  <td className="py-4">{product.id}</td>
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <img src={product.image} alt={product.name} className="w-8 h-8 object-cover rounded-lg" />
                      {product.name}
                    </div>
                  </td>
                  <td className="py-4 text-gray-500">{product.category}</td>
                  <td className="py-4 text-right">{product.totalSales}</td>
                  <td className="py-4 text-right">${product.revenue.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
                  <td className="py-4 text-center">
                    <div className="flex justify-center">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Bottom Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Popular Categories */}
          <div className="bg-white rounded-xl p-6">
            <h2 className="font-semibold mb-8">Popular categories</h2>
            <div className="flex justify-center mb-8">
              <div className="relative w-48 h-48">
                <svg className="w-full h-full transform -rotate-90">
                  {categories.breakdown.map((category, index) => {
                    const total = categories.breakdown.reduce((acc, curr) => acc + curr.value, 0);
                    const percentage = (category.value / total) * 100;
                    const offset = categories.breakdown
                      .slice(0, index)
                      .reduce((acc, curr) => acc + (curr.value / total) * 100, 0);
                    
                    return (
                      <circle
                        key={index}
                        cx="50%"
                        cy="50%"
                        r="40%"
                        fill="none"
                        stroke={index === 0 ? '#004AAD' : index === 1 ? '#FFA500' : '#8B5CF6'}
                        strokeWidth="20"
                        strokeDasharray={`${percentage} ${100 - percentage}`}
                        strokeDashoffset={-offset}
                        className="transform origin-center"
                      />
                    );
                  })}
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-bold">{categories.total}</span>
                  <span className="text-sm text-gray-500">SUPPLIES</span>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              {categories.breakdown.map((category, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ 
                        backgroundColor: index === 0 ? '#004AAD' : 
                                       index === 1 ? '#FFA500' : 
                                       '#8B5CF6'
                      }}
                    />
                    <span className="text-sm">{category.name}</span>
                  </div>
                  <span className="text-sm">${category.value.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Orders Status */}
          <div className="bg-white rounded-xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-semibold">Orders status</h2>
              <select className="border rounded-lg px-3 py-1 text-sm">
                <option>This month</option>
              </select>
            </div>
            <div className="space-y-4">
              {orders.map((order, index) => (
                <div key={index} className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                      <ArrowUpRight className="w-5 h-5 text-blue-900" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{order.id}</span>
                        <span className="text-gray-500">•</span>
                        <span className="text-gray-500">{order.amount}</span>
                      </div>
                      <div className="text-sm text-gray-500">{order.email}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500">{order.date}</div>
                    <div className={`text-sm ${
                      order.status === 'Delivered' ? 'text-green-500' :
                      order.status === 'Shipping' ? 'text-blue-500' :
                      'text-orange-500'
                    }`}>
                      {order.status}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}