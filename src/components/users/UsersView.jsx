
import { useState } from "react";
import { IoSearchOutline, IoPersonAddOutline, IoChevronDownOutline } from "react-icons/io5";
import UserStatusCard from "./UserStatusCard";
import CreateUserForm from "./CreateUserForm";
import UsersTable from "./UsersTable";



export default function UsersView({userData, setUserData}) {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleUserCreated = () => {
    setIsCreateOpen(false);
    setRefreshTrigger((prev) => prev + 1); 
  };

  return (
    <div className="flex flex-col gap-6 p-6 md:p-8">
      {/* Header + Search + Add User */}
      <div
        className="rounded-3xl border border-amazon-border bg-amazon-surface p-6 shadow-lg transition-colors"
      >
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-amazon-orange">
              User Management
            </p>
            <h2 className="mt-2 text-3xl font-bold text-amazon-textDark">
              Manage Users
            </h2>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            {/* Search  */}
            <div className="relative w-full lg:w-80">
              <IoSearchOutline className="absolute left-4 top-3.5 h-5 w-5 text-amazon-textLight" />
              <input
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-2xl border border-amazon-border bg-amazon-bg py-3 pl-12 pr-4
                           text-amazon-textDark outline-none focus:ring-2 focus:ring-amazon-orange
                           placeholder:text-amazon-textLight/70"
              />
            </div>

            {/* Add User toggle */}
            <button
              onClick={() => setIsCreateOpen((prev) => !prev)}
              className="flex items-center justify-center gap-2 rounded-2xl bg-amazon-orange px-5 py-3
                         font-semibold text-white shadow-md transition
                         hover:bg-amazon-orangeHover active:scale-95"
            >
              <IoPersonAddOutline className="h-5 w-5" />
              <span>Add User</span>
              <IoChevronDownOutline
                className={`h-4 w-4 transition-transform duration-200 ${
                  isCreateOpen ? "rotate-180" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {isCreateOpen && (
        <CreateUserForm
          onClose={() => setIsCreateOpen(false)}
          onSuccess={handleUserCreated}
        />
      )}

      <UserStatusCard refreshTrigger={refreshTrigger} />
      <UsersTable refreshTrigger={refreshTrigger} setRefreshTrigger={setRefreshTrigger} searchQuery={searchQuery} setSearchQuery={setSearchQuery} userData={userData} setUserData={setUserData} />
    </div>
  );
}
