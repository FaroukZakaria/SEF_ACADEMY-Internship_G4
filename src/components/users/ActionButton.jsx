const ActionButton = ({ children, tooltip, className = "", ...props }) => {
  return (
    <div className="relative group">
      <button
        aria-label={tooltip}
        {...props}
        className={`flex h-8 w-8 md:h-9 md:w-9 items-center justify-center rounded-xl text-amazon-textBase transition-colors cursor-pointer ${className}`}
      >
        {children}
      </button>

      <span className="pointer-events-none absolute -top-5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-amazon-navy px-2 py-1 text-xs text-amazon-textBase opacity-0 shadow-lg transition-all duration-200 group-hover:opacity-100 group-hover:-translate-y-1">
        {tooltip}

        <span className="absolute left-1/2 top-full h-2 w-2 -translate-x-1/2 -translate-y-1 rotate-45 bg-amazon-navy" />
      </span>
    </div>
  );
};

export default ActionButton;
