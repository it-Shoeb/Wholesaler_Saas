import React, { useEffect, useState } from "react";
import api from "../../services/api";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import ActionBar from "../../components/ActionBar";

export default function OrderGet() {
  const [Response, setResponse] = useState([]);
  const [Page, setPage] = useState(1);
  const [Count, setCount] = useState(0);
  const [Document, setDocument] = useState(0);
  const [Loading, setLoading] = useState(false);

  useEffect(() => {
    fetchItems();
  }, [Page]);

  const fetchItems = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/order?limit=10&page=${Page}`);
      setResponse(response.data.data);
      console.log(response.data.data);
      setCount(
        Math.ceil(
          response.data.pagination.count / response.data.pagination.limit
        )
      );
      setDocument(response.data.pagination.count);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {console.log(Page)}
      <div className="wrapper bg-white sm:p-4 p-2 sm:min-h-[calc(100vh-85px)] min-h-[calc(100vh-70px)] flex flex-col rounded-2xl">
        <div className="inner-wrapper flex flex-col grow">
          {/* <div className="middle-wrapper">
            <div className="table-action-bar flex justify-between items-center px-1 md:px-4">
              <div className="search w-1/3">
                <input
                  type="text"
                  placeholder="Search..."
                  className="flex px-3 py-1 rounded-full w-full border"
                />
              </div>

              <div className="pagination flex items-center gap-2">
                <div className="pagination flex items-center gap-2">
                  <button className="px-3 py-1 bg-yellow-200 rounded-md hover:bg-yellow-100 focus:bg-yellow-100 cursor-pointer">
                    Export
                  </button>
                  <Link
                    to={"/order/create"}
                    className="px-3 py-1 bg-green-200 rounded-md hover:bg-green-100 focus:bg-green-100 cursor-pointer"
                  >
                    Create
                  </Link>
                </div>

                <hr className="border flex flex-col h-full py-3 mx-2 border-gray-300" />

                <div className="pages flex gap-2 items-center">
                  {Count}
                  <button
                    disabled={Page <= 1}
                    className="bg-green-300 rounded-md px-3 hover:bg-green-200 focus:bg-green-200"
                    onClick={(e) => {
                      setPage(Page - 1);
                    }}
                  >
                    &larr;
                  </button>
                  <p>{Page}</p>
                  <button
                    disabled={Page == Count}
                    className="bg-green-300 rounded-md px-3 hover:bg-green-200 focus:bg-green-200"
                    onClick={(e) => {
                      setPage(Page + 1);
                    }}
                  >
                    &rarr;
                  </button>
                </div>
              </div>
            </div>
          </div> */}

          <ActionBar title={"Order"} createRoute={"/order/create"} />

          <div className="bottom-wrapper overflow-auto [scrollbar-width:none] flex flex-col grow">
            <table className="w-full text-left md:text-[14px]">
              {/* <thead className="sticky top-0"> */}
              <thead className="">
                <tr className="">
                  <th className="text-center text-xs">Sr No</th>
                  <th className="text-left text-xs">Customer Name</th>
                  <th className="text-left text-xs">Customer Image</th>
                  <th className="text-left text-xs">Card Name</th>
                  <th className="text-left text-xs">Card Image</th>
                  <th className="text-left text-xs">Customer Number</th>
                  <th className="text-left text-xs">Quantity</th>
                  <th className="text-left text-xs">Proofing Date</th>
                  <th className="text-left text-xs">Delivery Date</th>
                  <th className="text-left text-xs">Total</th>
                  <th className="text-left text-xs">Advance</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {Response.map((item, index) => (
                  <tr
                    key={index}
                    className={index % 2 == 0 ? "bg-secondary" : "bg-white"}
                  >
                    <td className="px-2 text-center text-xs">{index + 1}</td>
                    <td className="px-2 text-left text-xs">
                      {item.customerName}
                    </td>
                    <td className="px-2 w-[80px]">
                      <div className="aspect-square w-full">
                        <img
                          // src={`https://invy-coral.vercel.app/${item.customer_id[0]?.customerImage[0]?.path}`}
                          src={`http://localhost:3000/${item.customer_id[0]?.customerImage[0]?.path}`}
                          alt=""
                          className="object-cover w-full"
                        />
                      </div>
                    </td>
                    <td className="px-2 text-left text-xs ">
                      {item.card[0].cardName}
                    </td>
                    <td className="px-2 w-[80px]">
                      <div className="aspect-square w-full">
                        <img
                          // src={`https://invy-coral.vercel.app/uploads/products/${item?.card[0]?.cardImage}`}
                          src={`http://localhost:3000/uploads/products/${item?.card[0]?.cardImage}`}
                          alt=""
                          className="object-cover w-full"
                        />
                      </div>
                    </td>
                    <td className="px-2 text-left text-xs ">
                      {item.customer_id[0].customerNumber}
                    </td>
                    <td className="px-2 text-left text-xs ">
                      {item?.card[0]?.quantity}
                    </td>
                    <td className="px-2 text-left text-xs ">
                      {item.ProfingDate?.slice(1, 10)}
                    </td>
                    <td className="px-2 text-left text-xs ">
                      {item.DeliveryDate?.slice(1, 10)}
                    </td>
                    <td className="px-2 text-left text-xs ">
                      {item.totalAmount}
                    </td>
                    <td className="px-2 text-left text-xs ">
                      {item.advanceAmount}
                    </td>
                    <td className="px-2 text-left text-xs w-0">
                      <div className="cta-wrapper flex gap-2">
                        <button
                          className="cursor-pointer hover:underline focus:underline py-1 px-2"
                          onClick={async (e) => {
                            const res = await api.delete(`/order/${item._id}`);
                            toast.success(res.data.message);
                            fetchItems();
                          }}
                        >
                          Del
                        </button>
                        <Link
                          to={`/order/update/${item._id}`}
                          className="cursor-pointer hover:underline focus:underline py-1 px-2"
                        >
                          Edit
                        </Link>

                        <Link
                          to={`/invoice/get/${item._id}`}
                          target="_blank"
                          className="cursor-pointer hover:underline focus:underline py-1 px-2"
                        >
                          Invoice
                        </Link>
                      </div>

                      {console.log("item:", item)}
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
