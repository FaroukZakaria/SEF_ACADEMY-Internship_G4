import { FiShoppingBag } from "react-icons/fi";

const LeftPanel = () => {
  return (
    <div className="hidden lg:flex flex-col justify-center bg-linear-to-br from-amazon-navy to-amazon-lightNavy p-14 text-white">
      <div className="flex items-center gap-2 mb-12">
        <FiShoppingBag className="text-4xl text-amazon-orange" />
        <h2 className="text-4xl font-bold tracking-wide">Koda Commerce</h2>
      </div>

      <h1 className="text-5xl font-bold leading-tight mb-8">
        Manage Your Store
        <br />
        Like a Pro
      </h1>

      <div className="mb-8 h-1 w-24 rounded-full bg-amazon-orange" />

      <p className="text-xl opacity-90 mb-12">
        Control products, orders, users, carts and analytics from a modern
        dashboard experience.
      </p>

      <div className="mb-10 flex gap-3">
        <div className="h-2 w-2 rounded-full bg-amazon-orange" />
        <div className="h-2 w-2 rounded-full bg-amazon-yellow" />
        <div className="h-2 w-2 rounded-full bg-white/60" />
      </div>

      <div className="space-y-5">
        <div className="rounded-xl border border-white/10 bg-white/10 p-5 backdrop-blur-sm transition hover:bg-white/20">
          ✓ Product Management
        </div>

        <div className="rounded-xl border border-white/10 bg-white/10 p-5 backdrop-blur-sm transition hover:bg-white/20">
          ✓ Order Tracking
        </div>

        <div className="rounded-xl border border-white/10 bg-white/10 p-5 backdrop-blur-sm transition hover:bg-white/20">
          ✓ Customer Insights
        </div>
      </div>
    </div>
  );
};

export default LeftPanel;
