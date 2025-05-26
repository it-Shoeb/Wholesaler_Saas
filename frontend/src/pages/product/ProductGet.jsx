import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import { FaArrowLeft } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa6";

import { HiMiniMagnifyingGlass } from "react-icons/hi2";
import { TbArrowsSort } from "react-icons/tb";

import api from "../../services/api.js";
import {
  deleteProduct,
  getProduct,
  getProducts,
  putProduct,
} from "../../services/product.js";
import pagination from "../../services/pagination.js";
// import '../../App.css'

export default function ProductGet() {
  const [Products, setProducts] = useState([]);

  const [SearchQuery, setSearchQuery] = useState("");
  const [Page, setPage] = useState(1);
  const [TotalPage, setTotalPage] = useState(1);
  const [ProductPerPage, setProductPerPage] = useState(5);
  const [Loading, setLoading] = useState(true);

  const [Product, setProduct] = useState({
    available_stock: "",
    category: "",
    description: "",
    images: "",
    price: "",
    size: "",
    status: "",
    title: "",
    video_demo_url: "",
  });

  const [Image, setImage] = useState([]);

  const [Sidebar, setSidebar] = useState(false);

  const handelDelete = async (e, id) => {
    const { data, error } = await deleteProduct(id);
    console.log(" data, error:", data, error);
    if (error) {
      toast.error(error);
    }
    fetchProduct();
    toast.success(data.message);
  };

  const fetchProduct = async () => {
    const { error, data } = await getProducts();

    if (error) {
      toast.error(error);
      setLoading(false);
      return;
    }

    const { pageWiseData, totalPage } = pagination(Page, ProductPerPage, data);

    setTotalPage(totalPage);
    setProducts(pageWiseData);

    // setProducts(data.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchProduct();
  }, [Page]);

  const handelEdit = async (e, id) => {
    try {
      const { data, error } = await getProduct(id);
      if (error) {
        toast.error(error);
        return;
      }
      setProduct(data.data);
      setImage(data.data.images);
    } catch (error) {
      console.error(error);
    }
  };

  const handelFormData = (e) => {
    const { name, type, value, files, checked } = e.target;
    // console.log('e.target:', e)
    console.log("{name, type, value, files, check}:", {
      name,
      type,
      value,
      files,
      checked,
    });

    let newValue;
    if (name === "images") {
      newValue = files[0];
    } else if (name === "status") {
      newValue = checked;
    } else {
      newValue = value;
    }

    setProduct({ ...Product, [name]: newValue });
  };

  const handleForm = async (e) => {
    try {
      e.preventDefault();
      const data = await putProduct(Product._id, Product);
      console.log("data:", data);
      // const { data } = await api.put(`/product/${Product._id}`, {
      //   ...Product,
      // });
      // console.log("Product:", Product);
      fetchProduct();
      toast.success(data.message);
      setSidebar(false);
    } catch (error) {
      console.error(error);
    }
  };

  const searchQuery = async (e) => {
    setSearchQuery(e.target.value);

    if (e.target.value == "") {
      return fetchProduct();
    }

    const { error, data } = await getProducts();

    const products = data.filter((product) => {
      return product.title.toLowerCase().includes(e.target.value.toLowerCase());
    });

    const { pageWiseData, totalPage } = pagination(
      Page,
      ProductPerPage,
      products
    );

    setTotalPage(totalPage);
    setProducts(pageWiseData);
  };

  Loading ? <p>Loading...</p> : null;

  return (
    <>
      {/* {console.log(Products)} */}
      <div className="wrapper sm:min-h-[calc(100vh-85px)] min-h-[calc(100vh-70px)] flex flex-col">
        <div className="inner-wrapper grow">
          <div className="products grow flex sm:flex-row flex-col relative gap-2">
            <div className="left-container flex-3 transition-all duration-1000 sm:p-4 p-2 bg-white rounded-2xl flex flex-col gap-2">
              <div className="function-bar flex justify-between items-center mb-2">
                <p>Products</p>

                <div className="flex items-center gap-2 h-full">
                  <div className="flex justify-center items-center h-full border px-2 rounded-md">
                    <div className="">
                      <HiMiniMagnifyingGlass className="" />
                    </div>
                    <div className="">
                      <input
                        type="search"
                        name="search"
                        id=""
                        className="px-2 text-xs h-full focus:outline-none"
                        placeholder="search your product"
                        value={SearchQuery}
                        onChange={(e) => {
                          searchQuery(e);
                        }}
                      />
                    </div>
                  </div>
                  <div className="border">
                    <TbArrowsSort />
                  </div>

                  <Link
                    to={"/product/create"}
                    className="text-xs border p-1 rounded-md font-semibold bg-black text-white"
                  >
                    Create Product
                  </Link>
                  {Sidebar && (
                    <div
                      className="cursor-pointer"
                      onClick={() => setSidebar(!Sidebar)}
                    >
                      <FaArrowRight />
                    </div>
                  )}
                </div>
              </div>

              {/* scrolling from here */}
              <div className="item-grid grid max-[260px]:grid-cols-1 max-[769px]:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 sm:gap-4 gap-2 items-start sm:h-[calc(100vh-210px)] h-[calc(100vh-200px)] overflow-auto relative [scrollbar-width:none]">
                {Products.map((product) => (
                  <div
                    className={`card p-2 flex flex-col max-[480px]:text-[8px] text-xs rounded-xl shadow ${
                      !product.status || product.available_stock <= 0
                        ? "bg-red-50"
                        : ""
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
                      <button
                        className="w-full hover:font-semibold hover:underline"
                        onClick={(e) => {
                          handelDelete(e, product._id);
                        }}
                      >
                        Delete
                      </button>
                      {/* <button className="bg-green-100 hover:bg-green-200 focus:bg-green-200 focus:outline-none rounded-sm px-2 py-1 w-full"> */}
                      <button
                        className="w-full hover:font-semibold hover:underline"
                        onClick={(e) => {
                          handelEdit(e, product._id);
                          setSidebar(true);
                        }}
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pagination-bar flex justify-between items-center text-xs rounded-full px-4 py-1 bg-[#ffffff99] shadow">
                <p className="pages p-2">
                  Page {Page < 9 ? `0${Page}` : Page} of{" "}
                  {TotalPage < 9 ? `0${TotalPage}` : TotalPage}
                </p>
                <div className="pagination flex gap-2">
                  <button
                    className={`left shadow p-2 flex items-center justify-center rounded-md ${
                      Page == 1 ? "bg-secondary" : ""
                    }`}
                    disabled={Page == 1}
                    onClick={(e) => {
                      setPage(Page - 1);
                    }}
                  >
                    <FaArrowLeft />
                  </button>
                  <p
                    className={`p-2 flex items-center justify-center bg-black text-white rounded-md `}
                  >
                    {Page < 9 ? `0${Page}` : Page}
                  </p>
                  <button
                    className={`right shadow p-2 flex items-center justify-center rounded-md ${
                      Page == TotalPage ? "bg-secondary" : ""
                    }`}
                    disabled={Page == TotalPage}
                    onClick={(e) => {
                      setPage(Page + 1);
                    }}
                  >
                    <FaArrowRight />
                  </button>
                </div>
              </div>
            </div>

            {/* can center as pop up form */}
            <div
              className={`right-container bg-white rounded-2xl transition-all duration-1000 ease-in-out xl:static absolute bottom-0 w-full flex flex-col sm:p-4 px-2 py-4 overflow-auto ${
                Sidebar ? "flex-1" : "flex-0 opacity-0 sm:opacity-100"
              } `}
            >
              {Sidebar && (
                <>
                  <div className="product-heading">
                    <p>Product View and Update</p>
                  </div>

                  <div className="form-container bg-white flex flex-col h-full text-xs">
                    <form
                      action=""
                      className="flex flex-col items-center justify-between h-full gap-4"
                      onSubmit={(e) => {
                        handleForm(e);
                      }}
                    >
                      <div className="relative w-[40%] aspect-square overflow-hidden mt-4 rounded-xl">
                        <input
                          type="file"
                          id=""
                          className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                          title="click to change a image"
                          name="images"
                          onChange={(e) => {
                            handelFormData(e);
                          }}
                        />

                        <img
                          src={`http://localhost:3000/uploads/products/${Image[0]?.filename}`}
                          alt=""
                          className="w-full h-full object-cover shadow-2xs"
                        />
                      </div>

                      <div className="form-input flex flex-col w-full gap-2">
                        <div className="w-full flex flex-col">
                          <label htmlFor="">Name:{` `}</label>
                          <input
                            type="text"
                            className="border p-2 rounded-md text-gray-400"
                            placeholder="Enter Product Name"
                            value={Product.title}
                            name="title"
                            onChange={(e) => {
                              handelFormData(e);
                            }}
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
                            value={Product.category}
                            name="category"
                            onChange={(e) => {
                              handelFormData(e);
                            }}
                          />
                        </div>
                        <div className="w-full flex flex-col">
                          <label htmlFor="">Stock:{` `}</label>
                          <input
                            type="text"
                            className="border p-2 rounded-md text-gray-400"
                            placeholder="Enter Product Available Stock"
                            value={Product.available_stock}
                            name="available_stock"
                            onChange={(e) => {
                              handelFormData(e);
                            }}
                          />
                        </div>
                        <div className="w-full flex flex-col">
                          <label htmlFor="">Description:{` `}</label>
                          <input
                            type="text"
                            className="border p-2 rounded-md text-gray-400"
                            placeholder="Enter Product Description"
                            value={Product.description}
                            name="description"
                            onChange={(e) => {
                              handelFormData(e);
                            }}
                          />
                        </div>
                        <div className="w-full flex flex-col">
                          <label htmlFor="">Price:{` `}</label>
                          <input
                            type="text"
                            className="border p-2 rounded-md text-gray-400"
                            placeholder="Enter Product Price"
                            value={Product.price}
                            name="price"
                            onChange={(e) => {
                              handelFormData(e);
                            }}
                          />
                        </div>
                        <div className="w-full flex flex-col">
                          <label htmlFor="">Size:{` `}</label>
                          <input
                            type="text"
                            className="border p-2 rounded-md text-gray-400"
                            placeholder="Enter Product Size"
                            value={Product.size}
                            name="size"
                            onChange={(e) => {
                              handelFormData(e);
                            }}
                          />
                        </div>
                        <div className="w-full flex flex-col items-start">
                          <label htmlFor="">Status:{` `}</label>
                          <input
                            type="checkbox"
                            className="border p-2 rounded-md text-gray-400 ml-2"
                            placeholder="Enter Product Status"
                            checked={Product.status}
                            name="status"
                            onChange={(e) => {
                              handelFormData(e);
                            }}
                          />
                        </div>
                      </div>
                      <div className="form-cta flex w-full items-center gap-2">
                        <button
                          className="border p-1 w-full rounded-md cursor-pointer"
                          onClick={(e) => setSidebar(false)}
                        >
                          Discard
                        </button>

                        <input
                          type="submit"
                          value="update"
                          className="border p-1 w-full rounded-md cursor-pointer"
                        />
                      </div>
                    </form>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// {Response.map((product) => (
//
// ))}

// const [Response, setResponse] = useState([]);
// const [AllResponse, setAllResponse] = useState([]);
// const [Page, setPage] = useState(1);
// const [TotalPage, setTotalPage] = useState(1);
// const [Count, setCount] = useState(0);
// const [Loading, setLoading] = useState(false);

// useEffect(() => {
//   fetchData();

// }, [Page]);

// const fetchData = async () => {
//   try {
//     setLoading(true);
//     await api.get(`product?limit=10&page=${Page}`).then((res) => {
//       setResponse(res.data.data);
//       setTotalPage(Math.ceil(res.data.count / 10));
//       setCount(res.data.count);
//     });
//   } catch (error) {
//     console.error(error);
//   } finally {
//     setLoading(false);
//   }

//   const response = await api.get("/product");
//   setAllResponse(response.data.data);
// };

// const deleteProduct = async (id) => {
//   const response = await api.delete(`/product/${id}`);
//   fetchData();
//   toast.success(response.data.message);
// };

// const handlePagination = (res) => {
//   res == "larr" ? setPage(Page - 1) : setPage(Page + 1);
// };

// const [SearchInput, setSearchInput] = useState("");
// const [isSearchActive, setIsSearchActive] = useState(false);

// const filterData = (e) => {
//   setSearchInput(e.target.value);
// };

// const filterTable = (e) => {
//   e.preventDefault();

//   if (!SearchInput.trim()) {
//     fetchData();
//     return;
//   }

//   setIsSearchActive(true);
//   const filter = AllResponse.filter((item) =>
//     item.title.toLowerCase().includes(SearchInput.toLowerCase())
//   );

//   setPage(1);
//   const limit = 10;
//   const start = (Page - 1) * limit;

//   setResponse(filter);
//   setTotalPage(1);
//   setCount(filter.length);
// };

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
