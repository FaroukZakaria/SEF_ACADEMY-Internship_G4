import React from 'react';
import { useNavigate } from 'react-router-dom';

function CartIcon() {
  return (
    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="21" r="1" />
      <circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
  );
}

export default function EmptyCart() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="mb-4 text-amazon-textLight">
        <CartIcon />
      </div>
      <h2 className="text-xl font-semibold text-amazon-textDark">
        Your cart is empty
      </h2>
      <p className="mt-2 max-w-sm text-sm text-amazon-textLight">
        Looks like you haven't added any products yet. Browse the catalog to find something.
      </p>
      <button
        type="button"
        onClick={() => navigate('/products')}
        className="mt-6 rounded-lg bg-amazon-orange px-6 py-3 font-semibold text-white transition hover:bg-amazon-orangeHover"
      >
        Continue Shopping
      </button>
    </div>
  );
}