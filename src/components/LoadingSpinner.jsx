//LoadingSpinner.jsx
export default function LoadingSpinner({
  message = "Loading Dashboard...",
  fullScreen = true,
  className = "",
}) {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-busy="true"
      className={[
        "flex flex-col items-center justify-center gap-7 bg-amazon-bg px-6",
        fullScreen ? "min-h-screen w-full" : "w-full py-16",
        className,
      ].join(" ")}
    >
     
      <div className="relative flex h-14 w-14 items-center justify-center">
       
        <span className="absolute inset-0 rounded-full border-2 border-amazon-border" />
        <span
          className="absolute inset-0 animate-spin rounded-full border-2 border-transparent
                     border-t-amazon-orange border-r-amazon-orange/30
                     [animation-duration:1s] "
        />
        <span
          className="absolute h-2.5 w-2.5 animate-ping rounded-full bg-amazon-orange/40
                     motion-reduce:hidden"
        />
        <span className="relative h-1.5 w-1.5 rounded-full bg-amazon-orange" />
      </div>

      <div className="flex w-full max-w-[200px] flex-col items-center gap-4">
        <p className="text-[13px] font-medium tracking-wide text-amazon-textDark">
          {message}
        </p>

        <div className="flex w-full flex-col items-center gap-2">
          <span className="h-1 w-full animate-pulse rounded-full bg-amazon-border motion-reduce:animate-none" />
          <span className="h-1 w-3/4 animate-pulse rounded-full bg-amazon-border [animation-delay:200ms] motion-reduce:animate-none" />
          <span className="h-1 w-1/2 animate-pulse rounded-full bg-amazon-border [animation-delay:400ms] motion-reduce:animate-none" />
        </div>
      </div>
    </div>
  );
}
