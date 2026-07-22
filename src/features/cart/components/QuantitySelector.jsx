import React from 'react';

export default function QuantitySelector({ value, onChange, max = 99, disabled = false }) {
  const decrease = () => {
    if (value > 1) onChange(value - 1);
  };

  const increase = () => {
    if (value < max) onChange(value + 1);
  };

  return (
    <div className="flex items-center rounded-lg border border-amazon-border">
      <button
        type="button"
        onClick={decrease}
        disabled={disabled || value <= 1}
        className="flex h-9 w-9 items-center justify-center text-amazon-textDark transition hover:bg-amazon-bg disabled:cursor-not-allowed disabled:opacity-40"
        aria-label="Decrease quantity"
      >
        −
      </button>
      <span className="w-10 text-center text-sm font-medium text-amazon-textDark">
        {value}
      </span>
      <button
        type="button"
        onClick={increase}
        disabled={disabled || value >= max}
        className="flex h-9 w-9 items-center justify-center text-amazon-textDark transition hover:bg-amazon-bg disabled:cursor-not-allowed disabled:opacity-40"
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
}