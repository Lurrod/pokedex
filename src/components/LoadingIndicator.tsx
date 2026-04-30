interface LoadingIndicatorProps {
  color?: string;
  label?: string;
}

export function LoadingIndicator({
  color = '#22d3ee',
  label = 'Scanning…',
}: LoadingIndicatorProps) {
  return (
    <div
      className="flex flex-col items-center gap-3"
      role="status"
      aria-live="polite"
    >
      <div className="relative h-20 w-20">
        <div
          className="absolute inset-0 animate-spin-slow rounded-full border-2 border-dashed"
          style={{
            borderColor: `${color}88`,
            boxShadow: `0 0 14px ${color}66`,
          }}
        />
        <div
          className="absolute inset-2 animate-spin-reverse rounded-full border"
          style={{ borderColor: `${color}55` }}
        />
        <div
          className="absolute inset-4 animate-spin-slower rounded-full border-2"
          style={{ borderTopColor: color, borderColor: 'transparent' }}
        />
        <div
          className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            backgroundColor: color,
            boxShadow: `0 0 12px ${color}, 0 0 24px ${color}88`,
          }}
        />
      </div>
      <span
        className="font-display text-[10px] font-bold uppercase tracking-[0.4em] text-glow-soft"
        style={{ color }}
      >
        {label}
        <span className="animate-blink">.</span>
        <span className="animate-blink" style={{ animationDelay: '0.3s' }}>
          .
        </span>
        <span className="animate-blink" style={{ animationDelay: '0.6s' }}>
          .
        </span>
      </span>
    </div>
  );
}
