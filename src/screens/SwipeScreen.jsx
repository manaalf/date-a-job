import { useState, useRef, useCallback } from 'react';
import { BottomNav } from '../components/BottomNav.jsx';
import { Avatar } from '../components/Avatar.jsx';
import { Match } from '../components/Match.jsx';
import { IcoX, IcoBookmark, IcoBell, IcoPin, IcoArrowUp } from '../icons.jsx';
import { SWIPE_DECK } from '../data/jobs.js';

const SWIPE_THRESHOLD = 90;

function SwipeCard({ job, style, onPass, onSave, isTop }) {
  const [pos, setPos] = useState({ x: 0, y: 0, rot: 0 });
  const [gone, setGone] = useState(null);
  const dragging = useRef(false);
  const start = useRef({ x: 0, y: 0 });

  const flyOut = useCallback((dir) => {
    const tx = dir === 'save' ? 600 : -600;
    const rot = dir === 'save' ? 28 : -28;
    setPos({ x: tx, y: 0, rot });
    setGone(dir);
    setTimeout(() => { dir === 'save' ? onSave() : onPass(); }, 280);
  }, [onSave, onPass]);

  const handleStart = (e) => {
    if (!isTop) return;
    dragging.current = true;
    const pt = e.touches ? e.touches[0] : e;
    start.current = { x: pt.clientX, y: pt.clientY };
  };

  const handleMove = useCallback((e) => {
    if (!dragging.current) return;
    const pt = e.touches ? e.touches[0] : e;
    const dx = pt.clientX - start.current.x;
    const dy = pt.clientY - start.current.y;
    setPos({ x: dx, y: dy * 0.4, rot: dx * 0.07 });
  }, []);

  const handleEnd = useCallback(() => {
    if (!dragging.current) return;
    dragging.current = false;
    if (pos.x > SWIPE_THRESHOLD) flyOut('save');
    else if (pos.x < -SWIPE_THRESHOLD) flyOut('pass');
    else setPos({ x: 0, y: 0, rot: 0 });
  }, [pos.x, flyOut]);

  const swipeProgress = Math.min(Math.abs(pos.x) / SWIPE_THRESHOLD, 1);
  const isSaving = pos.x > 20;
  const isPassing = pos.x < -20;

  return (
    <div
      onMouseDown={handleStart}
      onMouseMove={handleMove}
      onMouseUp={handleEnd}
      onMouseLeave={handleEnd}
      onTouchStart={handleStart}
      onTouchMove={handleMove}
      onTouchEnd={handleEnd}
      style={{
        position: 'absolute',
        left: 18, right: 18,
        userSelect: 'none',
        cursor: isTop ? 'grab' : 'default',
        transform: `translateX(${pos.x}px) translateY(${pos.y}px) rotate(${pos.rot}deg)`,
        transition: gone || (!dragging.current && pos.x === 0)
          ? 'transform 0.28s cubic-bezier(.2,.8,.3,1), opacity 0.28s'
          : 'none',
        opacity: gone ? 0 : 1,
        zIndex: isTop ? 2 : 1,
        ...style,
      }}
    >
      {/* swipe direction indicators */}
      {isTop && (
        <>
          <div style={{
            position: 'absolute', top: 24, left: 20, zIndex: 10,
            opacity: isPassing ? swipeProgress : 0,
            transition: 'opacity 0.1s',
          }}>
            <div style={{
              padding: '6px 14px', borderRadius: 8,
              border: '2px solid #9e3326', color: '#9e3326',
              fontFamily: 'var(--mono)', fontSize: 13,
              letterSpacing: '0.12em', textTransform: 'uppercase',
              fontWeight: 600,
            }}>Pass</div>
          </div>
          <div style={{
            position: 'absolute', top: 24, right: 20, zIndex: 10,
            opacity: isSaving ? swipeProgress : 0,
            transition: 'opacity 0.1s',
          }}>
            <div style={{
              padding: '6px 14px', borderRadius: 8,
              border: '2px solid #0d7268', color: '#0d7268',
              fontFamily: 'var(--mono)', fontSize: 13,
              letterSpacing: '0.12em', textTransform: 'uppercase',
              fontWeight: 600,
            }}>Save</div>
          </div>
        </>
      )}

      <div className="card" style={{
        borderRadius: 22, overflow: 'hidden',
        boxShadow: '0 30px 60px rgba(15,55,50,.18)',
        animation: isTop ? 'cardIn 0.35s cubic-bezier(.2,.8,.3,1)' : 'none',
      }}>
        {/* company + match */}
        <div style={{ padding: '22px 22px 18px', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
          <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
            <Avatar company={job.company} size={48} />
            <div>
              <div className="mono" style={{ fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--ink-3)' }}>
                {job.company}
              </div>
              <div style={{ marginTop: 6, display: 'flex', alignItems: 'center', gap: 5, color: 'var(--ink-2)', fontSize: 13 }}>
                <IcoPin width={13} height={13} /> {job.location}
              </div>
            </div>
          </div>
          <Match score={job.score} />
        </div>

        <div className="hair" style={{ margin: '0 22px' }} />

        {/* title + skills */}
        <div style={{ padding: '22px 22px 18px' }}>
          <h2 className="serif" style={{ fontSize: 34, letterSpacing: '-0.028em', lineHeight: 1.04 }}>
            {job.title.split(' ').map((w, i) =>
              i === 1 ? <span key={i} className="serif-it"> {w} </span> : w + ' '
            )}
          </h2>
          <div style={{ marginTop: 14, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {job.skills.map(s => (
              <span key={s} className="chip skill" style={{ height: 26, padding: '0 10px', fontSize: 12 }}>{s}</span>
            ))}
          </div>
        </div>

        <div className="hair" style={{ margin: '0 22px' }} />

        {/* salary + mode */}
        <div style={{ padding: '18px 22px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div className="mono" style={{ fontSize: 9.5, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--ink-3)' }}>
              Compensation
            </div>
            <div style={{ marginTop: 4, fontFamily: 'var(--serif)', fontSize: 20, letterSpacing: '-0.02em' }}>
              {job.salary}
            </div>
          </div>
          <span className="chip mode">{job.mode}</span>
        </div>

        <div style={{ padding: '0 22px 20px', textAlign: 'center' }}>
          <button style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            color: '#0d7268', fontSize: 13.5,
            borderBottom: '1px solid #0d7268', paddingBottom: 2,
          }}>
            Read the full role <IcoArrowUp width={13} height={13} />
          </button>
        </div>
      </div>
    </div>
  );
}

export function SwipeScreen({ navigate, onSave }) {
  const [deck, setDeck] = useState(SWIPE_DECK);
  const [gone, setGone] = useState([]);

  const handlePass = useCallback(() => {
    setGone(g => [...g, deck[0]?.id]);
    setDeck(d => d.slice(1));
  }, [deck]);

  const handleSave = useCallback(() => {
    onSave(deck[0]);
    setGone(g => [...g, deck[0]?.id]);
    setDeck(d => d.slice(1));
  }, [deck, onSave]);

  const remaining = deck.length;

  return (
    <div className="daj daj-shell" style={{ background: 'var(--cream)' }}>
      {/* gradient header */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 280,
        background: 'linear-gradient(180deg, #0d7268 0%, #1BB89E 70%, #90d4c5 100%)',
        zIndex: 0,
      }} />

      {/* top bar */}
      <div style={{ position: 'relative', zIndex: 1, padding: '54px 22px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: 9, background: '#fff', display: 'grid', placeItems: 'center', boxShadow: '0 2px 6px rgba(0,0,0,.12)' }}>
            <img src="/logo.png" alt="" width={22} height={22} style={{ display: 'block', objectFit: 'contain' }} />
          </div>
          <div style={{ color: 'rgba(255,255,255,.9)', fontFamily: 'var(--serif)', fontSize: 16, letterSpacing: '-0.01em' }}>
            For Alex
          </div>
        </div>
        <button style={{ width: 38, height: 38, borderRadius: 999, background: 'rgba(255,255,255,.18)', color: '#fff', display: 'grid', placeItems: 'center', backdropFilter: 'blur(10px)' }}>
          <IcoBell width={18} height={18} />
        </button>
      </div>

      {/* progress dots */}
      <div style={{ position: 'relative', zIndex: 1, padding: '18px 24px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
        <div style={{ display: 'flex', gap: 6 }}>
          {Array.from({ length: Math.min(5, remaining) }).map((_, i) => (
            <div key={i} style={{ width: i === 0 ? 22 : 6, height: 6, borderRadius: 3, background: i === 0 ? '#fff' : 'rgba(255,255,255,.35)' }} />
          ))}
        </div>
        <div className="mono" style={{ color: 'rgba(255,255,255,.8)', fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase' }}>
          {remaining} to go
        </div>
      </div>

      {/* card stack */}
      <div style={{ position: 'relative', zIndex: 1, flex: 1, margin: '22px 0 0' }}>
        {remaining === 0 ? (
          <div style={{ padding: '40px 24px', textAlign: 'center' }}>
            <div style={{ fontFamily: 'var(--serif)', fontSize: 28, color: '#fff', letterSpacing: '-0.02em', marginBottom: 12 }}>
              You've seen <span style={{ fontStyle: 'italic' }}>all</span> roles
            </div>
            <div style={{ color: 'rgba(255,255,255,.7)', fontSize: 15, marginBottom: 24 }}>
              Check your saved jobs or adjust your preferences.
            </div>
            <button
              onClick={() => navigate('saved')}
              style={{ padding: '14px 28px', borderRadius: 14, background: '#fff', color: '#0d7268', fontSize: 15, fontFamily: 'var(--sans)', fontWeight: 500 }}
            >
              View saved jobs
            </button>
          </div>
        ) : (
          <>
            {/* peeking card behind */}
            {deck[1] && (
              <SwipeCard
                key={deck[1].id}
                job={deck[1]}
                isTop={false}
                onPass={() => {}}
                onSave={() => {}}
                style={{ transform: 'scale(0.94) translateY(14px)', zIndex: 1 }}
              />
            )}
            {/* top card */}
            <SwipeCard
              key={deck[0].id}
              job={deck[0]}
              isTop
              onPass={handlePass}
              onSave={handleSave}
            />
          </>
        )}
      </div>

      {/* action buttons */}
      {remaining > 0 && (
        <div style={{ position: 'relative', zIndex: 1, padding: '0 24px 16px', display: 'flex', gap: 14, flexShrink: 0 }}>
          <button
            onClick={handlePass}
            style={{
              flex: 1, height: 60, borderRadius: 18,
              background: '#fff', border: '1px solid var(--hair)',
              color: '#9e3326', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
              fontSize: 15, boxShadow: 'var(--sh-2)', fontFamily: 'var(--sans)',
            }}
          >
            <IcoX width={18} height={18} /> Pass
          </button>
          <button
            onClick={handleSave}
            style={{
              flex: 1.4, height: 60, borderRadius: 18,
              background: '#0d7268', color: '#fff',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
              fontSize: 15, boxShadow: '0 14px 30px rgba(13,114,104,.30)',
              fontFamily: 'var(--sans)',
            }}
          >
            <IcoBookmark width={18} height={18} /> Save it
          </button>
        </div>
      )}

      <BottomNav active="swipe" navigate={navigate} />
    </div>
  );
}
