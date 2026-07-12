import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import DashboardView from "./pages/DashboardView";
// import Users from './pages/Users';
// import Products from './pages/Products';
// import AddProduct from './pages/AddProduct';
// import Orders from './pages/Orders';
// import Cart from './pages/Cart';
// import Settings from './pages/Settings';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import TemplateLayout from "./components/TemplateLayout";
import DashboardLayout from "./components/DashboardLayout";
import UsersLayout from "./components/UsersLayout";
import ProductsLayout from "./components/ProductsLayout";
import ProductsAddLayout from "./components/ProductsAddLayout";
import OrdersLayout from "./components/OrdersLayout";
import CartLayout from "./components/CartLayout";
import SettingsLayout from "./components/SettingsLayout";

import ProtectedRoute from "./components/ProtectedRoute";
import useThemeStore from "./store/themeStore";
import { useEffect } from "react";

function App() {
  const { theme } = useThemeStore();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route
            path="/dashboard"
            element={
              <DashboardLayout />
            }
          />

          <Route
            path="/users"
            element={
            <UsersLayout />
            }
          />

          <Route
            path="/products"
            element={
              <ProductsLayout />
            }
          />

          <Route
            path="/products/add"
            element={
              <ProductsAddLayout />
            }
          />

          <Route
            path="/orders"
            element={
              <OrdersLayout />
            }
          />

          <Route
            path="/cart"
            element={
              <CartLayout />
            }
          />

          <Route
            path="/settings"
            element={
              <SettingsLayout />
            }
          />

          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer position="top-center" autoClose={2000} theme="colored" />
    </>
  );
}

export default App;
