import { useEffect } from "react";
import {
  deleteCustomer,
  getCustomers,
} from "../../services/customer/CustomerApi.jsx";
import { toast } from "react-toastify";
import { useState } from "react";
import { Link } from "react-router-dom";

import Pagination from "../../components/Pagination.jsx";
import ActionBar from "../../components/ActionBar.jsx";

import CustomerUpdate from "../../components/forms/customer/CustomerUpdate.jsx";

import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

import pagination from "../../services/pagination.js";
import { getCustomer } from "../../services/customer/CustomerApi.jsx";

export default function GetCustomers() {
  const [Customers, setCustomers] = useState([]);
  const [CustomerId, setCustomerId] = useState("");
  const [Page, setPage] = useState(1);
  const [TotalPage, setTotalPage] = useState(1);
  const [PerPage, setPerPage] = useState(5);
  const [Sidebar, setSidebar] = useState(false);

  useEffect(() => {
    fetchCustomers();
  }, [Page]);

  const fetchCustomers = async () => {
    const { data, error } = await getCustomers();

    if (error) {
      return toast.error(error);
    }

    const { pageWiseData, totalPage } = pagination(Page, PerPage, data);

    setTotalPage(totalPage);
    setCustomers(pageWiseData);
    toast.success(data.message);

    // console.log("Page, PerPage:", Page, PerPage);
    // console.log("startIndex, endIndex:", startIndex, endIndex);
    // console.log("TotalPage", TotalPage);
    // console.log("pageWise:", pageWise);

    // const pageWise = data.slice(startIndex, endIndex);
  };

  const handleDelete = async (e, id) => {
    const { error, data } = await deleteCustomer(id);
    if (error) {
      toast.error(error);
    }
    fetchCustomers();
    toast.success(data.message);
  };

  return (
    <>
      {console.log("CustomerId:", CustomerId)}
      <div className="wrapper flex flex-col min-h-[calc(100vh-84px)] rounded-2xl overflow-auto text-xs">
        <div className="inner-wrapper grow flex">
          <div className="customers flex lg:flex-row flex-col gap-2 grow relative">
            <div className="flex-3 flex flex-col rounded-2xl bg-white sm:p-4 p-2">
              <div className="mb-4">
                <ActionBar
                  title="Customers"
                  createRoute="/customer/create"
                  Sidebar={Sidebar}
                  setSidebar={setSidebar}
                  setData={setCustomers}
                  totalPages={setTotalPage}
                />
              </div>

              <div className="customer-lhs overflow-auto grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                {Customers?.map((customer) => (
                  <div className="card flex flex-col gap-2 p-2 shadow border-1 border-gray-300 rounded-md">
                    <div className="card-top flex w-full gap-2 items-center">
                      <div className="img-container  w-1/3">
                        <img
                          src={`https://invy-coral.vercel.app/uploads/customers/${customer.customerImage[0]?.filename}`}
                          alt=""
                          className="aspect-square object-cover"
                        />
                      </div>

                      <div className=" w-full">
                        <p>{customer.customerName}</p>
                        <p>{customer.customerEmail}</p>
                        <p>{customer.customerNumber}</p>
                      </div>
                    </div>

                    <div className="card-cta flex ">
                      <button
                        className="w-full hover:underline focus:underline focus:outline-0"
                        onClick={(e) => {
                          handleDelete(e, customer._id);
                        }}
                      >
                        Delete
                      </button>
                      <button
                        className="w-full hover:underline focus:underline focus:outline-0"
                        onClick={(e) => {
                          setCustomerId(customer._id);
                          setSidebar(true);
                        }}
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="wrapper mt-auto">
                {/* <Pagination
                  totalPage={TotalPage}
                  page={Page}
                  data={Customers}
                /> */}

                <div className="flex items-center justify-between px-4 py-1 shadow hover:shadow-blue-400 rounded-full transition duration-300">
                  <div className="pagination-lhs">
                    Page {Page <= 9 ? `0${Page}` : Page} of{" "}
                    {TotalPage <= 9 ? `0${TotalPage}` : TotalPage}
                  </div>

                  <div className="pagination-rhs flex items-center gap-4">
                    <button
                      className={`text-white p-2 rounded-md hover:bg-gray-700 cursor-pointer ${
                        Page <= 1 ? "bg-gray-500" : "bg-black"
                      }`}
                      disabled={Page <= 1}
                      onClick={(e) => {
                        setPage(Page - 1);
                      }}
                    >
                      <FiArrowLeft />
                    </button>
                    <p>{Page <= 9 ? `0${Page}` : Page}</p>
                    <button
                      className={`text-white p-2 rounded-md hover:bg-gray-700 cursor-pointer ${
                        Page >= TotalPage ? "bg-gray-500" : "bg-black"
                      }`}
                      disabled={Page >= TotalPage}
                      onClick={(e) => {
                        setPage(Page + 1);
                      }}
                    >
                      <FiArrowRight />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div
              className={`flex flex-col rounded-2xl bg-white sm:p-4 p-2 lg:static absolute bottom-0 w-full transition-all duration-1000 ease-in-out overflow-auto  ${
                Sidebar ? "flex-1" : "flex-0 opacity-0 sm:opacity-100"
              }`}
            >
              {Sidebar && (
                <div
                  className={`customer-lhs h-[calc(100vh-116px)] p-2`}
                >
                  <CustomerUpdate
                    CustomerId={CustomerId}
                    Sidebar={Sidebar}
                    setSidebar={setSidebar}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// import React, { useEffect, useState } from "react";
// import api from "../../services/api";
// import { Link, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import CreateAndUpdateForm from "../../components/forms/CreateAndUpdateForm.jsx";
// import { getCustomers } from "../../services/customer/CustomerApi.jsx";

//  const navigate = useNavigate();
//   const [Customer, setCustomer] = useState([]);
//   const [Loading, setLoading] = useState(true);
//   const [Search, setSearch] = useState("");
//   const [SearchActive, setSearchActive] = useState(false);

//   const fetchCustomer = async () => {
//     try {
//       const { data, error } = await getCustomers();

//       if (error) {
//         return toast.error(error);
//       }

//       console.log("data:", data);
//       setCustomer(data);
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSearch = async (e) => {
//     if (!e.target.value == "") {
//       setSearchActive(true);
//       console.log("e.target.value:", e.target.value);
//     }

//     setSearch(e.target.value);
//     try {
//       const response = (await api.get("/customer")).data;

//       const searchResult = response.filter((customer) =>
//         customer.customerName.toLowerCase().includes(Search.toLowerCase())
//       );

//       setCustomer(searchResult);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handelDelete = async (e, id) => {
//     const res = await api.delete(`customer/${id}`);
//     fetchCustomer();
//     toast.success(res.data.message);
//     navigate("/customer/get");
//   };

//   useEffect(() => {
//     fetchCustomer();
//   }, []);

// <>
//   {console.log(Customer)}
//   <div className="wrapper bg-green-50 sm:min-h-[calc(100vh-85px)] min-h-[calc(100vh-70px)] flex flex-col p-2">
//     <div className="inner-wrapper flex flex-col grow">
//       <div className="wrapper-top">
//         <div className="user-overall-info flex">
//           <div className="w-full bg-green-100 p-4 flex items-center gap-4 rounded-lg m-2">
//             <p className="p-4 bg-white rounded-full font-bold">
//               {Customer.length < 9
//                 ? "0" + Customer.length
//                 : Customer.length}
//             </p>
//             <p className="font-semibold">Total User</p>
//           </div>
//         </div>
//       </div>

//       <div className="wrapper-middle">
//         <div className="table-action-bar flex justify-between items-center px-1 md:px-4">
//           <div className="search w-1/3 px-3 py-1 rounded-full flex border items-center">
//             <input
//               type="text"
//               name=""
//               id=""
//               placeholder="Search..."
//               className="flex w-full focus:outline-none"
//               list="customerList"
//               value={Search}
//               onChange={(e) => {
//                 handleSearch(e);
//               }}
//             />
//             {SearchActive && (
//               <button
//                 className="font-bold cursor-pointer"
//                 onClick={(e) => {
//                   fetchCustomer();
//                   setSearch("");
//                   setSearchActive(false);
//                 }}
//               >
//                 X
//               </button>
//             )}
//           </div>

//           <datalist id="customerList">
//             {Customer.map((Customer) => (
//               <option value={Customer.customerName}>
//                 {Customer.customerName}
//               </option>
//             ))}
//           </datalist>

//           <div className="pagination flex items-center gap-2">
//             <div className="pagination flex items-center gap-2">
//               <p className="px-3 py-1 bg-yellow-200 rounded-md hover:bg-yellow-100 focus:bg-yellow-100 cursor-pointer">
//                 Export
//               </p>
//               <Link
//                 to={"/customer/create"}
//                 className="px-3 py-1 bg-green-200 rounded-md hover:bg-green-100 focus:bg-green-100 cursor-pointer"
//               >
//                 Create
//               </Link>
//             </div>

//             <hr className="border flex flex-col h-full py-3 mx-2 border-gray-300" />

//             <div className="pages flex gap-2 items-center">
//               {0}
//               <button className="bg-green-300 rounded-md px-3 hover:bg-green-200 focus:bg-green-200">
//                 &larr;
//               </button>
//               <p>{0}</p>
//               <button className="bg-green-300 rounded-md px-3 hover:bg-green-200 focus:bg-green-200">
//                 &rarr;
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="wrapper-bottom  overflow-auto [scrollbar-width:none] flex flex-col grow">
//         <table className="w-full text-left text-[10px] md:text-[14px]">
//           {/* <thead className="sticky top-0"> */}
//           <thead className="">
//             <tr>
//               <th className="p-3">Sr No</th>
//               <th className="p-3">Customer Name</th>
//               <th className="p-3">Email</th>
//               <th className="p-3">Number</th>
//               <th className="p-3 text-center">Image </th>
//               <th className="p-3 text-center">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {Customer.map((customer, index) => (
//               <tr
//                 key={index}
//                 className={index % 2 == 0 ? "bg-green-100" : "bg-white"}
//               >
//                 <td className="p-2">{index + 1}</td>
//                 <td className="p-2">{customer.customerName}</td>
//                 <td className="p-2">{customer.customerEmail}</td>
//                 <td className="p-2">{customer.customerNumber}</td>
//                 <td className="p-1 w-0.5 aspect-square">
//                   <div className="w-full h-full">
//                     <img
//                       src={`http://localhost:3000/uploads/customers/${customer.customerImage[0]?.filename}`}
//                       alt=""
//                       className="hover:scale-150 transition-all duration-500 ease-out w-full aspect-square object-cover"
//                     />
//                   </div>
//                 </td>
//                 <td className="p-2">
//                   <div className="flex gap-2 justify-center">
//                     <p
//                       onClick={async (e) => {
//                         handelDelete(e, customer._id);
//                       }}
//                       className="px-2 py-1 bg-red-200 rounded-md hover:bg-red-100 focus:bg-red-100 cursor-pointer"
//                     >
//                       Del
//                     </p>
//                     <Link
//                       className="px-2 py-1 bg-green-200 rounded-md hover:bg-green-100 focus:bg-green-100 cursor-pointer"
//                       to={`/customer/update/${customer._id}`}
//                     >
//                       Edit
//                     </Link>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//         {Loading ? (
//           <div className="flex flex-col grow item-center jusify-center">
//             <p className="font-bold text-xl grow flex items-center justify-center">
//               Loading...
//             </p>
//           </div>
//         ) : null}

//         {/* {!Response.length ? (
//           <p className="flex flex-col flex-grow items-center justify-center text-2xl text-gray-400">
//             Please Create Products{" "}
//             <Link
//               to={"/product/create"}
//               className="font-bold text-blue-700 cursor-pointer"
//             >
//               Create Product
//             </Link>
//           </p>
//         ) : null} */}
//       </div>
//     </div>
//   </div>
// </>
