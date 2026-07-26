import React, { useState, useEffect, useCallback, useMemo } from 'react';
import api from "../api/axios";
import OrderSkeleton from '../components/admin/OrderSkeleton';

const statusBadgeClasses = {
  pending: "bg-yellow-500/10 text-yellow-500 border border-yellow-500/20",
  confirmed: "bg-blue-500/10 text-blue-500 border border-blue-500/20",
  processing: "bg-purple-500/10 text-purple-500 border border-purple-500/20",
  shipped: "bg-cyan-500/10 text-cyan-500 border border-cyan-500/20",
  delivered: "bg-green-500/10 text-green-500 border border-green-500/20",
  cancelled: "bg-red-500/10 text-red-500 border border-red-500/20",
  returned: "bg-orange-500/10 text-orange-500 border border-orange-500/20",
};

const paymentBadgeClasses = {
  pending: "bg-orange-500/10 text-orange-500 border border-orange-500/20",
  paid: "bg-green-500/10 text-green-500 border border-green-500/20",
  failed: "bg-red-500/10 text-red-500 border border-red-500/20",
  refunded: "bg-purple-500/10 text-purple-500 border border-purple-500/20",
};

const getImageUrl = (item) => {
  const rawImg = item?.image || item?.img || item?.product?.image || item?.product?.imageUrl || item?.product?.img;
  if (!rawImg) return '';
  if (rawImg.startsWith('http://') || rawImg.startsWith('https://')) {
    return rawImg;
  }
  const baseURL = api.defaults.baseURL ? api.defaults.baseURL.replace('/api', '') : '';
  return `${baseURL}${rawImg.startsWith('/') ? '' : '/'}${rawImg}`;
};

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalOrders, setTotalOrders] = useState(0);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [paymentFilter, setPaymentFilter] = useState('');
  const [methodFilter, setMethodFilter] = useState('all');

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [newStatus, setNewStatus] = useState('');
  const [adminNote, setAdminNote] = useState('');
  const [updating, setUpdating] = useState(false);

  const fetchOrders = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const params = {
        page,
        limit: 20,
        sortDir: 'desc'
      };
      
      if (statusFilter) params.status = statusFilter;
      if (paymentFilter) params.paymentStatus = paymentFilter;
      if (methodFilter !== 'all') params.paymentMethod = methodFilter;

      const response = await api.get('/orders/admin', { params });
      const data = response.data;
      
      setOrders(data.orders || []);
      setTotalPages(data.totalPages || 1);
      setTotalOrders(data.total || 0);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }, [page, statusFilter, paymentFilter, methodFilter]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);
  const filteredOrders = useMemo(() => {
    if (!searchQuery.trim()) return orders;
    const query = searchQuery.toLowerCase().trim();
    return orders.filter((order) => {
      const orderId = order._id?.toLowerCase() || '';
      const customerName = order.shippingAddress?.fullName?.toLowerCase() || '';
      const customerEmail = order.user?.email?.toLowerCase() || order.email?.toLowerCase() || '';
      
      return orderId.includes(query) || customerName.includes(query) || customerEmail.includes(query);
    });
  }, [orders, searchQuery]);

  const handleUpdateStatus = async () => {
    if (!selectedOrder) return;
    try {
      setUpdating(true);
      await api.patch(`/orders/admin/${selectedOrder._id}/status`, {
        status: newStatus,
        adminNote: adminNote
      });
      await fetchOrders();
      setSelectedOrder(prev => ({ ...prev, status: newStatus, adminNote: adminNote }));
      setUpdating(false);
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update order status');
      setUpdating(false);
    }
  };

  return (
    <div className="p-6 bg-amazon-bg min-h-screen font-sans relative">
    
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
            placeholder="Search by ID, name, email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
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
          onChange={(e) => { setMethodFilter(e.target.value); setPage(1); }}
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

        {!loading && !error && filteredOrders.length === 0 && (
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

        {!loading && !error && filteredOrders.length > 0 && (
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
                {filteredOrders.map((order) => {
                  const customerName = order.shippingAddress?.fullName || '---';
                  const initialLetter = customerName !== '---' ? customerName.charAt(0).toUpperCase() : 'U';
                  const formattedDate = new Date(order.createdAt).toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric'
                  });

                  return (
                    <tr 
                      key={order._id} 
                      onClick={() => {
                        setSelectedOrder(order);
                        setNewStatus(order.status);
                        setAdminNote(order.adminNote || '');
                      }}
                      className="hover:bg-amazon-lightNavy/35 transition-colors cursor-pointer"
                    >
                      <td className="py-4 px-6 font-medium text-amazon-orange whitespace-nowrap">
                        #{order._id.slice(-8).toUpperCase()}
                      </td>
                      <td className="py-4 px-6 whitespace-nowrap">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-full bg-amazon-lightNavy flex items-center justify-center font-bold text-xs text-amazon-textLight">
                            {initialLetter}
                          </div>
                          <div>
                            <div className="text-amazon-textDark font-medium">{customerName}</div>
                            <div className="text-xs text-amazon-textLight">{order.user?.email || order.email || ''}</div>
                          </div>
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

      {selectedOrder && (
        <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm flex justify-end">
          <div className="w-full max-w-lg bg-amazon-surface h-full shadow-2xl p-6 overflow-y-auto flex flex-col justify-between border-l border-amazon-border text-amazon-textDark">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-amazon-border mb-6">
                <div>
                  <span className="text-xs text-amazon-textLight uppercase tracking-wider">Order Detail</span>
                  <h2 className="text-xl font-bold text-amazon-orange">#{selectedOrder._id.slice(-8).toUpperCase()}</h2>
                </div>
                <button 
                  onClick={() => setSelectedOrder(null)}
                  className="w-8 h-8 rounded-full bg-amazon-lightNavy/30 flex items-center justify-center text-amazon-textLight hover:text-amazon-textDark"
                >
                  ✕
                </button>
              </div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${statusBadgeClasses[selectedOrder.status]}`}>
                    ● {selectedOrder.status}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${paymentBadgeClasses[selectedOrder.paymentStatus]}`}>
                    {selectedOrder.paymentStatus}
                  </span>
                </div>
                <span className="text-sm font-medium text-amazon-textLight capitalize">{selectedOrder.paymentMethod}</span>
              </div>
              <div className="bg-amazon-lightNavy/10 p-4 rounded-2xl space-y-3 text-sm border border-amazon-border mb-6">
                <div className="flex justify-between border-b border-amazon-border/60 pb-2">
                  <span className="text-amazon-textLight">Placed</span> 
                  <span className="font-medium text-amazon-textDark">{new Date(selectedOrder.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                </div>
                <div className="flex justify-between border-b border-amazon-border/60 pb-2">
                  <span className="text-amazon-textLight">Customer</span> 
                  <span className="font-medium text-amazon-textDark">{selectedOrder.shippingAddress?.fullName || '---'}</span>
                </div>
                <div className="flex justify-between border-b border-amazon-border/60 pb-2">
                  <span className="text-amazon-textLight">Email</span> 
                  <span className="font-medium text-amazon-textDark">{selectedOrder.user?.email || selectedOrder.email || '---'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-amazon-textLight">Ship to</span> 
                  <span className="font-medium text-amazon-textDark">{selectedOrder.shippingAddress?.city}, {selectedOrder.shippingAddress?.country}</span>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-xs uppercase tracking-wider text-amazon-textLight font-semibold mb-3">Items</h4>
                <div className="space-y-3">
                  {selectedOrder.items?.map((item, idx) => {
                    const itemName = item.name || 'Product';
                    const itemImg = getImageUrl(item);
                    const itemPrice = item.price || 0;
                    const itemQty = item.quantity || 1;
                    
                    return (
                      <div key={idx} className="flex justify-between items-center bg-amazon-lightNavy/10 p-3.5 rounded-2xl border border-amazon-border">
                        <div className="flex items-center space-x-3">
                          {itemImg ? (
                            <img 
                              src={itemImg} 
                              alt={itemName} 
                              className="w-12 h-12 object-cover rounded-xl border border-amazon-border bg-amazon-surface" 
                              onError={(e) => { e.target.style.display = 'none'; }}
                            />
                          ) : (
                            <div className="w-12 h-12 bg-amazon-lightNavy/40 rounded-xl border border-amazon-border flex items-center justify-center text-xs text-amazon-textLight">
                              No Img
                            </div>
                          )}
                          <div>
                            <div className="text-sm font-semibold text-amazon-textDark">{itemName}</div>
                            <div className="text-xs text-amazon-textLight">× {itemQty} · {itemPrice.toFixed(2)} EGP</div>
                          </div>
                        </div>
                        <div className="text-sm font-bold text-amazon-textDark">{(itemPrice * itemQty).toFixed(2)} EGP</div>
                      </div>
                    );
                  })}
                </div>
              </div>

              
              <div className="bg-amazon-lightNavy/10 p-4 rounded-2xl border border-amazon-border space-y-3 text-sm mb-6">
                <div className="flex justify-between text-amazon-textLight">
                  <span>Subtotal</span>
                  <span className="text-amazon-textDark">{(selectedOrder.subtotal || selectedOrder.totalPrice).toFixed(2)} EGP</span>
                </div>
                <div className="flex justify-between text-amazon-textLight">
                  <span>Shipping</span>
                  <span className="text-amazon-textDark">{(selectedOrder.shippingFee || 0).toFixed(2)} EGP</span>
                </div>
                {selectedOrder.tax > 0 && (
                  <div className="flex justify-between text-amazon-textLight">
                    <span>Tax (14%)</span>
                    <span className="text-amazon-textDark">{selectedOrder.tax.toFixed(2)} EGP</span>
                  </div>
                )}
                {selectedOrder.discount > 0 && (
                  <div className="flex justify-between text-amazon-textLight">
                    <span>Discount</span>
                    <span className="text-destructive">-{selectedOrder.discount.toFixed(2)} EGP</span>
                  </div>
                )}
                <div className="flex justify-between font-bold text-base text-amazon-textDark border-t border-amazon-border pt-3">
                  <span>Total</span>
                  <span>{selectedOrder.totalPrice.toFixed(2)} EGP</span>
                </div>
              </div>

              {selectedOrder.customerNote ? (
                <div className="mb-6">
                  <h4 className="text-xs uppercase tracking-wider text-amazon-textLight font-semibold mb-2">Customer Note</h4>
                  <div className="bg-amazon-lightNavy/10 p-3.5 rounded-2xl border border-amazon-border text-sm text-amazon-textLight italic">
                    "{selectedOrder.customerNote}"
                  </div>
                </div>
              ) : null}
              <div className="space-y-3 mb-6">
                <h4 className="text-xs uppercase tracking-wider text-amazon-textLight font-semibold">Update Status</h4>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  className="w-full bg-amazon-surface border border-amazon-border rounded-xl px-4 py-3 text-sm text-amazon-textDark focus:outline-none focus:border-amazon-orange"
                >
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                  <option value="returned">Returned</option>
                </select>
                <textarea
                  placeholder="Admin note (optional)..."
                  value={adminNote}
                  onChange={(e) => setAdminNote(e.target.value)}
                  rows="2"
                  className="w-full bg-amazon-surface border border-amazon-border rounded-xl px-4 py-3 text-sm text-amazon-textDark placeholder-amazon-textLight focus:outline-none focus:border-amazon-orange resize-none"
                />
              </div>
            </div>
            <div className="pt-4 border-t border-amazon-border">
              <button 
                onClick={handleUpdateStatus}
                disabled={updating}
                className="w-full py-3.5 bg-amazon-orange hover:bg-amazon-orangeHover text-amazon-navy font-bold rounded-2xl transition-all shadow-lg disabled:opacity-50"
              >
                {updating ? 'Saving...' : 'Save changes'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}