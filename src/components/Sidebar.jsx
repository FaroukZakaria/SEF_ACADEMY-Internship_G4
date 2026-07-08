 
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

import "./Sidebar.css";

export default function SideBar() {
    return (
        <div className="sidebar">
            <div>
                {/* Logo */}
                <div className="logo">
                    <p>COMMERCE</p>
                    <h2>Admin Panel</h2>
                </div>

                {/* Links */}
                <div className="sidebar-links">
                    <NavLink
                        to="/Home"
                        className={({ isActive }) =>
                            isActive ? "sidebar-link active" : "sidebar-link"
                        }
                    >
                        <FiHome />
                        <span>Dashboard</span>
                    </NavLink>

                    <NavLink
                        to="/users"
                        className={({ isActive }) =>
                            isActive ? "sidebar-link active" : "sidebar-link"
                        }
                    >
                        <FiUsers />
                        <span>Users</span>
                    </NavLink>

                    <NavLink
                        to="/products"
                        className={({ isActive }) =>
                            isActive ? "sidebar-link active" : "sidebar-link"
                        }
                    >
                        <AiFillProduct />
                        <span>Products</span>
                    </NavLink>

                    <NavLink
                        to="/add-product"
                        className={({ isActive }) =>
                            isActive ? "sidebar-link active" : "sidebar-link"
                        }
                    >
                        <FiPlus />
                        <span>Add Product</span>
                    </NavLink>

                    <NavLink
                        to="/orders"
                        className={({ isActive }) =>
                            isActive ? "sidebar-link active" : "sidebar-link"
                        }
                    >
                        <FiFileText />
                        <span>Orders</span>
                    </NavLink>

                    <NavLink
                        to="/carts"
                        className={({ isActive }) =>
                            isActive ? "sidebar-link active" : "sidebar-link"
                        }
                    >
                        <FiShoppingCart />
                        <span>Carts</span>
                    </NavLink>

                    <NavLink
                        to="/settings"
                        className={({ isActive }) =>
                            isActive ? "sidebar-link active" : "sidebar-link"
                        }
                    >
                        <FiSettings />
                        <span>Settings</span>
                    </NavLink>
                </div>
            </div>

            {/* Footer */}
            <div className="sidebar-footer">
                <div className="version-card">
                    <h4>LIVE</h4>
                    <p>Connected to the Commerce API</p>
                </div>
            </div>
        </div>)
}