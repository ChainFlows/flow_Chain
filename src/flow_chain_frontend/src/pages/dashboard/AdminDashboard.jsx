import React from 'react';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import { LineChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Link2, FileText, Package } from 'lucide-react';

export default function AdminDashboard() {
  const operations = [
    {
      title: 'Emergency Response Operations',
      progress: 60,
      color: 'blue',
      icon: Link2
    },
    {
      title: 'Relief Food Delivery',
      progress: 10,
      color: 'purple',
      icon: FileText
    },
    {
      title: 'Search and Rescue Operations',
      progress: 67,
      color: 'yellow',
      icon: Package
    }
  ];

  const monthlyData = [
    { name: 'JAN', value: 10 },
    { name: 'FEB', value: 20 },
    { name: 'MAR', value: 25 },
    { name: 'APR', value: 30 },
    { name: 'MAY', value: 28 },
    { name: 'JUN', value: 25 },
    { name: 'JUL', value: 20 },
    { name: 'AUG', value: 22 },
    { name: 'SEP', value: 28 },
    { name: 'OCT', value: 35 },
    { name: 'NOV', value: 40 },
    { name: 'DEC', value: 45 }
  ];

  const driversData = {
    total: 230,
    status: [
      { label: 'Online', value: 65, color: '#004AAD' },
      { label: 'Working', value: 24, color: '#FFA500' },
      { label: 'Idle', value: 11, color: '#8B5CF6' }
    ]
  };

  const recentDrivers = [
    { name: 'Sophie Moore', email: 'contact@sophiemoore.com', avatar: 'SM' },
    { name: 'Sam Smith', email: 'contact@samsmith.com', avatar: 'SS' },
    { name: 'Daniel Johnson', email: 'contact@danieljohnson.com', avatar: 'DJ' },
    { name: 'Frances Willem', email: 'contact@franceswillem.com', avatar: 'FW' }
  ];

  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-semibold">Dashboard</h1>
            <p className="text-gray-500">March 24, 2026</p>
          </div>
          <button className="px-4 py-2 bg-blue-900 text-white rounded-lg flex items-center gap-2">
            + Create report
          </button>
        </div>

        {/* Operations Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {operations.map((op, index) => (
            <div key={index} className="bg-white p-6 rounded-xl">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-4 ${
                op.color === 'blue' ? 'bg-blue-50 text-blue-900' :
                op.color === 'purple' ? 'bg-purple-50 text-purple-900' :
                'bg-yellow-50 text-yellow-900'
              }`}>
                <op.icon className="w-5 h-5" />
              </div>
              <h3 className="font-medium mb-4">{op.title}</h3>
              <div className="flex items-center gap-3">
                <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${
                      op.color === 'blue' ? 'bg-blue-900' :
                      op.color === 'purple' ? 'bg-purple-900' :
                      'bg-yellow-900'
                    }`}
                    style={{ width: `${op.progress}%` }}
                  />
                </div>
                <span className="text-sm text-green-500">{op.progress}% completed</span>
              </div>
            </div>
          ))}
        </div>

        {/* Monthly Deliveries Chart */}
        <div className="bg-white rounded-xl p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold">Monthly Deliveries</h2>
            <select className="border rounded-lg px-3 py-1 text-sm">
              <option>This month</option>
            </select>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#6B7280' }}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#6B7280' }}
                />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#004AAD"
                  fill="#E8F0FE"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bottom Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Drivers Status */}
          <div className="bg-white rounded-xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold">Drivers by Status</h2>
              <select className="border rounded-lg px-3 py-1 text-sm">
                <option>This month</option>
              </select>
            </div>
            <div className="flex justify-center">
              <div className="relative w-48 h-48">
                <svg className="w-full h-full transform -rotate-90">
                  {driversData.status.map((status, index) => {
                    const total = driversData.status.reduce((acc, curr) => acc + curr.value, 0);
                    const percentage = (status.value / total) * 100;
                    const offset = driversData.status
                      .slice(0, index)
                      .reduce((acc, curr) => acc + (curr.value / total) * 100, 0);
                    
                    return (
                      <circle
                        key={index}
                        cx="50%"
                        cy="50%"
                        r="40%"
                        fill="none"
                        stroke={status.color}
                        strokeWidth="20"
                        strokeDasharray={`${percentage} ${100 - percentage}`}
                        strokeDashoffset={-offset}
                        className="transform origin-center"
                      />
                    );
                  })}
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-bold">{driversData.total}</span>
                  <span className="text-sm text-gray-500">DRIVERS</span>
                </div>
              </div>
            </div>
            <div className="mt-6 space-y-2">
              {driversData.status.map((status, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: status.color }} />
                  <span className="text-sm">{status.label} - {status.value}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Drivers */}
          <div className="bg-white rounded-xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold">Recent Drivers</h2>
              <select className="border rounded-lg px-3 py-1 text-sm">
                <option>This month</option>
              </select>
            </div>
            <div className="space-y-6">
              {recentDrivers.map((driver, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                    {driver.avatar}
                  </div>
                  <div>
                    <div className="font-medium">{driver.name}</div>
                    <div className="text-sm text-blue-900">{driver.email}</div>
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