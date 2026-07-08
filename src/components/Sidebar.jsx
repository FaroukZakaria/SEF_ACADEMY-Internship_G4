import {
  FiHome,
  FiUsers,
  FiPlus,
  FiFileText,
  FiShoppingCart,
  FiSettings,
} from "react-icons/fi";

import { AiFillProduct } from "react-icons/ai";
import { NavLink } from "react-router-dom";

export default function SideBar() {
  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 rounded-xl px-4 py-3 text-white transition-all duration-300 hover:bg-amazon-navy hover:translate-x-1 ${
      isActive ? "bg-amazon-navy border-l-4 border-amazon-orange shadow-lg" : ""
    }`;

  return (
    <div className="fixed left-0 top-0 flex h-screen w-72 flex-col bg-amazon-lightNavy px-5 text-white">
      <div>
        {/* Logo */}
        <div className="my-9">
          <p className="mb-1 text-[11px] uppercase tracking-[4px] text-amazon-blue">
            COMMERCE
          </p>

          <h2 className="text-2xl font-bold">Admin Panel</h2>
        </div>

        {/* Links */}
        <div className="flex flex-col gap-2">
          <NavLink to="/Home" className={linkClass}>
            <FiHome className="text-lg" />
            <span>Dashboard</span>
          </NavLink>

          <NavLink to="/users" className={linkClass}>
            <FiUsers className="text-lg" />
            <span>Users</span>
          </NavLink>

          <NavLink to="/products" className={linkClass}>
            <AiFillProduct className="text-lg" />
            <span>Products</span>
          </NavLink>

          <NavLink to="/add-product" className={linkClass}>
            <FiPlus className="text-lg" />
            <span>Add Product</span>
          </NavLink>

          <NavLink to="/orders" className={linkClass}>
            <FiFileText className="text-lg" />
            <span>Orders</span>
          </NavLink>

          <NavLink to="/carts" className={linkClass}>
            <FiShoppingCart className="text-lg" />
            <span>Carts</span>
          </NavLink>

          <NavLink to="/settings" className={linkClass}>
            <FiSettings className="text-lg" />
            <span>Settings</span>
          </NavLink>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-auto pb-5">
        <div className="cursor-pointer rounded-2xl bg-gradient-to-br from-amazon-blue to-amazon-orange p-[18px] shadow-lg">
          <h4 className="mb-1.5 text-[15px] font-semibold">LIVE</h4>

          <p className="text-sm leading-6 text-white">
            Connected to the Commerce API
          </p>
        </div>
      </div>
    </div>
  );
}

