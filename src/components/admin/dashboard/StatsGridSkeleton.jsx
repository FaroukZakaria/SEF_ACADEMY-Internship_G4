const StatsGridSkeleton = () => {
  return (
    <>
      <div className="mb-6 flex flex-col items-center justify-center">
        <h3 className="text-xl font-bold text-amazon-textDark">
          Koda Dashboard
        </h3>
        <p className="text-amazon-textLight/60 text-sm">
          Loading Admin overview...
        </p>
      </div>
      <div className="animate-pulse rounded-[28px] border border-amazon-border bg-amazon-surface p-6">
        <div className="mb-4 h-4 w-40 rounded bg-amazon-border"></div>
        <div className="mb-3 h-8 w-72 rounded bg-amazon-border"></div>
        <div className="h-4 w-96 rounded bg-amazon-border"></div>
      </div>
      <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="animate-pulse rounded-[28px] border border-amazon-border bg-amazon-surface p-5"
          >
            <div className="mb-5 h-1 w-full rounded bg-amazon-border"></div>
            <div className="flex justify-between">
              <div className="space-y-4">
                <div className="h-4 w-24 rounded bg-amazon-border"></div>
                <div className="h-8 w-32 rounded bg-amazon-border"></div>
                <div className="h-4 w-28 rounded bg-amazon-border"></div>
              </div>
              <div className="h-14 w-14 rounded-full bg-amazon-border"></div>
            </div>
            <div className="mt-6 h-0.5 w-full bg-amazon-border"></div>
          </div>
        ))}
      </div>
    </>
  );
};
export default StatsGridSkeleton;
