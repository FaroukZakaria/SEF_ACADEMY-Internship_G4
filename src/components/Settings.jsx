import { useState, useEffect } from 'react';
import useThemeStore from '../store/themeStore'; 


const SettingsSkeleton = ({ colors }) => {
  return (
    <div 
      className="rounded-2xl p-8 border animate-pulse transition-colors duration-300"
      style={{ 
        backgroundColor: colors.surface, 
        borderColor: colors.border 
      }}
    >
      {/* Skeleton Label */}
      <div 
        className="h-3 w-20 rounded mb-4" 
        style={{ backgroundColor: colors.primary, opacity: 0.5 }}
      ></div>
      
      {/* Skeleton Title */}
      <div 
        className="h-7 w-64 rounded mb-3" 
        style={{ backgroundColor: colors.text, opacity: 0.2 }}
      ></div>
      
      {/* Skeleton Description */}
      <div 
        className="h-4 w-96 rounded max-w-full" 
        style={{ backgroundColor: colors.textMuted, opacity: 0.2 }}
      ></div>
    </div>
  );
};


const Settings= () => {
  const [isLoading, setIsLoading] = useState(true);
  

  const { theme, colors } = useThemeStore(); 


  const currentColors = colors || {
    background: theme === 'dark' ? '#050b14' : '#f3f4f6',
    surface: theme === 'dark' ? '#121a2f' : '#ffffff',
    text: theme === 'dark' ? '#ffffff' : '#111827',
    textMuted: theme === 'dark' ? '#8b99af' : '#6b7280',
    primary: theme === 'dark' ? '#4fa8ff' : '#2563eb', 
    border: theme === 'dark' ? '#1c273a' : '#e5e7eb',
  };

  useEffect(() => {
   
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      className="flex-grow p-6 md:p-8 min-h-screen transition-colors duration-300"
      style={{ backgroundColor: currentColors.background }}
    >
      {isLoading ? (
        <SettingsSkeleton colors={currentColors} />
      ) : (
        <div 
          className="rounded-2xl p-8 border transition-all duration-300 shadow-sm"
          style={{ 
            backgroundColor: currentColors.surface,
            borderColor: currentColors.border 
          }}
        >
         
          
            <p class="text-sm uppercase tracking-[0.35em] text-cyan-400">Settings</p>
          
          
    
         <h2 class="mt-2 text-2xl font-semibold">Preferences and integrations</h2>
          
          
         <p class="mt-2 text-slate-500 dark:text-slate-300">Theme mode, API credentials, and dashboard preferences are managed here.</p>
        </div>
      )}
    </div>
  );
};

export default Settings;