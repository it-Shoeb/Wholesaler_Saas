import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import api from "../../services/api.js";

export default function ProductGet() {
  const [Response, setResponse] = useState([]);
  const [Page, setPage] = useState(1);
  const [TotalPage, setTotalPage] = useState(1);
  const [Count, setCount] = useState(0);

  useEffect(() => {
    fetchData();
  }, [Page]);

  const fetchData = async () => {
    await api
      .get(`product?limit=10&page=${Page}`)
      .then((res) => {
        setResponse(res.data.data);
        setTotalPage(Math.ceil(res.data.count / 10));
        setCount(res.data.count);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteProduct = async (id) => {
    console.log(id);
    const response = await api.delete(`/product/${id}`);
    fetchData();
    toast.success(response.data.message);
  };

  const handlePagination = (res) => {
    res == "larr" ? setPage(Page - 1) : setPage(Page + 1);
  };

  return (
    <>
      <div className="wrapper bg-green-50 min-h-[calc(100vh-90px)] p-2">
        <div className="inner-wrapper">
          <div className="wrapper-top">
            <div className="product-overall-info flex">
              <div className="total w-full bg-green-100 p-4 flex items-center gap-4 rounded-lg m-4">
                <div className="count p-4 bg-white rounded-full font-bold">
                  {Count}
                </div>
                <h1 className="font-semibold">Total Product</h1>
              </div>
              <div className="total w-full bg-green-100 p-4 flex items-center gap-4 rounded-lg m-4">
                <div className="count p-4 bg-white rounded-full font-bold">
                  20
                </div>
                <h1 className="font-semibold">Overall Quantity</h1>
              </div>
            </div>
          </div>
          <div className="wrapper-bottom h-[35em] border-t-2 border-green-100">
            <div className="table-action-bar flex justify-between items-center mt-2 px-4">
              <div className="search w-1/3">
                <input
                  type="search"
                  placeholder="Search..."
                  name=""
                  id=""
                  className="border px-3 py-1 rounded-full w-full outline-none"
                />
              </div>
              <div className="pagination flex items-center gap-6 ">
                <div className="export px-3 py-1 bg-green-100 rounded-md">
                  Export
                </div>
                <Link
                  to={"/product/create"}
                  className="create px-3 py-1 bg-green-300 hover:bg-green-400 rounded-md"
                >
                  Create
                </Link>
                <div className="pagination flex gap-2 items-center font-bold">
                  <span> {TotalPage}</span>
                  <button
                    disabled={Page <= 1}
                    onClick={(e) => {
                      handlePagination("larr");
                    }}
                    className="bg-green-300 rounded-md px-3 py-1"
                  >
                    &larr;
                  </button>

                  <span> {Page}</span>

                  <button
                    disabled={Page >= TotalPage}
                    onClick={(e) => {
                      handlePagination("rarr");
                    }}
                    className="bg-green-300 rounded-md px-3 py-1"
                  >
                    &rarr;
                  </button>
                </div>
              </div>
            </div>
            <div className="list-of-products">
              <table className="w-full">
                <thead className="bg-green-50 border-b-2 border-green-200 sticky top-0">
                  <tr>
                    <th className="p-3 text-sm font-semibold tracking-wider text-center">
                      Sr No
                    </th>
                    <th className="p-3 text-sm font-semibold tracking-wider text-left">
                      Product Name
                    </th>
                    <th className="p-3 text-sm font-semibold tracking-wider text-left">
                      Product Price
                    </th>
                    <th className="p-3 text-sm font-semibold tracking-wider text-left">
                      Quantity
                    </th>
                    <th className="p-3 text-sm font-semibold tracking-wider text-left">
                      Size
                    </th>
                    <th className="p-3 text-sm font-semibold tracking-wider text-left">
                      image
                    </th>
                    <th className="p-3 text-sm font-semibold tracking-wider text-left">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {Response.map((res, index) => (
                    <tr
                      className={index % 2 == 0 ? "bg-green-100" : "bg-white"}
                      key={index}
                    >
                      <td className="text-sm text-center">
                        {index > 8 ? index + 1 : "0" + (index + 1)}
                      </td>
                      <td className="text-sm p-2">{res.title}</td>
                      <td className="text-sm p-2">{res.price}</td>
                      <td className="text-sm p-2">{res.available_stock}</td>
                      <td className="text-sm p-2">{res.size}</td>
                      <td className="text-sm p-2">{res.category}</td>
                      <td className="text-sm p-2 flex gap-4">
                        <Link
                          className="bg-red-200 hover:bg-red-50 px-2 py-1 rounded-md"
                          onClick={(e) => {
                            deleteProduct(res._id);
                            console.log("Del", res._id);
                          }}
                        >
                          Del
                        </Link>
                        <Link
                          to={`/product/update/${res._id}`}
                          className="bg-green-200 hover:bg-green-50 px-2 py-1 rounded-md"
                        >
                          Edit
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
