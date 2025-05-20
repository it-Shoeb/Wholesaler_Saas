import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import { FaArrowLeft } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa6";

import { HiMiniMagnifyingGlass } from "react-icons/hi2";
import { TbArrowsSort } from "react-icons/tb";

import api from "../../services/api.js";
// import '../../App.css'

export default function ProductGet() {
  const [Response, setResponse] = useState([]);
  const [AllResponse, setAllResponse] = useState([]);
  const [Page, setPage] = useState(1);
  const [TotalPage, setTotalPage] = useState(1);
  const [Count, setCount] = useState(0);
  const [Loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, [Page]);

  const fetchData = async () => {
    try {
      setLoading(true);
      await api.get(`product?limit=10&page=${Page}`).then((res) => {
        setResponse(res.data.data);
        setTotalPage(Math.ceil(res.data.count / 10));
        setCount(res.data.count);
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }

    const response = await api.get("/product");
    setAllResponse(response.data.data);
  };

  const deleteProduct = async (id) => {
    const response = await api.delete(`/product/${id}`);
    fetchData();
    toast.success(response.data.message);
  };

  const handlePagination = (res) => {
    res == "larr" ? setPage(Page - 1) : setPage(Page + 1);
  };

  const [SearchInput, setSearchInput] = useState("");
  const [isSearchActive, setIsSearchActive] = useState(false);

  const filterData = (e) => {
    setSearchInput(e.target.value);
  };

  const filterTable = (e) => {
    e.preventDefault();

    if (!SearchInput.trim()) {
      fetchData();
      return;
    }

    setIsSearchActive(true);
    const filter = AllResponse.filter((item) =>
      item.title.toLowerCase().includes(SearchInput.toLowerCase())
    );

    setPage(1);
    const limit = 10;
    const start = (Page - 1) * limit;

    setResponse(filter);
    setTotalPage(1);
    setCount(filter.length);
  };

  return (
    <>
      {console.log(Response)}
      <div className="wrapper sm:min-h-[calc(100vh-85px)] min-h-[calc(100vh-70px)] flex flex-col p-2">
        <div className="inner-wrapper">
          <div className="products grow flex sm:flex-row flex-col relative gap-2">
            <div className="left-container flex-3 transition-all duration-1000 sm:p-4 p-2 bg-white rounded-2xl">
              <div className="function-bar flex justify-between items-center mb-2">
                <p>Prodcuts</p>
                <div className="flex gap-2 items-center border">
                  <div claborderssName="rounded-md items-center px-2 py-2 bg-white border">
                    <input
                      type="search"
                      name=""
                      id=""
                      className="px-2 text-xs h-full focus:outline-none border"
                      placeholder="search your product"
                    />
                    <div className="">
                      <HiMiniMagnifyingGlass className="border" />
                    </div>
                  </div>
                  {/* <TbArrowsSort /> */}
                </div>
              </div>

              {/* scrolling from here */}
              <div className="item-grid grid max-[260px]:grid-cols-1 max-[769px]:grid-cols-2 md:grid-cols-3 xl:grid-cols-7 sm:gap-4 gap-2 items-start sm:h-[calc(100vh-160px)] h-[calc(100vh-130px)] overflow-auto relative [scrollbar-width:none]">
                {Response.map((product) => (
                  <div
                    className={`card p-2 flex flex-col max-[480px]:text-[8px] text-xs rounded-xl shadow ${
                      product.status || product.available_stock < 0
                        ? ""
                        : "bg-red-50"
                    }`}
                  >
                    <div className="card-top w-full rounded-2xl overflow-hidden">
                      <img
                        src={`http://localhost:3000/uploads/products/${product.images[0].filename}`}
                        alt=""
                        className="w-full h-full` aspect-square object-cover"
                      />
                    </div>
                    <div className="card-center my-2 flex flex-col gap-2">
                      <p className="title truncate" title={product.title}>
                        <strong>{product.title}</strong>
                      </p>
                      <p className="title">
                        Rupess: <strong>{product.price}</strong>
                      </p>
                      <div className="flex justify-between">
                        <p>
                          stock: <strong>{product.available_stock}</strong>
                        </p>
                        <p>
                          status:{" "}
                          <strong>
                            {product.status ? "Enable" : "Disable"}
                          </strong>
                        </p>
                      </div>
                    </div>

                    <div className="card-bottom flex justify-between gap-1">
                      {/* <button className="bg-red-100 hover:bg-red-200 focus:bg-red-200 focus:outline-none rounded-sm px-2 py-1 w-full"> */}
                      <button className="w-full hover:font-semibold hover:underline">
                        Delete
                      </button>
                      {/* <button className="bg-green-100 hover:bg-green-200 focus:bg-green-200 focus:outline-none rounded-sm px-2 py-1 w-full"> */}
                      <button className="w-full hover:font-semibold hover:underline">
                        Edit
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pagination-bar flex justify-between items-center text-xs rounded-full px-4 py-2 bg-[#ffffffab] absolute sm:translate-x-[22%] max-[480px]:right-0 bottom-2 sm:w-1/2 w-full">
                <p className="pages p-2">
                  Page {"01"} of {10}
                </p>
                <div className="pagination flex gap-2">
                  <button className="left shadow p-2 flex items-center justify-center rounded-md">
                    <FaArrowLeft />
                  </button>
                  <p className=" p-2 flex items-center justify-center bg-black text-white rounded-md">
                    01
                  </p>
                  <button className="right shadow p-2 flex items-center justify-center rounded-md">
                    <FaArrowRight />
                  </button>
                </div>
              </div>
            </div>

            {/* can center as pop up form */}
            <div className="right-container bg-white rounded-2xl flex-1 transition-all duration-1000 xl:static absolute bottom-0 w-full flex flex-col sm:p-4 p-2 border">
              <div className="product-heading">
                <p>Product View and Update</p>
              </div>

              <div className="form-container bg-white flex flex-col h-full text-xs">
                <form
                  action=""
                  className="flex flex-col items-center justify-between h-full"
                >
                  <div className="relative w-1/3 mt-4">
                    <input
                      type="file"
                      name=""
                      id=""
                      className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                      title="click to change a image"
                    />

                    <img
                      src={`http://localhost:3000/uploads/products/${Response[0]?.images[0]?.filename}`}
                      alt=""
                      className="w-full h-full object-contain shadow-2xs"
                    />
                  </div>

                  <div className="form-input flex flex-col w-full gap-2">
                    <div className="w-full flex flex-col">
                      <label htmlFor="">Name:{` `}</label>
                      <input
                        type="text"
                        className="border p-2 rounded-md text-gray-400"
                        placeholder="Enter Product Name"
                      />
                    </div>
                    <div className="w-full flex flex-col">
                      <label htmlFor="">Code:{` `}</label>
                      <input
                        type="text"
                        className="border p-2 rounded-md text-gray-400"
                        placeholder="Enter Product Code"
                        disabled
                      />
                    </div>
                    <div className="w-full flex flex-col">
                      <label htmlFor="">Category:{` `}</label>
                      <input
                        type="text"
                        className="border p-2 rounded-md text-gray-400"
                        placeholder="Enter Product Category"
                      />
                    </div>
                    <div className="w-full flex flex-col">
                      <label htmlFor="">Stock:{` `}</label>
                      <input
                        type="text"
                        className="border p-2 rounded-md text-gray-400"
                        placeholder="Enter Product Available Stock"
                      />
                    </div>
                    <div className="w-full flex flex-col">
                      <label htmlFor="">Description:{` `}</label>
                      <input
                        type="text"
                        className="border p-2 rounded-md text-gray-400"
                        placeholder="Enter Product Description"
                      />
                    </div>
                    <div className="w-full flex flex-col">
                      <label htmlFor="">Price:{` `}</label>
                      <input
                        type="text"
                        className="border p-2 rounded-md text-gray-400"
                        placeholder="Enter Product Price"
                      />
                    </div>
                    <div className="w-full flex flex-col">
                      <label htmlFor="">Size:{` `}</label>
                      <input
                        type="text"
                        className="border p-2 rounded-md text-gray-400"
                        placeholder="Enter Product Size"
                      />
                    </div>
                    <div className="w-full flex flex-col items-start">
                      <label htmlFor="">Status:{` `}</label>
                      <input
                        type="checkbox"
                        className="border p-2 rounded-md text-gray-400 ml-2"
                        placeholder="Enter Product Status"
                      />
                    </div>
                  </div>
                  <div className="form-cta flex w-full items-center border gap-2">
                    <button className="border p-1 w-full rounded-md">
                      Discard
                    </button>
                    <button className="border p-1 w-full rounded-md">
                      Update
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// <div className="inner-wrapper flex flex-col grow">
//   <div className="wrapper-top">
//     <div className="product-overall-info flex">
//       <div className="total w-full bg-green-100 p-4 flex items-center gap-4 rounded-lg m-2">
//         <p className="p-4 bg-white rounded-full font-bold">
//           {Count < 9 ? "0" + Count : Count}
//         </p>
//         <p className="font-semibold">Total Product</p>
//       </div>
//     </div>
//   </div>

//   <div className="wrapper-middle">
//     <div className="table-action-bar flex justify-between items-center px-1 md:px-4">
//       <div className="search w-1/3">
//         <form
//           action=""
//           onSubmit={(e) => {
//             filterTable(e);
//           }}
//           className=border"flex border px-3 py-1 rounded-full"
//         >
//           <input
//             list="products"
//             type="text"
//             placeholder="Search..."
//             name=""
//             id=""
//             className="outline-none w-full"
//             value={SearchInput}
//             onChange={(e) => {
//               filterData(e);
//             }}
//           />

//           <Link
//             onClick={(e) => {
//               setSearchInput("");
//               setIsSearchActive(false);
//               fetchData();
//             }}
//             className={isSearchActive ? "visible" : "invisible"}
//           >
//             X
//           </Link>
//         </form>
//         <datalist id="products">
//           {AllResponse.map((res, index) => (
//             <option key={index} value={res.title} />
//           ))}
//         </datalist>
//       </div>

//       <div className="pagination flex items-center gap-2">
//         <div className="px-3 py-1 bg-yellow-200 rounded-md hover:bg-yellow-100 focus:bg-yellow-100 cursor-pointer">
//           Export
//         </div>
//         <Link
//           to={"/product/create"}
//           className="px-3 py-1 bg-green-200 rounded-md hover:bg-green-100 focus:bg-green-100 cursor-pointer"
//         >
//           Create
//         </Link>

//         <hr className="border flex flex-col h-full py-3 mx-2 border-gray-300" />

//         <div className="pages flex gap-2 items-center">
//           <span> {TotalPage}</span>
//           <button
//             disabled={Page <= 1}
//             onClick={(e) => {
//               handlePagination("larr");
//             }}
//             className="bg-green-300 rounded-md px-3 hover:bg-green-200 focus:bg-green-200"
//           >
//             &larr;
//           </button>

//           <span> {Page}</span>

//           <button
//             disabled={Page >= TotalPage}
//             onClick={(e) => {
//               handlePagination("rarr");
//             }}
//             className="bg-green-300 rounded-md px-3 hover:bg-green-200 focus:bg-green-200"
//           >
//             &rarr;
//           </button>
//         </div>
//       </div>
//     </div>
//   </div>

//   <div className="list-of-products  overflow-auto [scrollbar-width:none] flex flex-col grow">
//     <table className="w-full text-left text-[10px] md:text-[14px]">
//       {/* <thead className="sticky top-0"> */}
//       <thead className="">
//         <tr className="">
//           <th
//             className="p-3 text-center"
//             onClick={(e) => console.log("Sr No", e)}
//           >
//             Sr No
//           </th>
//           <th
//             className="p-3 text-left"
//             onClick={(e) => console.log("Product Name", e)}
//           >
//             Product Name
//           </th>
//           <th
//             className="p-3 text-left"
//             onClick={(e) => console.log("Price", e)}
//           >
//             Price
//           </th>
//           <th
//             className="p-3 text-left"
//             onClick={(e) => console.log("Quantity", e)}
//           >
//             Quantity
//           </th>
//           <th
//             className="p-3 text-left"
//             onClick={(e) => console.log("Size", e)}
//           >
//             Size
//           </th>
//           <th
//             className="p-3 text-center"
//             onClick={(e) => console.log("image", e)}
//           >
//             image
//           </th>
//           <th
//             className="p-3 text-center"
//             onClick={(e) => console.log("Action", e)}
//           >
//             Action
//           </th>
//         </tr>
//       </thead>
//       <tbody className="">
//         {Response.map((res, index) => (
//           <tr
//             className={index % 2 == 0 ? "bg-green-100" : "bg-white"}
//             key={index}
//           >
//             <td className="px-2 py-5 text-center">
//               {index > 8 ? index + 1 : "0" + (index + 1)}
//             </td>
//             <td className="px-2 py-5">{res.title}</td>
//             <td className="px-2 py-5">{res.price}</td>
//             <td className="px-2 py-5">{res.available_stock}</td>
//             <td className="px-2 py-5">{res.size}</td>
//             <td className="p-1 w-0.5">
//               <div className="w-full h-full">
//                 <img
//                   src={`http://localhost:3000/uploads/products/${res.images[0].filename}`}
//                   alt={res.images[0].filename}
//                   className="w-full aspect-square hover:scale-150 transition-all duration-500 ease-out object-cover"
//                 />
//               </div>
//             </td>
//             <td className="px-2 py-5 flex gap-2 flex-wrap itexs-center justify-center">
//               <Link
//                 className="px-2 py-1 bg-red-200 rounded-md hover:bg-red-100 focus:bg-red-100 cursor-pointer"
//                 onClick={(e) => {
//                   deleteProduct(res._id);
//                   console.log("Del", res._id);
//                 }}
//               >
//                 Del
//               </Link>
//               <Link
//                 to={`/product/update/${res._id}`}
//                 className="px-2 py-1 bg-green-200 rounded-md hover:bg-green-100 focus:bg-green-100 cursor-pointer"
//               >
//                 Edit
//               </Link>
//             </td>
//           </tr>
//         ))}
//       </tbody>
//     </table>

//     {Loading ? (
//       <div className="flex flex-col grow item-center jusify-center">
//         <p className="font-bold text-xl grow flex items-center justify-center">
//           Loading...
//         </p>
//       </div>
//     ) : null}

//     {/* {!Response.length ? (
//       <p className="flex flex-col flex-grow items-center justify-center text-2xl text-gray-400">
//         Please Create Products{" "}
//         <Link
//           to={"/product/create"}
//           className="font-bold text-blue-700 cursor-pointer"
//         >
//           Create Product
//         </Link>
//       </p>
//     ) : null} */}
//   </div>
// </div>
