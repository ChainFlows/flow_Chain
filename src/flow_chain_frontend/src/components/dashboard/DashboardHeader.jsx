import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Box, Bell, ChevronDown } from "lucide-react";
import Wallet from "../Wallet";
import { searchItems } from "../../utils/items";
import SearchModal from "../modals/SearchModal";
import { searchOrders } from "../../utils/orders";

export default function DashboardHeader(dataClient) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchedItems, setsearchedItems] = useState([]);
  const [searchedOrders, setsearchedOrders] = useState([]);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  console.log("first", dataClient);
  console.log("second", dataClient.dataClient);
  const { id, logo, name, role } = dataClient.dataClient;

  const handleSearch = async (e) => {
    if (e.key !== "Enter") {
      setSearchTerm(e.target.value);
      console.log(e.target.value);
      return;
    }

    console.log("search query:", searchTerm);

    try {
      // Fetch search items
      const searchItemsResult = await searchItems(e.target.value);
      console.log("searchItems:", searchItemsResult);
      setsearchedItems(searchItemsResult);

      // Fetch search orders
      const searchOrdersResult = await searchOrders(searchTerm);
      console.log("searchOrders:", searchOrdersResult);
      setsearchedOrders(searchOrdersResult);

      // Open search modal
      setIsSearchModalOpen(true);
    } catch (error) {
      console.error("Search error:", error);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b">
      <div className="px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <button className="p-2 hover:bg-gray-50 rounded-lg">
            <span className="block w-5 h-0.5 bg-gray-600 mb-1"></span>
            <span className="block w-5 h-0.5 bg-gray-600"></span>
          </button>
          <span className="font-medium">Dashboard</span>
          <div className="relative">
            <input
              onKeyDown={(e) => {
                setSearchTerm(e.target.value);
                handleSearch(e);
              }}
              type="text"
              placeholder="Search for..."
              className="w-96 px-4 py-2 bg-gray-50 rounded-lg focus:outline-none"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center">
            <Bell className="w-4 h-4 text-gray-600" />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#004AAD] text-white flex items-center justify-center text-sm">
              <img
                src={logo || "/images/avatar.png"}
                alt="avatar"
                className="w-6 h-6 rounded-full"
              />
            </div>
            <div>
              <div className="text-sm font-medium">{name}</div>
              <div className="text-xs text-gray-500">Account settings</div>
            </div>
            {/* <Wallet /> */}
          </div>
        </div>
      </div>
      <SearchModal
        items={searchedItems}
        orders={searchedOrders}
        searchTerm={searchTerm}
        role={role}
        id={id}
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
      />
    </header>
  );
}
