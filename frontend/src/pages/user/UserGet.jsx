import React, { useEffect, useState } from "react";
import api from "../../services/api";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function UserGet() {
  const navigate = useNavigate();
  const [Customer, setCustomer] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [Search, setSearch] = useState("");
  const [SearchActive, setSearchActive] = useState(false);

  const fetchCustomer = async () => {
    try {
      setLoading(true);
      const response = await api.get("/customer");
      setCustomer(response.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    if (!e.target.value == "") {
      setSearchActive(true);
      console.log("e.target.value:", e.target.value);
    }

    setSearch(e.target.value);
    try {
      const response = (await api.get("/customer")).data.data;

      const searchResult = response.filter((customer) =>
        customer.customerName.toLowerCase().includes(Search.toLowerCase())
      );

      setCustomer(searchResult);
    } catch (error) {
      console.error(error);
    }
  };

  const handelDelete = async (e, id) => {
    const res = await api.delete(`customer/${id}`);
    fetchCustomer();
    toast.success(res.data.message);
    navigate("/customer/get");
  };

  useEffect(() => {
    fetchCustomer();
  }, []);

  return (
    <>
      {console.log(Customer)}
      <div className="wrapper bg-green-50 sm:min-h-[calc(100vh-85px)] min-h-[calc(100vh-70px)] flex flex-col p-2">
        <div className="inner-wrapper flex flex-col grow">
          <div className="wrapper-top">
            <div className="user-overall-info flex">
              <div className="w-full bg-green-100 p-4 flex items-center gap-4 rounded-lg m-2">
                <p className="p-4 bg-white rounded-full font-bold">
                  {Customer.length < 9
                    ? "0" + Customer.length
                    : Customer.length}
                </p>
                <p className="font-semibold">Total User</p>
              </div>
            </div>
          </div>

          <div className="wrapper-middle">
            <div className="table-action-bar flex justify-between items-center px-1 md:px-4">
              <div className="search w-1/3 px-3 py-1 rounded-full flex border items-center">
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder="Search..."
                  className="flex w-full focus:outline-none"
                  list="customerList"
                  value={Search}
                  onChange={(e) => {
                    handleSearch(e);
                  }}
                />
                {SearchActive && (
                  <button
                    className="font-bold cursor-pointer"
                    onClick={(e) => {
                      fetchCustomer();
                      setSearch("");
                      setSearchActive(false);
                    }}
                  >
                    X
                  </button>
                )}
              </div>

              <datalist id="customerList">
                {Customer.map((Customer) => (
                  <option value={Customer.customerName}>
                    {Customer.customerName}
                  </option>
                ))}
              </datalist>

              <div className="pagination flex items-center gap-2">
                <div className="pagination flex items-center gap-2">
                  <p className="px-3 py-1 bg-yellow-200 rounded-md hover:bg-yellow-100 focus:bg-yellow-100 cursor-pointer">
                    Export
                  </p>
                  <Link
                    to={"/customer/create"}
                    className="px-3 py-1 bg-green-200 rounded-md hover:bg-green-100 focus:bg-green-100 cursor-pointer"
                  >
                    Create
                  </Link>
                </div>

                <hr className="border flex flex-col h-full py-3 mx-2 border-gray-300" />

                <div className="pages flex gap-2 items-center">
                  {0}
                  <button className="bg-green-300 rounded-md px-3 hover:bg-green-200 focus:bg-green-200">
                    &larr;
                  </button>
                  <p>{0}</p>
                  <button className="bg-green-300 rounded-md px-3 hover:bg-green-200 focus:bg-green-200">
                    &rarr;
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="wrapper-bottom  overflow-auto [scrollbar-width:none] flex flex-col grow">
            <table className="w-full text-left text-[10px] md:text-[14px]">
              {/* <thead className="sticky top-0"> */}
              <thead className="">
                <tr>
                  <th className="p-3">Sr No</th>
                  <th className="p-3">Customer Name</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Number</th>
                  <th className="p-3 text-center">Image </th>
                  <th className="p-3 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {Customer.map((customer, index) => (
                  <tr
                    key={index}
                    className={index % 2 == 0 ? "bg-green-100" : "bg-white"}
                  >
                    <td className="p-2">{index + 1}</td>
                    <td className="p-2">{customer.customerName}</td>
                    <td className="p-2">{customer.customerEmail}</td>
                    <td className="p-2">{customer.customerNumber}</td>
                    <td className="p-1 w-0.5 aspect-square">
                      <div className="w-full h-full">
                        <img
                          src={`http://localhost:3000/uploads/customers/${customer.customerImage[0]?.filename}`}
                          alt=""
                          className="hover:scale-150 transition-all duration-500 ease-out w-full aspect-square object-cover"
                        />
                      </div>
                    </td>
                    <td className="p-2">
                      <div className="flex gap-2 justify-center">
                        <p
                          onClick={async (e) => {
                            handelDelete(e, customer._id);
                          }}
                          className="px-2 py-1 bg-red-200 rounded-md hover:bg-red-100 focus:bg-red-100 cursor-pointer"
                        >
                          Del
                        </p>
                        <Link
                          className="px-2 py-1 bg-green-200 rounded-md hover:bg-green-100 focus:bg-green-100 cursor-pointer"
                          to={`/customer/update/${customer._id}`}
                        >
                          Edit
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {Loading ? (
              <div className="flex flex-col grow item-center jusify-center">
                <p className="font-bold text-xl grow flex items-center justify-center">
                  Loading...
                </p>
              </div>
            ) : null}

            {/* {!Response.length ? (
              <p className="flex flex-col flex-grow items-center justify-center text-2xl text-gray-400">
                Please Create Products{" "}
                <Link
                  to={"/product/create"}
                  className="font-bold text-blue-700 cursor-pointer"
                >
                  Create Product
                </Link>
              </p>
            ) : null} */}
          </div>
        </div>
      </div>
    </>
  );
}
