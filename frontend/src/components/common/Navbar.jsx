import React from "react";

export default function Navbar() {
  return (
    <>
      <div className="wrapper bg-green-100">
        <div className="inner-wrapper flex flex-col">
          <div className="navbar flex justify-between py-1 border-b-1 border-gray-300 px-8 py-2">
            <div className="navbar-left ">
              <div className="logo-container">
                <a href="">Logo</a>
              </div>
            </div>
            <div className="navbar-center flex">
              <nav>
                <ul className="flex sm:gap-x-16 gap-x-4">
                  <li>
                    <a href="#">Home</a>
                  </li>
                  <li>
                    <a href="#">About</a>
                  </li>
                  <li>
                    <a href="#">Contact</a>
                  </li>
                </ul>
              </nav>
            </div>
            <div className="nav-bar-right flex sm:gap-x-8 gap-x-2">
              <button>a</button>
              <button>b</button>
            </div>
          </div>

          <div className="navbar-module py-1 px-8 py-2">
            <div className="mini-navbar-module">
              <ul className="flex sm:gap-x-16 gap-x-4 items-center justify-center">
                <li>
                  <a href=""> navlink</a>
                </li>
                <li>
                  <a href=""> navlink</a>
                </li>
                <li>
                  <a href=""> navlink</a>
                </li>
                <li>
                  <a href=""> navlink</a>
                </li>
                <li>
                  <a href=""> navlink</a>
                </li>
                <li>
                  <a href=""> navlink</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
