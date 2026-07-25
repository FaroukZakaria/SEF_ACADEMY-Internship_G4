import React from 'react';

const SettingsSkeleton = ({ colors }) => {
  return (
    <div 
      className="rounded-2xl p-8 border animate-pulse transition-colors duration-300"
      style={{ 
        backgroundColor: colors.surface, 
        borderColor: colors.border 
      }}
    >
      {/* Header Skeleton */}
      <div className="mb-8">
        <div 
          className="h-3 w-20 rounded mb-4" 
          style={{ backgroundColor: colors.primary, opacity: 0.5 }}
        ></div>
        <div 
          className="h-8 w-72 rounded mb-3 max-w-full" 
          style={{ backgroundColor: colors.text, opacity: 0.2 }}
        ></div>
        <div 
          className="h-4 w-96 rounded max-w-full" 
          style={{ backgroundColor: colors.textMuted, opacity: 0.2 }}
        ></div>
      </div>

      {/* Theme Section Skeleton */}
      <div className="border-t pt-8 mb-8" style={{ borderColor: colors.border }}>
        <div 
          className="h-6 w-32 rounded mb-4" 
          style={{ backgroundColor: colors.text, opacity: 0.2 }}
        ></div>
        <div className="flex gap-4">
          <div 
            className="h-10 w-28 rounded-lg" 
            style={{ backgroundColor: colors.text, opacity: 0.1 }}
          ></div>
          <div 
            className="h-10 w-28 rounded-lg" 
            style={{ backgroundColor: colors.text, opacity: 0.1 }}
          ></div>
        </div>
      </div>

      {/* Security Section Skeleton */}
      <div className="border-t pt-8" style={{ borderColor: colors.border }}>
        <div 
          className="h-6 w-24 rounded mb-2" 
          style={{ backgroundColor: colors.text, opacity: 0.2 }}
        ></div>
        <div 
          className="h-4 w-72 rounded mb-6 max-w-full" 
          style={{ backgroundColor: colors.textMuted, opacity: 0.2 }}
        ></div>

        <div className="max-w-md space-y-4">
          {/* Input 1 */}
          <div>
            <div 
              className="h-4 w-32 rounded mb-2" 
              style={{ backgroundColor: colors.textMuted, opacity: 0.2 }}
            ></div>
            <div 
              className="h-10 w-full rounded-lg" 
              style={{ backgroundColor: colors.text, opacity: 0.05 }}
            ></div>
          </div>
          
          {/* Input 2 */}
          <div>
            <div 
              className="h-4 w-28 rounded mb-2" 
              style={{ backgroundColor: colors.textMuted, opacity: 0.2 }}
            ></div>
            <div 
              className="h-10 w-full rounded-lg" 
              style={{ backgroundColor: colors.text, opacity: 0.05 }}
            ></div>
          </div>

          {/* Input 3 */}
          <div>
            <div 
              className="h-4 w-40 rounded mb-2" 
              style={{ backgroundColor: colors.textMuted, opacity: 0.2 }}
            ></div>
            <div 
              className="h-10 w-full rounded-lg" 
              style={{ backgroundColor: colors.text, opacity: 0.05 }}
            ></div>
          </div>

          {/* Submit Button */}
          <div 
            className="h-10 w-40 rounded-lg mt-6" 
            style={{ backgroundColor: colors.primary, opacity: 0.5 }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default SettingsSkeleton;