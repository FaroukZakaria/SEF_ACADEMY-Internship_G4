import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Login from './pages/Login';
import DashboardView from './pages/DashboardView';
// import Users from './pages/Users';
// import Products from './pages/Products';
// import AddProduct from './pages/AddProduct';
// import Orders from './pages/Orders';
// import Cart from './pages/Cart';
// import Settings from './pages/Settings';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import DashboardLayout from './components/DashboardLayout';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <DashboardView />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/users"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                {/* <Users /> */}
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                {/* <Products /> */}
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/products/add"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                {/* <AddProduct /> */}
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        

        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                {/* <Orders /> */}
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        

        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                {/* <Cart /> */}
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                {/* <Settings /> */}
              </DashboardLayout>
            </ProtectedRoute>
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