import React, { useState } from 'react';

export default function PromoCode({ status, onApply }) {
  const [code, setCode] = useState('');

  const handleApply = () => {
    if (!code.trim()) return;
    onApply(code.trim());
  };

  return (
    <div className="mt-4">
      <div className="flex gap-2">
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Promo code"
          className="flex-1 rounded-lg border border-amazon-border bg-amazon-surface px-3 py-2 text-sm text-amazon-textDark outline-none transition focus:border-amazon-orange"
        />
        <button
          type="button"
          onClick={handleApply}
          disabled={status === 'applying'}
          className="rounded-lg border border-amazon-border px-4 py-2 text-sm font-medium text-amazon-textDark transition hover:bg-amazon-bg disabled:cursor-not-allowed disabled:opacity-50"
        >
          {status === 'applying' ? '...' : 'Apply'}
        </button>
      </div>

      {status === 'applied' && (
        <p className="mt-2 text-sm text-green-600">Promo code applied.</p>
      )}
      {status === 'invalid' && (
        <p className="mt-2 text-sm text-red-500">Invalid promo code.</p>
      )}
    </div>
  );
}