import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";

export default function InventoryItems() {
  const [Item, setItem] = useState([]);
  const [Page, setPage] = useState(1);
  const [TotalPage, setTotalPage] = useState(0);
  const [Count, setCount] = useState(0);

  useEffect(() => {
    fetchData();
  }, [Page]);

  const fetchData = async () => {
    try {
      const response = await api.get(`/inventory?limit=10&page=${Page}`);
      setItem(response.data.data);
      setTotalPage(
        Math.ceil(
          response.data.pagination.total / response.data.pagination.limit
        )
      );
      setCount(response.data.pagination.total);
    } catch (error) {
      console.error(error);
    }
  };

  const handlePagination = (arr) => {
    arr === "larr" ? setPage(Page - 1) : setPage(Page + 1);
  };

  return (
    <>
      <div className="wrapper bg-green-50 min-h-[calc(100vh-90px)]">
        <div className="inner-wrapper">
          <div className="wrapper-top">
            <div className="overall-info flex gap-4 p-4">
              <div className="info-card w-full flex rounded-2xl items-center gap-2 p-2 bg-green-100">
                <p className="p-6 rounded-full bg-white font-bold">20</p>
                <p className="font-semibold">Total Items</p>
              </div>

              <div className="info-card w-full flex rounded-2xl items-center gap-2 p-2 bg-green-100">
                <p className="p-6 rounded-full bg-white font-bold">
                  {Count > 9 ? Count : "0" + Count}
                </p>
                <p className="font-semibold">Total Items</p>
              </div>
            </div>
          </div>

          <div className="wrapper-middle p-2">
            <div className="items-actionBar flex justify-between items-center">
              <div className="search-field w-1/3">
                <input
                  className="rounded-md border px-2 py-1 w-full"
                  placeholder="Search..."
                  type="search"
                />
              </div>

              <div className="flex gap-4">
                <div className="cta flex gap-4">
                  <button className="px-3 py-1 rounded-md bg-yellow-200 cursor-pointer hover:bg-yellow-100 focus:bg-yellow-100">
                    Export
                  </button>
                  <Link
                    className="px-3 py-1 rounded-md bg-green-200 cursor-pointer hover:bg-green-100 focus:bg-green-100"
                    to={"/inventory/create"}
                  >
                    Create
                  </Link>
                </div>

                <div className="pagination flex gap-4 items-center">
                  {TotalPage}
                  <button
                    disabled={Page <= 1}
                    onClick={() => {
                      handlePagination("larr");
                    }}
                    className=" bg-green-200 px-2 flex items-center justify-center cursor-pointer hover:bg-green-100 focus:bg-green-100"
                  >
                    &larr;
                  </button>

                  {Page}

                  <button
                    disabled={Page >= TotalPage}
                    onClick={() => {
                      handlePagination("rarr");
                    }}
                    className=" bg-green-200 px-2 flex items-center justify-center cursor-pointer hover:bg-green-100 focus:bg-green-100"
                  >
                    &rarr;
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="wrapper-bottom p-2 mt-2 text-sm">
            <table className="w-full">
              <thead>
                <tr className="bg-green-200">
                  <th className="text-left p-2 tracking-wider">Sr No</th>
                  <th className="text-left p-2 tracking-wider w-1/2">
                    Item Name
                  </th>
                  <th className="text-left p-2 tracking-wider">Item Price</th>
                  <th className="text-left p-2 tracking-wider">Stock</th>
                  <th className="text-left p-2 tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody>
                {Item.map((res, index) => (
                  <tr key={index}>
                    <td className="text-left p-2 tracking-wider">
                      {index + 1}
                    </td>
                    <td className="text-left p-2 tracking-wider">
                      {res.itemName}
                    </td>
                    <td className="text-left p-2 tracking-wider">
                      {res.itemPrice}
                    </td>
                    <td className="text-left p-2 tracking-wider">
                      {res.currentStock}
                    </td>
                    <td className="text-left p-2 tracking-wider flex items-center gap-4">
                      <p
                        className="px-2 py-1 rounded-md bg-red-200 hover:bg-red-100 cursor-pointer"
                        onClick={async (e) => {
                          await api.delete(`/inventory/${res._id}`);
                          fetchData();
                        }}
                      >
                        Del
                      </p>
                      <Link
                        to={`/inventory/update/${res._id}`}
                        className="px-2 py-1 rounded-md bg-green-200 hover:bg-green-100 cursor-pointer"
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
    </>
  );
}
