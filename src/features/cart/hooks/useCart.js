import { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import {
  fetchCart,
  updateCartItemQuantity,
  removeCartItem,
  applyPromoCode,
} from "../api/cartApi";

export function useCart() {
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState("loading");
  const [promoCode, setPromoCode] = useState("");
  const [promoStatus, setPromoStatus] = useState("idle");
  const [promoDiscount, setPromoDiscount] = useState(0);

  useEffect(() => {
    let isMounted = true;

    const loadCart = async () => {
      setStatus("loading");

      try {
        const data = await fetchCart();

        if (isMounted) {
          setItems(data);
          setStatus("ready");
        }
      } catch (error) {
        console.error(error);
        if (isMounted) setStatus("error");
      }
    };

    loadCart();

    return () => {
      isMounted = false;
    };
  }, []);

  const updateQuantity = useCallback(
    async (productId, newQuantity) => {
      const previousItems = items;

      setItems((prev) =>
        prev.map((item) =>
          item.product === productId
            ? { ...item, quantity: newQuantity }
            : item
        )
      );

      try {
        await updateCartItemQuantity(productId, newQuantity);
      } catch (error) {
        console.error(error);
        setItems(previousItems);
        toast.error("Could not update quantity.");
      }
    },
    [items]
  );

  const removeItem = useCallback(
    async (productId) => {
      const previousItems = items;

      setItems((prev) =>
        prev.filter((item) => item.product !== productId)
      );

      try {
        await removeCartItem(productId);
        toast.success("Item removed.");
      } catch (error) {
        console.error(error);
        setItems(previousItems);
        toast.error("Could not remove item.");
      }
    },
    [items]
  );

  const applyPromo = useCallback(async (code) => {
    setPromoStatus("applying");

    try {
      const result = await applyPromoCode(code);

      setPromoDiscount(result.discountAmount || 0);
      setPromoCode(result.coupon || code);
      setPromoStatus("applied");
    } catch (error) {
      console.error(error);
      setPromoStatus("invalid");
      setPromoDiscount(0);
    }
  }, []);

  return {
    items,
    status,
    updateQuantity,
    removeItem,
    promoCode,
    promoStatus,
    promoDiscount,
    applyPromo,
  };
}