import { Avatar } from '../components/Avatar.jsx';
import { Match } from '../components/Match.jsx';
import { IcoBack, IcoPin, IcoExt, IcoArrow } from '../icons.jsx';
import { SAVED_JOBS } from '../data/jobs.js';

export function JobDetailScreen({ job, navigate }) {
  const j = job || SAVED_JOBS[0];

  return (
    <div className="daj daj-shell" style={{ background: 'var(--cream)' }}>
      {/* sticky top bar */}
      <div style={{ padding: '52px 20px 18px', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
        <button
          onClick={() => navigate('saved')}
          style={{ width: 36, height: 36, borderRadius: 12, border: '1px solid var(--hair)', display: 'grid', placeItems: 'center', background: '#fff' }}
        >
          <IcoBack width={16} height={16} />
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <img src="/logo.png" alt="" width={22} height={22} style={{ display: 'block', objectFit: 'contain' }} />
          <span style={{ fontFamily: 'var(--serif)', fontSize: 16, letterSpacing: '-0.01em', color: 'var(--ink)' }}>
            date<span style={{ fontStyle: 'italic', color: 'var(--ink-3)' }}>–</span>a<span style={{ fontStyle: 'italic', color: 'var(--ink-3)' }}>–</span>job
          </span>
        </div>
        <Match score={j.score} tone={j.fit === 'high' ? 'high' : j.fit === 'mid' ? 'mid' : 'low'} />
      </div>

      {/* scrollable body */}
      <div className="scroll" style={{ flex: 1, overflowY: 'auto' }}>
        {/* company hero */}
        <div style={{ padding: '24px 22px 28px', background: '#fff' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
            <Avatar company={j.company} size={58} />
            <div style={{ flex: 1 }}>
              <div className="mono" style={{ fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--ink-3)' }}>
                {j.dept}
              </div>
              <div style={{ marginTop: 6, fontFamily: 'var(--serif)', fontSize: 24, letterSpacing: '-0.02em', color: 'var(--ink)' }}>
                {j.company}
              </div>
              <div style={{ marginTop: 6, display: 'flex', alignItems: 'center', gap: 10, color: 'var(--ink-2)', fontSize: 13 }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
                  <IcoPin width={13} height={13} /> {j.location}
                </span>
                <span className="chip mode" style={{ height: 22, fontSize: 11 }}>{j.mode}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="hair" />

        {/* title + salary */}
        <div style={{ padding: '30px 22px 24px' }}>
          <h1 className="serif" style={{ fontSize: 40, letterSpacing: '-0.03em', lineHeight: 1.02 }}>
            {j.title.split(' ').slice(0, -1).join(' ')}
            <span className="serif-it"> {j.title.split(' ').slice(-1)}</span>
          </h1>
          <div style={{ marginTop: 14, display: 'flex', alignItems: 'baseline', gap: 10 }}>
            <div className="serif" style={{ fontSize: 22, color: '#0d7268', letterSpacing: '-0.02em' }}>{j.salary}</div>
            <div className="mono" style={{ fontSize: 10.5, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--ink-3)' }}>per year</div>
          </div>
        </div>

        <div className="hair" style={{ margin: '0 22px' }} />

        {/* about */}
        <div style={{ padding: '24px 22px' }}>
          <div className="eyebrow">About the role</div>
          <p style={{ marginTop: 12, fontSize: 15, lineHeight: 1.65, color: 'var(--ink)' }}>
            {j.about}
          </p>
        </div>

        <div className="hair" style={{ margin: '0 22px' }} />

        {/* skills */}
        <div style={{ padding: '24px 22px' }}>
          <div className="eyebrow">Skills</div>
          <div style={{ marginTop: 12, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {j.skills.map(s => (
              <span key={s} className="chip skill" style={{ height: 32, padding: '0 13px', fontSize: 13 }}>{s}</span>
            ))}
            {j.gaps.map(g => (
              <span key={g} className="chip gap" style={{ height: 32, padding: '0 13px', fontSize: 13 }}>{g} — needed</span>
            ))}
          </div>
        </div>

        <div className="hair" style={{ margin: '0 22px' }} />

        {/* requirements */}
        <div style={{ padding: '24px 22px 28px' }}>
          <div className="eyebrow">Requirements</div>
          <ul style={{ marginTop: 14, listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 11 }}>
            {j.requirements.map(r => (
              <li key={r} style={{ display: 'flex', alignItems: 'baseline', gap: 12, fontSize: 14.5 }}>
                <span style={{ width: 5, height: 5, borderRadius: 99, background: '#0d7268', display: 'inline-block', marginTop: 7, flex: '0 0 5px' }} />
                {r}
              </li>
            ))}
          </ul>
        </div>

        {/* adzuna link */}
        <div style={{ padding: '0 22px 28px' }}>
          <a
            href={j.adzunaUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: 'var(--ink-2)', fontSize: 13.5, borderBottom: '1px solid var(--hair)', paddingBottom: 3, textDecoration: 'none' }}
          >
            Original posting · Adzuna <IcoExt width={13} height={13} />
          </a>
        </div>
      </div>

      {/* sticky CTA */}
      <div style={{ padding: '14px 18px 24px', background: '#fff', borderTop: '1px solid var(--hair)', flexShrink: 0 }}>
        <button className="cta" onClick={() => navigate('apply', j)}>
          Generate my application <IcoArrow width={18} height={18} />
        </button>
      </div>
    </div>
  );
}
