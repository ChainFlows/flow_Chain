import React, { useCallback, useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { getOrderBids } from '../../utils/quatation';



// const quotations = [
//   {
//     id: "Q1",
//     title: "Express Delivery Service",
//     description: "Next-day delivery service including packaging and handling for electronic equipment. Insurance coverage included for the full value of the items.",
//     shippingCost: 1250.00,
//     orderId: "ORD-001",
//     status: 'pending',
//     supplier: "FastTrack Logistics"
//   },
// ];

export default function BidModal({ isOpen, onClose, save2,order }) {
  const [bids, setBids] = useState([]);
  const [selectedBid, setSelectedBid] = useState(
    bids.length > 0 ? bids[0] : null
  );
  
  const [loading, setLoading] = useState(false);


  const {id, order_name} = order;

  console.log("const order is: ", order);
  console.log("const id is: ", id);
  console.log("selectedBid is: ", selectedBid);
  console.log("The bids are: ", bids[0]);


//  Check

  const fetchBids = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getOrderBids(id);
  
      console.log("Fetched bids response:", response);
  
      if (Array.isArray(response)) {
        setBids(response);
        setSelectedBid(response[0] || null); // Set the first bid or null
      } else {
        console.error("Unexpected response format:", response);
      }
  
      setLoading(false);
    } catch (error) {
      console.error("Fetch error:", error);
      setLoading(false);
    }
  }, [id]);
  

  useEffect(() => {
    fetchBids();
  } , [fetchBids]);

  // useEffect(() => {
  //   if (isOpen) fetchBids();
  // }, [fetchBids, isOpen]);
  

  if (!isOpen) return null;

  const getStatusColor = (status) => {
    if (typeof status !== 'string') return 'bg-gray-50 text-gray-600';
    switch (status.toLowerCase()) {
      case 'Pending':
        return 'bg-yellow-50 text-yellow-600';
      case 'Approved':
        return 'bg-green-50 text-green-600';
      case 'denied':
        return 'bg-red-50 text-red-600';
      default:
        return 'bg-gray-50 text-gray-600';
    }
  };

  const handleSelectBids = () => {
    // Handle Bid selection logic here
    onClose();

  };

  const handleDeclineBids = () => {
    // Handle Bid decline logic here
    onClose();
  };


  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-3xl p-8 w-full max-w-4xl relative">
        <button 
          onClick={onClose}
          className="absolute right-6 top-6 text-gray-400 hover:text-gray-600"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-2xl font-semibold mb-8">Bid Details</h2>

        <div className="flex gap-6 mb-8">
          <div className="w-64 space-y-4">
            {bids.map((q) => (
              <div
                key={q.id}
                onClick={() => setSelectedBid(q)}
                className={`p-4 rounded-lg cursor-pointer transition-colors ${
                  selectedBid?.id === q.id
                    ? 'bg-blue-50 border-2 border-blue-900'
                    : 'bg-gray-50 hover:bg-gray-100'
                }`}
              >
                <div className="font-medium mb-1">{q.supplier_name}</div>
                <div className="text-sm text-gray-600">{q.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}ICP</div>
              </div>
            ))}
          </div>

          <div className="flex-1 space-y-6">

            {/* Figure this out to show MM-DD-YYYY format */}
            {/* <div>
              <label className="block text-lg font-bold text-gray-900 mb-2">
                Bid Created and Update Time
              </label>
              <div className="text-base text-gray-700">
                created_at: {selectedBid?.created_at 
                  ? new Date(selectedBid.created_at).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' }) 
                  : 'N/A'}
                <br />
                updated_at: {selectedBid?.updated_at 
                  ? new Date(selectedBid.updated_at).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' }) 
                  : 'N/A'}
              </div>

            </div> */}

            <div>
              <label className="block text-lg font-bold text-gray-900 mb-2">
                Service Notes
              </label>
              <div className="text-base text-gray-700">{selectedBid?.notes}</div>
            </div>

            <div>
              <label className="block text-lg font-bold text-gray-900 mb-2">
                Shipping Amount
              </label>
              <div className="text-base text-gray-700">
                {selectedBid?.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}ICP
              </div>
            </div>

            <div>
              <label className="block text-lg font-bold text-gray-900 mb-2">
                Order ID
              </label>
              <div className="text-base text-gray-700">{selectedBid?.order_id.toString()}</div>
            </div>

            {/* <div>
              <label className="block text-lg font-bold text-gray-900 mb-2">
                Bid Status
              </label> */}
              {/* <span className={`px-3 py-1 rounded-full text-sm capitalize ${getStatusColor(selectedBid?.status)}`}>
                {selectedBid?.status || "pending"}
              </span> */}
            {/* </div> */}
          </div>
        </div>

        <div className="flex justify-end gap-4 mt-8">
          <button
            onClick={handleDeclineBids}
            className="px-6 py-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-50"
          >
            Decline Bid
          </button>
          <button
            onClick={() => {save2(id, selectedBid?.supplier_id), handleSelectBids}}
            className="px-6 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800"
          >
            Select Bid
          </button>
        </div>
      </div>
    </div>
  );
}