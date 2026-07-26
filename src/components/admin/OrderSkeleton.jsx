import React from 'react';

export default function OrderSkeleton() {
  return (
    <div className="space-y-4">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="bg-amazon-surface border border-amazon-border rounded-xl p-4 flex items-center justify-between">
          <div className="h-5 shimmer rounded w-24"></div>
          <div className="h-5 shimmer rounded w-32"></div>
          <div className="h-5 shimmer rounded w-20"></div>
          <div className="h-6 shimmer rounded-full w-20"></div>
          <div className="h-6 shimmer rounded-full w-16"></div>
          <div className="h-5 shimmer rounded w-20"></div>
        </div>
      ))}
    </div>
  );
}