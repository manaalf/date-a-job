import { useState } from 'react';
import { Avatar } from '../components/Avatar.jsx';
import { Match } from '../components/Match.jsx';
import { IcoBack, IcoPin, IcoBolt, IcoArrowUp, IcoWarn, IcoCheck, IcoArrow } from '../icons.jsx';
import { SAVED_JOBS } from '../data/jobs.js';

const STEPS = ['Fit Check', 'Résumé', 'Cover Letter', 'Apply'];

function StepHeader({ job, step, onBack }) {
  return (
    <div style={{ padding: '52px 22px 22px', background: '#fff', borderBottom: '1px solid var(--hair)', flexShrink: 0 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <button
          onClick={onBack}
          style={{ width: 36, height: 36, borderRadius: 12, border: '1px solid var(--hair)', display: 'grid', placeItems: 'center' }}
        >
          <IcoBack width={16} height={16} />
        </button>
        <div style={{ flex: 1 }}>
          <div className="eyebrow">Applying to</div>
          <div style={{ marginTop: 4, fontFamily: 'var(--serif)', fontSize: 22, letterSpacing: '-0.02em', lineHeight: 1 }}>
            {job.title.split(' ').slice(0, 2).join(' ')} <span style={{ fontStyle: 'italic' }}>at</span> {job.company}
          </div>
        </div>
      </div>

      {/* progress bar */}
      <div style={{ marginTop: 18, display: 'flex', gap: 6 }}>
        {STEPS.map((_, i) => (
          <div key={i} style={{ flex: 1, height: 3, borderRadius: 2, background: i < step ? '#0d7268' : 'var(--hair)', transition: 'background 0.3s' }} />
        ))}
      </div>
      <div style={{ marginTop: 10, display: 'flex', justifyContent: 'space-between' }}>
        <div className="mono" style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#0d7268' }}>
          {STEPS[step - 1]} · step {step} of {STEPS.length}
        </div>
        <div className="mono" style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--ink-3)' }}>
          ~ {5 - step} min
        </div>
      </div>
    </div>
  );
}

// Step 1 — Fit Check
function Step1({ job, onNext }) {
  const isMid = job.fit === 'mid';
  const isLow = job.fit === 'low';

  return (
    <div className="scroll" style={{ flex: 1, overflowY: 'auto', padding: '22px 18px 18px' }}>
      {/* job card */}
      <div className="card" style={{ overflow: 'hidden' }}>
        <div style={{ padding: '20px 20px 18px', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
          <div style={{ display: 'flex', gap: 14 }}>
            <Avatar company={job.company} size={48} />
            <div>
              <div className="mono" style={{ fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--ink-3)' }}>{job.company}</div>
              <div style={{ marginTop: 6, display: 'flex', alignItems: 'center', gap: 5, color: 'var(--ink-2)', fontSize: 13 }}>
                <IcoPin width={13} height={13} /> {job.location}
              </div>
            </div>
          </div>
          <Match score={job.score} />
        </div>
        <div className="hair" style={{ margin: '0 20px' }} />
        <div style={{ padding: '20px' }}>
          <div className="serif" style={{ fontSize: 26, letterSpacing: '-0.02em', lineHeight: 1.05 }}>
            {job.title}
          </div>
          <div style={{ marginTop: 10, display: 'flex', alignItems: 'baseline', gap: 8, fontSize: 13.5, color: 'var(--ink-2)' }}>
            <span className="serif" style={{ fontSize: 16, color: 'var(--ink)' }}>{job.salary}</span>
            <span className="dot" />
            <span>{job.mode}</span>
          </div>
        </div>
      </div>

      {/* fit callout */}
      {(isMid || isLow) && (
        <div style={{
          marginTop: 16, padding: '18px',
          borderRadius: 18,
          background: isLow ? '#fde8e4' : '#fdf3d0',
          border: `1px solid ${isLow ? 'rgba(158,51,38,0.22)' : 'rgba(176,137,0,0.22)'}`,
          display: 'flex', gap: 14, alignItems: 'flex-start',
        }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10, background: '#fff',
            color: isLow ? '#9e3326' : '#b08900',
            display: 'grid', placeItems: 'center', flex: '0 0 36px',
            border: `1px solid ${isLow ? 'rgba(158,51,38,0.22)' : 'rgba(176,137,0,0.22)'}`,
          }}>
            <IcoWarn width={18} height={18} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: 'var(--serif)', fontSize: 17, letterSpacing: '-0.015em', color: 'var(--ink)' }}>
              <span style={{ fontStyle: 'italic' }}>{isMid ? 'Mid' : 'Low'}</span> fit — {isMid ? 'worth applying.' : 'stretch role.'}
            </div>
            {job.gaps.length > 0 && (
              <div style={{ marginTop: 4, fontSize: 13.5, color: 'var(--ink-2)', lineHeight: 1.5 }}>
                Adding <b style={{ color: 'var(--ink)' }}>{job.gaps.join(' + ')}</b> would strengthen your application. We'll surface courses in step 3.
              </div>
            )}
          </div>
        </div>
      )}

      {/* what we generate */}
      <div style={{ marginTop: 18, padding: '18px', borderRadius: 18, background: 'var(--paper)', border: '1px dashed var(--hair)' }}>
        <div className="eyebrow">What we'll generate</div>
        <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 10 }}>
          {[
            ['Cover letter', 'tailored to this role'],
            ['Résumé', 'reordered to lead with metrics'],
            ['Interview prep', '3 likely questions + answers'],
          ].map(([a, b]) => (
            <div key={a} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderBottom: '1px dashed var(--hair)', paddingBottom: 8 }}>
              <div style={{ fontSize: 14 }}>{a}</div>
              <div style={{ fontSize: 12.5, color: 'var(--ink-3)', fontStyle: 'italic' }}>{b}</div>
            </div>
          ))}
        </div>
      </div>

      <button
        className="cta"
        style={{ marginTop: 18, background: '#9e3326', boxShadow: '0 6px 18px rgba(150,55,35,.22)' }}
        onClick={onNext}
      >
        <IcoBolt width={16} height={16} /> Generate my application
      </button>
    </div>
  );
}

// Step 2 — Résumé (loading → preview)
function Step2({ job, onNext }) {
  const [loading, setLoading] = useState(true);

  if (loading) {
    return (
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20, padding: '40px 28px' }}>
        <div style={{
          width: 56, height: 56, borderRadius: '50%',
          border: '3px solid var(--hair)',
          borderTop: '3px solid #0d7268',
          animation: 'spin 0.9s linear infinite',
        }} />
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontFamily: 'var(--serif)', fontSize: 22, letterSpacing: '-0.02em' }}>Tailoring your résumé</div>
          <div style={{ marginTop: 8, color: 'var(--ink-3)', fontSize: 14, fontStyle: 'italic' }}>Reordering for maximum impact…</div>
        </div>
        <button
          style={{ marginTop: 12, fontSize: 13, color: '#0d7268', borderBottom: '1px solid #0d7268', paddingBottom: 2, fontFamily: 'var(--sans)' }}
          onClick={() => setLoading(false)}
        >
          (Preview result)
        </button>
      </div>
    );
  }

  return (
    <div className="scroll" style={{ flex: 1, overflowY: 'auto', padding: '22px 18px 18px', display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div className="card" style={{ padding: '20px' }}>
        <div className="eyebrow" style={{ color: '#0d7268' }}>AI-tailored résumé</div>
        <div style={{ marginTop: 12, fontFamily: 'var(--serif)', fontSize: 22, letterSpacing: '-0.02em' }}>Alex Johnson</div>
        <div style={{ marginTop: 4, color: 'var(--ink-3)', fontSize: 13 }}>alex@email.com · linkedin.com/in/alexjohnson</div>
        <div className="hair" style={{ margin: '16px 0' }} />
        {[
          { section: 'Summary', text: `Data analyst with expertise in Python, SQL, and BigQuery. Proven track record building dashboards and A/B experiments for product decisions. Seeking to apply analytical skills to ${job.company}'s ${job.dept || 'data'} team.` },
          { section: 'Skills', text: 'Python · SQL · BigQuery · Tableau · Excel · Power BI' },
        ].map(({ section, text }) => (
          <div key={section} style={{ marginBottom: 14 }}>
            <div className="mono" style={{ fontSize: 9.5, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--ink-3)', marginBottom: 6 }}>{section}</div>
            <div style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--ink)' }}>{text}</div>
          </div>
        ))}
      </div>
      <button className="cta" onClick={onNext}>Continue <IcoArrow width={18} height={18} /></button>
    </div>
  );
}

// Step 3 — Cover Letter
function Step3({ job, onNext }) {
  const [loading, setLoading] = useState(true);

  if (loading) {
    return (
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20, padding: '40px 28px' }}>
        <div style={{
          width: 56, height: 56, borderRadius: '50%',
          border: '3px solid var(--hair)',
          borderTop: '3px solid #9e3326',
          animation: 'spin 0.9s linear infinite',
        }} />
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontFamily: 'var(--serif)', fontSize: 22, letterSpacing: '-0.02em' }}>Writing cover letter</div>
          <div style={{ marginTop: 8, color: 'var(--ink-3)', fontSize: 14, fontStyle: 'italic' }}>Matching tone to {job.company}…</div>
        </div>
        <button
          style={{ marginTop: 12, fontSize: 13, color: '#0d7268', borderBottom: '1px solid #0d7268', paddingBottom: 2, fontFamily: 'var(--sans)' }}
          onClick={() => setLoading(false)}
        >
          (Preview result)
        </button>
      </div>
    );
  }

  return (
    <div className="scroll" style={{ flex: 1, overflowY: 'auto', padding: '22px 18px 18px', display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div className="card" style={{ padding: '20px' }}>
        <div className="eyebrow" style={{ color: '#9e3326' }}>AI-generated cover letter</div>
        <div style={{ marginTop: 12, fontSize: 14.5, lineHeight: 1.72, color: 'var(--ink)' }}>
          Dear Hiring Manager,<br /><br />
          I'm excited to apply for the <strong>{job.title}</strong> role at <strong>{job.company}</strong>. With a strong foundation in SQL, Python, and data visualization, I've delivered actionable insights that drove product decisions and measurable outcomes.<br /><br />
          At my most recent role, I built executive dashboards in Tableau that reduced reporting time by 40%, and designed A/B experiments that informed $2M in feature investment decisions.<br /><br />
          I'd love to bring this skillset to {job.company}'s {job.dept || 'team'}.<br /><br />
          Best,<br />Alex Johnson
        </div>
      </div>
      <button className="cta" onClick={onNext}>Continue <IcoArrow width={18} height={18} /></button>
    </div>
  );
}

// Step 4 — Submit / Receipt
function Step4({ job, onDone }) {
  const [submitted, setSubmitted] = useState(false);

  if (!submitted) {
    return (
      <div className="scroll" style={{ flex: 1, overflowY: 'auto', padding: '22px 18px 18px', display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div className="card" style={{ padding: '20px' }}>
          <div className="eyebrow">Ready to submit</div>
          <div style={{ marginTop: 12, fontFamily: 'var(--serif)', fontSize: 20, letterSpacing: '-0.02em' }}>
            {job.title} at {job.company}
          </div>
          {[
            ['Résumé', 'Tailored · 1 page'],
            ['Cover letter', 'Generated · 3 paragraphs'],
            ['Application', `Via Adzuna · ${job.company} portal`],
          ].map(([l, v]) => (
            <div key={l} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid var(--hair)' }}>
              <div style={{ fontSize: 14, color: 'var(--ink)' }}>{l}</div>
              <div style={{ fontSize: 13, color: 'var(--ink-3)', fontStyle: 'italic' }}>{v}</div>
            </div>
          ))}
        </div>
        <button className="cta" onClick={() => setSubmitted(true)}>
          <IcoBolt width={16} height={16} /> Submit application
        </button>
      </div>
    );
  }

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 28px', gap: 20 }}>
      <div style={{
        width: 72, height: 72, borderRadius: '50%',
        background: '#eaf7f5', color: '#0d7268',
        display: 'grid', placeItems: 'center',
        border: '1px solid rgba(13,114,104,0.22)',
      }}>
        <IcoCheck width={32} height={32} />
      </div>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontFamily: 'var(--serif)', fontSize: 28, letterSpacing: '-0.025em' }}>
          Application <span style={{ fontStyle: 'italic' }}>sent</span>
        </div>
        <div style={{ marginTop: 8, color: 'var(--ink-2)', fontSize: 14.5, lineHeight: 1.5 }}>
          {job.company} has been notified.<br />We'll track your status in Dashboard.
        </div>
      </div>
      <div className="mono" style={{ fontSize: 10.5, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--ink-3)', marginTop: 8 }}>
        · Application #2024-0142 ·
      </div>
      <button className="cta" style={{ marginTop: 8 }} onClick={onDone}>
        Back to saved jobs
      </button>
    </div>
  );
}

export function ApplyScreen({ job, navigate }) {
  const [step, setStep] = useState(1);
  const j = job || SAVED_JOBS[0];

  return (
    <div className="daj daj-shell">
      <StepHeader job={j} step={step} onBack={() => step > 1 ? setStep(s => s - 1) : navigate('jobdetail', j)} />
      {step === 1 && <Step1 job={j} onNext={() => setStep(2)} />}
      {step === 2 && <Step2 job={j} onNext={() => setStep(3)} />}
      {step === 3 && <Step3 job={j} onNext={() => setStep(4)} />}
      {step === 4 && <Step4 job={j} onDone={() => navigate('saved')} />}
    </div>
  );
}
