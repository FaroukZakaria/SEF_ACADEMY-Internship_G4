import { useEffect, useState } from "react";
import Sidebar from "./sidebar/Sidebar";
import MobileSidebar from "./sidebar/MobileSidebar";
import Topbar from "./Topbar";
import DashboardView from "../pages/DashboardView";
import LoadingSpinner from "./LoadingSpinner";

import axios from "../api/axios"; 
import ProtectedRoute from "./ProtectedRoute";
import EditProductView from "./EditProductView";

const EditProductViewLayout = ({ children }) => {
  const [isSessionLoading, setIsSessionLoading] = useState(true);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchAdminSession = async () => {
      try {
        const response = await axios.get("/auth/me");
        setUserData(response.data.user || null);
      } catch (error) {
        console.error("Error fetching admin data from API", error);
      } finally {
        setIsSessionLoading(false);
      }
    };

    fetchAdminSession();
  }, []);

  const [open, setOpen] = useState(false);

  return (
    <>
      {isSessionLoading ? (
        <LoadingSpinner message="Loading session data..." />
      ) : (
        <>
          <Sidebar />
          <MobileSidebar open={open} setOpen={setOpen} />
          {/* إضافة min-h-screen هنا ضرورية عشان الخلفية تغطي الشاشة كلها */}
          <div className="dashboard-main min-h-screen bg-amazon-bg lg:pl-72 transition-colors duration-300">
            <Topbar userData={userData} open={open} onMenuClick={() => setOpen((prev) => !prev)} />
            <ProtectedRoute>
              <EditProductView/>
              {children}
            </ProtectedRoute>
          </div>
        </>
      )}
    </>
  );
};



export default EditProductViewLayout;