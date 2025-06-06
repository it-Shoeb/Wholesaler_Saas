import { useEffect, useState } from "react";
import api from "../../services/api";
import ActionBar from "../../components/ActionBar";
import Pagination from "../../components/Pagination";
import { toast } from "react-toastify";
import { FiArrowLeft, FiArrowRight, FiSearch } from "react-icons/fi";
import pagination from "../../services/pagination";
import CustomerUpdate from "../../components/forms/customer/CustomerUpdate";

import FormBase from "../../components/common/FormBase";
import FormInput from "../../components/common/FormInput";
import { Link } from "react-router-dom";

import useForm from "../../services/hook/useForm";

export default function UserGet() {
  const [Users, setUsers] = useState([]);
  const [User, setUser] = useState({
    email: "",
    role: "",
    username: "",
  });

  const [Sidebar, setSidebar] = useState(false);
  const [SearchQuery, setSearchQuery] = useState("");

  const [Page, setPage] = useState(1);
  const [TotalPage, setTotalPage] = useState(1);
  const [PerPage, setPerPage] = useState(1);

  const [Loading, setLoading] = useState(true);

  const { Values, handleChange, resetForm, setValues } = useForm(User);

  useEffect(() => {
    fetchUsers();
  }, [Page, User]);

  const fetchUsers = async () => {
    try {
      const { data } = await api.get("/user");
      console.log("data:", data.data);
      const { pageWiseData, totalPage } = pagination(Page, PerPage, data.data);
      setUsers(pageWiseData);
      setTotalPage(totalPage);
      setLoading(false);
    } catch (error) {
      toast.error(error);
      setLoading(false);
    }
  };

  const handelDelete = async (e, id) => {
    try {
      const { data } = await api.delete(`/user/${id}`);
      console.log("data:", data.message);
      toast.success(data.message);
    } catch (error) {
      toast.error(error);
    }
  };

  const handelEdit = async (e, id) => {
    try {
      const { data } = await api.get(`/user/${id}`);
      console.log("data:", data.data);
      // setUser(data.data);
      setValues(data.data);
    } catch (error) {
      toast.error(error);
    }
  };

  const handleForm = async (e) => {
    try {
      e.preventDefault();
      const respone = await api.post(`/user/${Values._id}`, { ...Values });
      console.log("respone:", respone);
      toast.success(respone.message);
      fetchUsers();
    } catch (error) {
      console.log("error:", error);
      toast.error(error);
    }
  };

  const handelSeachQuery = async (e) => {
    try {
      setSearchQuery(e.target.value);
      const response = await api.get("/user");
      console.log("response.data.data:", response.data.data);

      const data = response.data.data.filter((user) => {
        return user.username.toLowerCase().includes(e.target.value);
      });

      setPage(1);
      setPerPage(1);
      const { pageWiseData, totalPage } = pagination(Page, PerPage, data);

      setTotalPage(totalPage);
      setUsers(pageWiseData);
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <>
      {console.log(User)}
      <div className="wrapper h-[calc(100vh-84px)] text-xs">
        <div className="inner-wrapper h-full flex gap-4">
          <div className="user-left bg-white sm:p-4 p-2 rounded-2xl flex-3 flex flex-col">
            {/* <ActionBar
              title={"User"}
              createRoute={"/users/create"}
              Sidebar={Sidebar}
              setSidebar={setSidebar}
              totalPages={TotalPage}
              setData={setUsers}
            /> */}

            <div className="flex justify-between items-center text-xs">
              <div className="action-bar-lhs flex items-center">
                <p className="text-lg">User</p>
              </div>
              <div className="action-bar-rhs flex items-center gap-2">
                <div className="flex items-center gap-2 flex-nowrap border p-1 rounded-md border-gray-100 focus:border">
                  <FiSearch />
                  <input
                    type="search"
                    name="seachQuery"
                    id=""
                    className="focus:outline-0"
                    placeholder="Seach Something"
                    value={SearchQuery}
                    onChange={(e) => {
                      handelSeachQuery(e);
                    }}
                  />
                </div>

                <div className="p-1 rounded-md bg-black text-white hover:bg-gray-700">
                  <Link to={"/user/create"}>Create User</Link>
                </div>

                {Sidebar && (
                  <div
                    className="max-lg:hidden block"
                    onClick={(e) => {
                      setSidebar(false);
                    }}
                  >
                    <FiArrowRight />
                  </div>
                )}
              </div>
            </div>

            <div className="users text-xs">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="text-center py-2">Sr</th>
                    <th className="text-left py-2">Username</th>
                    <th className="text-left py-2">Email</th>
                    <th className="text-left py-2">Role</th>
                    <th className="text-center py-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {Users.map((user, index) => (
                    <tr
                      className={`${
                        index % 2 == 0 ? "bg-secondary" : "bg-white"
                      }`}
                    >
                      <td className="text-center py-2">{index + 1}</td>
                      <td className="text-left py-2">{user.username}</td>
                      <td className="text-left py-2">{user.email}</td>
                      <td className="text-left py-2">{user.role}</td>
                      <td className="text-center py-2">
                        <div className="flex gap-4 justify-center">
                          <button
                            onClick={(e) => {
                              handelDelete(e, user._id);
                            }}
                            className="hover:underline focus:underline"
                          >
                            Delete
                          </button>
                          <button
                            onClick={(e) => {
                              handelEdit(e, user._id);
                              setSidebar(true);
                            }}
                            className="hover:underline focus:underline"
                          >
                            Edit
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {Loading ? (
              <div className="flex flex-col grow item-center jusify-center">
                <p className="font-bold text-xl grow flex items-center justify-center">
                  Loading...
                </p>
              </div>
            ) : null}

            <div className="mt-auto flex items-center justify-between px-4 py-1 shadow hover:shadow-blue-400 rounded-full transition duration-300">
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

            {/* <Pagination user={Users} setUser={setUsers} /> */}
          </div>

          <div
            className={`user-right bg-white sm:p-4 p-2 rounded-2xl transition-all duration-1000 ease-in-out overflow-auto ${
              Sidebar ? "flex-1" : "flex-0 opacity-0 sm:opacity-100"
            }`}
          >
            {Sidebar && (
              <FormBase title={"Update User"} onSubmit={handleForm}>
                <FormInput
                  label={"Enter Username"}
                  placeholder="Enter username"
                  value={Values.username}
                  name={"username"}
                  onChange={handleChange}
                />

                <FormInput
                  label={"Enter Email"}
                  placeholder="Enter email"
                  value={Values.email}
                  name={"email"}
                  onChange={handleChange}
                />

                <div className="flex items-center gap-4 mt-auto">
                  <Link
                    className="p-2 bg-secondary hover:bg-gray-100 focus:outline-0 focus:bg-gray-100 rounded-md w-full text-center"
                    onClick={(e) => {
                      setSidebar(false);
                    }}
                  >
                    Discard
                  </Link>
                  <input
                    className="p-2 bg-secondary hover:bg-gray-100 focus:outline-0 focus:bg-gray-100 rounded-md w-full"
                    type="submit"
                    value="Update User"
                  />
                </div>
              </FormBase>
            )}
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
// import ActionBar from "../../components/ActionBar";
// import Pagination from "../../components/Pagination";

// const navigate = useNavigate();
// const [Customer, setCustomer] = useState([]);
// const [Loading, setLoading] = useState(false);
// const [Search, setSearch] = useState("");
// const [SearchActive, setSearchActive] = useState(false);

// const fetchCustomer = async () => {
//   try {
//     setLoading(true);
//     const response = await api.get("/customer");
//     setCustomer(response.data.data);
//   } catch (error) {
//     console.error(error);
//   } finally {
//     setLoading(false);
//   }
// };

// const handleSearch = async (e) => {
//   if (!e.target.value == "") {
//     setSearchActive(true);
//     console.log("e.target.value:", e.target.value);
//   }

//   setSearch(e.target.value);
//   try {
//     const response = (await api.get("/customer")).data.data;

//     const searchResult = response.filter((customer) =>
//       customer.customerName.toLowerCase().includes(Search.toLowerCase())
//     );

//     setCustomer(searchResult);
//   } catch (error) {
//     console.error(error);
//   }
// };

// const handelDelete = async (e, id) => {
//   const res = await api.delete(`customer/${id}`);
//   fetchCustomer();
//   toast.success(res.data.message);
//   navigate("/customer/get");
// };

// useEffect(() => {
//   fetchCustomer();
// }, []);

// {console.log(Customer)}
// <div className="wrapper bg-green-50 sm:min-h-[calc(100vh-85px)] min-h-[calc(100vh-70px)] flex flex-col p-2">
//   <div className="inner-wrapper flex flex-col grow">
//     <div className="wrapper-top">
//       <div className="user-overall-info flex">
//         <div className="w-full bg-green-100 p-4 flex items-center gap-4 rounded-lg m-2">
//           <p className="p-4 bg-white rounded-full font-bold">
//             {Customer.length < 9
//               ? "0" + Customer.length
//               : Customer.length}
//           </p>
//           <p className="font-semibold">Total User</p>
//         </div>
//       </div>
//     </div>

//     <div className="wrapper-middle">
//       <div className="table-action-bar flex justify-between items-center px-1 md:px-4">
//         <div className="search w-1/3 px-3 py-1 rounded-full flex border items-center">
//           <input
//             type="text"
//             name=""
//             id=""
//             placeholder="Search..."
//             className="flex w-full focus:outline-none"
//             list="customerList"
//             value={Search}
//             onChange={(e) => {
//               handleSearch(e);
//             }}
//           />
//           {SearchActive && (
//             <button
//               className="font-bold cursor-pointer"
//               onClick={(e) => {
//                 fetchCustomer();
//                 setSearch("");
//                 setSearchActive(false);
//               }}
//             >
//               X
//             </button>
//           )}
//         </div>

//         <datalist id="customerList">
//           {Customer.map((Customer) => (
//             <option value={Customer.customerName}>
//               {Customer.customerName}
//             </option>
//           ))}
//         </datalist>

//         <div className="pagination flex items-center gap-2">
//           <div className="pagination flex items-center gap-2">
//             <p className="px-3 py-1 bg-yellow-200 rounded-md hover:bg-yellow-100 focus:bg-yellow-100 cursor-pointer">
//               Export
//             </p>
//             <Link
//               to={"/customer/create"}
//               className="px-3 py-1 bg-green-200 rounded-md hover:bg-green-100 focus:bg-green-100 cursor-pointer"
//             >
//               Create
//             </Link>
//           </div>

//           <hr className="border flex flex-col h-full py-3 mx-2 border-gray-300" />

//           <div className="pages flex gap-2 items-center">
//             {0}
//             <button className="bg-green-300 rounded-md px-3 hover:bg-green-200 focus:bg-green-200">
//               &larr;
//             </button>
//             <p>{0}</p>
//             <button className="bg-green-300 rounded-md px-3 hover:bg-green-200 focus:bg-green-200">
//               &rarr;
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>

//     <div className="wrapper-bottom  overflow-auto [scrollbar-width:none] flex flex-col grow">
//       <table className="w-full text-left text-[10px] md:text-[14px]">
//         {/* <thead className="sticky top-0"> */}
//         <thead className="">
//           <tr>
//             <th className="p-3">Sr No</th>
//             <th className="p-3">Customer Name</th>
//             <th className="p-3">Email</th>
//             <th className="p-3">Number</th>
//             <th className="p-3 text-center">Image </th>
//             <th className="p-3 text-center">Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {Customer.map((customer, index) => (
//             <tr
//               key={index}
//               className={index % 2 == 0 ? "bg-green-100" : "bg-white"}
//             >
//               <td className="p-2">{index + 1}</td>
//               <td className="p-2">{customer.customerName}</td>
//               <td className="p-2">{customer.customerEmail}</td>
//               <td className="p-2">{customer.customerNumber}</td>
//               <td className="p-1 w-0.5 aspect-square">
//                 <div className="w-full h-full">
//                   <img
//                     src={`http://localhost:3000/uploads/customers/${customer.customerImage[0]?.filename}`}
//                     alt=""
//                     className="hover:scale-150 transition-all duration-500 ease-out w-full aspect-square object-cover"
//                   />
//                 </div>
//               </td>
//               <td className="p-2">
//                 <div className="flex gap-2 justify-center">
//                   <p
//                     onClick={async (e) => {
//                       handelDelete(e, customer._id);
//                     }}
//                     className="px-2 py-1 bg-red-200 rounded-md hover:bg-red-100 focus:bg-red-100 cursor-pointer"
//                   >
//                     Del
//                   </p>
//                   <Link
//                     className="px-2 py-1 bg-green-200 rounded-md hover:bg-green-100 focus:bg-green-100 cursor-pointer"
//                     to={`/customer/update/${customer._id}`}
//                   >
//                     Edit
//                   </Link>
//                 </div>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       {Loading ? (
//         <div className="flex flex-col grow item-center jusify-center">
//           <p className="font-bold text-xl grow flex items-center justify-center">
//             Loading...
//           </p>
//         </div>
//       ) : null}

//       {/* {!Response.length ? (
//         <p className="flex flex-col flex-grow items-center justify-center text-2xl text-gray-400">
//           Please Create Products{" "}
//           <Link
//             to={"/product/create"}
//             className="font-bold text-blue-700 cursor-pointer"
//           >
//             Create Product
//           </Link>
//         </p>
//       ) : null} */}
//     </div>
//   </div>
// </div>
