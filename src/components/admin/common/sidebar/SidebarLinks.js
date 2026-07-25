import { FaHome, FaShoppingCart, FaCog } from "react-icons/fa";
import { FiUsers, FiPackage, FiPlus, FiFileText } from "react-icons/fi";

export const sidebarLinks = [
  {
    title: "Dashboard",
    path: "/admin/dashboard",
    icon: FaHome,
  },
  {
    title: "Users",
    path: "/admin/users",
    icon: FiUsers,
  },
  {
    title: "Products",
    path: "/admin/products",
    icon: FiPackage,
  },
  {
    title: "Add Product",
    path: "/admin/products/add",
    icon: FiPlus,
  },
  {
    title: "Orders",
    path: "/admin/orders",
    icon: FiFileText,
  },
  {
    title: "Carts",
    path: "/admin/cart",
    icon: FaShoppingCart,
  },
  {
    title: "Settings",
    path: "/admin/settings",
    icon: FaCog,
  },
];
