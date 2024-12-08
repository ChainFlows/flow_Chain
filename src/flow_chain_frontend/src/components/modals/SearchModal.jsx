import { X } from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  assignDriverFunc,
  createQuotationFunc,
  fetchSupplierDrivers,
  saveBid,
  updateOrderStatusFunc,
} from "../../pages/dashboard/utils/supplierUtils";
import CreateBidModal from "./supplier/CreateBidModal";
import AssignDriverModal from "./supplier/AssignDriverModal";
import { assignBidSupplier, assignSupplier } from "../../utils/orders";
import {
  Pencil,
  Trash,
  Clock,
  CheckCircle,
  Package,
  CheckSquareIcon,
} from "lucide-react";
import CreateQuotationModal from "./supplier/CreateQuotationModal";
import QuotationModal from "./QuotationModal";
import BidModal from "./BidModal";

const getStatusIcon = (status) => {
  switch (status) {
    case "New":
      return <Package className="w-5 h-5 text-blue-500" />;
    case "pending":
      return <Clock className="w-5 h-5 text-orange-500" />;
    case "completed":
      return <CheckCircle className="w-5 h-5 text-green-500" />;
  }
};

const getPriorityColor = (priority) => {
  switch (priority) {
    case "low":
      return "bg-gray-100 text-gray-600";
    case "medium":
      return "bg-orange-100 text-orange-600";
    case "high":
      return "bg-red-100 text-red-600";
  }
};

const getStatusColor = (status) => {
  switch (status) {
    case "in-stock":
      return "text-green-600 bg-green-50";
    case "low-stock":
      return "text-orange-600 bg-orange-50";
    case "out-of-stock":
      return "text-red-600 bg-red-50";
    default:
      return "text-gray-600 bg-gray-200";
  }
};

const SearchModal = ({
  items,
  orders,
  searchTerm,
  role,
  id,
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-3xl p-4 w-full max-w-7xl relative">
        <button
          onClick={onClose}
          className="absolute right-6 top-6 text-gray-400 hover:text-gray-600"
        >
          <X className="w-6 h-6 m-4" />
        </button>

        <h2 className="text-2xl font-semibold m-4 mb-6">
          Results for: {searchTerm}
        </h2>
        <ItemsModal items={items} />
        {role === "Supplier" ? (
          <SupplierOrderModal orders={orders} supplier_id={id} />
        ) : role === "Client" ? (
          <ClientOrderModal orders={orders} />
        ) : (
          <div className="bg-white rounded-3xl p-8 mb-8">
            No search functionality available for driver
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchModal;

const SupplierOrderModal = ({ orders, supplier_id }) => {
  const [orderId, setOrderId] = useState(0);
  const [isCreateBidModalOpen, setIsCreateBidModalOpen] = useState(false);
  const [isAssignDriverModalOpen, setIsAssignDriverModalOpen] = useState(false);
  const [isCreateQuotationModalOpen, setIsCreateQuotationModalOpen] =
    useState(false);
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(false);

  const saveBidFun = (data) => {
    saveBid(data, setLoading);
  };

  const assignDriverFun = (orderId, driverId) => {
    assignDriverFunc(orderId, driverId, setLoading);
  };

  const handleChangeOrderStatus = (orderId, newStatus) => {
    updateOrderStatusFunc(orderId, newStatus, setLoading);
    setUpdate((prev) => !prev);
  };

  const saveQuotationFun = (data) => {
    createQuotationFunc(data, setLoading);
  };

  useEffect(() => {
    fetchSupplierDrivers(setDrivers, setLoading, supplier_id);
  }, []);

  return (
    <div className="bg-white rounded-3xl p-8 mb-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold">Orders</h2>
      </div>

      <div className="overflow-x-auto">
        <div className="w-full">
          <table className="w-full table-fixed">
            <thead>
              <tr className="text-left border-b border-gray-100">
                <th className="pb-4 font-medium text-gray-500 w-24">
                  ORDER ID
                </th>
                <th className="pb-4 font-medium text-gray-500 w-32">
                  ORDER NAME
                </th>
                <th className="pb-4 font-medium text-gray-500 w-32">
                  CUSTOMER
                </th>
                <th className="pb-4 font-medium text-gray-500 w-32">
                  EXPECTED DELIVERY
                </th>
                <th className="pb-4 font-medium text-gray-500 w-40">
                  PICKUP ADDRESS
                </th>
                <th className="pb-4 font-medium text-gray-500 w-40">
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
                <th className="pb-4 font-medium text-gray-500 w-40">ACTIONS</th>
                <th className="pb-4 w-20"></th>
              </tr>
            </thead>
            <tbody>
              {orders?.map((order) => (
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
                      <span className="text-sm capitalize">
                        {order.order_status}
                      </span>{" "}
                    </div>
                  </td>

                  <td className="py-4 min-w-20">
                    <div className="flex justify-around gap-2">
                      <button
                        onClick={() => {
                          setOrderId(order.id);
                          order.order_status === "New" &&
                          !order.supplier_id[0] &&
                          order.order_type === "shipping"
                            ? setIsCreateBidModalOpen(true)
                            : order.order_status === "New" &&
                              !order.supplier_id[0] &&
                              order.order_type === "delivery"
                            ? setIsCreateQuotationModalOpen(true)
                            : order.order_status === "New" &&
                              order.supplier_id[0]
                            ? setIsAssignDriverModalOpen(true)
                            : order.order_status === "Assigned"
                            ? handleChangeOrderStatus(order.id, "Completed")
                            : console.log("View Details");
                        }}
                        className="px-2 py-2 bg-blue-900 text-white rounded-full hover:bg-blue-800 transition-colors"
                      >
                        {order.order_status === "New" &&
                        !order.supplier_id[0] &&
                        order.order_type === "shipping"
                          ? "Add Bid"
                          : order.order_status === "New" &&
                            !order.supplier_id[0] &&
                            order.order_type === "delivery"
                          ? "Add Quote"
                          : order.order_status === "New" && order.supplier_id[0]
                          ? "Assign Driver"
                          : order.order_status === "Assigned"
                          ? "mark Completed"
                          : ""}
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
      <CreateBidModal
        orderId={orderId}
        save={saveBidFun}
        isOpen={isCreateBidModalOpen}
        onClose={() => setIsCreateBidModalOpen(false)}
      />
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
};

const ClientOrderModal = ({ orders }) => {
  const [isQuotationModalOpen, setIsQuotationModalOpen] = useState(false);
  const [isBidModalOpen, setIsBidModalOpen] = useState(false);
  const [selectedOrderId, setSelectedOrder] = useState(0);
  const [loading, setLoading] = useState(false);

  // assign supplier based on checking Quatation
  const assignSupplierToOrder = async (orderId, supplierId) => {
    try {
      setLoading(true);
      await assignSupplier(orderId, supplierId);
      console.log("done check approved");
      // toast(<NotificationSuccess text="Supplier assigned successfully." />);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      // toast(<NotificationError text="Failed to assign supplier." />);
    }
  };

  // assign_bid_supplier
  const assignBidSupplier1 = async (orderId, supplierId) => {
    try {
      setLoading(true);
      await assignBidSupplier(orderId, supplierId);
      console.log("done check approved");
      // toast(<NotificationSuccess text="Supplier assigned successfully." />);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      // toast(<NotificationError text="Failed to assign supplier." />);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-8 mb-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold">Orders</h2>
      </div>

      <div className="overflow-x-auto">
        <div className="w-full">
          <table className="w-full table-fixed">
            <thead>
              <tr className="text-left border-b border-gray-100">
                <th className="pb-4 font-medium text-gray-500 w-16">ID</th>
                <th className="pb-4 font-medium text-gray-500 w-32">
                  ORDER NAME
                </th>
                <th className="pb-4 font-medium text-gray-500 w-32">
                  CUSTOMER
                </th>
                <th className="pb-4 font-medium text-gray-500 w-32">
                  EXPECTED DELIVERY
                </th>
                <th className="pb-4 font-medium text-gray-500 w-40">
                  PICKUP ADDRESS
                </th>
                <th className="pb-4 font-medium text-gray-500 w-40">
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
                <th className="pb-4 font-medium text-gray-500 w-32">ACTIONS</th>
                <th className="pb-4 w-20"></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <>
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
                        {getStatusIcon(order.status)}
                        <span className="text-sm capitalize">
                          {order.status}
                        </span>
                      </div>
                    </td>
                    <td className="py-4">
                      <div className="flex justify-between gap-2">
                        {/* Show this button below only when the order is in 'New' */}
                        {order.status === "New" &&
                          order.order_type === "delivery" && (
                            <button
                              className="px-4 py-2 bg-blue-900 text-white font-medium text-sm rounded-lg shadow-md hover:bg-blue-800 hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
                              onClick={() => {
                                setSelectedOrder(order.id);
                                setIsQuotationModalOpen(true);
                              }}
                            >
                              Check Quotations
                            </button>
                          )}
                        {order.status === "New" &&
                          order.order_type === "shipping" && (
                            <button
                              className="px-4 py-2 bg-blue-900 text-white font-medium text-sm rounded-lg shadow-md hover:bg-blue-800 hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
                              onClick={() => {
                                setSelectedOrder(order.id);
                                setIsBidModalOpen(true);
                              }}
                            >
                              Check Bids
                            </button>
                          )}
                      </div>
                    </td>
                  </tr>
                </>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <QuotationModal
        isOpen={isQuotationModalOpen}
        onClose={() => setIsQuotationModalOpen(false)}
        order={selectedOrderId}
        save={assignSupplierToOrder}
      />

      <BidModal
        isOpen={isBidModalOpen}
        onClose={() => setIsBidModalOpen(false)}
        order={selectedOrderId}
        save2={assignBidSupplier1}
      />
    </div>
  );
};

const ItemsModal = ({ items }) => {
  return (
    <div className="bg-white rounded-3xl p-8 mb-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold">Items</h2>
        <button className="px-4 py-2 bg-gray-50 rounded-2xl text-sm hover:bg-gray-100 transition-colors">
          Browse Items
        </button>
      </div>
      <div className="overflow-hidden">
        <table className="w-full table-fixed">
          <thead>
            <tr className="text-left border-b border-gray-100">
              <th className="pb-4 font-medium text-gray-500 w-10">ID </th>
              <th className="pb-4 font-medium text-gray-500 w-32">ITEMS ↑</th>
              <th className="pb-4 font-medium text-gray-500 w-28">CATEGORY</th>
              <th className="pb-4 font-medium text-gray-500 w-20">STATUS </th>
              <th className="pb-4 font-medium text-gray-500 w-20">WEIGHT </th>
              <th className="pb-4 font-medium text-gray-500 w-16">QNTY</th>
              <th className="pb-4 font-medium text-gray-500 w-40">
                MANUFACTURE
              </th>
              <th className="pb-4 font-medium text-gray-500 w-40">
                DESCRIPTION
              </th>
              <th className="pb-4 font-medium text-gray-500 w-28">
                UNIT_PRICE
              </th>
              <th className="pb-4 font-medium text-gray-500 w-20">STOCK </th>
              <th className="pb-4 w-20"></th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr
                key={index}
                className="border-b border-gray-100 last:border-0"
              >
                <td className="py-4 text-gray-500">
                  <div className="truncate hover:whitespace-normal">
                    {item.id.toString()}
                  </div>
                </td>
                <td className="py-4">
                  <div className="flex items-center gap-3">
                    {/* <div className="w-12 h-12 bg-gray-50 rounded-xl p-2">
                      <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                    </div> */}
                    <span className="font-medium truncate hover:whitespace-normal">
                      {item.name}
                    </span>
                  </div>
                </td>
                <td className="py-4 text-gray-500">
                  <div className="truncate hover:whitespace-normal">
                    {item.category}
                  </div>
                </td>
                <td className="py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs ${getStatusColor(
                      item.status
                    )}`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="py-4 text-gray-500">{item.weight} kg</td>
                <td className="py-4 text-gray-500">
                  {item.quantity.toString()}
                </td>
                <td className="py-4 ">{item.manufacturer}</td>
                <td className="py-4 ">{item.description}</td>
                <td className="py-4 ">{item.unit_price.toString()} ICP</td>
                <td className="py-4 text-center">{item.sku}</td>
                {/* <td className="py-4">
                  <div className="flex justify-end gap-2">
                    <button className="p-2 hover:bg-gray-50 rounded-lg transition-colors">
                      <Pencil className="w-4 h-4 text-gray-400" />
                    </button>
                    <button className="p-2 hover:bg-gray-50 rounded-lg transition-colors">
                      <Trash className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
