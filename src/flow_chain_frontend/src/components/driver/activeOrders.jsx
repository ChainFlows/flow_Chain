import React from "react";

const ActiveOrders = ({ orders }) => {
  const {
    order_name,
    company_name,
    expected_delivery,
    pickup_address,
    delivery_address,
    order_status,
  } = orders;

  return (
    <div className="bg-white rounded-xl shadow-md p-6 flex flex-col justify-between space-y-4">
      {/* Order Title and Company */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800">{order_name}</h3>
        <p className="text-sm text-gray-500">{company_name}</p>
      </div>

      {/* Order Details */}
      <div className="text-sm text-gray-700 space-y-2">
        <p>
          <strong>Expected Delivery:</strong> {expected_delivery}
        </p>
        <p>
          <strong>Pickup Address:</strong> {pickup_address}
        </p>
        <p>
          <strong>Delivery Address:</strong> {delivery_address}
        </p>
        <p>
          <strong>Order Status:</strong>{" "}
          <span
            className={`px-2 py-1 rounded-full text-xs ${
              order_status === "assigned"
                ? "bg-blue-100 text-blue-900"
                : "bg-gray-100 text-gray-900"
            }`}
          >
            {order_status}
          </span>
        </p>
      </div>

      {/* Accept Order Button */}
      <button className="w-full py-2 px-4 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700">
        Accept Order
      </button>
    </div>
  );
};

export default ActiveOrders;
