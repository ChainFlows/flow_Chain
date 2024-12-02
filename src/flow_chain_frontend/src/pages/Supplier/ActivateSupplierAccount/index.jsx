import React, { useState } from "react";
import { createSupplyCompany } from "../../../utils/supplyCompany";

export default function ActivateSupplierAccount({ fetchSupplier }) {
  // usestate for name, bussiness_type; supplyChainype; address; email; phone; website; owner_name; reg_no; logo;

  const [name, setName] = useState("");
  const [bussiness_type, setbussiness_type] = useState("");
  const [supplyChainype, setSupplyChainype] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState("");
  const [owner_name, setowner_name] = useState("");
  const [supply_chain_type, setsupply_chain_type] = useState("");
  const [reg_no, setreg_no] = useState("");
  const [logo, setLogo] = useState("");

  let timerInSeconds = 0;

  const addSupplierInfo = async () => {
    try {
      const supplier = {
        name,
        bussiness_type,
        supplyChainype,
        address,
        email,
        phone,
        website,
        owner_name,
        supply_chain_type,
        reg_no,
        logo,
      };
      await createSupplyCompany(supplier).then((res) => {
        fetchSupplier();
      });

      // setInterval(() => {
      //   timerInSeconds += 1;

      //   if (timerInSeconds >= 2) {
      //     window.location.reload();
      //   }
      // }, 1000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div>
        <title>dApp Hackthon-Javascript</title>
        <meta
          name="description"
          content="Web site created using create-react-app"
        />
      </div>
      <div className="flex flex-col items-center justify-center w-full pb-[124px] gap-[31px] bg-white-A700_01 shadow-sm">
        <header className="flex justify-center items-center w-full p-[21px] bg-white-A700_01 shadow-xs" />
        <div className="flex flex-row justify-center w-full max-w-[1083px]">
          <div className="flex flex-col items-end justify-start w-full">
            <h1 className="mr-[473px]">Activate your supplier account</h1>
            <div className="flex flex-row justify-start items-start w-full mt-6 gap-[21px]">
              <div className="flex flex-col items-center justify-center w-[30%] pl-3.5 py-3.5 bg-white-A700_01 rounded-[12px]">
                <div className="flex flex-col items-start justify-start w-full mt-[3px] gap-px">
                  <div className="flex flex-row justify-start items-center gap-4">
                    <h1
                      size="3xl"
                      as="p"
                      className="flex justify-center items-center h-[28px] w-[28px] !text-gray-700_02 border-lime-500 border-2 border-solid bg-lime-500 text-shadow-ts1 text-center rounded-[50%]"
                    >
                      1
                    </h1>
                    <h1 size="4xl" as="p">
                      Verify your business
                    </h1>
                  </div>
                  <div className="flex flex-row justify-start items-center w-full gap-2.5">
                    <div className="flex flex-col items-start justify-start w-[87%]">
                      <button
                        color="lime_100"
                        className="gap-2 min-w-[254px] !rounded-[12px]"
                      >
                        Business Information
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-start justify-start w-[69%]">
                <button
                  color="gray_100_02"
                  size="17xl"
                  className="w-full gap-4 rounded-[24px]"
                >
                  Collecting this information to ensure the security and verify
                  your identity
                </button>
                <div className="flex flex-row justify-start items-start mt-[19px] ml-[3px] gap-3">
                  <h1 size="6xl" as="p" className="mt-1">
                    Business Information
                  </h1>
                </div>
                <div className="flex flex-row justify-start w-[92%] mt-3.5 ml-[3px] gap-6">
                  <div className="flex flex-col items-start justify-center w-[49%] gap-px">
                    <h1 size="3xl" as="p" className="mt-0.5 !text-gray-800">
                      Company name
                    </h1>
                    <input
                      type="text"
                      name="name"
                      placeholder="Company name"
                      className="w-full bg-green-50 p-2 rounded-md border border-gray-500 text-black"
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col items-start justify-center w-[49%] gap-px">
                    <h1 size="3xl" as="p" className="mt-0.5 !text-gray-800">
                      Owner Name
                    </h1>
                    <input
                      type="text"
                      name="bussiness_type"
                      placeholder="Business type"
                      className="w-full bg-green-50 p-2 rounded-md border border-gray-500 text-black"
                      onChange={(e) => setowner_name(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex flex-row justify-start items-center w-[92%] mt-4 ml-[3px] gap-[25px]">
                  <div className="flex flex-col items-start justify-start w-[49%] gap-[3px]">
                    <h1 size="3xl" as="p" className="!text-gray-800">
                      Phone number
                    </h1>
                    <div className="flex flex-row justify-center items-center w-full p-1.5 rounded-[12px]">
                      <div className="flex flex-row justify-start items-center w-[14%] gap-[7px]"></div>
                      <div className="h-[22px] w-px ml-[15px] bg-gray-400_02" />
                      <input
                        type="number"
                        name="phone"
                        placeholder="+25471234567"
                        className="w-full bg-green-50 p-2 rounded-md border border-gray-500 text-black"
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col items-start justify-start w-[49%] gap-[3px]">
                    <h1 size="3xl" as="p" className="!text-gray-800">
                      Email
                    </h1>
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      className="w-full bg-green-50 p-2 rounded-md border border-gray-500 text-black"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex flex-row justify-start w-[92%] mt-4 ml-[3px] gap-6">
                  <div className="flex flex-col items-start justify-start w-[49%] gap-[3px]">
                    <h1 size="3xl" as="p" className="!text-gray-800">
                      Address
                    </h1>
                    <input
                      type="text"
                      name="address"
                      placeholder="Address"
                      className="w-full bg-green-50 p-2 rounded-md border border-gray-500 text-black"
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col items-start justify-center w-[49%] gap-0.5">
                    <h1 size="3xl" as="p" className="mt-px !text-gray-800">
                      SupplyChainype
                    </h1>
                    <input
                      type="text"
                      name="supplyChainype"
                      placeholder="SupplyChainype"
                      className="w-full bg-green-50 p-2 rounded-md border border-gray-500 text-black"
                      onChange={(e) => setSupplyChainype(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex flex-row justify-start w-[92%] mt-4 ml-[3px] gap-6">
                  <div className="flex flex-col items-start justify-start w-[49%] gap-[3px]">
                    <h1 size="3xl" as="p" className="!text-gray-800">
                      Website
                    </h1>
                    <input
                      type="text"
                      name="website"
                      placeholder="Website"
                      className="w-full bg-green-50 p-2 rounded-md border border-gray-500 text-black"
                      onChange={(e) => setWebsite(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col items-start justify-center w-[49%] gap-px">
                    <h1 size="3xl" as="p" className="mt-0.5 !text-gray-800">
                      Registration Number
                    </h1>
                    <input
                      type="number"
                      name="reg_no"
                      placeholder="Registration Number"
                      className="w-full bg-green-50 p-2 rounded-md border border-gray-500 text-black"
                      onChange={(e) => setreg_no(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex flex-row justify-start w-[92%] mt-4 ml-[3px] gap-6">
                  <div className="flex flex-col items-start justify-center w-[49%] gap-px">
                    <h1 size="3xl" as="p" className="mt-0.5 !text-gray-800">
                      Business type
                    </h1>
                    <input
                      type="text"
                      name="bussiness_type"
                      placeholder="Business type"
                      className="w-full bg-green-50 p-2 rounded-md border border-gray-500 text-black"
                      onChange={(e) => setbussiness_type(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col items-start justify-center w-[49%] gap-px">
                    <h1 size="3xl" as="p" className="mt-0.5 !text-gray-800">
                      Logo Url
                    </h1>
                    <input
                      type="text"
                      name="logoUrl"
                      placeholder="https://example.com/logo.png"
                      className="w-full bg-green-50 p-2 rounded-md border border-gray-500 text-black"
                      onChange={(e) => setLogo(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex flex-col items-start justify-center w-[49%] gap-px">
                  <h1 size="3xl" as="p" className="mt-0.5 !text-gray-800">
                    supply_chain_type
                  </h1>
                  <input
                    type="text"
                    name="supply_chain_type"
                    placeholder="supply_chain type"
                    className="w-full bg-green-50 p-2 rounded-md border border-gray-500 text-black"
                    onChange={(e) => setsupply_chain_type(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="h-px w-[93%] mt-[50px] mr-[60px] bg-gray-100" />
            <button
              color="lime_700"
              size="9xl"
              className="mt-8 mr-[33px] gap-1.5 min-w-[153px] !rounded-[12px]"
              onClick={addSupplierInfo}
            >
              Save Details
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
