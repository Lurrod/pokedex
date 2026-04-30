import { motion } from 'framer-motion';
import type { Pokemon } from '../api/schemas';
import { useAnimatedCounter } from '../hooks/useAnimatedCounter';
import { STAT_LABELS_FR } from '../utils/format';
import { colorForType } from '../utils/typeColors';
import { StatBar } from './StatBar';

interface StatsPanelProps {
  pokemon: Pokemon;
}

export function StatsPanel({ pokemon }: StatsPanelProps) {
  const color = colorForType(pokemon.types[0]);
  const stats: { key: keyof Pokemon['stats']; label: string }[] = [
    { key: 'hp', label: STAT_LABELS_FR.hp },
    { key: 'attack', label: STAT_LABELS_FR.attack },
    { key: 'defense', label: STAT_LABELS_FR.defense },
    { key: 'specialAttack', label: STAT_LABELS_FR.specialAttack },
    { key: 'specialDefense', label: STAT_LABELS_FR.specialDefense },
    { key: 'speed', label: STAT_LABELS_FR.speed },
  ];

  const heightM = useAnimatedCounter(Math.round(pokemon.height * 10), 600) / 100;
  const weightKg = useAnimatedCounter(pokemon.weight, 600) / 10;

  return (
    <div className="flex h-full flex-col gap-3">
      <div className="grid grid-cols-2 gap-2">
        <Metric
          label="Taille"
          value={`${heightM.toFixed(1)} m`}
          color={color}
        />
        <Metric
          label="Poids"
          value={`${weightKg.toFixed(1)} kg`}
          color={color}
        />
      </div>

      <div className="flex flex-1 flex-col justify-center gap-2">
        {stats.map((stat, i) => (
          <motion.div
            key={`${pokemon.id}-${stat.key}`}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + i * 0.05 }}
          >
            <StatBar
              label={stat.label}
              value={pokemon.stats[stat.key]}
              color={color}
              delay={0.15 + i * 0.05}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

interface MetricProps {
  label: string;
  value: string;
  color: string;
}

function Metric({ label, value, color }: MetricProps) {
  return (
    <div
      className="rounded-md border px-3 py-2"
      style={{
        borderColor: `${color}55`,
        background: 'rgba(255,255,255,0.02)',
      }}
    >
      <div
        className="font-display text-[9px] font-bold uppercase tracking-[0.3em]"
        style={{ color }}
      >
        {label}
      </div>
      <div className="font-mono text-sm font-bold tabular-nums text-white text-glow-soft">
        {value}
      </div>
    </div>
  );
}
