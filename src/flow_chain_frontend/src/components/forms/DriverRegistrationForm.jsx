import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { flow_chain_backend } from "../../../../declarations/flow_chain_backend";

export default function DriverRegistrationForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    contactInformation: "",
    experience: "",
    licenseNumber: "",
    licenseExpiry: "",
    vehicleMake: "",
    vehicleModel: "",
    vehicleType: "",
    vehicleRegistrationNumber: "",
    trainings: "",
    driversCompany: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) {
        newErrors[key] = "This field is required";
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    setMessage("");

    try {
      // Split trainings into an array
      const trainingsArray = formData.trainings
        .split(",")
        .map((training) => training.trim());

      const payload = {
        full_name: formData.fullName,
        contact_info: formData.contactInformation,
        experience: formData.experience,
        license_no: formData.licenseNumber,
        license_expiry: formData.licenseExpiry,
        vehicle_make: formData.vehicleMake,
        vehicle_model: formData.vehicleModel,
        vehicle_type: formData.vehicleType,
        vehicle_reg_no: formData.vehicleRegistrationNumber,
        trainings: trainingsArray,
        company: formData.driversCompany,
      };

      const response = await flow_chain_backend.create_driver(payload);

      if (response.Ok) {
        toast.success("Driver created successfully!");
        navigate("/dashboard/driver");
      } else {
        console.error("Failed to create driver:", response.Err);
        toast.error("An unexpected error occurred.");
      }
    } catch (error) {
      console.error("Failed to create driver:", error);
      setMessage("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const isFormValid = Object.values(formData).every(
    (value) => value.trim() !== ""
  );

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full space-y-8 bg-white p-10 rounded-2xl shadow-lg relative">
        <button
          onClick={() => navigate("/")}
          className="absolute right-6 top-6 text-gray-400 hover:text-gray-600"
        >
          <X className="w-6 h-6" />
        </button>

        <div>
          <h2 className="text-center text-3xl font-bold text-gray-900">
            Driver Registration
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Please complete your profile to access the driver dashboard
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { name: "fullName", label: "Full Name", type: "text" },
              {
                name: "contactInformation",
                label: "Contact Information",
                type: "text",
              },
              {
                name: "experience",
                label: "Experience (in years)",
                type: "text",
              },
              { name: "licenseNumber", label: "License Number", type: "text" },
              {
                name: "licenseExpiry",
                label: "License Expiry Date",
                type: "date",
              },
              { name: "vehicleMake", label: "Vehicle Make", type: "text" },
              { name: "vehicleModel", label: "Vehicle Model", type: "text" },
              { name: "vehicleType", label: "Vehicle Type", type: "text" },
              {
                name: "vehicleRegistrationNumber",
                label: "Vehicle Registration Number",
                type: "text",
              },
              { name: "trainings", label: "Trainings", type: "text" },
              {
                name: "driversCompany",
                label: "Driver's Company",
                type: "text",
              },
            ].map((field) => (
              <div key={field.name}>
                <label
                  htmlFor={field.name}
                  className="block text-sm font-medium text-gray-700"
                >
                  {field.label}
                </label>
                <input
                  type={field.type}
                  name={field.name}
                  id={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  className={`mt-1 block w-full rounded-lg border ${
                    errors[field.name] ? "border-red-500" : "border-gray-300"
                  } px-3 py-2 shadow-sm focus:border-blue-900 focus:outline-none focus:ring-1 focus:ring-blue-900`}
                />
                {errors[field.name] && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors[field.name]}
                  </p>
                )}
              </div>
            ))}
          </div>

          <div>
            <button
              type="submit"
              disabled={!isFormValid || loading}
              className={`w-full flex justify-center py-3 px-4 rounded-full text-sm font-medium text-white ${
                isFormValid && !loading
                  ? "bg-blue-900 hover:bg-blue-800"
                  : "bg-gray-300 cursor-not-allowed"
              }`}
            >
              {loading ? "Submitting..." : "Save and Continue"}
            </button>
          </div>
        </form>

        {message && (
          <div className="mt-4 text-center text-sm text-gray-700">
            {message}
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
}
