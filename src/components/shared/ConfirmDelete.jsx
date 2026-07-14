import { TfiAlert } from "react-icons/tfi";
import { IoClose } from "react-icons/io5";

const ConfirmDelete = ({
  isOpen,
  onClose,
  onConfirm,
  deletedItem,
  isPending,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <div className="relative w-[90%] max-w-md overflow-hidden rounded-2xl bg-amazon-bg shadow-2xl">
        <div className="bg-amazon-bg text-amazon-textDark rounded-lg">
          <div className="bg-destructive py-1 rounded-t-lg">
            <div className="w-1/2 ml-auto flex justify-between items-center">
              <button className="h-8 w-8">
                <TfiAlert size={20}/>
              </button>
              <button className="h-8 w-8" onClick={onClose}>
                <IoClose size={20}/>
              </button>
            </div>
          </div>
          <div className="p-6 flex flex-col justify-center text-center gap-2">
            <h2 className="font-medium text-xl">{`Are you sure you want to delete ${deletedItem}?`}</h2>
            <p className="text-amazon-textLight">
              If deleted, you cannot restore it again.
            </p>
            <div className="mx-auto">
              <button
                className="bg-destructive px-4 py-2 font-medium text-base text-amazon-textBase rounded-lg cursor-pointer"
                onClick={onConfirm}
                disabled={isPending}
              >
                {isPending ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDelete;
