import { useMemo } from "react";

const SHIPPING_FLAT_RATE = 5;
const TAX_RATE = 0.14;

export function useCartTotals(items, promoDiscount = 0) {
  return useMemo(() => {
    const subtotal = items.reduce((sum, item) => {
      return sum + Number(item.price) * item.quantity;
    }, 0);

    const shipping = items.length ? SHIPPING_FLAT_RATE : 0;

    const tax = subtotal * TAX_RATE;

    const total =
      subtotal +
      shipping +
      tax -
      promoDiscount;

    return {
      subtotal,
      discount: promoDiscount,
      shipping,
      tax,
      total,
    };
  }, [items, promoDiscount]);
}