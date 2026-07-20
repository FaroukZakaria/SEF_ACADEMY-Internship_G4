import { useState, useEffect } from 'react';
import api from '../api/axios';
import OrderStatusCardSkeleton from './OrderStatusCardSkeleton';

const ORDER_STATUS_CONFIG = [
  {
    key: 'pending',
    label: 'Pending',
    indicatorClass: 'bg-amber-500 dark:bg-amber-400',
    bgClass: 'bg-amber-50 dark:bg-amber-900',
    borderClass: 'border-amber-200 dark:border-amber-700',
    textClass: 'text-amber-700 dark:text-amber-300',
    numberClass: 'text-amber-600 dark:text-amber-200',
  },
  {
    key: 'processing',
    label: 'Processing',
    indicatorClass: 'bg-blue-700 dark:bg-blue-500',
    bgClass: 'bg-blue-50 dark:bg-blue-900',
    borderClass: 'border-blue-200 dark:border-blue-700',
    textClass: 'text-blue-700 dark:text-blue-300',
    numberClass: 'text-blue-600 dark:text-blue-200',
  },
  {
    key: 'confirmed',
    label: 'Confirmed',
    indicatorClass: 'bg-teal-500 dark:bg-teal-400',
    bgClass: 'bg-teal-50 dark:bg-teal-900',
    borderClass: 'border-teal-200 dark:border-teal-700',
    textClass: 'text-teal-700 dark:text-teal-300',
    numberClass: 'text-teal-600 dark:text-teal-200',
  },
  {
    key: 'shipped',
    label: 'Shipped',
    indicatorClass: 'bg-indigo-500 dark:bg-indigo-400',
    bgClass: 'bg-indigo-50 dark:bg-indigo-900',
    borderClass: 'border-indigo-200 dark:border-indigo-700',
    textClass: 'text-indigo-700 dark:text-indigo-300',
    numberClass: 'text-indigo-600 dark:text-indigo-200',
  },
  {
    key: 'delivered',
    label: 'Delivered',
    indicatorClass: 'bg-emerald-500 dark:bg-emerald-400',
    bgClass: 'bg-emerald-50 dark:bg-emerald-900',
    borderClass: 'border-emerald-200 dark:border-emerald-700',
    textClass: 'text-emerald-700 dark:text-emerald-300',
    numberClass: 'text-emerald-600 dark:text-emerald-200',
  },
  {
    key: 'cancelled',
    label: 'Cancelled',
    indicatorClass: 'bg-red-500 dark:bg-red-400',
    bgClass: 'bg-red-50 dark:bg-red-900',
    borderClass: 'border-red-200 dark:border-red-700',
    textClass: 'text-red-700 dark:text-red-300',
    numberClass: 'text-red-600 dark:text-red-200',
  },
];

const OrderStatusCard = () => {
  const [orderStatusCounts, setOrderStatusCounts] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchOrderStatusStats = async () => {
      setIsLoading(true); 
      setErrorMessage(null);

      try {
        const response = await api.get('/orders/admin/dashboard', {
          signal: controller.signal,
        });

        const orders = response?.data?.dashboard?.orders;

        if (!orders) {
          throw new Error('Order statistics are missing from the response.');
        }

        setOrderStatusCounts(orders);
      } catch (error) {
        if (error.name !== 'CanceledError') {
          setErrorMessage('Unable to load order statistics. Please try again.');
          setIsLoading(false); 
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    fetchOrderStatusStats();

    return () => controller.abort();
  }, []);

  if (isLoading) {
    return <OrderStatusCardSkeleton />;
  }

  if (errorMessage) {
    return (
      <div className="bg-amazon-surface border border-amazon-border rounded-2xl shadow-sm p-6">
        <div className="flex items-start justify-between mb-1">
          <h2 className="text-sm uppercase tracking-[0.35em] text-amazon-orange">
            Order Status
          </h2>
          <span className="bg-green-100 text-green-700 text-[11px] font-medium px-3 py-1 rounded-full whitespace-nowrap">
            Updated from API
          </span>
        </div>
        <p className="text-xs text-gray-500 mb-4">Live fulfillment breakdown</p>
        <p className="text-amazon-textLight text-sm">{errorMessage}</p>
      </div>
    );
  }

  return (
    <div className="bg-amazon-surface border border-amazon-border rounded-2xl shadow-sm p-6">
      <div className="flex items-start justify-between mb-1">
        <h2 className="text-sm uppercase tracking-[0.35em] text-amazon-orange">
          Order Status
        </h2>
        <span className="bg-green-100 text-green-700 text-[11px] font-medium px-3 py-1 rounded-full whitespace-nowrap">
          Updated from API
        </span>
      </div>
      <p className="text-xs text-gray-500 mb-5">Live fulfillment breakdown</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {ORDER_STATUS_CONFIG?.map(({ key, label, indicatorClass, bgClass, borderClass, textClass, numberClass }) => (
          <div
            key={key}
            className={`${bgClass} border ${borderClass} rounded-2xl shadow-sm p-5 flex flex-col gap-4 transition-all duration-300 ease-out hover:shadow-md hover:-translate-y-1`}
          >
            <div className="flex items-center gap-2">
              <span className={`h-2.5 w-2.5 rounded-full ${indicatorClass}`} />
              <span className={`${textClass} text-xs font-semibold uppercase tracking-widest`}>
                {label}
              </span>
            </div>

            <span className={`${numberClass} text-4xl font-extrabold leading-none tracking-tight`}>
              {orderStatusCounts?.[key] ?? 0}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderStatusCard;