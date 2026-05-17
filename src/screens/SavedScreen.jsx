import { useState } from 'react';
import { BottomNav } from '../components/BottomNav.jsx';
import { Avatar } from '../components/Avatar.jsx';
import { Match } from '../components/Match.jsx';
import { IcoPin, IcoChev, IcoBook } from '../icons.jsx';
import { SAVED_JOBS } from '../data/jobs.js';

const FIT_TABS = ['High fit', 'Mid fit', 'Low fit'];
const FIT_MAP = { 'High fit': 'high', 'Mid fit': 'mid', 'Low fit': 'low' };

export function SavedScreen({ navigate }) {
  const [activeTab, setActiveTab] = useState('High fit');

  const filtered = SAVED_JOBS.filter(j => j.fit === FIT_MAP[activeTab]);
  const counts = { 'High fit': 3, 'Mid fit': 3, 'Low fit': 1 };

  return (
    <div className="daj daj-shell">
      {/* header */}
      <div style={{ padding: '52px 24px 18px', background: '#fff', borderBottom: '1px solid var(--hair)', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div className="eyebrow">Your shortlist</div>
            <h1 className="serif" style={{ fontSize: 36, letterSpacing: '-0.025em', marginTop: 6, lineHeight: 1 }}>
              Saved <span className="serif-it">jobs</span>
            </h1>
            <div style={{ marginTop: 6, color: 'var(--ink-2)', fontSize: 13.5 }}>
              {SAVED_JOBS.length} roles · last added 2d ago
            </div>
          </div>
          <button
            onClick={() => navigate('skills')}
            style={{
              height: 38, padding: '0 14px', borderRadius: 999,
              border: '1px solid var(--hair)', background: '#eaf7f5',
              color: '#0d7268', display: 'inline-flex', alignItems: 'center', gap: 8,
              fontSize: 13, fontFamily: 'var(--sans)',
            }}
          >
            <IcoBook width={14} height={14} /> Skills
          </button>
        </div>

        {/* tabs */}
        <div style={{ marginTop: 18, display: 'flex', gap: 8 }}>
          {FIT_TABS.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                height: 36, padding: '0 14px', borderRadius: 999,
                background: activeTab === tab ? '#0d7268' : 'transparent',
                color: activeTab === tab ? '#fff' : 'var(--ink-2)',
                border: activeTab === tab ? '1px solid #0d7268' : '1px solid var(--hair)',
                display: 'inline-flex', alignItems: 'center', gap: 6,
                fontSize: 13, letterSpacing: '-0.005em', cursor: 'pointer',
                fontFamily: 'var(--sans)',
              }}
            >
              {tab}
              <span className="mono" style={{ opacity: .7, fontSize: 10.5, letterSpacing: '0.06em' }}>
                · {counts[tab]}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* job list */}
      <div className="scroll" style={{ flex: 1, overflowY: 'auto', padding: '18px 18px 22px', display: 'flex', flexDirection: 'column', gap: 14 }}>
        {filtered.map(job => (
          <div
            key={job.id}
            className="card"
            style={{ padding: '18px 18px', cursor: 'pointer' }}
            onClick={() => navigate('jobdetail', job)}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
              <div style={{ display: 'flex', gap: 12, flex: 1, minWidth: 0 }}>
                <Avatar company={job.company} size={42} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="mono" style={{ fontSize: 9.5, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--ink-3)' }}>
                    {job.company}
                  </div>
                  <div style={{ marginTop: 4, fontFamily: 'var(--serif)', fontSize: 22, letterSpacing: '-0.02em', lineHeight: 1.1 }}>
                    {job.title}
                  </div>
                  <div style={{ marginTop: 6, display: 'flex', alignItems: 'center', gap: 5, color: 'var(--ink-2)', fontSize: 12.5 }}>
                    <IcoPin width={12} height={12} /> {job.location}
                  </div>
                </div>
              </div>
              <Match score={job.score} />
            </div>

            <div style={{ marginTop: 14, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {job.skills.map(s => (
                <span key={s} className="chip skill" style={{ height: 24, padding: '0 9px', fontSize: 11.5 }}>{s}</span>
              ))}
              {job.gaps.map(g => (
                <span key={g} className="chip gap" style={{ height: 24, padding: '0 9px', fontSize: 11.5 }}>{g} — gap</span>
              ))}
            </div>

            <div className="hair" style={{ margin: '14px 0' }} />

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
                <div className="serif" style={{ fontSize: 17, letterSpacing: '-0.02em' }}>{job.salary}</div>
                <div className="mono" style={{ fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--ink-3)' }}>· {job.mode}</div>
              </div>
              <button style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: '#0d7268', fontSize: 13, fontFamily: 'var(--sans)' }}>
                Open role <IcoChev width={13} height={13} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <BottomNav active="saved" navigate={navigate} />
    </div>
  );
}
