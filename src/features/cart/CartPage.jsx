import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IoArrowBack } from 'react-icons/io5';
import CartItem from './components/CartItem';
import OrderSummary from './components/OrderSummary';
import EmptyCart from './components/EmptyCart';
import { useCart } from './hooks/useCart';
import { useCartTotals } from './hooks/useCartTotals';

export default function CartPage() {
  const navigate = useNavigate();
  const {
    items,
    status,
    updateQuantity,
    removeItem,
    promoStatus,
    promoDiscount,
    applyPromo,
  } = useCart();

  const totals = useCartTotals(items, promoDiscount);

  return (
    <div className="min-h-screen bg-amazon-bg p-4 md:p-6">
      <div className="mx-auto max-w-7xl">
       
        <div className="mb-8">
          <button
            type="button"
            onClick={() => navigate('/products')}
            className="mb-3 flex items-center gap-2 text-amazon-orange transition hover:text-amazon-orangeHover"
          >
            <IoArrowBack size={18} />
            Back to Products
          </button>

          <h1 className="text-3xl font-bold text-amazon-textDark">
            Shopping Cart
          </h1>

          <p className="mt-2 text-amazon-textLight">
            Review your items before checkout.
          </p>
        </div>

        
        {status === 'loading' && (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="h-32 animate-pulse rounded-xl bg-amazon-border"
              />
            ))}
          </div>
        )}

        
        {status === 'error' && (
          <div className="rounded-xl border border-amazon-border bg-amazon-surface p-6 text-center">
            <p className="text-red-500">
              Could not load your cart. Please try again.
            </p>
          </div>
        )}

        
        {status === 'ready' && items.length === 0 && <EmptyCart />}

       
        {status === 'ready' && items.length > 0 && (
          <div className="lg:grid lg:grid-cols-[1fr_360px] lg:gap-6">
            
            <div className="space-y-4">
{items.map((item) => (
  <CartItem
    key={item._id}
    item={item}
    onQuantityChange={(qty) => updateQuantity(item.product, qty)}
onRemove={() => removeItem(item.product)}
  />
))}
            </div>

            
            <div className="mt-6 lg:mt-0 lg:sticky lg:top-6 lg:self-start">
              <OrderSummary
                totals={totals}
                promoStatus={promoStatus}
                onApplyPromo={applyPromo}
                onCheckout={() => navigate('/checkout')}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}