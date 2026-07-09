import React from "react";
import mylogo from "../assets/logo.png";
import { FiBell, FiSun, FiLogOut, FiMenu } from "react-icons/fi";
import { FaBars } from "react-icons/fa";
import { useState } from "react";
import MobileSidebar from "./sidebar/MobileSidebar";
import { useNavigate } from "react-router-dom";
import { logout } from "../utils/authService";

const Topbar = ({ userData, onMenuClick }) => {
  const navigate = useNavigate();
  const userName = userData?.username || "";
  const role = userData?.role || "";

  // Compute layout initials instantly on-the-fly without state hooks
  const initials = userName
    ? userName
        .split(" ")
        .map((part) => part[0])
        .join("")
        .toUpperCase()
        .substring(0, 2)
    : "";

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout process failed:", error);
    }
  };

  return (
    <>
      <div className="w-full h-[80px] bg-[#131921] text-white flex justify-between items-center px-4 lg:px-8 border-b sticky top-0 z-50 border-[#232f3e]">
        
        <div className="flex items-center gap-4">
          <button
              onClick={onMenuClick}
              className="rounded-lg bg-amazon-lightNavy p-3 text-amazon-surface lg:hidden"
            >
              <FaBars />
            </button>
          <img src={mylogo} alt="Logo" className="w-[100px] md:w-[120px] h-auto" />
          
          <div className="hidden lg:flex flex-col">
            <h2 className="text-sm font-bold text-white">Koda Dashboard</h2>
            <span className="text-xs text-[#febd69]">E-Commerce Admin Panel</span>
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-3">
          <button className="relative w-[35px] h-[35px] bg-[#232f3e] flex items-center justify-center rounded-full cursor-pointer">
            <FiBell size={18} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#febd69] rounded-full"></span>
          </button>
          <button className="w-[35px] h-[35px] bg-[#232f3e] flex items-center justify-center rounded-full cursor-pointer">
            <FiSun size={18} />
          </button>

          <div className="hidden sm:flex items-center gap-1.5 bg-[#232f3e] p-3 rounded-[20px] min-w-[80px] min-h-[36px]">
            {initials && (
              <div className="w-10 h-5 bg-gradient-to-br from-orange-300 via-orange-400 to-orange-500 text-white rounded-full flex items-center justify-center font-bold">
                {initials}
              </div>
            )}
            {userName && (
              <div className="hidden sm:flex flex-col items-start pr-1.5">
                <span className="text-xs font-medium text-white">{userName}</span>
                {role && (
                  <span className="text-[12px] text-amazon-textLight">{role}</span>
                )}
              </div>
            )}
          </div>

          <button 
          onClick={handleLogout}
          className="bg-[#f03a3a] text-white p-1.5 px-3 rounded-md flex items-center gap-1.5 text-xs md:text-sm cursor-pointer transition-all duration-200 hover:bg-[#d63434]"
        >
          <FiLogOut size={14} />
          <span className="hidden sm:inline">Logout</span>
        </button>
        </div>
      </div>
    </>
  );
};

export default Topbar;