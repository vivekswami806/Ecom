import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../context/Authcontext";
import logo from "../../assets/logo.png";
import { AiOutlineShoppingCart } from "react-icons/ai";
import useCart from "../../hook/useCart";
function Header() {
  let [auth, setAuth] = useAuth();
  const [cart ,setCart] = useCart()
  const [isMenuOpen, setMenuOpen] = useState(false)
  function removeToken() {
    setAuth({
      token: null,
      user: "",
    });
  }
  function ToggleMenu(){
    setMenuOpen(!isMenuOpen)
  }
  let totalCartCount = cart.reduce((acc,item)=>{
  return acc +item.count
  },0)
 
  return (
    <>
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-1">
          <NavLink className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src={logo} className="h-24 w-full" alt="ecommlogo" />
          </NavLink>
          <button
            onClick={ToggleMenu}
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 "
            aria-controls="navbar-default"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="false"  fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
        </svg>
          </button>
          <div className={`${isMenuOpen?"block":"hidden"} w-full md:block md:w-auto`}  id="navbar-default">
            <ul className="font-medium flex flex-col p-2 md:p-0 mt-2  rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0  md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 ">
              <li>
                <NavLink
                  to="/"
                  className="block py-2 px-3 text-gray-900 bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500"
                  aria-current="page"
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/aboutpage"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  About
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/categorypage"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Category
                </NavLink>
              </li>
              {auth?.token ? (
                <>
                  <div className="dropdown">
                <button
                  className="  dropdown-toggle block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {auth.user.name}
                </button>
                <ul className="dropdown-menu">
                 
                  <li>
                    <Link to={auth.user.role == true? "/dashboard/admin":"/dashboard/user"} className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <NavLink
                      to="/"
                      className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                      onClick={removeToken}
                    >
                      Logout
                    </NavLink>
                  </li>
                </ul>
              </div>
                 
                </>
              ) : (
                <>
                  <li>
                    <NavLink
                      to="/signinpage"
                      className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                    >
                      Login
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      to="/signuppage"
                      className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                    >
                      Register
                    </NavLink>
                  </li>
                </>
              )}

            

              <li>
                <NavLink
                  to="/addtocart"
                  className=" flex relative  py-2 px-6  text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                > < AiOutlineShoppingCart className="" />
               <span className="badge bg-secondary"> {totalCartCount} </span>             
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;
