import { useState, useEffect } from 'react';
import api from '../api/axios'; 
import useThemeStore from '../store/themeStore'; 
import SettingsSkeleton from './SettingsSkeleton'; 
import { toast } from 'react-toastify'; // <-- استيراد toast

const Settings = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { theme, toggleTheme } = useThemeStore(); 

  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [passwordData, setPasswordData] = useState({
    email: '', 
    otp: '',
    newPassword: '',
    confirmPassword: ''
  });

  const currentColors = {
    background: theme === 'dark' ? '#050b14' : '#f3f4f6',
    surface: theme === 'dark' ? '#121a2f' : '#ffffff',
    text: theme === 'dark' ? '#ffffff' : '#111827',
    textMuted: theme === 'dark' ? '#8b99af' : '#6b7280',
    primary: theme === 'dark' ? '#4fa8ff' : '#2563eb', 
    border: theme === 'dark' ? '#1c273a' : '#e5e7eb',
  };

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Fetch current user data on mount to get the email
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await api.get('/auth/me');
        const userEmail = data?.user?.email || data?.data?.email || data?.email;
        
        if (userEmail) {
          setPasswordData(prev => ({ ...prev, email: userEmail }));
        }
      } catch (error) {
        console.error("Failed to fetch user data", error);
        toast.error('Failed to authenticate user. Please login again.'); // <-- استخدام Toast
      } finally {
        setIsLoading(false); 
      }
    };

    fetchUser();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
  };

  // 1. Send OTP
  const handleSendOtp = async () => {
    if (!passwordData.email) {
      toast.error('Could not fetch your email. Please refresh the page.'); // <-- استخدام Toast
      return;
    }

    setIsSendingOtp(true);

    try {
      const { data } = await api.post('/auth/forgot-password/send-otp', { 
        email: passwordData.email 
      });

      setOtpSent(true);
      toast.success(data.message || 'OTP has been sent to your email successfully!'); // <-- Toast Success

    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to send OTP. Please try again.'); // <-- Toast Error
    } finally {
      setIsSendingOtp(false);
    }
  };

  // 2. Verify OTP and Change Password
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    if (!otpSent) {
      toast.error('Please send the OTP first.');
      return;
    }
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('New passwords do not match.');
      return;
    }
    if (passwordData.newPassword.length < 8) {
      toast.error('Password must be at least 8 characters long.');
      return;
    }

    setIsSubmitting(true);

    try {
      const { data } = await api.post('/auth/forgot-password/verify-otp', {
        email: passwordData.email,
        otp: passwordData.otp,
        newPassword: passwordData.newPassword
      });

      toast.success(data.message || 'Password updated successfully!'); // <-- Toast Success
      setTimeout(() => handleCancel(), 2000);

    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update password. Check your OTP.'); // <-- Toast Error
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setShowPasswordForm(false);
    setOtpSent(false);
    setPasswordData(prev => ({ ...prev, otp: '', newPassword: '', confirmPassword: '' }));
  };

  return (
    <div className="flex-grow p-6 md:p-8 min-h-screen transition-colors duration-300" style={{ backgroundColor: currentColors.background }}>
      {isLoading ? (
        <SettingsSkeleton colors={currentColors} />
      ) : (
        <div className="rounded-2xl p-8 border transition-all duration-300 shadow-sm" style={{ backgroundColor: currentColors.surface, borderColor: currentColors.border, color: currentColors.text }}>
          
          <div className="mb-8">
            <p className="text-sm uppercase tracking-[0.35em]" style={{ color: currentColors.primary }}>Settings</p>
            <h2 className="mt-2 text-2xl font-semibold">Preferences and integrations</h2>
            <p className="mt-2" style={{ color: currentColors.textMuted }}>Theme mode, API credentials, and dashboard preferences are managed here.</p>
          </div>

          <div className="border-t pt-8 mb-8" style={{ borderColor: currentColors.border }}>
            <h3 className="text-lg font-medium mb-4">Appearance</h3>
            <div className="flex gap-4">
              <button onClick={() => theme === 'dark' && toggleTheme()} className={`px-4 py-2 rounded-lg border font-medium transition-all ${theme === 'light' ? 'ring-2 ring-offset-2' : 'opacity-70 hover:opacity-100'}`} style={{ backgroundColor: '#ffffff', color: '#111827', borderColor: currentColors.border, ringColor: currentColors.primary, outlineColor: currentColors.background }}>Light Mode</button>
              <button onClick={() => theme === 'light' && toggleTheme()} className={`px-4 py-2 rounded-lg border font-medium transition-all ${theme === 'dark' ? 'ring-2 ring-offset-2' : 'opacity-70 hover:opacity-100'}`} style={{ backgroundColor: '#121a2f', color: '#ffffff', borderColor: currentColors.border, ringColor: currentColors.primary, outlineColor: currentColors.background }}>Dark Mode</button>
            </div>
          </div>

          <div className="border-t pt-8" style={{ borderColor: currentColors.border }}>
            <h3 className="text-lg font-medium mb-1">Security</h3>
            <p className="text-sm mb-6" style={{ color: currentColors.textMuted }}>Update your password to keep your account secure.</p>

            {!showPasswordForm ? (
              <button onClick={() => setShowPasswordForm(true)} className="px-6 py-2 rounded-lg font-medium transition-opacity" style={{ backgroundColor: currentColors.primary, color: '#ffffff' }}>Change Password</button>
            ) : (
              <form onSubmit={handlePasswordSubmit} className="max-w-md space-y-4 animate-in fade-in slide-in-from-top-4 duration-300">
                
                <div>
                  <label className="block text-sm font-medium mb-1" style={{ color: currentColors.textMuted }}>Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={passwordData.email}
                    disabled 
                    readOnly
                    className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 bg-transparent transition-colors opacity-60 cursor-not-allowed"
                    style={{ borderColor: currentColors.border, color: currentColors.text, outlineColor: currentColors.primary }}
                  />
                  <p className="text-xs mt-1" style={{ color: currentColors.textMuted }}>OTP will be sent to this verified email.</p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1" style={{ color: currentColors.textMuted }}>Verification Code (OTP)</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      name="otp"
                      value={passwordData.otp}
                      onChange={handleInputChange}
                      placeholder="Enter code"
                      required={otpSent}
                      disabled={!otpSent} 
                      className="flex-grow px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 bg-transparent transition-colors tracking-widest disabled:opacity-50"
                      style={{ borderColor: currentColors.border, color: currentColors.text, outlineColor: currentColors.primary }}
                    />
                    <button
                      type="button"
                      onClick={handleSendOtp}
                      disabled={isSendingOtp || !passwordData.email} 
                      className="px-4 py-2 rounded-lg font-medium transition-opacity disabled:opacity-50 whitespace-nowrap text-sm"
                      style={{ backgroundColor: otpSent ? 'transparent' : currentColors.primary, color: otpSent ? currentColors.text : '#ffffff', border: otpSent ? `1px solid ${currentColors.border}` : 'none' }}
                    >
                      {isSendingOtp ? 'Sending...' : (otpSent ? 'Resend OTP' : 'Send OTP')}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1" style={{ color: currentColors.textMuted }}>New Password</label>
                  <input
                    type="password"
                    name="newPassword"
                    value={passwordData.newPassword}
                    onChange={handleInputChange}
                    required
                    disabled={!otpSent}
                    className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 bg-transparent transition-colors disabled:opacity-50"
                    style={{ borderColor: currentColors.border, color: currentColors.text, outlineColor: currentColors.primary }}
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
                    disabled={!otpSent}
                    className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 bg-transparent transition-colors disabled:opacity-50"
                    style={{ borderColor: currentColors.border, color: currentColors.text, outlineColor: currentColors.primary }}
                  />
                </div>

                <div className="flex gap-3 mt-6 pt-2">
                  <button type="submit" disabled={isSubmitting || !otpSent} className="px-6 py-2 rounded-lg font-medium transition-opacity disabled:opacity-50 flex-1" style={{ backgroundColor: currentColors.primary, color: '#ffffff' }}>
                    {isSubmitting ? 'Verifying...' : 'Verify & Change'}
                  </button>
                  <button type="button" onClick={handleCancel} className="px-6 py-2 rounded-lg font-medium border transition-colors hover:bg-black/5 dark:hover:bg-white/5" style={{ borderColor: currentColors.border, color: currentColors.text }}>
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;