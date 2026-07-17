import ProductStatusCardSkeleton from "../ProductStatusCardSkeleton";
const AllProductsSkeleton = () => {
  return (
    <div>
        <ProductStatusCardSkeleton />
      <div className="mb-5 h-22 w-full rounded-3xl bg-amazon-border/60 animate-pulse flex justify-center items-center gap-4 mt-4">
        <div className="w-6/10 rounded-2xl h-16 bg-amazon-border"></div>
        <div className="bg-amazon-border rounded-xl py-4 h-16 w-24"></div>
        <div className="bg-amazon-border rounded-xl py-4 h-16 w-24"></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6  mt-7">
        {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="rounded-4xl border border-amazon-border bg-amazon-surface w-full overflow-hidden animate-pulse">
            <div className="relative overflow-hidden">
                <div className="w-full h-60 bg-amazon-border/40" />
                <div className="absolute bottom-3 left-0 right-0 mx-auto z-10 flex items-center justify-center gap-1.5 w-fit">
                    <div className="w-1.5 h-1.5 rounded-full bg-white/70" />
                    <div className="w-1.5 h-1.5 rounded-full bg-white/70" />
                    <div className="w-1.5 h-1.5 rounded-full bg-white/70" />
                </div>
                <div className="absolute bottom-3 right-3 h-6 w-20 rounded-full bg-amazon-border/60 z-10" />
            </div>

            <div className="pb-4 overflow-hidden w-9/10 mx-auto">
                <div className="h-5 w-3/4 bg-amazon-border/40 rounded mt-4 mb-2" />
                <div className="h-3 w-1/2 bg-amazon-border/30 rounded mb-4" />

                <div className="space-y-2 my-4">
                    <div className="h-3 w-full bg-amazon-border/30 rounded" />
                    <div className="h-3 w-2/3 bg-amazon-border/30 rounded" />
                </div>

                <div className="h-7 w-24 bg-amazon-border/40 rounded mb-4" />

                <div className="flex gap-2 mb-4">
                    <div className="h-6 w-14 bg-amazon-border/30 rounded-lg" />
                    <div className="h-6 w-14 bg-amazon-border/30 rounded-lg" />
                </div>

                <hr className="border-amazon-border/50 my-4" />

                <div className="flex gap-3">
                    <div className="h-9 w-20 bg-amazon-border/40 rounded-xl" />
                    <div className="h-9 w-20 bg-amazon-border/40 rounded-xl" />
                    <div className="h-9 w-25 bg-amazon-border/40 rounded-xl" />
                </div>

                <div className="flex justify-end mt-4">
                    <div className="h-9 w-20 bg-amazon-border/40 rounded-xl" />
                </div>
            </div>
        </div>
        ))}
      </div>
    </div>
  );
};

export default AllProductsSkeleton;