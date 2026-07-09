import React, { useEffect, useState } from "react";
import Sidebar from "./sidebar/Sidebar";
import MobileSidebar from "./sidebar/MobileSidebar";
import Topbar from "./Topbar";
import DashboardView from "../pages/DashboardView";
import LoadingSpinner from "./LoadingSpinner";
import axios from "/src/api/axios";
import { FaBars } from "react-icons/fa";

const DashboardLayout = () => {
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
    <div className="flex h-screen w-screen overflow-hidden bg-amazon-bg">
      <Sidebar />
      <MobileSidebar open={open} setOpen={setOpen} />
      <div className="dashboard-main lg:pl-72">
        {/* Pass the session data directly into your Topbar */}
        {isSessionLoading ? <LoadingSpinner message="Loading session data..." /> : <Topbar userData={userData} onMenuClick={() => setOpen(true)} />}
        <DashboardView userData={userData} />
      </div>
    </div>
    </>
  );
};

export default DashboardLayout;
