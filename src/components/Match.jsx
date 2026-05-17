// Editorial typographic match score — serif number + mono "match" label
// NOT a colored circle. Design system spec.
const TONE_COLORS = {
  high:    { fg: '#0d7268' }, // var(--teal-deep)
  mid:     { fg: '#b08900' }, // var(--gold)
  low:     { fg: '#9e3326' }, // var(--coral-deep)
};

export function Match({ score, size = 'md', tone }) {
  const t = tone || (score >= 80 ? 'high' : score >= 70 ? 'mid' : 'low');
  const c = TONE_COLORS[t];
  const big = size === 'lg';

  return (
    <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'flex-end', lineHeight: 1 }}>
      <div
        style={{
          fontFamily: 'var(--serif)',
          fontSize: big ? 56 : 38,
          color: c.fg,
          letterSpacing: '-0.04em',
          fontWeight: 400,
          lineHeight: 1,
        }}
      >
        {score}
        <span style={{ fontSize: big ? 22 : 14, verticalAlign: 'top', marginLeft: 1 }}>%</span>
      </div>
      <div
        style={{
          fontFamily: 'var(--mono)',
          fontSize: big ? 10 : 9.5,
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: c.fg,
          opacity: 0.75,
          marginTop: big ? 8 : 5,
        }}
      >
        Match
      </div>
    </div>
  );
}
