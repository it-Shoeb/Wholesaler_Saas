import React, { useEffect } from "react";
import { useState } from "react";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

import pagination from "../services/pagination";

export default function Pagination({ user, setUser, page }) {
  // const [Page, setPage] = useState(1);
  // const [PerPage, setPerPage] = useState(1);

  // const { pageWiseData, totalPage } = pagination(Page, PerPage, user);
  // const [TotalPage, setTotalPage] = useState(totalPage);

  // useEffect(() => {
  //   setUser(pageWiseData);
  // }, [Page]);

  return (
    <>
      {/* <div className="mt-auto flex items-center justify-between px-4 py-1 shadow hover:shadow-blue-400 rounded-full transition duration-300">
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
      </div> */}
    </>
  );
}
