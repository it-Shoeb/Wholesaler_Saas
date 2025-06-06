import React, { useState } from "react";
import { useEffect } from "react";

import { FiArrowLeft, FiArrowRight, FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom";
import { getCustomers } from "../services/customer/CustomerApi";
import pagination from "../services/pagination";

export default function ActionBar({
  title,
  createRoute,
  Sidebar,
  setSidebar,
  setData,
  totalPages,
}) {
  const [SearchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchCustomers();
  }, [SearchQuery]);

  const fetchCustomers = async () => {
    const { data, error } = await getCustomers();

    const response = data?.data?.filter((customers) => {
      return customers.customerName
        .toLowerCase()
        .includes(SearchQuery.toLowerCase());
    });

    console.log("response:", response);
    const { pageWiseData, totalPage } = pagination(1, 5, response);
    setData(pageWiseData);
    totalPages(totalPage);
  };

  console.log("Sidebar:", Sidebar);
  return (
    <>
      {console.log(SearchQuery)}
      <div className="flex justify-between items-center text-xs">
        <div className="action-bar-lhs flex items-center">
          <p className="text-lg">{title}</p>
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
                setSearchQuery(e.target.value);
              }}
            />
          </div>

          <div className="p-1 rounded-md bg-black text-white hover:bg-gray-700">
            <Link to={createRoute}>Create {title}</Link>
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
    </>
  );
}
