import React, { useState, useEffect, useCallback } from 'react';
import api from "../api/axios";
import OrderSkeleton from '../components/admin/OrderSkeleton';

const statusBadgeClasses = {
  pending: "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20",
  confirmed: "bg-blue-500/10 text-blue-400 border border-blue-500/20",
  processing: "bg-purple-500/10 text-purple-400 border border-purple-500/20",
  shipped: "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20",
  delivered: "bg-green-500/10 text-green-400 border border-green-500/20",
  cancelled: "bg-red-500/10 text-red-400 border border-red-500/20",
  returned: "bg-orange-500/10 text-orange-400 border border-orange-500/20",
};

const paymentBadgeClasses = {
  pending: "bg-orange-500/10 text-orange-400 border border-orange-500/20",
  paid: "bg-green-500/10 text-green-400 border border-green-500/20",
  failed: "bg-red-500/10 text-red-400 border border-red-500/20",
  refunded: "bg-purple-500/10 text-purple-400 border border-purple-500/20",
};

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalOrders, setTotalOrders] = useState(0);
  
  const [searchId, setSearchId] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [paymentFilter, setPaymentFilter] = useState('');
  const [methodFilter, setMethodFilter] = useState('all');

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchId);
      setPage(1);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchId]);

  const fetchOrders = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const params = {
        page,
        limit: 10,
        sortDir: 'desc'
      };
      
      if (statusFilter) params.status = statusFilter;
      if (paymentFilter) params.paymentStatus = paymentFilter;

      const response = await api.get('/orders/admin', { params });
      const data = response.data;
      let fetchedOrders = data.orders || [];
      
      if (debouncedSearch.trim()) {
        const cleanSearch = debouncedSearch.trim().replace('#', '').toLowerCase();
        fetchedOrders = fetchedOrders.filter(order => {
          const fullId = order._id.toLowerCase();
          const shortId = order._id.slice(-8).toLowerCase();
          return fullId.includes(cleanSearch) || shortId.includes(cleanSearch);
        });
      }

      if (methodFilter !== 'all') {
        fetchedOrders = fetchedOrders.filter(order => 
          order.paymentMethod?.toLowerCase() === methodFilter.toLowerCase()
        );
      }

      setOrders(fetchedOrders);
      setTotalPages(data.totalPages || 1);
      setTotalOrders(data.total || 0);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }, [page, statusFilter, paymentFilter, debouncedSearch, methodFilter]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  return (
    <div className="p-6 bg-amazon-bg min-h-screen font-sans">
    
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <div>
          <span className="text-xs uppercase tracking-wider text-amazon-textLight font-semibold">Admin • Management</span>
          <h1 className="text-3xl font-bold text-amazon-textDark mt-1">Orders</h1>
        </div>
        
        <div className="bg-amazon-surface border border-amazon-border px-5 py-3 rounded-2xl flex items-center space-x-3 shadow-md w-fit">
          <span className="text-2xl font-black text-amazon-textDark">{totalOrders}</span>
          <span className="text-xs text-amazon-textLight uppercase tracking-wide font-medium">total orders</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="relative md:col-span-1">
          <span className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-amazon-textLight">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>
          <input
            type="text"
            placeholder="Search Order ID..."
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            className="w-full bg-amazon-surface border border-amazon-border rounded-xl pl-11 pr-4 py-3 text-sm text-amazon-textDark placeholder-amazon-textLight focus:outline-none focus:border-amazon-orange transition-colors"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
          className="bg-amazon-surface border border-amazon-border rounded-xl px-4 py-3 text-sm text-amazon-textDark focus:outline-none focus:border-amazon-orange transition-colors"
        >
          <option value="">All statuses</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="processing">Processing</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
          <option value="returned">Returned</option>
        </select>

        <select
          value={paymentFilter}
          onChange={(e) => { setPaymentFilter(e.target.value); setPage(1); }}
          className="bg-amazon-surface border border-amazon-border rounded-xl px-4 py-3 text-sm text-amazon-textDark focus:outline-none focus:border-amazon-orange transition-colors"
        >
          <option value="">All payments</option>
          <option value="pending">Pending</option>
          <option value="paid">Paid</option>
          <option value="failed">Failed</option>
          <option value="refunded">Refunded</option>
        </select>

        <select
          value={methodFilter}
          onChange={(e) => setMethodFilter(e.target.value)}
          className="bg-amazon-surface border border-amazon-border rounded-xl px-4 py-3 text-sm text-amazon-textDark focus:outline-none focus:border-amazon-orange transition-colors"
        >
          <option value="all">All methods</option>
          <option value="cash">Cash</option>
          <option value="stripe">Stripe</option>
        </select>
      </div>

      <div className="bg-amazon-surface border border-amazon-border rounded-2xl shadow-xl overflow-hidden mb-6">
        
        {error && (
          <div className="p-12 text-center space-y-4">
            <p className="text-destructive font-medium">{error}</p>
            <button 
              onClick={fetchOrders}
              className="px-6 py-2 bg-amazon-orange hover:bg-amazon-orangeHover text-amazon-navy font-semibold rounded-xl transition-all"
            >
              Retry
            </button>
          </div>
        )}

        {loading && !error && (
          <div className="p-6">
            <OrderSkeleton />
          </div>
        )}

        {!loading && !error && orders.length === 0 && (
          <div className="p-16 text-center space-y-3">
            <div className="w-16 h-16 bg-amazon-lightNavy/50 rounded-full flex items-center justify-center mx-auto text-amazon-textLight">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-amazon-textDark">No orders found</h3>
            <p className="text-sm text-amazon-textLight">Try adjusting your search or filter criteria.</p>
          </div>
        )}

        {!loading && !error && orders.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="border-b border-amazon-border text-xs font-semibold uppercase tracking-wider text-amazon-textLight">
                  <th className="py-4 px-6">Order</th>
                  <th className="py-4 px-6">Customer</th>
                  <th className="py-4 px-6">Date</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6">Payment</th>
                  <th className="py-4 px-6 text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-amazon-border text-sm">
                {orders.map((order) => {
                  const customerName = order.shippingAddress?.fullName || '---';
                  const initialLetter = customerName !== '---' ? customerName.charAt(0).toUpperCase() : 'U';
                  const formattedDate = new Date(order.createdAt).toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric'
                  });

                  return (
                    <tr key={order._id} className="hover:bg-amazon-lightNavy/35 transition-colors">
                      <td className="py-4 px-6 font-medium text-amazon-orange whitespace-nowrap">
                        #{order._id.slice(-8).toUpperCase()}
                      </td>
                      <td className="py-4 px-6 whitespace-nowrap">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-full bg-amazon-lightNavy flex items-center justify-center font-bold text-xs text-amazon-textLight">
                            {initialLetter}
                          </div>
                          <span className="text-amazon-textDark font-medium">{customerName}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-amazon-textLight whitespace-nowrap">
                        {formattedDate}
                      </td>
                      <td className="py-4 px-6 whitespace-nowrap">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize inline-block ${statusBadgeClasses[order.status] || 'bg-gray-700 text-gray-300'}`}>
                          ● {order.status}
                        </span>
                      </td>
                      <td className="py-4 px-6 whitespace-nowrap">
                        <div className="space-y-1">
                          <span className={`px-2.5 py-0.5 rounded text-[11px] font-bold uppercase inline-block ${paymentBadgeClasses[order.paymentStatus] || 'bg-gray-700 text-gray-300'}`}>
                            {order.paymentStatus}
                          </span>
                          <div className="text-xs text-amazon-textLight capitalize">{order.paymentMethod}</div>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-right font-bold text-amazon-textDark whitespace-nowrap">
                        {order.totalPrice} EGP
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {!loading && totalPages > 1 && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-amazon-border bg-amazon-surface">
            <span className="text-sm text-amazon-textLight">
              Page <strong className="text-amazon-textDark">{page}</strong> of <strong className="text-amazon-textDark">{totalPages}</strong>
            </span>

            <div className="flex items-center space-x-1.5">
              <button
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                disabled={page === 1}
                className="w-9 h-9 flex items-center justify-center bg-amazon-surface border border-amazon-border rounded-xl text-sm font-medium text-amazon-textDark disabled:opacity-30 disabled:cursor-not-allowed hover:bg-amazon-lightNavy transition-colors"
              >
                &lt;
              </button>

              {[...Array(totalPages)].map((_, i) => {
                const pageNum = i + 1;
                const isActive = page === pageNum;
                return (
                  <button
                    key={pageNum}
                    onClick={() => setPage(pageNum)}
                    className={`w-9 h-9 flex items-center justify-center rounded-xl text-sm font-semibold transition-all ${
                      isActive
                        ? 'bg-amazon-surface text-amazon-textDark border border-amazon-border shadow-sm scale-105'
                        : 'bg-amazon-surface text-amazon-textLight border border-amazon-border hover:bg-amazon-lightNavy hover:text-amazon-textDark'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}

              <button
                onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={page === totalPages}
                className="w-9 h-9 flex items-center justify-center bg-amazon-surface border border-amazon-border rounded-xl text-sm font-medium text-amazon-textDark disabled:opacity-30 disabled:cursor-not-allowed hover:bg-amazon-lightNavy transition-colors"
              >
                &gt;
              </button>
            </div>
          </div>
        )}

      </div>

    </div>
  );
}