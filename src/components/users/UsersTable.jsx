import { useEffect, useState } from "react";
import api from "../../api/axios";
import UserTableSkeleton from "./UserTableSkeleton";
import UserRow from "./UserRow";
import ConfirmDelete from "../shared/ConfirmDelete";
import { toast } from "react-toastify";
import EditUser from "./EditUser";
import {getName} from "../../utils/authService"
import {getEmail} from "../../utils/authService"

const UsersTable = ({refreshTrigger, setRefreshTrigger, searchQuery, setSearchQuery, userData, setUserData}) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedUser, setSelectedUser] = useState(null);
  const [modal, setModal] = useState(null);
  
  const [isDeleting, setIsDeleting] = useState(false);

  const [isUpdatingRole, setIsUpdatingRole] = useState(null);

  useEffect(() => {
    setLoading(true);
    const fetchUsers = async () => {
      try {
        const { data } = await api.get("/users/all");
        setUsers(data.users);
      } catch (error) {
        toast.error(
          error.response?.data?.message ||
            "Failed to fetch users. Please try again.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [refreshTrigger]);

  const openDeleteModal = (user) => {
    setSelectedUser(user);
    setModal("delete");
  };

  const closeDeleteModal = () => {
    setSelectedUser(null);
    setModal(null);
  };

  const openEditModal = (user) => {
    setSelectedUser(user);
    setModal("edit");
  };

  const closeEditModal = () => {
    setSelectedUser(null);
    setModal(null);
  };

  const handleDelete = async () => {
    try {
      setIsDeleting(true);

      const { data } = await api.delete(`/users/${selectedUser._id}`);

      toast.success(data.message || "User deleted successfully.");

      setUsers((prev) => prev.filter((user) => user._id !== selectedUser._id));

      closeDeleteModal();
      setRefreshTrigger((prev) => prev + 1);
      setSearchQuery("");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to delete user. Please try again.",
      );
    } finally {
      setIsDeleting(false);
    }
  };

  const handleToggleRole = async (user) => {
    try {
      setIsUpdatingRole(user._id);

      const newRole = user.role === "admin" ? "customer" : "admin";

      const { data } = await api.patch("/auth/change-role", {
        userId: user._id,
        role: newRole,
      });

      toast.success(data.message);

      setUsers((prev) => prev.map((u) => (u._id === user._id ? data.user : u)));
      setRefreshTrigger((prev) => prev + 1);
      if (getEmail() === user.email) {
        localStorage.setItem("role" , newRole);
        setUserData((prev) => ({ ...prev, role: newRole }));
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to update user role.",
      );
    } finally {
      setIsUpdatingRole(null);
    }
  };

  if (loading) return <UserTableSkeleton />;

  const filteredUsers = users.filter((user) => {
    const query = searchQuery.toLowerCase();
    return (
      user.username.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query)
    );
  });

  if (!loading && filteredUsers.length === 0) {
    return <div className="py-20 text-center">No users found.</div>;
  }

  return (
    <>
      <div className="overflow-x-auto rounded-3xl border border-amazon-border bg-amazon-surface shadow-lg">
        <table className="min-w-190 w-full table-auto whitespace-nowrap">
          <thead className="bg-amazon-orange text-amazon-lightNavy">
            <tr className="text-left text-xs md:text-sm">
              <th className="px-3 md:px-6 py-4">User</th>
              <th className="px-3 md:px-6 py-4">Role</th>
              <th className="px-3 md:px-6 py-4">Verified</th>
              <th className="px-3 md:px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.map((user) => (
              <UserRow
                key={user._id}
                user={user}
                onDelete={() => openDeleteModal(user)}
                onToggleRole={() => handleToggleRole(user)}
                isUpdatingRole={isUpdatingRole === user._id}
                onEdit={() => openEditModal(user)}
              />
            ))}
          </tbody>
        </table>
      </div>

      <ConfirmDelete
        isOpen={modal === "delete"}
        onClose={closeDeleteModal}
        onConfirm={handleDelete}
        deletedItem={selectedUser?.username}
        isPending={isDeleting}
      />

      <EditUser
        isOpen={modal === "edit"}
        onClose={closeEditModal}
        user={selectedUser}
        onSuccess={(updatedUser) => {
          setUsers((prev) =>
            prev.map((u) => (u._id === updatedUser._id ? updatedUser : u)),
          );
          if (getEmail() === updatedUser.email) {
            localStorage.setItem("name", updatedUser.username);
            setUserData((prev) => ({ ...prev, username: updatedUser.username }));
          }
          }
          
        }
        userData={userData}
        setUserData={setUserData}
      />
    </>
  );
};

export default UsersTable;
