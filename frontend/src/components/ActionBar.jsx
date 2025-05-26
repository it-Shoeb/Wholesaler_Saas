import React from "react";

import { FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function ActionBar({ title, createRoute }) {
  return (
    <>
      <div className="flex justify-between items-center">
        <div className="action-bar-lhs flex items-center">
          <p className="text-lg">{title}</p>
        </div>
        <div className="action-bar-rhs flex items-center gap-2">
          <div className="flex items-center gap-2 flex-nowrap border p-1 rounded-md">
            <FiSearch />
            <input
              type="search"
              name="seachQuery"
              id=""
              placeholder="Seach Something"
            />
          </div>

          <div className="p-1 rounded-md bg-black text-white hover:bg-gray-700">
            <Link to={createRoute}>Create {title}</Link>
          </div>
        </div>
      </div>
    </>
  );
}
