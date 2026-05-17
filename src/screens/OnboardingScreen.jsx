import { useState } from 'react';
import { Bug, Wordmark } from '../components/Logo.jsx';
import { IcoArrow, IcoCheck, IcoUpload } from '../icons.jsx';

function OnboardHeader({ step, total = 3, label, onBack }) {
  return (
    <div style={{ padding: '52px 28px 22px', background: '#fff', borderBottom: '1px solid var(--hair)', flexShrink: 0 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Bug size={26} />
          <Wordmark />
        </div>
        {step > 1 && (
          <button
            className="chip ghost"
            style={{ height: 30, padding: '0 14px', cursor: 'pointer' }}
            onClick={onBack}
          >
            Back
          </button>
        )}
      </div>
      <div style={{ display: 'flex', gap: 6, marginTop: 20 }}>
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            style={{
              flex: 1, height: 3, borderRadius: 2,
              background: i < step ? '#0d7268' : 'var(--hair)',
              transition: 'background 0.3s',
            }}
          />
        ))}
      </div>
      <div className="eyebrow" style={{ marginTop: 14, textAlign: 'center' }}>
        {label} · {step} of {total}
      </div>
    </div>
  );
}

// Step 1 — Upload résumé
function Step1({ onNext }) {
  const [uploaded, setUploaded] = useState(false);

  return (
    <div className="daj daj-shell">
      <OnboardHeader step={1} label="Start Here" />
      <div style={{ flex: 1, padding: '36px 28px 24px', display: 'flex', flexDirection: 'column', overflow: 'auto' }}>
        <div style={{ textAlign: 'center' }}>
          <h1 className="serif" style={{ fontSize: 46, letterSpacing: '-0.025em', lineHeight: 1 }}>
            Start <span className="serif-it">here</span>.
          </h1>
          <p style={{ marginTop: 14, color: 'var(--ink-2)', fontSize: 14.5, lineHeight: 1.5, maxWidth: 280, marginInline: 'auto' }}>
            Upload your résumé and we'll assemble your profile.<br />Takes about two minutes.
          </p>
        </div>

        <div style={{ marginTop: 32 }}>
          <div
            onClick={() => setUploaded(true)}
            style={{
              border: `1.5px dashed ${uploaded ? '#0d7268' : 'rgba(27,184,158,0.45)'}`,
              borderRadius: 20, padding: '34px 24px', textAlign: 'center',
              background: uploaded ? '#eaf7f5' : '#eaf7f5',
              cursor: 'pointer', transition: 'all 0.2s',
            }}
          >
            <div style={{
              width: 52, height: 52, borderRadius: 14, background: '#fff',
              display: 'grid', placeItems: 'center', margin: '0 auto 16px',
              border: '1px solid var(--hair)',
              color: uploaded ? '#0d7268' : '#0d7268',
            }}>
              {uploaded
                ? <IcoCheck width={22} height={22} />
                : <IcoUpload width={22} height={22} />
              }
            </div>
            <div style={{ fontSize: 15.5, letterSpacing: '-0.01em', color: 'var(--ink)' }}>
              {uploaded ? 'resume_alex_johnson.pdf' : 'Tap to upload résumé'}
            </div>
            <div className="mono" style={{ marginTop: 8, fontSize: 10.5, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--ink-3)' }}>
              {uploaded ? '· Uploaded ·' : 'pdf · max 10mb'}
            </div>
          </div>
        </div>

        <div style={{ marginTop: 28 }}>
          <div className="eyebrow" style={{ marginBottom: 12 }}>What happens next</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {[
              ['I.', 'We extract your skills automatically'],
              ['II.', 'You tell us your goals'],
              ['III.', 'We surface your matches'],
            ].map(([n, t]) => (
              <div key={n} style={{ display: 'flex', alignItems: 'baseline', gap: 14 }}>
                <div className="serif-it" style={{ minWidth: 24, color: '#0d7268', fontSize: 18, letterSpacing: '-0.02em' }}>{n}</div>
                <div style={{ fontSize: 14.5, color: 'var(--ink)' }}>{t}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ flex: 1 }} />
        <button
          className={`cta ${uploaded ? '' : 'disabled'}`}
          style={{ marginTop: 24 }}
          onClick={uploaded ? onNext : undefined}
        >
          Continue <IcoArrow width={18} height={18} />
        </button>
      </div>
    </div>
  );
}

// Step 2 — About you
function Step2({ onNext, onBack }) {
  return (
    <div className="daj daj-shell">
      <OnboardHeader step={2} label="About You" onBack={onBack} />
      <div style={{ flex: 1, padding: '34px 28px 24px', display: 'flex', flexDirection: 'column', overflow: 'auto' }}>
        <div style={{ textAlign: 'center' }}>
          <h1 className="serif" style={{ fontSize: 46, letterSpacing: '-0.025em', lineHeight: 1 }}>
            About <span className="serif-it">you</span>.
          </h1>
          <p style={{ marginTop: 12, color: 'var(--ink-2)', fontSize: 14.5 }}>Just the basics — we'll fill in the rest.</p>
        </div>

        <div style={{ marginTop: 28, display: 'flex', flexDirection: 'column', gap: 18 }}>
          {[
            { label: 'Full name', value: 'Alex Johnson', placeholder: '' },
            { label: 'Email', value: 'alex@email.com', placeholder: '' },
            { label: 'LinkedIn URL', value: '', placeholder: 'linkedin.com/in/yourname', opt: true },
            { label: 'GitHub URL', value: '', placeholder: 'github.com/yourhandle', opt: true },
          ].map(({ label, value, placeholder, opt }) => (
            <div key={label}>
              <div className="field-label">
                {label}
                {opt && <span className="opt">opt.</span>}
              </div>
              <input
                className="field-input"
                style={{ marginTop: 8 }}
                defaultValue={value}
                placeholder={placeholder}
              />
            </div>
          ))}
        </div>

        <div style={{ flex: 1 }} />
        <button className="cta" style={{ marginTop: 24 }} onClick={onNext}>
          Continue <IcoArrow width={18} height={18} />
        </button>
      </div>
    </div>
  );
}

// Step 3 — Your goals
function Step3({ onNext, onBack }) {
  const [industries, setIndustries] = useState(
    [['Technology', true], ['Finance', false], ['Consulting', false], ['Healthcare', false], ['Data & Analytics', true]]
  );
  const [work, setWork] = useState(
    [['Remote', true], ['Hybrid', true], ['On-site', false]]
  );

  const toggle = (arr, setArr, idx) => {
    setArr(arr.map((item, i) => i === idx ? [item[0], !item[1]] : item));
  };

  const Tile = ({ label, on, onToggle }) => (
    <button
      onClick={onToggle}
      style={{
        flex: '1 1 auto',
        minHeight: 54, padding: '0 18px',
        borderRadius: 14,
        border: on ? '1.5px solid #0d7268' : '1px solid var(--hair)',
        background: on ? '#eaf7f5' : '#fff',
        color: on ? '#0a5248' : 'var(--ink-2)',
        fontSize: 14.5, letterSpacing: '-0.005em',
        cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8,
        textAlign: 'left', transition: 'all 0.15s',
        fontFamily: 'var(--sans)',
      }}
    >
      <span>{label}</span>
      {on && (
        <span style={{
          width: 18, height: 18, borderRadius: 999,
          background: '#0d7268', color: '#fff',
          display: 'grid', placeItems: 'center', flexShrink: 0,
        }}>
          <IcoCheck width={12} height={12} />
        </span>
      )}
    </button>
  );

  return (
    <div className="daj daj-shell">
      <OnboardHeader step={3} label="Your Goals" onBack={onBack} />
      <div style={{ flex: 1, padding: '34px 28px 24px', display: 'flex', flexDirection: 'column', overflow: 'auto' }}>
        <div style={{ textAlign: 'center' }}>
          <h1 className="serif" style={{ fontSize: 46, letterSpacing: '-0.025em', lineHeight: 1 }}>
            Your <span className="serif-it">goals</span>.
          </h1>
          <p style={{ marginTop: 12, color: 'var(--ink-2)', fontSize: 14.5 }}>We use these to surface the right roles.</p>
        </div>

        <div style={{ marginTop: 32 }}>
          <div className="eyebrow" style={{ marginBottom: 12 }}>
            Target industries <span style={{ opacity: .6, marginLeft: 6 }}>· pick all that apply</span>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {industries.map(([l, on], i) => (
              <Tile key={l} label={l} on={on} onToggle={() => toggle(industries, setIndustries, i)} />
            ))}
          </div>
        </div>

        <div style={{ marginTop: 26 }}>
          <div className="eyebrow" style={{ marginBottom: 12 }}>
            Work type <span style={{ opacity: .6, marginLeft: 6 }}>· pick all that apply</span>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            {work.map(([l, on], i) => (
              <Tile key={l} label={l} on={on} onToggle={() => toggle(work, setWork, i)} />
            ))}
          </div>
        </div>

        <div style={{ flex: 1 }} />
        <button className="cta" style={{ marginTop: 24 }} onClick={onNext}>
          Build my profile <IcoArrow width={18} height={18} />
        </button>
      </div>
    </div>
  );
}

export function OnboardingScreen({ navigate }) {
  const [step, setStep] = useState(1);

  if (step === 1) return <Step1 onNext={() => setStep(2)} />;
  if (step === 2) return <Step2 onNext={() => setStep(3)} onBack={() => setStep(1)} />;
  return <Step3 onNext={() => navigate('swipe')} onBack={() => setStep(2)} />;
}
