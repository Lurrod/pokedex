export function formatPokedexId(id: number): string {
  return `#${String(id).padStart(4, '0')}`;
}

export function formatHeight(decimeters: number): string {
  const meters = decimeters / 10;
  return `${meters.toFixed(1)} m`;
}

export function formatWeight(hectograms: number): string {
  const kg = hectograms / 10;
  return `${kg.toFixed(1)} kg`;
}

export function clampPokemonId(
  id: number,
  min: number,
  max: number,
): number {
  if (id < min) return max;
  if (id > max) return min;
  return id;
}

export const STAT_LABELS_FR = {
  hp: 'PV',
  attack: 'Att.',
  defense: 'Déf.',
  specialAttack: 'Att. Spé.',
  specialDefense: 'Déf. Spé.',
  speed: 'Vit.',
} as const;

export const STAT_MAX = 255;
