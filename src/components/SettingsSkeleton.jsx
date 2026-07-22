

const SettingsSkeleton = () => {
  return (
    <div className="settings-card skeleton-wrapper">
      <div className="skeleton-text skeleton-label" style={{ width: '80px', height: '15px', marginBottom: '10px' }}></div>
      <div className="skeleton-text skeleton-title" style={{ width: '300px', height: '30px', marginBottom: '8px' }}></div>
      <div className="skeleton-text skeleton-desc" style={{ width: '450px', height: '20px' }}></div>
    </div>
  );
};

export default SettingsSkeleton;