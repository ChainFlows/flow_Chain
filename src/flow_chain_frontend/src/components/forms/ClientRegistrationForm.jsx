import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { flow_chain_backend } from "../../../../declarations/flow_chain_backend";

export default function ClientRegistrationForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    businessType: "",
    industry: "",
    address: "",
    email: "",
    phone: "",
    website: "",
    ownerName: "",
    regNo: "",
    logo: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

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

    try {
      const payload = {
        name: formData.name,
        bussiness_type: formData.businessType,
        industry: formData.industry,
        address: formData.address,
        email: formData.email,
        phone: formData.phone,
        website: formData.website,
        owner_name: formData.ownerName,
        reg_no: formData.regNo,
        logo: formData.logo,
      };

      const response = await flow_chain_backend.create_client_company(payload);

      if (response.Ok) {
        toast.success("Client company created successfully!");
        navigate("/dashboard/client");
      } else {
        console.error("Failed to create client company:", response.Err);
        toast.error("An unexpected error occurred.");
      }
    } catch (error) {
      console.error("Failed to create client company:", error);
      toast.error("An unexpected error occurred.");
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
            Client Registration
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Please complete your profile to access the client dashboard
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { name: "name", label: "Company Name", type: "text" },
              { name: "businessType", label: "Business Type", type: "text" },
              { name: "industry", label: "Industry", type: "text" },
              { name: "address", label: "Address", type: "text" },
              { name: "email", label: "Email", type: "email" },
              { name: "phone", label: "Phone", type: "tel" },
              { name: "website", label: "Website", type: "url" },
              { name: "ownerName", label: "Owner Name", type: "text" },
              { name: "regNo", label: "Registration Number", type: "text" },
              { name: "logo", label: "Logo URL", type: "url" },
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
      </div>
      <ToastContainer />
    </div>
  );
}
