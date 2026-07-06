import { useEffect, useState } from "react";
import api from "../api/axios.js"

const STATUS_COLORS = {
  confirmed:  { text: "text-green-300"},
  delivered:  { text: "text-green-500"},
  processing: { text: "text-cyan-300"},
  shipped:    { text: "text-blue-300"},
  pending:    { text: "text-yellow-400"},
  cancelled:  { text: "text-red-400"},
  returned:   { text: "text-orange-300"},
};

function formatMoney(amount) {
  return `$${Number(amount || 0).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

export default function RecentOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const { data } = await api.get("https://e-commerce-api-3wara.vercel.app/orders/admin?limit=5");
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
          <span className="bg-amazon-lightNavy text-white px-4 py-1.5 rounded-3xl font-semibold whitespace-nowrap">
            Orders: {orders.length}
          </span>
        </div>
      </div>

       {orders.slice(0,5).map((order, index) => {
        const style = STATUS_COLORS[order.status];
        const rowBg = index % 2 === 0 ? "bg-amazon-bg border border-amazon-orange" : "bg-amazon-surface border border-amazon-yellow";
          console.log(order.user?.username)
        return (
          <div
            key={order._id}
            className={`flex justify-between items-center ${rowBg} border-l-4 rounded-3xl p-4 mb-3 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5`}
          >
            <div>
              <p className="text-amazon-textDark font-semibold">
                {order.user?.username || "Customer"}
              </p>
              <p className="text-amazon-textLight text-sm">
                {order.items?.[0]?.name} • {new Date(order.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
              </p>
            </div>

            <div className="flex justify-between items-center">
                <p
                  className={`bg-amazon-lightNavy ${STATUS_COLORS[order.status].text} text-amazon-lightNavy w-24 text-center px-3 py-1.5 rounded-2xl text-xs font-bold`}
                >
                  {order.status.toUpperCase()}
                </p>
                <p className="text-amazon-textDark font-semibold w-24 text-right">{formatMoney(order.totalPrice)}</p>
            </div>
          </div>
        );
      })}

    </div>
  );
}
