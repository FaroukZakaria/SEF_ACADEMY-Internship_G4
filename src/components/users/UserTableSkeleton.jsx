const UserTableSkeleton = () => {
  return (
    <div className="overflow-x-auto rounded-3xl border border-amazon-border bg-amazon-surface shadow-md">
      <div className="min-w-190 w-full">
        {/* Table Header */}
        <div className="flex items-center justify-between bg-amazon-bg border-b border-amazon-border px-6 py-4">
          <div className="h-4 w-52 rounded bg-amazon-border animate-pulse" />
          <div className="h-4 w-16 rounded bg-amazon-border animate-pulse" />
          <div className="h-4 w-20 rounded bg-amazon-border animate-pulse" />
          <div className="h-4 w-24 rounded bg-amazon-border animate-pulse" />
        </div>

        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="flex items-center justify-between border-b border-amazon-border px-6 py-5 last:border-none"
          >
            {/* User */}
            <div className="flex min-w-65 items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-amazon-border animate-pulse" />

              <div className="space-y-2">
                <div className="h-4 w-32 rounded bg-amazon-border animate-pulse" />
                <div className="h-3 w-40 rounded bg-amazon-border animate-pulse" />
              </div>
            </div>

            {/* Role */}
            <div className="h-7 w-20 rounded-full bg-amazon-border animate-pulse" />

            {/* Verified */}
            <div className="h-7 w-28 rounded-full bg-amazon-border animate-pulse" />

            {/* Actions */}
            <div className="flex gap-2">
              <div className="h-8 w-8 rounded-xl bg-amazon-border animate-pulse md:h-9 md:w-9" />
              <div className="h-8 w-8 rounded-xl bg-amazon-border animate-pulse md:h-9 md:w-9" />
              <div className="h-8 w-8 rounded-xl bg-amazon-border animate-pulse md:h-9 md:w-9" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserTableSkeleton;
