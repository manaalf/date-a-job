import { useState } from 'react';
import { Bug, Wordmark } from '../components/Logo.jsx';
import { BottomNav } from '../components/BottomNav.jsx';
import { IcoBolt, IcoPen, IcoBell, IcoShield, IcoHelp, IcoSignout, IcoChev } from '../icons.jsx';
import { USER } from '../data/jobs.js';

export function ProfileScreen({ navigate }) {
  const [notif, setNotif] = useState(true);

  return (
    <div className="daj daj-shell">
      {/* header */}
      <div style={{ padding: '52px 24px 22px', background: '#fff', borderBottom: '1px solid var(--hair)', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          </div>
          {/* premium badge */}
          <button style={{
            height: 32, padding: '0 14px', borderRadius: 999,
            background: 'linear-gradient(180deg, #c04030 0%, #9e3326 100%)',
            color: '#fff', fontSize: 12.5, letterSpacing: '-0.005em',
            display: 'inline-flex', alignItems: 'center', gap: 6,
            boxShadow: '0 4px 12px rgba(150,55,35,.22)',
            fontFamily: 'var(--sans)',
          }}>
            <IcoBolt width={13} height={13} /> Premium
          </button>
        </div>

        {/* user card */}
        <div style={{ marginTop: 24, display: 'flex', alignItems: 'flex-end', gap: 18 }}>
          <div style={{
            width: 80, height: 80, borderRadius: 22,
            background: 'linear-gradient(135deg, #1BB89E 0%, #0d7268 100%)',
            color: '#fff', display: 'grid', placeItems: 'center',
            fontFamily: 'var(--serif)', fontSize: 32, letterSpacing: '-0.02em',
            boxShadow: '0 12px 24px rgba(13,114,104,.18)',
          }}>
            {USER.initials}
          </div>
          <div style={{ flex: 1, paddingBottom: 6 }}>
            <div className="eyebrow">Member since {USER.memberSince}</div>
            <h1 className="serif" style={{ marginTop: 4, fontSize: 32, letterSpacing: '-0.025em', lineHeight: 1.05 }}>
              {USER.name.split(' ')[0]} <span className="serif-it">{USER.name.split(' ')[1]}</span>
            </h1>
            <div style={{ marginTop: 4, color: 'var(--ink-3)', fontSize: 13.5 }}>{USER.email}</div>
          </div>
        </div>

        {/* stats */}
        <div style={{ marginTop: 22, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', borderTop: '1px solid var(--hair)', paddingTop: 18 }}>
          {[['47', 'Swiped'], ['12', 'Saved'], ['3', 'Applied']].map(([n, l], i) => (
            <div key={l} style={{ textAlign: 'center', borderLeft: i > 0 ? '1px solid var(--hair)' : 'none' }}>
              <div className="metric-num">{n}</div>
              <div className="metric-label">{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* content */}
      <div className="scroll" style={{ flex: 1, overflowY: 'auto', padding: '18px 18px 22px', display: 'flex', flexDirection: 'column', gap: 14 }}>
        {/* skills */}
        <div className="card" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <div className="eyebrow">Extracted skills</div>
            <button className="mono" style={{ fontSize: 10.5, letterSpacing: '0.16em', color: '#0d7268', textTransform: 'uppercase', cursor: 'pointer' }}>
              + Add
            </button>
          </div>
          <div style={{ marginTop: 14, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {USER.skills.map(s => (
              <span key={s} className="chip skill" style={{ height: 32, padding: '0 13px', fontSize: 13 }}>{s}</span>
            ))}
          </div>
        </div>

        {/* preferences */}
        <div className="card" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <div className="eyebrow">Job preferences</div>
            <button style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: '#0d7268', fontSize: 12.5, fontFamily: 'var(--sans)', cursor: 'pointer' }}>
              <IcoPen width={12} height={12} /> Edit
            </button>
          </div>
          <div style={{ marginTop: 14, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {['Technology', 'Finance', 'Consulting', 'Hybrid'].map(s => (
              <span key={s} className="chip" style={{ height: 30, padding: '0 12px', fontSize: 12.5, background: 'var(--cream-2)' }}>{s}</span>
            ))}
          </div>
        </div>

        {/* settings */}
        <div className="card" style={{ padding: '4px 20px' }}>
          {[
            { key: 'bell',   label: 'Push notifications', control: 'toggle' },
            { key: 'shield', label: 'Privacy settings',   control: 'chev' },
            { key: 'help',   label: 'Help & support',     control: 'chev' },
          ].map((row, i) => {
            const icons = { bell: IcoBell, shield: IcoShield, help: IcoHelp };
            const IconComp = icons[row.key];
            return (
              <div key={row.label} style={{
                display: 'flex', alignItems: 'center', gap: 14,
                padding: '16px 0',
                borderTop: i === 0 ? 'none' : '1px solid var(--hair)',
              }}>
                <div style={{ width: 34, height: 34, borderRadius: 10, background: 'var(--cream-2)', color: 'var(--ink-2)', display: 'grid', placeItems: 'center' }}>
                  <IconComp width={16} height={16} />
                </div>
                <div style={{ flex: 1, fontSize: 14.5 }}>{row.label}</div>
                {row.control === 'toggle' ? (
                  <div
                    onClick={() => setNotif(v => !v)}
                    style={{
                      width: 42, height: 24, borderRadius: 99,
                      background: notif ? '#0d7268' : '#c5cfd8',
                      position: 'relative', cursor: 'pointer', flexShrink: 0,
                      transition: 'background 0.2s',
                    }}
                  >
                    <div style={{
                      position: 'absolute', top: 2, left: notif ? 20 : 2,
                      width: 20, height: 20, borderRadius: 99,
                      background: '#fff', boxShadow: '0 1px 3px rgba(0,0,0,.18)',
                      transition: 'left 0.2s',
                    }} />
                  </div>
                ) : (
                  <IcoChev width={14} height={14} style={{ color: 'var(--ink-3)' }} />
                )}
              </div>
            );
          })}
        </div>

        {/* sign out */}
        <button className="card" style={{ padding: '18px 20px', display: 'flex', alignItems: 'center', gap: 14, color: '#9e3326', cursor: 'pointer' }}>
          <div style={{ width: 34, height: 34, borderRadius: 10, background: '#fde8e4', color: '#9e3326', display: 'grid', placeItems: 'center' }}>
            <IcoSignout width={16} height={16} />
          </div>
          <div style={{ flex: 1, fontSize: 14.5, textAlign: 'left' }}>Sign out</div>
          <IcoChev width={14} height={14} />
        </button>
      </div>

      <BottomNav active="profile" navigate={navigate} />
    </div>
  );
}
