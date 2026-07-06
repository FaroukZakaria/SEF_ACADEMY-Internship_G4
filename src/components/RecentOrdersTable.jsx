import { useEffect, useState } from "react";
import api from "../api/axios.js"

// const FAKE_ORDERS = [
//   {
//     _id: "1",
//     shippingAddress: { fullName: "ssw33333" },
//     items: [{ name: "iPhone 16 Pro Max" }],
//     status: "confirmed",
//     totalPrice: 2164.86,
//   },
//   {
//     _id: "2",
//     shippingAddress: { fullName: "Customer" },
//     items: [{ name: "LG Smart TV" }],
//     status: "processing",
//     totalPrice: 11172.0,
//   },
//   {
//     _id: "3",
//     shippingAddress: { fullName: "Hazem" },
//     items: [{ name: "iPhone 15 Pro Max" }],
//     status: "processing",
//     totalPrice: 1368.0,
//   },
//   {
//     _id: "4",
//     shippingAddress: { fullName: "customer account" },
//     items: [{ name: "Levi's Mens Jeans" }],
//     status: "cancelled",
//     totalPrice: 1480.86,
//   },
//   {
//     _id: "5",
//     shippingAddress: { fullName: "Customer" },
//     items: [{ name: "iPhone 15 Pro Max" }],
//     status: "confirmed",
//     totalPrice: 1368.0,
//   },
// ];

const STATUS_COLORS = {
  confirmed: "text-green-300",
  processing: "text-cyan-300",
  cancelled: "text-red-400",
  pending: "text-yellow-400",
  delivered: "text-green-500",
  shipped: "text-blue-300",
  returned: "text-orange-300"
};

function formatMoney(amount) {
  return `$${Number(amount || 0).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

export default function RecentOrders() {
  // const [orders] = useState(FAKE_ORDERS);
  // const [error] = useState(null);

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const { data } = await api.get("https://e-commerce-api-3wara.vercel.app/orders/admin");
        setOrders(data.orders || []);
      } catch (error) {
        console.log(error);
      }
    };
    getOrders();
  }, []);

  return (
    <div className="bg-amazon-surface border border-amazon-border rounded-4xl p-6 max-w-4xl mx-auto">
      <div className="flex justify-between mb-6">
        <div>
          <p className="text-amazon-orange text-s font-bold uppercase tracking-widest mb-2">
            Recent Orders
          </p>
          <h1 className="text-amazon-textDark text-2xl font-bold">Latest customer activity</h1>
        </div>
        <div className="flex items-center justify-center">
          <span className="bg-amazon-navy text-white px-3 py-1 rounded-3xl whitespace-nowrap">
            {orders.length} orders
          </span>
        </div>
      </div>

      {orders.map((order) => (
        <div
          key={order._id}
          className="flex justify-between items-center bg-amazon-bg border border-amazon-border rounded-3xl p-4 mb-3"
        >
          <div>
            <p className="text-amazon-textDark font-semibold">
              {order.shippingAddress?.fullName}
            </p>
            <p className="text-amazon-textLight text-sm">
              {order.items?.[0]?.name}
            </p>
          </div>

          <div className="text-right flex justify-between items-center gap-3">
            <p
              className={`bg-amazon-lightNavy px-3 py-1.5 rounded-2xl text-xs 
                ${STATUS_COLORS[order.status] }`
              }
            >
              {order.status.toUpperCase()}
            </p>
            <p className="text-amazon-textDark font-semibold">{formatMoney(order.totalPrice)}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
