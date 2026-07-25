import SidebarItem from "./SidebarItem";
import { sidebarLinks } from "./SidebarLinks";

const Sidebar = () => {
  return (
    <aside className="hidden lg:flex w-72 h-full flex-col border-r fixed top-0 left-0 border-amazon-border bg-amazon-surface">
      <div className="border-b border-amazon-border px-6 py-4">
        <p className="text-xs tracking-[5px] text-amazon-yellow uppercase">
          COMMERCE
        </p>
        <h2 className="text-2xl font-bold text-amazon-textDark">Admin Panel</h2>
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
