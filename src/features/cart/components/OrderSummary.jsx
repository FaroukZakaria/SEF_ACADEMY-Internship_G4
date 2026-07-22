import React from 'react';
import PromoCode from './PromoCode';

function SummaryRow({ label, value, bold = false }) {
  return (
    <div className="flex items-center justify-between">
      <span className={`text-sm ${bold ? 'font-semibold text-amazon-textDark' : 'text-amazon-textLight'}`}>
        {label}
      </span>
      <span className={`text-sm ${bold ? 'text-lg font-bold text-amazon-textDark' : 'text-amazon-textDark'}`}>
        ${value.toFixed(2)}
      </span>
    </div>
  );
}

export default function OrderSummary({ totals, promoStatus, onApplyPromo, onCheckout }) {
  return (
    <div className="rounded-xl border border-amazon-border bg-amazon-surface p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-amazon-textDark">
        Order Summary
      </h2>

      <div className="mt-4 space-y-3">
        <SummaryRow label="Subtotal" value={totals.subtotal} />
        <SummaryRow label="Discount" value={-totals.discount} />
        <SummaryRow label="Shipping" value={totals.shipping} />
        <SummaryRow label="Tax" value={totals.tax} />
      </div>

      <div className="my-4 border-t border-amazon-border" />

      <SummaryRow label="Total" value={totals.total} bold />

      <PromoCode status={promoStatus} onApply={onApplyPromo} />

      <button
        type="button"
        onClick={onCheckout}
        className="mt-6 w-full rounded-lg bg-amazon-orange px-6 py-3 font-semibold text-white transition hover:bg-amazon-orangeHover"
      >
        Checkout
      </button>
    </div>
  );
}