import { LuShieldCheck } from "react-icons/lu";
import ActionButton from "./ActionButton";
import { FiTrash2 } from "react-icons/fi";
import { VscEdit } from "react-icons/vsc";

const UserRow = ({ user, onDelete, onEdit, onToggleRole, isUpdatingRole }) => {
  return (
    <tr className="border-b border-amazon-border last:border-none hover:bg-amazon-bg/40 transition-colors duration-200">
      <td className="px-3 md:px-6 py-4">
        <div className="flex items-center gap-3">
          <img
            src={user.avatar}
            alt={user.username}
            className="h-10 w-10 md:h-12 md:w-12 rounded-full object-cover"
          />

          <div>
            <h3 className="font-semibold text-sm md:text-base text-amazon-textDark">
              {user.username}
            </h3>

            <p className="max-w-45 truncate text-xs md:text-sm text-amazon-textLight">
              {user.email}
            </p>
          </div>
        </div>
      </td>

      <td className="px-3 md:px-6 py-4">
        <span
          className={`rounded-full px-2 md:px-3 py-1 text-[11px] md:text-xs text-xs font-medium
          ${
            user.role === "admin"
              ? "bg-purple-100 text-purple-600"
              : "bg-cyan-100 text-cyan-700"
          }`}
        >
          {user.role}
        </span>
      </td>

      <td className="px-3 md:px-6 py-4">
        <span
          className={`rounded-full px-2 md:px-3 py-1 text-[11px] md:text-xs text-xs font-medium
          ${
            user.isVerified
              ? "bg-green-100 text-green-600"
              : "bg-yellow-100 text-yellow-600"
          }`}
        >
          {user.isVerified ? "Verified" : "Not Verified"}
        </span>
      </td>

      <td className="px-3 md:px-6 py-4">
        <div className="flex justify-center gap-2">
          <ActionButton
            tooltip="Edit User"
            onClick={onEdit}
            className="bg-blue-500 hover:bg-blue-600"
          >
            <VscEdit />
          </ActionButton>

          <ActionButton
            tooltip="Toggle Role"
            onClick={onToggleRole}
            disabled={isUpdatingRole}
            className="bg-green-600 hover:bg-green-700"
          >
            {isUpdatingRole ? (
              <span className="h-4 w-4 rounded-full border-2 border-amazon-border border-t-transparent animate-spin" />
            ) : (
              <LuShieldCheck />
            )}
          </ActionButton>

          <ActionButton
            tooltip="Delete User"
            onClick={onDelete}
            className="bg-destructive hover:bg-red-700"
          >
            <FiTrash2 />
          </ActionButton>
        </div>
      </td>
    </tr>
  );
};

export default UserRow;
