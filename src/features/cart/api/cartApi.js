import axios from "/src/api/axios";

export async function fetchCart() {
  const response = await axios.get("/carts");
  return response.data.items || [];
}

export async function updateCartItemQuantity(productId, quantity) {
  const response = await axios.patch("/carts/items", {
    productId,
    quantity,
  });

  return response.data;
}

export async function removeCartItem(productId) {
  const response = await axios.delete(`/carts/items/${productId}`);
  return response.data;
}

export async function applyPromoCode(code) {
  const response = await axios.post("/carts/coupon", {
    code,
  });

  return response.data;
}