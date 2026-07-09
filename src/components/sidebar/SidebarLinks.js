import { FaHome, FaShoppingCart, FaCog } from "react-icons/fa";
import { FiUsers, FiPackage, FiPlus, FiFileText } from "react-icons/fi";

export const sidebarLinks = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: FaHome,
  },
  {
    title: "Users",
    path: "/users",
    icon: FiUsers,
  },
  {
    title: "Products",
    path: "/products",
    icon: FiPackage,
  },
  {
    title: "Add Product",
    path: "/products/add",
    icon: FiPlus,
  },
  {
    title: "Orders",
    path: "/orders",
    icon: FiFileText,
  },
  {
    title: "Carts",
    path: "/cart",
    icon: FaShoppingCart,
  },
  {
    title: "Settings",
    path: "/settings",
    icon: FaCog,
  },
];
