import React, { useState } from 'react';
import { Pencil, Trash, Clock, CheckCircle, Package, CheckSquareIcon } from 'lucide-react';
// Nice

interface Order {
  id: string;
  order_name: string;
  company_name: string;
  expected_delivery: string;
  pickup_address: string;
  delivery_address: string;
  order_type: string;
  order_weight: number;
  priority: 'low' | 'medium' | 'high';
  category: string;
  status: 'New' | 'current' | 'completed';
}

export default function SupplierOrdersTable({data}) {
  const [activeTab, setActiveTab] = useState<'Listings' | 'New' | 'current' | 'completed'>('Listings');

  // const orders: Order[] = [
  //   {
  //     id: 'ORD-001',
  //     orderName: 'Electronics Delivery',
  //     customerName: 'John Carter',
  //     expectedDeliveryDate: '2024-03-28',
  //     pickupAddress: '123 Warehouse St, Industrial Area',
  //     deliveryAddress: '456 Tech Ave, Business District',
  //     orderType: 'Express',
  //     orderWeight: 5.2,
  //     priority: 'high',
  //     category: 'Electronics',
  //     status: 'new'
  //   },
  //   {
  //     id: 'ORD-002',
  //     orderName: 'Office Equipment',
  //     customerName: 'Sophie Moore',
  //     expectedDeliveryDate: '2024-03-29',
  //     pickupAddress: '789 Supply Rd, Storage Zone',
  //     deliveryAddress: '321 Office Blvd, Corporate Park',
  //     orderType: 'Standard',
  //     orderWeight: 12.8,
  //     priority: 'medium',
  //     category: 'Office Supplies',
  //     status: 'current'
  //   },
  //   {
  //     id: 'ORD-003',
  //     orderName: 'Medical Supplies',
  //     customerName: 'Daniel Johnson',
  //     expectedDeliveryDate: '2024-03-25',
  //     pickupAddress: '567 Medical Dr, Hospital Zone',
  //     deliveryAddress: '890 Clinic St, Healthcare Center',
  //     orderType: 'Priority',
  //     orderWeight: 3.5,
  //     priority: 'high',
  //     category: 'Medical',
  //     status: 'completed'
  //   }
  // ];

  console.log("The orders are: ", data);
    const { completedOrders, currentOrders, newOrders, orderListings } = data
    // merge all the orders to one array from completedOrders,currentOrders,newOrders, arrays

  const ordersList = [
    ...completedOrders,
    ...currentOrders,
    ...newOrders,
    ...orderListings
  ]
  
  console.log("The orders list are: ", ordersList);
  const orders_: Order[] = ordersList?.map(order => ({
    ...order,
    status: order.order_status, // Normalize field name
  }));

  // use match to set filtered data per the activeTab with the array from data
  const filteredOrders = () => {
    switch (activeTab) {
      case 'Listings':
        return orderListings;
      case 'New':
        return newOrders;
      case 'current':
        return currentOrders;
      case 'completed':
        return completedOrders;
      default:
        return []
    }
  }
  
  // const orders_: Order[] = orders;
  console.log("The orders are: ", orders_);
  // const filteredOrders = orders_.filter(order => order.status === activeTab );
  // const filteredOrders = orders_.filter(order => order.status === activeTab);
  console.log("filteredOrders: ", filteredOrders());

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'New':
        return <Package className="w-5 h-5 text-blue-500" />;
      case 'current':
        return <Clock className="w-5 h-5 text-orange-500" />;
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
    }
  };

  const getPriorityColor = (priority: Order['priority']) => {
    switch (priority) {
      case 'low':
        return 'bg-gray-100 text-gray-600';
      case 'medium':
        return 'bg-orange-100 text-orange-600';
      case 'high':
        return 'bg-red-100 text-red-600';
    }
  };

  return (
    <div className="bg-white rounded-3xl p-8 mb-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold">Orders</h2>
        <div className="flex gap-2">
          {(['Listings', 'New', 'current', 'completed'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setActiveTab(status)}
              className={`px-4 py-2 rounded-xl text-sm transition-colors ${
                activeTab === status
                  ? 'bg-blue-900 text-white'
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)} Orders
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-hidden">
        <div className="w-full">
          <table className="w-full table-fixed">
            <thead>
              <tr className="text-left border-b border-gray-100">
                <th className="pb-4 font-medium text-gray-500 w-24">ORDER ID</th>
                <th className="pb-4 font-medium text-gray-500 w-40">ORDER NAME</th>
                <th className="pb-4 font-medium text-gray-500 w-32">CUSTOMER</th>
                <th className="pb-4 font-medium text-gray-500 w-32">EXPECTED DELIVERY</th>
                <th className="pb-4 font-medium text-gray-500 w-48">PICKUP ADDRESS</th>
                <th className="pb-4 font-medium text-gray-500 w-48">DELIVERY ADDRESS</th>
                <th className="pb-4 font-medium text-gray-500 w-24">TYPE</th>
                <th className="pb-4 font-medium text-gray-500 w-24">WEIGHT (KG)</th>
                <th className="pb-4 font-medium text-gray-500 w-24">PRIORITY</th>
                <th className="pb-4 font-medium text-gray-500 w-32">CATEGORY</th>
                <th className="pb-4 font-medium text-gray-500 w-32">STATUS</th>
                <th className="pb-4 w-20"></th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders()?.map((order) => (
                <tr key={order.id} className="border-b border-gray-100 last:border-0">
                  <td className="py-4 font-medium truncate">{order.id.toString()}</td>
                  <td className="py-4">
                    <div className="truncate hover:whitespace-normal">{order.order_name}</div>
                  </td>
                  <td className="py-4">
                    <div className="truncate hover:whitespace-normal">{order.company_name}</div>
                  </td>
                  <td className="py-4">{new Date(order.expected_delivery).toLocaleDateString()}</td>
                  <td className="py-4">
                    <div className="truncate hover:whitespace-normal hover:relative hover:z-10 hover:bg-white">
                      {order.pickup_address}
                    </div>
                  </td>
                  <td className="py-4">
                    <div className="truncate hover:whitespace-normal hover:relative hover:z-10 hover:bg-white">
                      {order.delivery_address}
                    </div>
                  </td>
                  <td className="py-4">{order.order_type}</td>
                  <td className="py-4">{order.order_weight}</td>
                  <td className="py-4">
                    <span className={`px-3 py-1 rounded-full text-xs ${getPriorityColor(order.priority)}`}>
                      {order.priority}
                    </span>
                  </td>
                  <td className="py-4">
                    <div className="truncate hover:whitespace-normal">{order.category}</div>
                  </td>
                  <td className="py-4">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(order.status)}
                      <span className="text-sm capitalize">{order.status}</span>
                    </div>
                  </td>
                  <td className="py-4">
                    <div className="flex justify-end gap-2">
                      <button className="p-2 hover:bg-gray-50 rounded-lg transition-colors">
                        <CheckSquareIcon className="w-4 h-4 text-gray-400" />
                      </button>
                      <button className="p-2 hover:bg-gray-50 rounded-lg transition-colors">
                        <Trash className="w-4 h-4 text-gray-400" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}