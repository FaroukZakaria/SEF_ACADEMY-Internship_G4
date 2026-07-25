import mylogo from "/logoNav.png";
import { FiBell, FiSun, FiLogOut, FiMoon } from "react-icons/fi";
import { FaBars, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../utils/authService";
import useThemeStore from "../../../store/themeStore";

const Topbar = ({ userData, open, onMenuClick }) => {
  const navigate = useNavigate();
  const userName = userData?.username || "";
  const role = userData?.role || "";
  // Compute layout initials instantly on-the-fly without state hooks
  const initials = userName
    ? userName
        .split(" ")
        .map((part) => part[0])
        .join("")
        .toUpperCase()
        .substring(0, 2)
    : "";
  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout process failed:", error);
    }
  };
  const { theme, toggleTheme } = useThemeStore();
  return (
    <>
      <div className="w-full h-20 bg-amazon-surface flex justify-between items-center px-4 lg:px-8 border-b sticky top-0 z-50 border-amazon-border">
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="rounded-lg bg-amazon-lightNavy p-3 text-amazon-textBase lg:hidden"
          >
            {open ? <FaTimes /> : <FaBars />}
          </button>
          <img src={mylogo} alt="Logo" className="w-25 md:w-30 h-auto" />
          <div className="hidden lg:flex flex-col">
            <h2 className="text-sm font-bold">Koda Dashboard</h2>
            <span className="text-xs text-amazon-orange">
              E-Commerce Admin Panel
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2 md:gap-3">
          <button className="relative w-8.75 h-8.75 bg-amazon-surface border border-amazon-border flex items-center justify-center rounded-full cursor-pointer">
            <FiBell size={18} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-amazon-yellow rounded-full"></span>
          </button>
          <button
            onClick={toggleTheme}
            className="w-8.75 h-8.75 bg-amazon-surface border border-amazon-border flex items-center justify-center rounded-full cursor-pointer"
          >
            {theme === "dark" ? <FiSun /> : <FiMoon />}
          </button>
          <div className="hidden sm:flex items-center gap-1.5 bg-amazon-bg/40 border border-amazon-border p-3 rounded-[20px] min-w-20 min-h-9">
            {initials && (
              <div className="w-10 h-5 bg-linear-to-br from-orange-300 via-orange-400 to-orange-500 text-amazon-textBase rounded-full flex items-center justify-center font-bold">
                {initials}
              </div>
            )}
            {userName && (
              <div className="hidden sm:flex flex-col items-start pr-1.5">
                <span className="text-xs font-medium ">{userName}</span>
                {role && (
                  <span className="text-[12px] text-amazon-textLight">
                    {role}
                  </span>
                )}
              </div>
            )}
          </div>
          <button
            onClick={handleLogout}
            className="bg-destructive text-amazon-textBase py-2 px-4 rounded-md flex items-center gap-1.5 text-xs md:text-sm cursor-pointer transition-all duration-200 hover:bg-destructive/80"
          >
            <FiLogOut size={14} />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Topbar;
