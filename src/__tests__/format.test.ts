import { describe, expect, it } from 'vitest';
import {
  clampPokemonId,
  formatHeight,
  formatPokedexId,
  formatWeight,
} from '../utils/format';

describe('formatPokedexId', () => {
  it('pads with leading zeros to 4 digits', () => {
    expect(formatPokedexId(1)).toBe('#0001');
    expect(formatPokedexId(25)).toBe('#0025');
    expect(formatPokedexId(150)).toBe('#0150');
    expect(formatPokedexId(1010)).toBe('#1010');
  });
});

describe('formatHeight', () => {
  it('converts decimeters to meters with one decimal', () => {
    expect(formatHeight(7)).toBe('0.7 m');
    expect(formatHeight(10)).toBe('1.0 m');
    expect(formatHeight(170)).toBe('17.0 m');
  });
});

describe('formatWeight', () => {
  it('converts hectograms to kilograms with one decimal', () => {
    expect(formatWeight(69)).toBe('6.9 kg');
    expect(formatWeight(905)).toBe('90.5 kg');
  });
});

describe('clampPokemonId', () => {
  it('wraps to max when below min', () => {
    expect(clampPokemonId(0, 1, 1010)).toBe(1010);
  });

  it('wraps to min when above max', () => {
    expect(clampPokemonId(1011, 1, 1010)).toBe(1);
  });

  it('returns id within bounds unchanged', () => {
    expect(clampPokemonId(42, 1, 1010)).toBe(42);
  });
});
