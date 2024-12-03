import React, { useState } from "react";
import { Link } from "react-router-dom";
// import { createClientCompany } from "../../../utils/clientCompany";
// import { Img, Text, Button, Header } from "../../../components/utils";
// import * as Images from "../../../assets/images";

import { flow_chain_backend } from "../../../../../declarations/flow_chain_backend";

export default function ActivateClientAccount({ fetchClient }) {
  // usestate for name, bussinessType; industry; address; email; phone; website; ownerName; regNo; logo;

  const [name, setName] = useState("");
  const [bussinessType, setBussinessType] = useState("");
  const [industry, setIndustry] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [regNo, setRegNo] = useState("");
  const [logo, setLogo] = useState("");

  let timerInSeconds = 0;

  const addClientInfo = async () => {
    try {
      const client = {
        name,
        bussinessType,
        industry,
        address,
        email,
        phone,
        website,
        ownerName,
        regNo,
        logo,
      };
      await flow_chain_backend.create_client_company(client)
      .then((res) => {
        fetchClient();
      });

      // setInterval(() => {
      //   timerInSeconds += 1;

      //   if (timerInSeconds >= 1) {
      //     window.location.reload();
      //   }
      // }, 1000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center h-full">
        <div className="w-full max-w-md">
          <div className="flex items-center justify-center mb-8">
            {/* <img src={Images.Logo} alt="logo" className="w-16 h-16" /> */}
          </div>
          <h1 className="text-2xl font-semibold text-center mb-4">Activate your client account</h1>
          <p className="text-gray-500 text-center mb-8">Please provide the following information to activate your client account.</p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              addClientInfo();
            }}
          >
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="bussinessType" className="block text-sm font-medium text-gray-700">Bussiness Type</label>
              <input
                type="text"
                id="bussinessType"
                value={bussinessType}
                onChange={(e) => setBussinessType(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="industry" className="block text-sm font-medium text-gray-700">Industry</label>
              <input
                type="text"
                id="industry"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div >
            <div className="mb-4">
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
              <input
                type="text"
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
              <input
                type="text"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="website" className="block text-sm font-medium text-gray-700">Website</label>
              <input
                type="text"
                id="website"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="ownerName" className="block text-sm font-medium text-gray-700">Owner Name</label>
              <input
                type="text"
                id="ownerName"
                value={ownerName}
                onChange={(e) => setOwnerName(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="regNo" className="block text-sm font-medium text-gray-700">Reg No</label>
              <input
                type="text"
                id="regNo"
                value={regNo}
                onChange={(e) => setRegNo(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="logo" className="block text-sm font-medium text-gray-700">Logo</label>
              <input
                type="text"
                id="logo"
                value={logo}
                onChange={(e) => setLogo(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="mt-6">
              <button
                type="submit"
                className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Activate Account
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
