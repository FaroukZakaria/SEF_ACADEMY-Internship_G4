import StatsGrid from "./components/StatsGrid";

// src/App.jsx
function App() {
  return (
    // <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-amazon-bg p-6 font-sans">

    //   {/* Test Container Card */}
    //   <div className="w-full max-w-md rounded-xl border border-amazon-border bg-amazon-surface p-8 shadow-md">

    //     {/* Amazon Navy Header Box */}
    //     <div className="rounded-lg bg-amazon-navy p-4 text-center text-white font-bold mb-4 shadow-inner">
    //       <span className="block text-xs mb-2 opacity-75">amazon-navy</span>
    //       Tailwind v4 Amazon Theme Tester
    //     </div>

    //     {/* Amazon Light Navy Secondary Box */}
    //     <div className="rounded-lg bg-amazon-lightNavy p-4 text-center text-slate-200 text-sm mb-6">
    //       <span className="block text-xs mb-2 opacity-75">amazon-lightNavy</span>
    //       Secondary Layout Layer Check
    //     </div>

    //     {/* Text Hierarchy Check */}
    //     <div className="space-y-2 mb-6 border-b border-amazon-border pb-4">
    //       <p className="text-amazon-textDark font-bold text-lg">
    //         <span className="text-xs block opacity-60 font-normal mb-1">amazon-textDark</span>
    //         This is Primary Dark Text
    //       </p>
    //       <p className="text-amazon-textLight text-sm font-medium">
    //         <span className="text-xs block opacity-60 font-normal mb-1">amazon-textLight</span>
    //         This is Muted Secondary Light Text
    //       </p>
    //     </div>

    //     {/* Amazon Orange & Yellow Action Button Checks */}
    //     <div className="flex flex-col gap-3">
    //       <button className="w-full rounded-md bg-amazon-orange hover:bg-amazon-orangeHover text-amazon-navy font-semibold py-2.5 shadow transition-colors">
    //         <span className="text-xs block opacity-75 mb-1">amazon-orange / amazon-orangeHover</span>
    //         Primary Action (Smile Orange)
    //       </button>

    //       <div className="rounded border border-amber-300 bg-amazon-yellow/20 p-2 text-center text-xs text-amber-800 font-medium">
    //         <span className="block opacity-75 mb-1 font-semibold">amazon-yellow</span>
    //         Secondary Accent Tint Block Connected
    //       </div>
    //     </div>

    //   </div>

    //   {/* Success Banner Condition Indicator */}
    //   <p className="text-xs text-emerald-600 font-bold bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 tracking-wide animate-pulse">
    //     If colors match Amazon's retail theme, your Vite configuration is working perfectly!
    //   </p>
    // </div>
    <div className="pl-80">
      <StatsGrid />
    </div>
  );
}

export default App;
