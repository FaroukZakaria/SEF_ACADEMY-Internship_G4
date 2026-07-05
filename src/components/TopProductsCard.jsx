
import { useState, useEffect } from "react";
import api from '../api/axios';

function TopProductsCard() {
  const [topProducts, setTopProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getTopProducts = async () => {
      try {
        setLoading(true);
        const res = await api.get('/orders/admin', {
          params: {
            limit: 1000, 
          },
        });

        const orders = Array.isArray(res.data?.orders) ? res.data.orders : [];

        const productsMap = {};

        orders.forEach((order) => {
          const items = Array.isArray(order.items) ? order.items : [];
          items.forEach((item) => {
            const productId = item.product;
            if (!productId) return;

            if (!productsMap[productId]) {
              productsMap[productId] = {
                _id: productId,
                name: item.name,
                image: item.image,
                totalSold: 0,
                revenue: 0,
              };
            }

            productsMap[productId].totalSold += item.quantity || 0;
            productsMap[productId].revenue += (item.price || 0) * (item.quantity || 0);
          });
        });

        const sorted = Object.values(productsMap)
          .sort((a, b) => b.totalSold - a.totalSold)
          .slice(0, 5);

        setTopProducts(sorted);
      } catch (err) {
        console.error(err);
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    getTopProducts();
  }, []);

  return (
    <div className="rounded-3xl border border-amazon-border bg-amazon-surface/90 p-6 shadow-xl">
      <p className="text-sm uppercase tracking-[0.35em] text-amazon-orange">Top products</p>
      <h3 className="mt-2 text-xl font-semibold text-amazon-textDark">Best sellers</h3>

      <div className="mt-4 space-y-3">
        {loading && (
          <p className="text-sm text-amazon-textLight">Loading...</p>
        )}

        {!loading && error && (
          <p className="text-sm text-red-500">{error}</p>
        )}

        {!loading && !error && topProducts.length === 0 && (
          <p className="text-sm text-amazon-textLight">No products to display</p>
        )}

        {!loading &&
          !error &&
          topProducts.map((product) => (
            <article
              key={product._id}
              className="flex items-center gap-4 rounded-3xl border border-amazon-border bg-amazon-bg p-4"
            >
              <img
                src={product.image ?? "/placeholder.png"}
                alt={product.name}
                className="h-14 w-14 rounded-2xl object-cover"
              />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-amazon-textDark">
                  {product.name}
                </p>
                <p className="text-xs text-amazon-textLight">
                  {product.totalSold} units sold • ${product.revenue.toFixed(2)}
                </p>
              </div>
            </article>
          ))}
      </div>
    </div>
  );
}

export default TopProductsCard;