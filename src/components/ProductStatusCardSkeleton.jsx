const ProductStatusCardSkeleton = () => {
  const cards = Array.from({ length: 4 });

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-7">
      {cards.map((_, index) => (
        <div
          key={index}
          className="w-full rounded-4xl border border-amazon-border bg-amazon-surface p-5 animate-pulse"
        >
          <div className="w-12 h-12 rounded-xl bg-amazon-border" />

          <div className="h-8 w-14 rounded bg-amazon-border mt-4" />

          <div className="h-4 w-20 rounded bg-amazon-border mt-3" />
        </div>
      ))}
    </div>
  );
};

export default ProductStatusCardSkeleton;
