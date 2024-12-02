import {React, useState, useEffect, useRef, useCallback} from "react";
import { ChevronDown } from "lucide-react";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import SalesOverview from "../../components/dashboard/SalesOverview";
import RecentOrdersList from "../../components/dashboard/RecentOrdersList";
import ProductsTable from "../../components/dashboard/ProductsTable";
import PopularCategories from "../../components/dashboard/PopularCategories";
import OrdersStatus from "../../components/dashboard/OrdersStatus";

import {
  getNewOrders,
  getSupplyCompanyActiveOrders,
  getSupplyCompanyCompletedOrders,
  getSupplyCompanyNewOrders,
  payDriver,
} from "../../utils/supplyCompany";

export default function SupplierDashboard({ supplier }) {
  const [searchBarValue32, setSearchBarValue32] = React.useState("");
  const [loading, setLoading] = useState(false);
  const [orderListings, setOrderListings] = useState([]);
  const [completedOrders, setCompletedOrders] = useState([]);
  const [currentOrders, setCurrentOrders] = useState([]);
  const [newOrders, setNewOrders] = useState([]);
  const [tab, setTab] = useState("new");

  const { id } = supplier;

  // fetch new order listings
  const fetchNewOrderListings = useCallback(async () => {
    try {
      setLoading(true);
      const orders = await getNewOrders();
      setOrderListings(orders);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  });

  const fetchNewOrders = useCallback(async () => {
    try {
      setLoading(true);
      const orders = await getSupplyCompanyNewOrders(id);
      console.log("new orders", orders);
      setNewOrders(orders);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  });

  const fetchCompletedOrders = useCallback(async () => {
    try {
      setLoading(true);
      const orders = await getSupplyCompanyCompletedOrders(id);
      setCompletedOrders(orders);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  });

  const fetchCurrentOrders = useCallback(async () => {
    try {
      setLoading(true);
      const orders = await getSupplyCompanyActiveOrders(id);
      setCurrentOrders(orders);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  });

  // pay driver
  const payDriverFunc = async (data) => {
    const { orderId } = data;
    const amount = parseInt(data.amount, 10) * 10 ** 8;

    try {
      setLoading(true);
      await payDriver({ orderId }, amount).then((resp) => {
        console.log("resp", resp);
        fetchCompletedOrders();
        toast(<NotificationSuccess text="Driver paid successfully." />);
      });
      toast(<NotificationSuccess text="Driver paid successfully." />);
    } catch (error) {
      console.log(error);
      toast(<NotificationError text="Failed to pay driver." />);
    } finally {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   fetchNewOrders();
  //   fetchCompletedOrders();
  //   fetchCurrentOrders();
  //   fetchNewOrderListings();
  // }, []);

  console.log("newOrders", newOrders);
  console.log("completedOrders", completedOrders);
  console.log("currentOrders", currentOrders);
  console.log("orderListings", orderListings);

  const salesData = [
    { date: "SEP 1", value: 200000 },
    { date: "SEP 14", value: 220000 },
    { date: "SEP 20", value: 210000 },
    { date: "SEP 30", value: 298507.5 },
  ];

  const recentOrders = [
    {
      product: "iPhone 15 Pro Max",
      image:
        "https://images.unsplash.com/photo-1632661674596-df8be070a5c5?w=100&h=100&fit=crop",
      price: 1099.0,
      time: "12 minutes ago",
    },
    {
      product: "Google Pixel 8 Pro",
      image:
        "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=100&h=100&fit=crop",
      price: 599.0,
      time: "16 minutes ago",
    },
    {
      product: "iPad Pro",
      image:
        "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=100&h=100&fit=crop",
      price: 799.0,
      time: "24 minutes ago",
    },
    {
      product: "Samsung Galaxy S24 Ultra",
      image:
        "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=100&h=100&fit=crop",
      price: 849.0,
      time: "32 minutes ago",
    },
  ];

  const products = [
    {
      id: "01",
      name: "iPhone 15 Pro Max",
      image:
        "https://images.unsplash.com/photo-1632661674596-df8be070a5c5?w=100&h=100&fit=crop",
      category: "Smartphones",
      totalSales: 90,
      sales: 98910.0,
      stock: 24,
    },
    {
      id: "05",
      name: "Google Pixel 8",
      image:
        "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=100&h=100&fit=crop",
      category: "Smartphones",
      totalSales: 54,
      sales: 32348.5,
      stock: 16,
    },
    {
      id: "08",
      name: "iPad Air",
      image:
        "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=100&h=100&fit=crop",
      category: "Tablets",
      totalSales: 35,
      sales: 27965.0,
      stock: 8,
    },
    {
      id: "13",
      name: "Samsung Galaxy S24",
      image:
        "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=100&h=100&fit=crop",
      category: "Smartphones",
      totalSales: 20,
      sales: 19980.0,
      stock: 49,
    },
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
