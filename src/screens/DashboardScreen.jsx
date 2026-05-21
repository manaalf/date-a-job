import { useState } from 'react';
import { BottomNav } from '../components/BottomNav.jsx';
import { Avatar } from '../components/Avatar.jsx';
import { IcoRibbon, IcoChev } from '../icons.jsx';
import { DASHBOARD_MONTHS, APPLICATION_HISTORY } from '../data/jobs.js';
import { Bug, Wordmark } from '../components/Logo.jsx';

const STATUS_STYLES = {
  Applied:   { bg: 'var(--cream-2)',  fg: 'var(--ink-2)',    dot: '#c5cfd8' },
  Viewed:    { bg: '#fdf3d0',         fg: '#7a5200',         dot: '#b08900' },
  Interview: { bg: '#d0f0ea',         fg: '#0a5248',         dot: '#1BB89E' },
  Rejected:  { bg: '#fde8e4',         fg: '#7a2018',         dot: '#c04030' },
};

function StatusPill({ status }) {
  const s = STATUS_STYLES[status] || STATUS_STYLES.Applied;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      height: 24, padding: '0 10px', borderRadius: 999,
      background: s.bg, color: s.fg, fontSize: 11.5, letterSpacing: '-0.005em',
      flexShrink: 0,
    }}>
      <span style={{ width: 5, height: 5, borderRadius: 99, background: s.dot }} />
      {status}
    </span>
  );
}

export function DashboardScreen({ navigate }) {
  const [selBar, setSelBar] = useState(null);
  const maxV = Math.max(...DASHBOARD_MONTHS.map(m => m.value));

  return (
    <div className="daj daj-shell">
      {/* header */}
      <div style={{ padding: '52px 24px 22px', background: '#fff', borderBottom: '1px solid var(--hair)', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Bug size={26} /><Wordmark />
          </div>
          <button className="chip ghost" style={{ height: 32, padding: '0 12px', fontSize: 12.5, gap: 6, display: 'inline-flex', alignItems: 'center' }}>
            All time <IcoChev width={11} height={11} style={{ transform: 'rotate(90deg)' }} />
          </button>
        </div>
        <div style={{ marginTop: 14 }}>
          <div className="eyebrow">Your activity</div>
          <h1 className="serif" style={{ marginTop: 6, fontSize: 38, letterSpacing: '-0.025em', lineHeight: 1 }}>
            The <span className="serif-it">dashboard</span>
          </h1>
        </div>
      </div>

      {/* content */}
      <div className="scroll" style={{ flex: 1, overflowY: 'auto', padding: '18px 18px 22px', display: 'flex', flexDirection: 'column', gap: 14 }}>
        {/* stats row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
          {[
            ['28',  'Applied',   'var(--ink)'],
            ['18%', 'Response',  '#0d7268'],
            ['1',   'Interview', '#b08900'],
          ].map(([n, l, c]) => (
            <div key={l} className="card" style={{ padding: '18px 14px', textAlign: 'left' }}>
              <div className="metric-num" style={{ fontSize: 32, color: c }}>{n}</div>
              <div className="metric-label" style={{ marginTop: 8 }}>{l}</div>
            </div>
          ))}
        </div>

        {/* bar chart */}
        <div className="card" style={{ padding: '20px 20px 16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <div>
              <div className="eyebrow">Applications over time</div>
              <div style={{ marginTop: 6, fontFamily: 'var(--serif)', fontSize: 22, letterSpacing: '-0.02em' }}>
                Last six months
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div className="serif" style={{ fontSize: 32, color: '#0d7268', letterSpacing: '-0.025em', lineHeight: 1 }}>28</div>
              <div className="mono" style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--ink-3)', marginTop: 4 }}>Total</div>
            </div>
          </div>

          <div style={{ marginTop: 18, height: 110, display: 'flex', alignItems: 'flex-end', gap: 14, justifyContent: 'space-between' }}>
            {DASHBOARD_MONTHS.map((m, i) => {
              const h = (m.value / maxV) * 90;
              const isSel = selBar === i;
              const isCur = m.current;
              return (
                <div
                  key={m.label}
                  style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, cursor: 'pointer' }}
                  onClick={() => setSelBar(isSel ? null : i)}
                >
                  <div className="serif" style={{ fontSize: 14, color: isSel || isCur ? '#0d7268' : 'var(--ink-3)', letterSpacing: '-0.015em' }}>
                    {m.value}
                  </div>
                  <div style={{
                    width: '100%', maxWidth: 24, height: Math.max(h, 4),
                    borderRadius: 6,
                    background: isSel
                      ? 'var(--ink)'
                      : isCur
                        ? 'linear-gradient(180deg, #1BB89E 0%, #0d7268 100%)'
                        : 'rgba(208,240,234,0.85)',
                    transition: 'background 0.2s',
                  }} />
                  <div className="mono" style={{ fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: isSel || isCur ? '#0d7268' : 'var(--ink-3)' }}>
                    {m.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* insight callout */}
        <div className="card" style={{ padding: '18px 20px', display: 'flex', gap: 14, alignItems: 'flex-start', background: 'var(--paper)' }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: '#d0f0ea', color: '#0d7268', display: 'grid', placeItems: 'center', flex: '0 0 36px' }}>
            <IcoRibbon width={18} height={18} />
          </div>
          <div style={{ fontSize: 14, lineHeight: 1.55, color: 'var(--ink)', flex: 1 }}>
            Tech roles are matching at{' '}
            <b style={{ fontFamily: 'var(--serif)', fontSize: 17 }}>86%</b>
            {' '}on average. Adding{' '}
            <span style={{ color: '#0d7268', fontFamily: 'var(--serif)', fontStyle: 'italic' }}>dbt</span>
            {' '}unlocks <b>6</b> more high-fit roles.
          </div>
        </div>

        {/* application history */}
        <div className="card" style={{ padding: '20px 20px 8px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <div className="eyebrow">Application history</div>
            <div className="mono" style={{ fontSize: 10.5, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--ink-3)' }}>
              {APPLICATION_HISTORY.length} roles
            </div>
          </div>

          <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column' }}>
            {APPLICATION_HISTORY.map((r, i) => (
              <div
                key={i}
                style={{
                  padding: '14px 0',
                  display: 'flex', alignItems: 'center', gap: 12,
                  borderTop: i === 0 ? 'none' : '1px dashed var(--hair)',
                }}
              >
                <Avatar company={r.company} size={36} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: 'var(--serif)', fontSize: 16, letterSpacing: '-0.015em' }}>{r.title}</div>
                  <div style={{ marginTop: 2, display: 'flex', alignItems: 'center', gap: 6, color: 'var(--ink-3)', fontSize: 12.5 }}>
                    <span>{r.company}</span>
                    <span className="dot" />
                    <span>{r.date}</span>
                  </div>
                </div>
                <StatusPill status={r.status} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <BottomNav active="dashboard" navigate={navigate} />
    </div>
  );
}
