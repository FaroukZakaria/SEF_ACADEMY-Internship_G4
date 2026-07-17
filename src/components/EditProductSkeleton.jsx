import React from "react";

export default function EditProductSkeleton() {
  return (
    <div className="p-4 sm:p-6 w-full animate-pulse transition-colors duration-300">
      {/* Skeleton Header */}
      <div className="bg-amazon-surface rounded-[1.5rem] border border-amazon-border p-6 sm:p-8 mb-6 shadow-sm flex flex-col xl:flex-row justify-between items-start xl:items-end gap-8 relative overflow-hidden">
        <div className="w-full">
          {/* Back Button Skeleton */}
          <div className="h-8 w-32 bg-amazon-border rounded-full mb-6"></div>
          <div className="flex flex-col sm:flex-row items-start gap-5">
            {/* Icon Skeleton */}
            <div className="h-14 w-14 shrink-0 rounded-[1rem] bg-amazon-border"></div>
            {/* Title and Subtitle Skeletons */}
            <div className="w-full">
              <div className="h-3 w-24 bg-amazon-border rounded mb-2"></div>
              <div className="h-8 w-3/4 max-w-md bg-amazon-border rounded mb-3"></div>
              <div className="h-4 w-full max-w-2xl bg-amazon-bg rounded"></div>
            </div>
          </div>
        </div>
        {/* Live Status Box Skeleton */}
        <div className="w-full xl:w-[280px] h-20 shrink-0 rounded-2xl bg-amazon-border"></div>
      </div>

      {/* Skeleton Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-5 space-y-6">
          {/* Gallery Box Skeleton */}
          <div className="bg-amazon-surface rounded-2xl border border-amazon-border p-6 shadow-sm">
            <div className="h-6 w-40 bg-amazon-border rounded mb-2"></div>
            <div className="h-4 w-64 bg-amazon-bg rounded mb-6"></div>
            
            {/* Images Grid Skeleton */}
            <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-[1.5rem] bg-amazon-border h-64 w-full"></div>
              <div className="rounded-[1.5rem] bg-amazon-border h-64 w-full"></div>
            </div>
            
            {/* Upload Area Skeleton */}
            <div className="rounded-xl border-2 border-dashed border-amazon-border bg-amazon-bg h-32 w-full"></div>
          </div>
          
          {/* Info Box Skeleton */}
          <div className="bg-amazon-surface border border-amazon-border rounded-xl h-24 w-full"></div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-7 bg-amazon-surface rounded-2xl border border-amazon-border p-6 shadow-sm flex flex-col justify-between">
          <div className="space-y-5">
            {/* Inputs Row 1 & 2 */}
            <div className="space-y-2 w-full">
              <div className="h-4 w-24 bg-amazon-border rounded"></div>
              <div className="h-11 w-full bg-amazon-bg rounded-xl"></div>
            </div>
            <div className="space-y-2 w-full">
              <div className="h-4 w-24 bg-amazon-border rounded"></div>
              <div className="h-28 w-full bg-amazon-bg rounded-xl"></div>
            </div>

            {/* Grid Inputs */}
            {[...Array(4)].map((_, i) => (
              <div key={i} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-2 w-full">
                  <div className="h-4 w-24 bg-amazon-border rounded"></div>
                  <div className="h-11 w-full bg-amazon-bg rounded-xl"></div>
                </div>
                <div className="space-y-2 w-full">
                  <div className="h-4 w-24 bg-amazon-border rounded"></div>
                  <div className="h-11 w-full bg-amazon-bg rounded-xl"></div>
                </div>
              </div>
            ))}
            
            {/* Toggles Skeleton */}
            <div className="flex gap-4 pt-2">
              <div className="h-10 w-32 bg-amazon-bg rounded-xl"></div>
              <div className="h-10 w-32 bg-amazon-bg rounded-xl"></div>
            </div>
          </div>

          {/* Buttons Skeleton */}
          <div className="flex justify-end gap-3 pt-6 mt-6 border-t border-amazon-border">
            <div className="h-10 w-24 bg-amazon-bg rounded-lg"></div>
            <div className="h-10 w-32 bg-amazon-border rounded-lg"></div>
          </div>
        </div>
      </div>
    </div>
  );
}