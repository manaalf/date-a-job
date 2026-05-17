import { Bug, Wordmark } from '../components/Logo.jsx';
import { BottomNav } from '../components/BottomNav.jsx';
import { IcoCheck, IcoClock, IcoExt } from '../icons.jsx';
import { SKILL_GAPS, CERTIFICATIONS, USER } from '../data/jobs.js';

// Platform color map — all hex, no oklch
const PLATFORM_COLORS = {
  'Udemy':              { bg: '#ede9fe', fg: '#6d28d9' },
  'Udemy · Rock the JVM': { bg: '#ede9fe', fg: '#6d28d9' },
  'Coursera · EPFL':   { bg: '#dbeafe', fg: '#1d4ed8' },
  'Coursera · Google': { bg: '#dbeafe', fg: '#1d4ed8' },
  'Coursera · IBM':    { bg: '#dbeafe', fg: '#1d4ed8' },
  'dbt Learn':         { bg: '#ffedd5', fg: '#c2410c' },
  'Microsoft Learn':   { bg: '#e0f2fe', fg: '#0369a1' },
};

function CourseCard({ course }) {
  const pc = PLATFORM_COLORS[course.platform] || { bg: 'var(--cream-2)', fg: 'var(--ink-2)' };
  const isFree = course.price === 'Free' || course.price.startsWith('Free');

  return (
    <div
      className="card"
      style={{
        padding: '16px 18px',
        borderColor: course.highlighted ? '#0d7268' : 'var(--hair)',
        boxShadow: course.highlighted ? '0 0 0 1px #0d7268 inset, var(--sh-2)' : 'var(--sh-1)',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 10 }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <span style={{
              fontSize: 10.5, letterSpacing: '0.14em', textTransform: 'uppercase',
              fontFamily: 'var(--mono)', padding: '4px 8px', borderRadius: 5,
              background: pc.bg, color: pc.fg,
            }}>
              {course.platform}
            </span>
            {course.highlighted && (
              <span className="mono" style={{ fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#0d7268' }}>
                · Recommended
              </span>
            )}
          </div>
          <div style={{ fontFamily: 'var(--serif)', fontSize: 18, letterSpacing: '-0.015em', lineHeight: 1.2 }}>
            {course.title}
          </div>
          <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: 'var(--ink-3)' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
              <IcoClock width={11} height={11} /> {course.duration}
            </span>
            <span className="dot" />
            <span>{course.level}</span>
          </div>
        </div>
        <button style={{ color: 'var(--ink-3)', padding: 6, marginTop: -2 }}>
          <IcoExt width={14} height={14} />
        </button>
      </div>
      <div className="hair" style={{ margin: '12px 0 10px' }} />
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <div className="serif" style={{
          fontSize: 16,
          color: isFree ? '#0d7268' : 'var(--ink)',
          letterSpacing: '-0.02em',
        }}>
          {course.price}
        </div>
      </div>
    </div>
  );
}

function GapSection({ gap }) {
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', padding: '4px 4px 10px' }}>
        <div className="mono" style={{ fontSize: 11, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'var(--ink-2)' }}>
          {gap.skill}
        </div>
        <div className="mono" style={{ fontSize: 10.5, letterSpacing: '0.16em', color: 'var(--ink-3)' }}>
          {gap.courses.length} {gap.courses.length === 1 ? 'course' : 'courses'}
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {gap.courses.map(c => <CourseCard key={c.title} course={c} />)}
      </div>
    </div>
  );
}

export function SkillsScreen({ navigate }) {
  return (
    <div className="daj daj-shell">
      {/* header */}
      <div style={{ padding: '52px 24px 18px', background: '#fff', borderBottom: '1px solid var(--hair)', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        </div>
        <div style={{ marginTop: 18 }}>
          <div className="eyebrow">Profile · gap analysis · courses</div>
          <h1 className="serif" style={{ marginTop: 8, fontSize: 38, letterSpacing: '-0.025em', lineHeight: 1 }}>
            Skills & <span className="serif-it">learning</span>
          </h1>
        </div>
      </div>

      {/* content */}
      <div className="scroll" style={{ flex: 1, overflowY: 'auto', padding: '18px 18px 22px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        {/* your skills */}
        <div className="card" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <div className="eyebrow" style={{ color: '#0d7268' }}>Your skills</div>
            <div className="mono" style={{ fontSize: 10.5, letterSpacing: '0.16em', color: 'var(--ink-3)', textTransform: 'uppercase' }}>
              {USER.skills.length}
            </div>
          </div>
          <div style={{ marginTop: 14, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {USER.skills.map(s => (
              <span key={s} className="chip skill" style={{ height: 30, padding: '0 11px', fontSize: 12.5, gap: 6 }}>
                <IcoCheck width={12} height={12} /> {s}
              </span>
            ))}
          </div>
        </div>

        {/* skill gaps */}
        <div className="card" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <div className="eyebrow" style={{ color: '#9e3326' }}>Skill gaps</div>
            <div className="mono" style={{ fontSize: 10.5, letterSpacing: '0.16em', color: 'var(--ink-3)', textTransform: 'uppercase' }}>
              Based on 7 saved roles
            </div>
          </div>
          <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 0 }}>
            {SKILL_GAPS.map((gap, i) => (
              <div key={gap.skill} style={{
                padding: '14px 0',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                borderTop: i === 0 ? 'none' : '1px dashed var(--hair)',
              }}>
                <div>
                  <div style={{ fontFamily: 'var(--serif)', fontSize: 22, letterSpacing: '-0.02em' }}>{gap.skill}</div>
                  <div style={{ marginTop: 2, fontSize: 12.5, color: 'var(--ink-3)' }}>
                    Needed by <span style={{ color: 'var(--ink-2)' }}>{gap.companies.join(' · ')}</span>
                  </div>
                </div>
                <span style={{
                  fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase',
                  color: '#9e3326', background: '#fde8e4',
                  padding: '5px 10px', borderRadius: 999,
                }}>
                  {gap.roles} {gap.roles === 1 ? 'role' : 'roles'}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ textAlign: 'center', padding: '4px 0' }}>
          <div className="eyebrow">· Close the gaps ·</div>
        </div>

        {/* gap courses */}
        {SKILL_GAPS.map(gap => <GapSection key={gap.skill} gap={gap} />)}

        <div style={{ textAlign: 'center', padding: '4px 0' }}>
          <div className="eyebrow">· Certifications ·</div>
        </div>

        <div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {CERTIFICATIONS.map(c => <CourseCard key={c.title} course={c} />)}
          </div>
        </div>
      </div>

      <BottomNav active="skills" navigate={navigate} />
    </div>
  );
}
