import { motion } from 'framer-motion';

interface NavControlsProps {
  onPrev: () => void;
  onNext: () => void;
  onRandom: () => void;
  color: string;
}

export function NavControls({
  onPrev,
  onNext,
  onRandom,
  color,
}: NavControlsProps) {
  return (
    <div className="flex w-full items-stretch gap-2">
      <NavButton onClick={onPrev} color={color} ariaLabel="Précédent">
        <span className="text-base">◀</span>
        <span>PREV</span>
      </NavButton>
      <NavButton onClick={onRandom} color="#facc15" ariaLabel="Aléatoire" wide>
        <span className="animate-pulse-slow">✦</span>
        <span>ALÉATOIRE</span>
        <span className="animate-pulse-slow">✦</span>
      </NavButton>
      <NavButton onClick={onNext} color={color} ariaLabel="Suivant">
        <span>NEXT</span>
        <span className="text-base">▶</span>
      </NavButton>
    </div>
  );
}

interface NavButtonProps {
  onClick: () => void;
  color: string;
  ariaLabel: string;
  wide?: boolean;
  children: React.ReactNode;
}

function NavButton({ onClick, color, ariaLabel, wide, children }: NavButtonProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      whileHover={{ scale: 1.04, y: -2 }}
      whileTap={{ scale: 0.96, y: 0 }}
      transition={{ type: 'spring', stiffness: 400, damping: 18 }}
      className={`relative flex items-center justify-center gap-2 overflow-hidden rounded-md border px-3 py-2 font-display text-[10px] font-bold uppercase tracking-[0.25em] backdrop-blur-md transition-colors ${
        wide ? 'flex-[1.5]' : 'flex-1'
      }`}
      style={{
        borderColor: `${color}88`,
        color,
        background: `linear-gradient(180deg, ${color}15, transparent)`,
        boxShadow: `0 0 0 1px ${color}22, 0 0 12px ${color}33`,
        textShadow: `0 0 6px ${color}`,
      }}
    >
      <span
        aria-hidden
        className="absolute inset-0 animate-shimmer"
        style={{
          backgroundImage:
            'linear-gradient(110deg, transparent 40%, rgba(255,255,255,0.18) 50%, transparent 60%)',
          backgroundSize: '200% 100%',
        }}
      />
      <span className="relative flex items-center gap-2">{children}</span>
    </motion.button>
  );
}
