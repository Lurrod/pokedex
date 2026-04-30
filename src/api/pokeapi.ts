import {
  pokemonResponseSchema,
  speciesResponseSchema,
  type Pokemon,
  type PokemonResponse,
  type SpeciesResponse,
} from './schemas';

const API_BASE = 'https://pokeapi.co/api/v2';
export const MAX_POKEMON_ID = 1025;
export const MIN_POKEMON_ID = 1;

const cache = new Map<string, Pokemon>();

function statByName(stats: PokemonResponse['stats'], name: string): number {
  return stats.find((s) => s.stat.name === name)?.base_stat ?? 0;
}

function pickSprite(sprites: PokemonResponse['sprites']): string {
  return (
    sprites.other?.['official-artwork']?.front_default ??
    sprites.other?.home?.front_default ??
    sprites.front_default ??
    ''
  );
}

function pickFrenchName(species: SpeciesResponse, fallback: string): string {
  const fr = species.names.find((n) => n.language.name === 'fr');
  if (!fr) return capitalize(fallback);
  return fr.name;
}

function pickFlavorText(species: SpeciesResponse): string {
  const fr = species.flavor_text_entries.find((e) => e.language.name === 'fr');
  const en = species.flavor_text_entries.find((e) => e.language.name === 'en');
  const text = (fr ?? en)?.flavor_text ?? '';
  return text.replace(/[\n\f\r]/g, ' ').trim();
}

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export function buildPokemon(
  raw: PokemonResponse,
  species: SpeciesResponse,
): Pokemon {
  return {
    id: raw.id,
    name: raw.name,
    displayName: pickFrenchName(species, raw.name),
    types: raw.types.sort((a, b) => a.slot - b.slot).map((t) => t.type.name),
    stats: {
      hp: statByName(raw.stats, 'hp'),
      attack: statByName(raw.stats, 'attack'),
      defense: statByName(raw.stats, 'defense'),
      specialAttack: statByName(raw.stats, 'special-attack'),
      specialDefense: statByName(raw.stats, 'special-defense'),
      speed: statByName(raw.stats, 'speed'),
    },
    sprite: pickSprite(raw.sprites),
    cry: raw.cries?.latest ?? raw.cries?.legacy ?? null,
    height: raw.height,
    weight: raw.weight,
    flavorText: pickFlavorText(species),
  };
}

async function fetchJson(url: string): Promise<unknown> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Erreur API (${response.status}) sur ${url}`);
  }
  return (await response.json()) as unknown;
}

export async function getPokemon(idOrName: number | string): Promise<Pokemon> {
  const key = String(idOrName).toLowerCase();
  const cached = cache.get(key);
  if (cached) return cached;

  const [rawPokemon, rawSpecies] = await Promise.all([
    fetchJson(`${API_BASE}/pokemon/${key}`),
    fetchJson(`${API_BASE}/pokemon-species/${key}`),
  ]);

  const pokemon = pokemonResponseSchema.parse(rawPokemon);
  const species = speciesResponseSchema.parse(rawSpecies);
  const built = buildPokemon(pokemon, species);

  cache.set(String(built.id), built);
  cache.set(built.name.toLowerCase(), built);
  return built;
}

export function clearCache(): void {
  cache.clear();
}
