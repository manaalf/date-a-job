export function Bug({ size = 26, light = false }) {
  return (
    <img
      src="/logo.png"
      alt="date-a-job"
      width={size}
      height={size}
      style={{ display: 'block', objectFit: 'contain', filter: light ? 'brightness(0) invert(1)' : 'none' }}
    />
  );
}

export function Wordmark({ size = 'sm' }) {
  const cls = size === 'lg' ? 'wordmark lg' : size === 'xl' ? 'wordmark xl' : 'wordmark';
  return (
    <span className={cls}>
      <span>date</span>
      <span className="dash">–</span>
      <span>a</span>
      <span className="dash">–</span>
      <span>job</span>
    </span>
  );
}
