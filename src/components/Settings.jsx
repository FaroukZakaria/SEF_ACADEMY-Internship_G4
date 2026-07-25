import { useState, useEffect } from 'react';
import useThemeStore from '../store/themeStore'; 
import SettingsSkeleton from './SettingsSkeleton'; 

const Settings = () => {
  const [isLoading, setIsLoading] = useState(true);
  
  
  const { theme, toggleTheme } = useThemeStore(); 

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  
  const currentColors = {
    background: theme === 'dark' ? '#050b14' : '#f3f4f6',
    surface: theme === 'dark' ? '#121a2f' : '#ffffff',
    text: theme === 'dark' ? '#ffffff' : '#111827',
    textMuted: theme === 'dark' ? '#8b99af' : '#6b7280',
    primary: theme === 'dark' ? '#4fa8ff' : '#2563eb', 
    border: theme === 'dark' ? '#1c273a' : '#e5e7eb',
  };

  useEffect(() => {
    // If you are using Tailwind's "darkMode: 'class'", this ensures the 
    // HTML element gets the correct class when the theme changes
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessage({ type: 'error', text: 'New passwords do not match.' });
      return;
    }

    if (passwordData.newPassword.length < 8) {
      setMessage({ type: 'error', text: 'Password must be at least 8 characters long.' });
      return;
    }

    setIsSubmitting(true);

    try {
      const token = localStorage.getItem('token'); 

      const response = await fetch('https://e-commerce-api-3wara.vercel.app/api/v1/users/change-password', {
        method: 'PATCH', 
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify({
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to update password. Please check your current password.');
      }

      setMessage({ type: 'success', text: 'Password updated successfully!' });
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });

    } catch (error) {
      setMessage({ type: 'error', text: error.message });
    } finally {
      setIsSubmitting(false);
    }
  };

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
            borderColor: currentColors.border,
            color: currentColors.text
          }}
        >
          {/* Header */}
          <div className="mb-8">
            <p className="text-sm uppercase tracking-[0.35em]" style={{ color: currentColors.primary }}>Settings</p>
            <h2 className="mt-2 text-2xl font-semibold">Preferences and integrations</h2>
            <p className="mt-2" style={{ color: currentColors.textMuted }}>
              Theme mode, API credentials, and dashboard preferences are managed here.
            </p>
          </div>

          {/* Theme Section */}
          <div className="border-t pt-8 mb-8" style={{ borderColor: currentColors.border }}>
            <h3 className="text-lg font-medium mb-4">Appearance</h3>
            <div className="flex gap-4">
              <button
                onClick={() => theme === 'dark' && toggleTheme()}
                className={`px-4 py-2 rounded-lg border font-medium transition-all ${theme === 'light' ? 'ring-2 ring-offset-2' : 'opacity-70 hover:opacity-100'}`}
                style={{ 
                  backgroundColor: '#ffffff', 
                  color: '#111827',
                  borderColor: currentColors.border,
                  ringColor: currentColors.primary,
                  outlineColor: currentColors.background 
                }}
              >
                Light Mode
              </button>
              <button
                onClick={() => theme === 'light' && toggleTheme()}
                className={`px-4 py-2 rounded-lg border font-medium transition-all ${theme === 'dark' ? 'ring-2 ring-offset-2' : 'opacity-70 hover:opacity-100'}`}
                style={{ 
                  backgroundColor: '#121a2f', 
                  color: '#ffffff',
                  borderColor: currentColors.border,
                  ringColor: currentColors.primary,
                  outlineColor: currentColors.background
                }}
              >
                Dark Mode
              </button>
            </div>
          </div>

          {/* Security / Password Section */}
          <div className="border-t pt-8" style={{ borderColor: currentColors.border }}>
            <h3 className="text-lg font-medium mb-1">Security</h3>
            <p className="text-sm mb-6" style={{ color: currentColors.textMuted }}>
              Update your password to keep your account secure.
            </p>

            <form onSubmit={handlePasswordSubmit} className="max-w-md space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: currentColors.textMuted }}>Current Password</label>
                <input
                  type="password"
                  name="currentPassword"
                  value={passwordData.currentPassword}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 bg-transparent transition-colors"
                  style={{ 
                    borderColor: currentColors.border,
                    color: currentColors.text,
                    outlineColor: currentColors.primary
                  }}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: currentColors.textMuted }}>New Password</label>
                <input
                  type="password"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 bg-transparent transition-colors"
                  style={{ 
                    borderColor: currentColors.border,
                    color: currentColors.text,
                    outlineColor: currentColors.primary
                  }}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: currentColors.textMuted }}>Confirm New Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 bg-transparent transition-colors"
                  style={{ 
                    borderColor: currentColors.border,
                    color: currentColors.text,
                    outlineColor: currentColors.primary
                  }}
                />
              </div>

              {message.text && (
                <div className={`p-3 rounded-md text-sm ${message.type === 'error' ? 'bg-red-500/10 text-red-500' : 'bg-green-500/10 text-green-500'}`}>
                  {message.text}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2 rounded-lg font-medium transition-opacity disabled:opacity-50 mt-2"
                style={{ 
                  backgroundColor: currentColors.primary,
                  color: '#ffffff'
                }}
              >
                {isSubmitting ? 'Updating...' : 'Change Password'}
              </button>
            </form>
          </div>

        </div>
      )}
    </div>
  );
};

export default Settings;