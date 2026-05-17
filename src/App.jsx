import { useState } from 'react';
import { SplashScreen }     from './screens/SplashScreen.jsx';
import { OnboardingScreen } from './screens/OnboardingScreen.jsx';
import { SwipeScreen }      from './screens/SwipeScreen.jsx';
import { SavedScreen }      from './screens/SavedScreen.jsx';
import { JobDetailScreen }  from './screens/JobDetailScreen.jsx';
import { ApplyScreen }      from './screens/ApplyScreen.jsx';
import { SkillsScreen }     from './screens/SkillsScreen.jsx';
import { ProfileScreen }    from './screens/ProfileScreen.jsx';
import { DashboardScreen }  from './screens/DashboardScreen.jsx';

const SCREENS = [
  { key: 'splash',     label: 'Splash' },
  { key: 'onboarding', label: 'Onboarding' },
  { key: 'swipe',      label: 'Swipe Feed' },
  { key: 'saved',      label: 'Saved Jobs' },
  { key: 'jobdetail',  label: 'Job Detail' },
  { key: 'apply',      label: 'Apply Flow' },
  { key: 'skills',     label: 'Skills' },
  { key: 'profile',    label: 'Profile' },
  { key: 'dashboard',  label: 'Dashboard' },
];

export default function App() {
  const [screen, setScreen]       = useState('splash');
  const [selectedJob, setJob]     = useState(null);
  const [savedJobs, setSavedJobs] = useState([]);

  const navigate = (dest, job = null) => {
    setScreen(dest);
    if (job) setJob(job);
    window.scrollTo(0, 0);
  };

  const handleSave = (job) => {
    if (job && !savedJobs.find(j => j.id === job.id)) {
      setSavedJobs(prev => [...prev, job]);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px 0 40px',
      background: '#e0dbd2',
    }}>
      {/* screen label */}
      <div style={{
        fontFamily: "'Geist Mono', monospace",
        fontSize: 10, fontWeight: 500,
        color: 'rgba(0,0,0,0.35)',
        letterSpacing: '0.2em',
        textTransform: 'uppercase',
        marginBottom: 14,
      }}>
        {SCREENS.find(s => s.key === screen)?.label}
      </div>

      {/* phone chrome */}
      <div style={{
        width: 390,
        borderRadius: 44,
        overflow: 'hidden',
        boxShadow: '0 28px 80px rgba(0,0,0,0.22), 0 0 0 1px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.15)',
        background: '#f5f0e8',
      }}>
        {screen === 'splash'     && <SplashScreen     navigate={navigate} />}
        {screen === 'onboarding' && <OnboardingScreen navigate={navigate} />}
        {screen === 'swipe'      && <SwipeScreen      navigate={navigate} onSave={handleSave} />}
        {screen === 'saved'      && <SavedScreen      navigate={navigate} savedJobs={savedJobs} />}
        {screen === 'jobdetail'  && <JobDetailScreen  navigate={navigate} job={selectedJob} />}
        {screen === 'apply'      && <ApplyScreen      navigate={navigate} job={selectedJob} />}
        {screen === 'skills'     && <SkillsScreen     navigate={navigate} />}
        {screen === 'profile'    && <ProfileScreen    navigate={navigate} />}
        {screen === 'dashboard'  && <DashboardScreen  navigate={navigate} />}
      </div>

      {/* screen switcher — dev nav, remove for production */}
      <div style={{
        display: 'flex', flexWrap: 'wrap', gap: 6,
        marginTop: 20, justifyContent: 'center', maxWidth: 600,
      }}>
        {SCREENS.map(s => (
          <button
            key={s.key}
            onClick={() => navigate(s.key)}
            style={{
              padding: '5px 12px', borderRadius: 99,
              background: screen === s.key ? '#0d7268' : 'rgba(255,255,255,0.7)',
              color: screen === s.key ? '#fff' : '#666',
              fontSize: 11, fontWeight: 600,
              fontFamily: "'Geist Mono', monospace",
              letterSpacing: '0.04em',
              cursor: 'pointer',
              border: 'none',
              transition: 'all 0.15s',
            }}
          >
            {s.label}
          </button>
        ))}
      </div>
    </div>
  );
}
