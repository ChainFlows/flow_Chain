import { X } from "lucide-react";
import React, { useState } from "react";

interface AssignDriverModalProps {
    orderId: number;
    isOpen: boolean;
    onClose: () => void;
    drivers: any[];
    assignDriver: (orderId: number, driverId: number) => void;
}

const AssignDriverModal: React.FC<AssignDriverModalProps> = ({
    orderId,
    isOpen,
    onClose,
    drivers,
    assignDriver,
}) => {
    const [selectedDriver, setSelectedDriver] = useState<number | null>(null);

    const handleSubmit = () => {
        if (selectedDriver !== null) {
            assignDriver(orderId, selectedDriver);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-3xl p-8 w-full max-w-2xl relative">
                <button
                    onClick={onClose}
                    className="absolute right-6 top-6 text-gray-400 hover:text-gray-600"
                >
                    <X className="w-6 h-6" />
                </button>

                <h2 className="text-2xl font-semibold mb-6">Assign Driver</h2>

                <form className="space-y-6">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Select Driver
                            </label>
                            <select
                                value={selectedDriver ?? ""}
                                onChange={(e) => setSelectedDriver(Number(e.target.value))}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-blue-900 focus:border-blue-900"
                                required
                            >
                                <option value="" disabled>
                                    Select a driver
                                </option>
                                {drivers?.filter((driver) => driver.driver_status === "available")?.map((driver) => (
                                    <option key={driver.id} value={driver.id}>
                                        {driver.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="flex justify-end gap-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            className="px-6 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800"
                            onClick={() => {
                                handleSubmit();
                                onClose();
                            }}
                        >
                            Assign Driver
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AssignDriverModal;