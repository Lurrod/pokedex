import { describe, expect, it } from 'vitest';
import { buildPokemon } from '../api/pokeapi';
import type { PokemonResponse, SpeciesResponse } from '../api/schemas';

const rawPokemon: PokemonResponse = {
  id: 25,
  name: 'pikachu',
  height: 4,
  weight: 60,
  stats: [
    { base_stat: 35, stat: { name: 'hp' } },
    { base_stat: 55, stat: { name: 'attack' } },
    { base_stat: 40, stat: { name: 'defense' } },
    { base_stat: 50, stat: { name: 'special-attack' } },
    { base_stat: 50, stat: { name: 'special-defense' } },
    { base_stat: 90, stat: { name: 'speed' } },
  ],
  types: [{ slot: 1, type: { name: 'electric' } }],
  sprites: {
    front_default: 'fallback.png',
    other: {
      'official-artwork': { front_default: 'art.png' },
    },
  },
  cries: { latest: 'cry.ogg' },
};

const rawSpecies: SpeciesResponse = {
  id: 25,
  names: [
    { name: 'Pikachu', language: { name: 'fr' } },
    { name: 'Pikachu', language: { name: 'en' } },
  ],
  flavor_text_entries: [
    {
      flavor_text: 'Quand plusieurs\nde ces POKéMON se réunissent…',
      language: { name: 'fr' },
    },
  ],
};

describe('buildPokemon', () => {
  it('maps stats by canonical name', () => {
    const built = buildPokemon(rawPokemon, rawSpecies);
    expect(built.stats).toEqual({
      hp: 35,
      attack: 55,
      defense: 40,
      specialAttack: 50,
      specialDefense: 50,
      speed: 90,
    });
  });

  it('prefers official artwork sprite', () => {
    const built = buildPokemon(rawPokemon, rawSpecies);
    expect(built.sprite).toBe('art.png');
  });

  it('uses french display name when available', () => {
    const built = buildPokemon(rawPokemon, rawSpecies);
    expect(built.displayName).toBe('Pikachu');
  });

  it('cleans up flavor text whitespace', () => {
    const built = buildPokemon(rawPokemon, rawSpecies);
    expect(built.flavorText).toBe(
      'Quand plusieurs de ces POKéMON se réunissent…',
    );
  });

  it('orders types by slot', () => {
    const dual: PokemonResponse = {
      ...rawPokemon,
      types: [
        { slot: 2, type: { name: 'flying' } },
        { slot: 1, type: { name: 'normal' } },
      ],
    };
    const built = buildPokemon(dual, rawSpecies);
    expect(built.types).toEqual(['normal', 'flying']);
  });
});
