import { motion } from 'framer-motion';

interface HudHeaderProps {
  status: 'online' | 'scanning' | 'error';
  pokemonCount?: number;
}

export function HudHeader({ status, pokemonCount = 1025 }: HudHeaderProps) {
  const statusConfig = {
    online: { color: '#22c55e', label: 'ONLINE' },
    scanning: { color: '#facc15', label: 'SCANNING' },
    error: { color: '#ef4444', label: 'ERROR' },
  }[status];

  return (
    <header className="flex w-full items-center justify-between gap-4 border-b border-neon-cyan/20 px-4 py-2">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-3"
      >
        <div className="relative h-6 w-6">
          <div className="absolute inset-0 rounded-full border-2 border-neon-cyan bg-black" />
          <div className="absolute inset-x-0 top-1/2 h-0.5 -translate-y-1/2 bg-neon-cyan shadow-neon-cyan" />
          <div className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-neon-cyan shadow-neon-cyan" />
        </div>
        <h1 className="font-display text-sm font-black uppercase tracking-[0.4em] text-neon-cyan text-glow">
          Pokédex
          <span className="ml-2 text-xs text-neon-cyan/60">v3.0</span>
        </h1>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex items-center gap-3 font-mono text-[10px]"
      >
        <span className="text-neon-cyan/60">
          DB: <span className="text-neon-cyan">{pokemonCount}</span>
        </span>
        <span className="text-neon-cyan/30">|</span>
        <span className="flex items-center gap-1.5">
          <span
            className="h-2 w-2 animate-pulse rounded-full"
            style={{
              backgroundColor: statusConfig.color,
              boxShadow: `0 0 8px ${statusConfig.color}`,
            }}
          />
          <span
            className="font-display font-bold uppercase tracking-widest"
            style={{ color: statusConfig.color }}
          >
            {statusConfig.label}
          </span>
        </span>
      </motion.div>
    </header>
  );
}
