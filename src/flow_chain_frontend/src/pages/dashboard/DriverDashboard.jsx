import React from 'react';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import { Clock, AlertCircle, CheckCircle } from 'lucide-react';

export default function DriverDashboard() {
  const currentDelivery = {
    title: 'Medical Delivery',
    stages: ['Pickup', 'In transit', 'Delivered'],
    currentStage: 1
  };

  const teamProgress = [
    { name: 'John Carter', progress: 60, avatar: 'JC' },
    { name: 'Sophie Moore', progress: 45, avatar: 'SM' },
    { name: 'Sam Smith', progress: 85, avatar: 'SS' }
  ];

  const deliveryReports = {
    completed: { count: 128, change: '+6.2%' },
    incomplete: { count: 32, change: '-8.1%' },
    late: { count: 4, change: '-3.25%' }
  };

  const upcomingDeliveries = [
    {
      title: 'Satellite Phones Delivery',
      description: 'To enable communication in remote areas',
      type: 'Aid',
      date: 'Nov 24, 2026',
      team: ['JC', 'SM']
    },
    {
      title: 'Emergency Kit Distribution',
      description: 'Supplying pre-assembled kits with flashlights',
      type: 'Aid',
      date: 'Oct 17, 2026',
      team: ['SS']
    },
    {
      title: 'Wildfire Support Logistics',
      description: 'Transporting water tankers, fire retardants',
      type: 'Materials',
      date: 'Nov 20, 2026',
      team: ['JC', 'SM', 'SS']
    },
    {
      title: 'Solar Panel Delivery',
      description: 'Transporting and setting up solar kits for remote medical camps',
      type: 'Design',
      date: 'Sept 17, 2026',
      team: ['SM', 'SS']
    }
  ];

  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-semibold">Dashboard</h1>
            <p className="text-gray-500">September 24, 2026</p>
          </div>
          <button className="px-4 py-2 bg-blue-900 text-white rounded-lg">
            + Create task
          </button>
        </div>

        {/* Current Job/Delivery */}
        <div className="bg-white rounded-xl p-6 mb-8">
          <h2 className="text-lg font-semibold mb-6">Current Job/Delivery</h2>
          <div className="relative">
            <div className="flex justify-between mb-2">
              <span className="font-medium">{currentDelivery.title}</span>
              <button className="text-gray-400">...</button>
            </div>
            <div className="flex items-center justify-between relative">
              {currentDelivery.stages.map((stage, index) => (
                <React.Fragment key={index}>
                  <div className="flex flex-col items-center">
                    <div className={`w-4 h-4 rounded-full ${
                      index <= currentDelivery.currentStage ? 'bg-green-500' : 'bg-gray-200'
                    }`} />
                    <span className="text-sm mt-2">{stage}</span>
                  </div>
                  {index < currentDelivery.stages.length - 1 && (
                    <div className={`flex-1 h-1 mx-2 ${
                      index < currentDelivery.currentStage ? 'bg-green-500' : 'bg-gray-200'
                    }`} />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Team Progress */}
          <div className="bg-white rounded-xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold">Team progress</h2>
              <select className="border rounded-lg px-3 py-1 text-sm">
                <option>This month</option>
              </select>
            </div>
            <div className="space-y-6">
              {teamProgress.map((member, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-sm">
                      {member.avatar}
                    </div>
                    <span className="text-sm font-medium">{member.name}</span>
                    <span className="text-sm text-gray-500 ml-auto">{member.progress}%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-green-500 rounded-full"
                      style={{ width: `${member.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery Reports */}
          <div className="bg-white rounded-xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold">Delivery reports</h2>
              <select className="border rounded-lg px-3 py-1 text-sm">
                <option>This month</option>
              </select>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto mb-2">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <div className="text-2xl font-bold">{deliveryReports.completed.count}</div>
                <div className="text-sm text-gray-500">Completed Deliveries</div>
                <div className="text-sm text-green-500">{deliveryReports.completed.change}</div>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-2">
                  <AlertCircle className="w-6 h-6" />
                </div>
                <div className="text-2xl font-bold">{deliveryReports.incomplete.count}</div>
                <div className="text-sm text-gray-500">Incomplete Deliveries</div>
                <div className="text-sm text-red-500">{deliveryReports.incomplete.change}</div>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-yellow-100 text-yellow-600 flex items-center justify-center mx-auto mb-2">
                  <Clock className="w-6 h-6" />
                </div>
                <div className="text-2xl font-bold">{deliveryReports.late.count}</div>
                <div className="text-sm text-gray-500">Late Deliveries</div>
                <div className="text-sm text-red-500">{deliveryReports.late.change}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Due Delivery */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold">Due Delivery</h2>
            <button className="text-blue-900 text-sm">Browse products</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {upcomingDeliveries.map((delivery, index) => (
              <div key={index} className="bg-white rounded-xl p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-medium mb-1">{delivery.title}</h3>
                    <p className="text-sm text-gray-500">{delivery.description}</p>
                  </div>
                  <button className="text-gray-400">...</button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`px-3 py-1 rounded-full text-xs ${
                      delivery.type === 'Aid' ? 'bg-blue-100 text-blue-900' :
                      delivery.type === 'Materials' ? 'bg-orange-100 text-orange-900' :
                      'bg-gray-100 text-gray-900'
                    }`}>
                      {delivery.type}
                    </span>
                    <span className="text-sm text-gray-500">{delivery.date}</span>
                  </div>
                  <div className="flex -space-x-2">
                    {delivery.team.map((member, idx) => (
                      <div 
                        key={idx}
                        className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-sm border-2 border-white"
                      >
                        {member}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}