import { useEffect, useState } from 'react';

export function useAnimatedCounter(
  target: number,
  durationMs = 700,
): number {
  const [value, setValue] = useState(target);

  useEffect(() => {
    const start = value;
    const delta = target - start;
    if (delta === 0) return;
    const startTime = performance.now();
    let raf = 0;

    function tick(now: number): void {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / durationMs, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(start + delta * eased));
      if (progress < 1) {
        raf = requestAnimationFrame(tick);
      }
    }

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // We intentionally don't depend on `value` (we read it once at start).
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, durationMs]);

  return value;
}
