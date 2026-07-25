const TopProductsCardSkeleton = () => {
  return (
    <div className="rounded-3xl border border-amazon-border bg-amazon-surface/90 p-6 shadow-xl">
      {/* Header Section */}
      <div className="h-4 w-32 rounded bg-amazon-border animate-pulse" />
      <div className="mt-2 h-7 w-40 rounded bg-amazon-border animate-pulse" />
      {/* Product Rows List */}
      <div className="mt-4 space-y-3">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="flex items-center gap-4 rounded-3xl border border-amazon-border bg-amazon-bg p-4 animate-pulse"
          >
            {/* Image Placeholder */}
            <div className="h-14 w-14 shrink-0 rounded-2xl bg-amazon-border" />
            {/* Info Placeholders */}
            <div className="min-w-0 flex-1 space-y-2">
              <div className="h-4 w-3/4 rounded bg-amazon-border" />
              <div className="h-3 w-1/2 rounded bg-amazon-border" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopProductsCardSkeleton;