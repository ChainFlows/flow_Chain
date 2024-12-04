import React, { useCallback, useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { getOrderQuotations } from '../../utils/quatation';

interface Quotation {
  id: string;
  title: string;
  description: string;
  shippingCost: number;
  orderId: string;
  status: 'pending' | 'approved' | 'denied';
  supplier: string;
}

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

interface QuotationModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: Order;
  save: (data: any) => void;
}

const quotations: Quotation[] = [
  {
    id: "Q1",
    title: "Express Delivery Service",
    description: "Next-day delivery service including packaging and handling for electronic equipment. Insurance coverage included for the full value of the items.",
    shippingCost: 1250.00,
    orderId: "ORD-001",
    status: 'pending',
    supplier: "FastTrack Logistics"
  },
  {
    id: "Q2",
    title: "Premium Shipping Service",
    description: "2-day delivery with real-time tracking and temperature-controlled storage. Includes comprehensive insurance and priority handling.",
    shippingCost: 950.00,
    orderId: "ORD-001",
    status: 'pending',
    supplier: "SecureShip Co."
  },
  {
    id: "Q3",
    title: "Standard Delivery Option",
    description: "3-5 day delivery service with standard insurance coverage. Includes basic packaging and handling procedures.",
    shippingCost: 750.00,
    orderId: "ORD-001",
    status: 'pending',
    supplier: "EcoFreight Solutions"
  }
];

export default function QuotationModal({ isOpen, onClose,save,order }: QuotationModalProps) {
  const [selectedQuotation, setSelectedQuotation] = useState(quotations[0]);
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(false);


  const {id, order_name} = order;

  console.log("const order is: ", order);
  console.log("const id is: ", id);





  // // fetch all quotations to bids
  const fetchBids = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getOrderQuotations(id);
      console.log("first response is: ", response);
      // setQuotes(await getOrderQuotations(id));
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBids();
  } , [fetchBids]);

  if (!isOpen) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-50 text-yellow-600';
      case 'approved':
        return 'bg-green-50 text-green-600';
      case 'denied':
        return 'bg-red-50 text-red-600';
      default:
        return 'bg-gray-50 text-gray-600';
    }
  };

  const handleSelectQuotation = () => {
    // Handle quotation selection logic here
    onClose();
  };

  const handleDeclineQuotation = () => {
    // Handle quotation decline logic here
    onClose();
  };

  // useEffect(() => {
  //   fetchBids();
  // } , [fetchBids]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-3xl p-8 w-full max-w-4xl relative">
        <button 
          onClick={onClose}
          className="absolute right-6 top-6 text-gray-400 hover:text-gray-600"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-2xl font-semibold mb-8">Quotation Details</h2>

        <div className="flex gap-6 mb-8">
          <div className="w-64 space-y-4">
            {quotations.map((q) => (
              <div
                key={q.id}
                onClick={() => setSelectedQuotation(q)}
                className={`p-4 rounded-lg cursor-pointer transition-colors ${
                  selectedQuotation.id === q.id
                    ? 'bg-blue-50 border-2 border-blue-900'
                    : 'bg-gray-50 hover:bg-gray-100'
                }`}
              >
                <div className="font-medium mb-1">{q.supplier}</div>
                <div className="text-sm text-gray-600">${q.shippingCost.toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
              </div>
            ))}
          </div>

          <div className="flex-1 space-y-6">
            <div>
              <label className="block text-lg font-bold text-gray-900 mb-2">
                Quotation Title
              </label>
              <div className="text-base text-gray-700">{selectedQuotation.title}</div>
            </div>

            <div>
              <label className="block text-lg font-bold text-gray-900 mb-2">
                Service Description
              </label>
              <div className="text-base text-gray-700">{selectedQuotation.description}</div>
            </div>

            <div>
              <label className="block text-lg font-bold text-gray-900 mb-2">
                Shipping Cost
              </label>
              <div className="text-base text-gray-700">
                ${selectedQuotation.shippingCost.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </div>
            </div>

            <div>
              <label className="block text-lg font-bold text-gray-900 mb-2">
                Order ID
              </label>
              <div className="text-base text-gray-700">{selectedQuotation.orderId}</div>
            </div>

            <div>
              <label className="block text-lg font-bold text-gray-900 mb-2">
                Quotation Status
              </label>
              <span className={`px-3 py-1 rounded-full text-sm capitalize ${getStatusColor(selectedQuotation.status)}`}>
                {selectedQuotation.status}
              </span>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4 mt-8">
          <button
            onClick={handleDeclineQuotation}
            className="px-6 py-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-50"
          >
            Decline Quotation
          </button>
          <button
            onClick={handleSelectQuotation}
            className="px-6 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800"
          >
            Select Quotation
          </button>
        </div>
      </div>
    </div>
  );
}