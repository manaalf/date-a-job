// All colors are hex — no oklch, no color-mix
const COMPANY = {
  Google:  { letter: 'G',   bg: '#dbeafe', fg: '#1d4ed8', border: 'rgba(29,78,216,0.22)' },
  Figma:   { letter: 'Fi',  bg: '#dcfce7', fg: '#15803d', border: 'rgba(21,128,61,0.22)'  },
  Meta:    { letter: 'M',   bg: '#ede9fe', fg: '#6d28d9', border: 'rgba(109,40,217,0.22)' },
  Netflix: { letter: 'N',   bg: '#fee2e2', fg: '#b91c1c', border: 'rgba(185,28,28,0.22)'  },
  Stripe:  { letter: 'S',   bg: '#e0f2fe', fg: '#0369a1', border: 'rgba(3,105,161,0.22)'  },
  Airbnb:  { letter: 'A',   bg: '#fce7f3', fg: '#9d174d', border: 'rgba(157,23,77,0.22)'  },
  Uber:    { letter: 'U',   bg: '#f1f5f9', fg: '#334155', border: 'rgba(51,65,85,0.22)'   },
};

export function Avatar({ company, size = 44 }) {
  const c = COMPANY[company] || COMPANY.Uber;
  return (
    <div
      className="avatar"
      style={{
        width: size,
        height: size,
        background: c.bg,
        color: c.fg,
        border: `1px solid ${c.border}`,
        fontSize: size * 0.32,
        borderRadius: size * 0.32,
      }}
    >
      {c.letter}
    </div>
  );
}

export { COMPANY };
