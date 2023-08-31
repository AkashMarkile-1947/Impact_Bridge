import React, { useEffect, useState } from "react";
import NavbarBtn from "./NavbarBtn";
import { Link, useNavigate } from "react-router-dom";
import "./navbar.css";

export default function Nav({ color, toggle }) {
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  const [ShowUserProfile, setUserProfile] = useState(false);
  const navigate = useNavigate();

  const loginData = JSON.parse(sessionStorage.getItem("login-data"));
  const ngoLogin = sessionStorage.getItem("ngo-login");

  useEffect(() => {
    if (loginData || ngoLogin) {
      setUserProfile((prev) => true);
    }
  }, [loginData, ngoLogin]);


  const userProfile = () => {
    if (loginData) {
      if (loginData.isAdmin) {
        navigate("../admin-dashboard", { replace: true });
      } else {
        navigate("../dashboard", { replace: true });
      }
    } else if (ngoLogin) {
      navigate("ngo-dashboard", { replace: true });
    }
  };
  


  const Logout = () => {
    if (loginData) {
      sessionStorage.removeItem("login-data"); // Remove the item from sessionStorage
    }
    if (ngoLogin) {
      sessionStorage.removeItem("ngo-login"); // Remove the item from sessionStorage
    }
    setUserProfile(() => false);
    navigate("../", { replace: true });
  };

  return (
    <>
      <nav
        className={`relative flex flex-wrap items-center sticky top-0 nav justify-between px-2 py-3 ${
          color ? "bg-transparent" : "navbar-color"
        } mb-3`}
      >
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <Link
              className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white"
              to="/"
            >
              ImpactBridge
            </Link>

            <NavbarBtn />
            <button
              className="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block inline md:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <i className="fas fa-bars"></i>
            </button>
            { 
            ShowUserProfile ?
            <div className="self-end flex">
            <a
              className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75 ml-2 border rounded-md"
              href="#pablo"
              onClick={userProfile}
            >
              <i className="fa-solid fa-user text-lg leading-lg text-white opacity-75"></i>
              <span className="ml-2">USER</span>
            </a>

            <a
              className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75 border rounded-md ml-2"
              href="#pablo"
              onClick={Logout}
            >
              <span className="ml-2">Logout</span>
            </a>
            </div> : null
            }
          </div>
        </div>
      </nav>
    </>
  );
}
