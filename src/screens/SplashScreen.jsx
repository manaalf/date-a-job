import { IcoArrow } from '../icons.jsx';

export function SplashScreen({ navigate }) {
  return (
    <div
      className="daj daj-shell"
      style={{
        background: 'linear-gradient(180deg, #0d7268 0%, #1BB89E 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* atmospheric orbs */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <div style={{
          position: 'absolute', top: -80, right: -60, width: 260, height: 260,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,255,255,.10), transparent 60%)',
        }} />
        <div style={{
          position: 'absolute', bottom: -100, left: -100, width: 320, height: 320,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,255,255,.08), transparent 60%)',
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(120% 80% at 50% 30%, transparent 60%, rgba(0,0,0,0.22) 100%)',
        }} />
      </div>

      {/* eyebrow row */}
      <div style={{
        position: 'relative',
        padding: '72px 32px 0',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <div className="mono" style={{ color: 'rgba(255,255,255,.55)', fontSize: 10, letterSpacing: '0.24em', textTransform: 'uppercase' }}>
          est. 2026
        </div>
        <div className="mono" style={{ color: 'rgba(255,255,255,.55)', fontSize: 10, letterSpacing: '0.24em', textTransform: 'uppercase' }}>
          v 1.0
        </div>
      </div>

      {/* hero */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        padding: '0 32px',
        marginTop: -40,
      }}>
        {/* logo card */}
        <div style={{
          width: 104, height: 104, borderRadius: 26, background: '#fff',
          display: 'grid', placeItems: 'center', marginBottom: 28,
          boxShadow: '0 30px 60px rgba(0,0,0,.18), 0 0 0 1px rgba(255,255,255,.3)',
        }}>
          <img src="/logo.png" alt="date-a-job" width={76} height={76} style={{ display: 'block', objectFit: 'contain' }} />
        </div>

        {/* wordmark */}
        <div style={{
          fontFamily: 'var(--serif)', color: '#fff',
          fontSize: 64, letterSpacing: '-0.035em',
          lineHeight: 1, textAlign: 'center',
        }}>
          date
          <span style={{ fontStyle: 'italic', color: 'rgba(255,255,255,.65)' }}>–</span>
          a
          <span style={{ fontStyle: 'italic', color: 'rgba(255,255,255,.65)' }}>–</span>
          job
        </div>

        <div style={{
          marginTop: 22,
          color: 'rgba(255,255,255,.85)',
          fontFamily: 'var(--serif)', fontStyle: 'italic',
          fontSize: 19, textAlign: 'center',
          lineHeight: 1.35, maxWidth: 280,
          letterSpacing: '-0.005em',
        }}>
          Where you are, meets<br />where you want to be.
        </div>
      </div>

      {/* CTAs */}
      <div style={{ position: 'relative', padding: '0 24px 40px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <button
          onClick={() => navigate('onboarding')}
          style={{
            height: 56, borderRadius: 16, background: '#fff',
            color: '#0d7268', fontSize: 15, letterSpacing: '-0.005em',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12,
            boxShadow: '0 14px 40px rgba(0,0,0,.16)',
            fontFamily: 'var(--sans)', fontWeight: 500,
          }}
        >
          Get started <IcoArrow width={18} height={18} />
        </button>

        <button
          onClick={() => navigate('swipe')}
          style={{
            height: 54, borderRadius: 16,
            background: 'transparent',
            border: '1px solid rgba(255,255,255,.4)',
            color: '#fff', fontSize: 15,
            fontFamily: 'var(--sans)',
          }}
        >
          Log in
        </button>

        <div style={{ marginTop: 12, textAlign: 'center', fontSize: 11.5, color: 'rgba(255,255,255,.55)' }}>
          By continuing you agree to our <u>Terms</u> and <u>Privacy Policy</u>
        </div>
      </div>
    </div>
  );
}
