import Navbar from "../components/customer/common/navbar";
import { Outlet } from "react-router-dom";
import Footer from "../components/customer/common/footer";

const CustomerLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default CustomerLayout;
