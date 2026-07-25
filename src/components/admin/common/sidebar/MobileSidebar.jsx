import SidebarItem from "./SidebarItem";
import { sidebarLinks } from "./SidebarLinks";

const MobileSidebar = ({ open, setOpen }) => {
  return (
    <>
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
        />
      )}

      <aside
        className={`fixed left-0 top-20 z-50 h-[calc(100vh-5rem)] w-72 bg-amazon-surface transition-transform duration-300 lg:hidden
        ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="border-b border-amazon-border p-5">
          <p className="text-xs tracking-[5px] text-amazon-yellow uppercase">
            COMMERCE
          </p>

          <h2 className="text-2xl font-bold text-amazon-textDark">Admin Panel</h2>
        </div>

        <nav className="space-y-1 px-5 py-3">
          {sidebarLinks.map((item) => (
            <SidebarItem
              key={item.path}
              item={item}
              onClick={() => setOpen(false)}
            />
          ))}
        </nav>

        <div className="absolute bottom-5 left-0 mx-4 rounded-2xl bg-linear-to-br from-amazon-orange to-amazon-yellow text-amazon-navy p-4">
          <p className="mb-2 text-xs tracking-[6px]">LIVE</p>
          <p className="text-sm font-semibold leading-6">
            Connected to the E-Commerce API
          </p>
        </div>
      </aside>
    </>
  );
};

export default MobileSidebar;
