const RecentOrdersSkeleton = () => {
  return (
    <div className="bg-amazon-surface border border-amazon-border rounded-4xl p-6 w-full mx-auto">
      {/* Header alignment block */}
      <div className="flex justify-between mb-6">
        <div className="space-y-2">
          <div className="h-4 w-32 rounded bg-amazon-border animate-pulse" />
          <div className="h-7 w-64 rounded bg-amazon-border animate-pulse" />
        </div>
        <div className="flex items-center justify-center">
          <div className="h-9 w-28 rounded-3xl bg-amazon-border animate-pulse" />
        </div>
      </div>
      {/* Row collection mapping layout */}
      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="flex justify-between items-center bg-amazon-bg/50 border border-amazon-border border-l-4 rounded-3xl p-4 animate-pulse"
          >
            {/* Left side text blocks */}
            <div className="space-y-2">
              <div className="h-4 w-28 rounded bg-amazon-border" />
              <div className="h-3 w-48 rounded bg-amazon-border" />
            </div>
            {/* Right side alignment layout badges */}
            <div className="flex justify-between items-center gap-4">
              <div className="h-7 w-24 rounded-2xl bg-amazon-border" />
              <div className="h-4 w-20 rounded bg-amazon-border" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default RecentOrdersSkeleton;