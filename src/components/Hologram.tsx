import { AnimatePresence, motion } from 'framer-motion';
import type { Pokemon } from '../api/schemas';
import { colorForType } from '../utils/typeColors';
import { CornerBrackets } from './CornerBrackets';
import { LoadingIndicator } from './LoadingIndicator';

interface HologramProps {
  pokemon: Pokemon | null;
  loading: boolean;
  error: string | null;
}

export function Hologram({ pokemon, loading, error }: HologramProps) {
  const tint = colorForType(pokemon?.types[0]);

  return (
    <div className="hud-panel clip-corner relative aspect-square w-full overflow-hidden">
      <CornerBrackets color={tint} />

      {/* Tint glow */}
      <div
        className="pointer-events-none absolute inset-0 transition-colors duration-700"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${tint}33, transparent 60%)`,
        }}
      />

      {/* Concentric rings (wrapper centers, inner spins to avoid transform conflict) */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 aspect-square w-[120%] -translate-x-1/2 -translate-y-1/2">
        <div
          className="h-full w-full animate-spin-slower rounded-full border opacity-40"
          style={{ borderColor: `${tint}66` }}
        />
      </div>
      <div className="pointer-events-none absolute left-1/2 top-1/2 aspect-square w-[85%] -translate-x-1/2 -translate-y-1/2">
        <div
          className="h-full w-full animate-spin-reverse rounded-full border-2 border-dashed opacity-30"
          style={{ borderColor: `${tint}88` }}
        />
      </div>
      <div className="pointer-events-none absolute left-1/2 top-1/2 aspect-square w-[60%] -translate-x-1/2 -translate-y-1/2">
        <div
          className="h-full w-full animate-spin-slow rounded-full border opacity-50"
          style={{ borderColor: tint }}
        />
      </div>

      {/* Crosshair */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-px w-full -translate-x-1/2 -translate-y-1/2 opacity-30"
        style={{ background: `linear-gradient(90deg, transparent, ${tint}, transparent)` }}
      />
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-full w-px -translate-x-1/2 -translate-y-1/2 opacity-30"
        style={{ background: `linear-gradient(180deg, transparent, ${tint}, transparent)` }}
      />

      {/* Vertical scanline beam */}
      <div
        className="pointer-events-none absolute inset-x-0 h-12 animate-scanline opacity-70"
        style={{
          background: `linear-gradient(180deg, transparent, ${tint}66, transparent)`,
          boxShadow: `0 0 24px ${tint}`,
        }}
      />

      {/* Subtle horizontal scanlines */}
      <div
        className="pointer-events-none absolute inset-0 opacity-20 mix-blend-overlay"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, rgba(255,255,255,0.7) 0px, rgba(255,255,255,0.7) 1px, transparent 1px, transparent 4px)',
        }}
      />

      {/* Content */}
      <div className="relative flex h-full w-full items-center justify-center p-6">
        <AnimatePresence mode="wait">
          {error && !loading ? (
            <motion.div
              key="error"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-center font-display text-xs uppercase tracking-widest text-red-400 text-glow"
            >
              <p>// Signal perdu</p>
              <p className="mt-2 font-mono normal-case opacity-60">{error}</p>
            </motion.div>
          ) : loading || !pokemon ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <LoadingIndicator color={tint} />
            </motion.div>
          ) : (
            <motion.img
              key={pokemon.id}
              src={pokemon.sprite}
              alt={pokemon.displayName}
              className="relative z-10 h-[80%] w-[80%] select-none object-contain animate-float"
              draggable={false}
              style={{
                filter: `drop-shadow(0 0 18px ${tint}AA) drop-shadow(0 8px 12px rgba(0,0,0,0.6))`,
              }}
              initial={{ opacity: 0, scale: 0.6, filter: 'blur(8px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 0.9, filter: 'blur(6px)' }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />
          )}
        </AnimatePresence>
      </div>

      {/* Hologram base ellipse */}
      {pokemon && !loading && (
        <div
          className="pointer-events-none absolute inset-x-[15%] bottom-[10%] h-3 rounded-[50%] blur-md"
          style={{ background: `radial-gradient(ellipse, ${tint}, transparent 70%)` }}
        />
      )}
    </div>
  );
}
