import SidebarItem from "./SidebarItem";
import { sidebarLinks } from "./SidebarLinks";

const Sidebar = () => {
  return (
    <aside className="hidden lg:flex w-72 flex-col border-r border-amazon-lightNavy bg-amazon-navy">
      <div className="border-b border-amazon-lightNavy p-6">
        <p className="text-xs tracking-[5px] text-amazon-yellow uppercase">
          COMMERCE
        </p>
        <h2 className="text-2xl font-bold text-amazon-surface">Admin Panel</h2>
      </div>

      <nav className="flex-1 space-y-1 p-5">
        {sidebarLinks.map((item) => (
          <SidebarItem key={item.path} item={item} />
        ))}
      </nav>

      <div className="m-5 rounded-2xl bg-linear-to-br from-amazon-yellow to-amazon-orange text-amazon-navy p-6">
        <p className="mb-2 text-xs tracking-[6px] uppercase">Live</p>
        <p className="text-sm font-semibold leading-6">
          Connected to the E-Commerce API
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;
