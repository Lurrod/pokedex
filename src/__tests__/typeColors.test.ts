import { describe, expect, it } from 'vitest';
import { colorForType, labelForType } from '../utils/typeColors';

describe('colorForType', () => {
  it('returns the color for a known type', () => {
    expect(colorForType('fire')).toBe('#EE8130');
    expect(colorForType('water')).toBe('#6390F0');
  });

  it('returns a fallback color for unknown or empty input', () => {
    expect(colorForType('unknown')).toBe('#6B7280');
    expect(colorForType(undefined)).toBe('#6B7280');
  });
});

describe('labelForType', () => {
  it('returns the French label for a known type', () => {
    expect(labelForType('fire')).toBe('Feu');
    expect(labelForType('grass')).toBe('Plante');
    expect(labelForType('electric')).toBe('Électrik');
  });

  it('echoes the input when no translation is found', () => {
    expect(labelForType('mystery')).toBe('mystery');
  });
});
