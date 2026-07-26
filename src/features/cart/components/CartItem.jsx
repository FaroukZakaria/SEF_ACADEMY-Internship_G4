import { IoTrashOutline } from "react-icons/io5";
import QuantitySelector from "./QuantitySelector";

export default function CartItem({
  item,
  onQuantityChange,
  onRemove,
}) {

  const {
    name,
    image,
    price,
    quantity,
    brand,
    category,
    discountPrice,
    stock = 999,
  } = item;

  const inStock = stock > 0;

  const unitPrice = Number(discountPrice || price || 0);

  return (
    <div className="flex flex-col gap-4 rounded-xl border border-amazon-border bg-amazon-surface p-4 shadow-sm sm:flex-row sm:items-center">

      <img
        src={image}
        alt={name}
        className="h-24 w-24 rounded-lg object-cover"
      />

      <div className="flex-1">

        <h3 className="font-semibold text-amazon-textDark">
          {name}
        </h3>

        <p className="mt-1 text-sm text-amazon-textLight">
          {brand} {category && `· ${category}`}
        </p>

        <div className="mt-2 flex items-center gap-2">

          {discountPrice ? (
            <>
              <span className="font-bold">
                ${discountPrice}
              </span>

              <span className="line-through text-sm">
                ${price}
              </span>
            </>
          ) : (
            <span className="font-bold">
              ${price}
            </span>
          )}

        </div>

        <p
          className={`mt-1 text-xs font-medium ${
            inStock
              ? "text-green-600"
              : "text-red-500"
          }`}
        >
          {inStock ? "In Stock" : "Out of Stock"}
        </p>

      </div>

      <div className="flex items-center justify-between gap-4 sm:flex-col">

        <QuantitySelector
          value={quantity}
          onChange={onQuantityChange}
          max={stock}
          disabled={!inStock}
        />

        <button
          onClick={onRemove}
          className="flex items-center gap-1 text-red-500"
        >
          <IoTrashOutline />
          Remove
        </button>

      </div>

      <div className="sm:w-24 text-right">

        <p className="font-bold">
          ${(unitPrice * quantity).toFixed(2)}
        </p>

      </div>

    </div>
  );
}