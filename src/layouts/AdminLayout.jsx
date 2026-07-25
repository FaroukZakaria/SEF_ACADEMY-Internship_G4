import { useEffect, useState } from "react";
import Sidebar from "../components/admin/common/sidebar/Sidebar";
import MobileSidebar from "../components/admin/common/sidebar/MobileSidebar";
import axios from "/src/api/axios";
import { Outlet } from "react-router-dom";
import LoadingSpinner from "../components/admin/common/LoadingSpinner";
import Topbar from "../components/admin/common/Topbar";
import ProtectedRoute from "../components/admin/common/ProtectedRoute";

const AdminLayout = () => {
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
        <LoadingSpinner message="Loading Admin Data..." />
      ) : (
        <>
          <Sidebar />
          <MobileSidebar open={open} setOpen={setOpen} />
          <div className="dashboard-main bg-amazon-bg lg:pl-72">
            <Topbar
              userData={userData}
              open={open}
              onMenuClick={() => setOpen((prev) => !prev)}
            />
            <ProtectedRoute>
              <Outlet context={{ userData }} />
            </ProtectedRoute>
          </div>
        </>
      )}
    </>
  );
}

export default AdminLayout;
