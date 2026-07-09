import { NavLink } from "react-router-dom";

const SidebarItem = ({ item, onClick }) => {
  const Icon = item.icon;

  return (
    <NavLink
      to={item.path}
      onClick={onClick}
      className={({ isActive }) =>
        `flex items-center gap-4 rounded-xl px-4 py-3 text-sm font-medium transition-all
    ${
      isActive
        ? "bg-amazon-lightNavy text-amazon-surface"
        : "text-amazon-bg hover:bg-amazon-lightNavy hover:text-amazon-surface"
    }`
      }
    >
      <Icon size={18} className="text-lg" />

      <span className="font-medium">{item.title}</span>
    </NavLink>
  );
};

export default SidebarItem;
