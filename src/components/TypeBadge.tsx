import { motion } from 'framer-motion';
import { colorForType, labelForType } from '../utils/typeColors';

interface TypeBadgeProps {
  type: string;
  delay?: number;
}

export function TypeBadge({ type, delay = 0 }: TypeBadgeProps) {
  const color = colorForType(type);
  return (
    <motion.span
      initial={{ opacity: 0, y: 6, scale: 0.85 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, duration: 0.3 }}
      whileHover={{ scale: 1.08 }}
      className="relative inline-flex items-center justify-center overflow-hidden rounded-md border px-3 py-1 font-display text-[10px] font-bold uppercase tracking-[0.25em] text-white"
      style={{
        backgroundColor: color,
        borderColor: `${color}`,
        boxShadow: `0 0 10px ${color}AA, inset 0 0 8px rgba(255,255,255,0.25)`,
        textShadow: '0 0 6px rgba(0,0,0,0.6)',
      }}
    >
      <span
        aria-hidden
        className="absolute inset-0 animate-shimmer"
        style={{
          backgroundImage:
            'linear-gradient(110deg, transparent 30%, rgba(255,255,255,0.35) 50%, transparent 70%)',
          backgroundSize: '200% 100%',
        }}
      />
      <span className="relative">{labelForType(type)}</span>
    </motion.span>
  );
}
