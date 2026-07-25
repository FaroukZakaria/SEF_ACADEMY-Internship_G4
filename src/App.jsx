import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useThemeStore from "./store/themeStore";
// Layouts
import AdminLayout from "./layouts/AdminLayout";
import CustomerLayout from "./layouts/CustomerLayout";

// Login
import AdminLogin from "./pages/auth/AdminLogin";
import CustomerLogin from "./pages/auth/CustomerLogin";

// Customer Pages
import HomeView from "./pages/customer/HomeView";
import ShopView from "./pages/customer/ShopView";
import ProductDetailsView from "./pages/customer/ProductDetailsView";
import OrderView from "./pages/customer/OrderView";
import OrderDetailsView from "./pages/customer/OrderDetailsView";
import CheckoutView from "./pages/customer/CheckoutView";
import WishlistView from "./pages/customer/WishlistView";

// Admin Pages
import DashboardView from "./pages/admin/DashboardView";
import UsersView from "./pages/admin/UsersView";
import ProductsView from "./pages/admin/ProductsView";
import OrdersView from "./pages/admin/OrdersView";
import CartView from "./pages/admin/CartView";
import SettingsView from "./pages/admin/SettingsView";
import EditProductView from "./components/admin/products/EditProductView";
import AddProductsView from "./pages/admin/AddProductsView";
import QuickEditProduct from "./components/admin/products/QuickEditProduct";
import ViewDetailsProduct from "./components/admin/products/ViewDetailsProduct";

function App() {
  const { theme } = useThemeStore();
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* ================= Customer ================= */}
          <Route path="/login" element={<CustomerLogin />} />
          <Route element={<CustomerLayout />}>
            <Route index element={<HomeView />} />
            <Route path="/products">
              <Route index element={<ShopView />} />
              <Route path=":id" element={<ProductDetailsView />} />
            </Route>
            <Route path="/orders">
              <Route index element={<OrderView />} />
              <Route path=":id" element={<OrderDetailsView />} />
            </Route>
            <Route path="/cart" element={<CartView />} />
            <Route path="/checkout" element={<CheckoutView />} />
            <Route path="/wishlist" element={<WishlistView />} />
          </Route>

          {/* ================= Admin ================= */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route element={<AdminLayout />}>
            <Route path="/admin/dashboard" element={<DashboardView />} />
            <Route path="/admin/users" element={<UsersView />} />
            <Route path="/admin/orders" element={<OrdersView />} />
            <Route path="/admin/cart" element={<CartView />} />
            <Route path="/admin/settings" element={<SettingsView />} />
            <Route path="/admin/products">
              <Route index element={<ProductsView />} />
              <Route path="add" element={<AddProductsView />} />
              <Route path=":id" element={<ViewDetailsProduct />} />
              <Route path="edit/:id" element={<EditProductView />} />
              <Route path="quickEdit/:id" element={<QuickEditProduct />} />
            </Route>
          </Route>

          {/* ================= Redirect ================= */}
          <Route path="*" element={<Navigate to="/admin/login" replace />} />
          
        </Routes>
      </BrowserRouter>

      <ToastContainer position="top-center" autoClose={2000} theme="colored" />
    </>
  );
}

export default App;
