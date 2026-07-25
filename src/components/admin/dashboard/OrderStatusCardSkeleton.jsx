const OrderStatusCardSkeleton = () => {
  return (
    <div className="bg-amazon-surface border border-amazon-border rounded-2xl shadow-sm p-6">
      {/* Header section skeleton */}
      <div className="flex items-start justify-between mb-1">
        <div className="h-4 w-36 rounded bg-amazon-border animate-pulse"></div>
        <div className="h-5 w-28 rounded-full bg-amazon-border animate-pulse"></div>
      </div>
      <div className="mb-5 h-3 w-44 rounded bg-amazon-border animate-pulse"></div>
      {/* Grid skeleton matching original responsive behavior */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="border border-amazon-border bg-amazon-bg/50 rounded-2xl p-5 flex flex-col gap-4 animate-pulse"
          >
            {/* Indicator Dot & Label line */}
            <div className="flex items-center gap-2">
              <div className="h-2.5 w-2.5 rounded-full bg-amazon-border" />
              <div className="h-3 w-20 rounded bg-amazon-border" />
            </div>
            {/* Big Stat Number */}
            <div className="h-9 w-14 rounded bg-amazon-border" />
          </div>
        ))}
      </div>
    </div>
  );
};
export default OrderStatusCardSkeleton;