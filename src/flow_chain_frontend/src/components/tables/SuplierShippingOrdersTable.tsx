import React, { useEffect, useState } from "react";
import {
  Pencil,
  Trash,
  Clock,
  CheckCircle,
  Package,
  CheckSquareIcon,
} from "lucide-react";
import {
  assignDriverFunc,
  createQuotationFunc,
  fetchSupplierDrivers,
  updateOrderStatusFunc,
} from "../../pages/dashboard/utils/supplierUtils";
import AssignDriverModal from "../modals/supplier/AssignDriverModal";
import CreateQuotationModal from "../modals/supplier/CreateQuotationModal";
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
  priority: "low" | "medium" | "high";
  category: string;
  status: "New" | "current" | "Completed";
}

type OrderStatus = "New" | "current" | "Completed";

interface Order {
  id: string;
  order_status: OrderStatus;
}

export default function SupplierShippingOrdersTable({
  data,
  supplier_id,
  setUpdate,
}) {
  const [activeTab, setActiveTab] = useState<
    "Listings" | "New" | "current" | "Completed"
  >("Listings");

  const [orderId, setOrderId] = useState(0);
  const [isCreateQuotationModalOpen, setIsCreateQuotationModalOpen] =
    useState(false);
  const [isAssignDriverModalOpen, setIsAssignDriverModalOpen] = useState(false);
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(false);

  console.log("The shipp orders are: ", data);
  const { completedOrders, pendingOrders, newOrders, orderListings } = data;
  // merge all the orders to one array from completedOrders,pendingOrders,newOrders, arrays

  const ordersList = [
    ...completedOrders,
    ...pendingOrders,
    ...newOrders,
    ...orderListings,
  ];

  const assignDriverFun = (orderId, driverId) => {
    assignDriverFunc(orderId, driverId, setLoading);
  };

  const saveQuotationFun = (data) => {
    createQuotationFunc(data, setLoading);
  };

  const handleChangeOrderStatus = (orderId, newStatus) => {
    updateOrderStatusFunc(orderId, newStatus, setLoading);
    setUpdate((prev) => !prev);
  };

  console.log("The orders list are: ", ordersList);
  const orders_: Order[] = ordersList?.map((order) => ({
    ...order,
    status: order.order_status, // Normalize field name
  }));

  // use match to set filtered data per the activeTab with the array from data
  const orderedOrders = () => {
    switch (activeTab) {
      case "Listings":
        return orderListings;
      case "New":
        return newOrders;
      case "current":
        return pendingOrders;
      case "Completed":
        return completedOrders;
      default:
        return [];
    }
  };

  const filteredOrders = () => {
    const orders = ordersList;
    return orderedOrders()?.filter((order) => order.order_type === "delivery");
  };

  // const orders_: Order[] = orders;
  console.log("The orders are: ", orders_);
  // const filteredOrders = orders_.filter(order => order.status === activeTab );
  // const filteredOrders = orders_.filter(order => order.status === activeTab);
  console.log("filteredOrders: ", filteredOrders());

  const getStatusDropdown = (
    currentStatus: OrderStatus,
    onChangeStatus: (newStatus: OrderStatus) => void
  ) => {
    const statusOptions: OrderStatus[] = ["New", "current", "Completed"];

    return (
      <select
        value={currentStatus}
        onChange={(e) => onChangeStatus(e.target.value as OrderStatus)}
        className="bg-transparent border-none text-sm capitalize focus:ring-0"
      >
        {statusOptions.map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </select>
    );
  };

  const getStatusIcon = (status: Order["status"]) => {
    switch (status) {
      case "New":
        return <Package className="w-5 h-5 text-blue-500" />;
      case "current":
        return <Clock className="w-5 h-5 text-orange-500" />;
      case "Completed":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
    }
  };

  const getPriorityColor = (priority: Order["priority"]) => {
    switch (priority) {
      case "low":
        return "bg-gray-100 text-gray-600";
      case "medium":
        return "bg-orange-100 text-orange-600";
      case "high":
        return "bg-red-100 text-red-600";
    }
  };

  useEffect(() => {
    fetchSupplierDrivers(setDrivers, setLoading, supplier_id);
  }, []);

  return (
    <div className="bg-white rounded-3xl p-8 mb-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold">Items Shipping Orders</h2>
        <div className="flex gap-2">
          {(["Listings", "New", "current", "Completed"] as const).map(
            (status) => (
              <button
                key={status}
                onClick={() => setActiveTab(status)}
                className={`px-4 py-2 rounded-xl text-sm transition-colors ${
                  activeTab === status
                    ? "bg-blue-900 text-white"
                    : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)} Orders
              </button>
            )
          )}
        </div>
      </div>

      <div className="overflow-hidden">
        <div className="w-full">
          <table className="w-full table-fixed">
            <thead>
              <tr className="text-left border-b border-gray-100">
                <th className="pb-4 font-medium text-gray-500 w-24">
                  ORDER ID
                </th>
                <th className="pb-4 font-medium text-gray-500 w-40">
                  ORDER NAME
                </th>
                <th className="pb-4 font-medium text-gray-500 w-32">
                  CUSTOMER
                </th>
                <th className="pb-4 font-medium text-gray-500 w-32">
                  EXPECTED DELIVERY
                </th>
                <th className="pb-4 font-medium text-gray-500 w-48">
                  PICKUP ADDRESS
                </th>
                <th className="pb-4 font-medium text-gray-500 w-48">
                  DELIVERY ADDRESS
                </th>
                <th className="pb-4 font-medium text-gray-500 w-24">TYPE</th>
                <th className="pb-4 font-medium text-gray-500 w-24">
                  WEIGHT (KG)
                </th>
                <th className="pb-4 font-medium text-gray-500 w-24">
                  PRIORITY
                </th>
                <th className="pb-4 font-medium text-gray-500 w-32">
                  CATEGORY
                </th>
                <th className="pb-4 font-medium text-gray-500 w-32">STATUS</th>
                <th className="pb-4 font-medium text-gray-500 w-44">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders()?.map((order) => (
                <tr
                  key={order.id}
                  className="border-b border-gray-100 last:border-0"
                >
                  <td className="py-4 font-medium truncate">
                    {order.id.toString()}
                  </td>
                  <td className="py-4">
                    <div className="truncate hover:whitespace-normal">
                      {order.order_name}
                    </div>
                  </td>
                  <td className="py-4">
                    <div className="truncate hover:whitespace-normal">
                      {order.company_name}
                    </div>
                  </td>
                  <td className="py-4">
                    {new Date(order.expected_delivery).toLocaleDateString()}
                  </td>
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
                    <span
                      className={`px-3 py-1 rounded-full text-xs ${getPriorityColor(
                        order.priority
                      )}`}
                    >
                      {order.priority}
                    </span>
                  </td>
                  <td className="py-4">
                    <div className="truncate hover:whitespace-normal">
                      {order.category}
                    </div>
                  </td>
                  <td className="py-4">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(order.order_status)}
                      {getStatusDropdown(order.order_status, (newStatus) =>
                        handleChangeOrderStatus(order.id, newStatus)
                      )}
                      <span className="sr-only">{order.order_status}</span>{" "}
                      {/* Hidden text for accessibility */}
                    </div>
                  </td>

                  <td className="py-4 min-w-20">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => {
                          setOrderId(order.id);
                          activeTab === "Listings"
                            ? setIsCreateQuotationModalOpen(true)
                            : activeTab === "New"
                            ? setIsAssignDriverModalOpen(true)
                            : activeTab === "current"
                            ? console.log("Update Status")
                            : console.log("View Details");
                        }}
                        className="px-2 py-2 bg-blue-900 text-white rounded-full hover:bg-blue-800 transition-colors"
                      >
                        {activeTab === "Listings"
                          ? "Add Quote"
                          : activeTab === "New"
                          ? "Assign Driver"
                          : activeTab === "current"
                          ? "mark Completed"
                          : "Pay Modal"}
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
      <CreateQuotationModal
        orderId={orderId}
        save={saveQuotationFun}
        isOpen={isCreateQuotationModalOpen}
        onClose={() => setIsCreateQuotationModalOpen(false)}
      />
      <AssignDriverModal
        orderId={orderId}
        isOpen={isAssignDriverModalOpen}
        onClose={() => setIsAssignDriverModalOpen(false)}
        drivers={drivers}
        assignDriver={assignDriverFun}
      />
    </div>
  );
}
