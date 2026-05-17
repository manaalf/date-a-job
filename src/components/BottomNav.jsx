import { Bug } from './Logo.jsx';
import { IcoUser, IcoChart, IcoBookmark, IcoPen } from '../icons.jsx';

export function BottomNav({ active, navigate, savedCount = 0 }) {
  const isActive = (key) => active === key || (key === 'saved' && active === 'jobdetail');

  const NavItem = ({ navKey, label, icon }) => (
    <div
      className={`nav-item ${isActive(navKey) ? 'active' : ''}`}
      onClick={() => navigate(navKey)}
      style={{ position: 'relative' }}
    >
      {icon}
      <span>{label}</span>
      {navKey === 'saved' && savedCount > 0 && (
        <div style={{
          position: 'absolute', top: 8, right: 10,
          width: 16, height: 16, borderRadius: '50%',
          background: '#1BB89E',
          border: '2px solid rgba(250,249,247,0.96)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <span style={{ fontSize: 7.5, fontWeight: 800, color: '#fff' }}>{savedCount}</span>
        </div>
      )}
    </div>
  );

  const sz = { width: 20, height: 20 };

  return (
    <div className="nav">
      <NavItem navKey="profile"   label="Profile"   icon={<IcoUser   {...sz}/>} />
      <NavItem navKey="dashboard" label="Dashboard" icon={<IcoChart  {...sz}/>} />

      {/* Center raised logo FAB */}
      <div
        className={`nav-center ${active === 'swipe' ? 'active' : ''}`}
        onClick={() => navigate('swipe')}
      >
        <div className="nav-fab">
          <Bug size={28} />
        </div>
        <span style={{
          fontFamily: 'var(--mono)', fontSize: 9,
          letterSpacing: '0.12em', textTransform: 'uppercase',
          color: active === 'swipe' ? '#0d7268' : '#c5cfd8',
          marginTop: 3,
        }}>
          Swipe
        </span>
      </div>

      <NavItem navKey="saved"  label="Saved"  icon={<IcoBookmark {...sz}/>} />
      <NavItem navKey="skills" label="Skills" icon={<IcoPen      {...sz}/>} />
    </div>
  );
}
