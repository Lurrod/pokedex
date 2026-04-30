import { motion } from 'framer-motion';
import { useAnimatedCounter } from '../hooks/useAnimatedCounter';
import { STAT_MAX } from '../utils/format';

interface StatBarProps {
  label: string;
  value: number;
  color: string;
  delay?: number;
}

export function StatBar({ label, value, color, delay = 0 }: StatBarProps) {
  const ratio = Math.min(value / STAT_MAX, 1);
  const animatedValue = useAnimatedCounter(value, 700);

  return (
    <div className="flex items-center gap-3 text-xs">
      <span
        className="w-16 shrink-0 font-display text-[10px] font-bold uppercase tracking-widest"
        style={{ color }}
      >
        {label}
      </span>
      <span className="w-9 shrink-0 text-right font-mono text-sm font-bold tabular-nums text-white text-glow-soft">
        {animatedValue}
      </span>
      <div
        className="relative h-2 flex-1 overflow-hidden rounded-full border"
        style={{
          borderColor: `${color}55`,
          background: 'rgba(255,255,255,0.03)',
        }}
      >
        <motion.div
          className="relative h-full rounded-full"
          style={{
            background: `linear-gradient(90deg, ${color}55, ${color})`,
            boxShadow: `0 0 8px ${color}, inset 0 0 4px rgba(255,255,255,0.5)`,
          }}
          initial={{ width: 0 }}
          animate={{ width: `${ratio * 100}%` }}
          transition={{ duration: 0.8, ease: 'easeOut', delay }}
        >
          <div
            className="absolute inset-0 animate-shimmer rounded-full"
            style={{
              backgroundImage:
                'linear-gradient(110deg, transparent 30%, rgba(255,255,255,0.55) 50%, transparent 70%)',
              backgroundSize: '200% 100%',
            }}
          />
        </motion.div>
      </div>
    </div>
  );
}
