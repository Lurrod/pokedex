import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { TypeBadge } from '../components/TypeBadge';

describe('TypeBadge', () => {
  it('renders the French label for the given type', () => {
    render(<TypeBadge type="fire" />);
    expect(screen.getByText('Feu')).toBeInTheDocument();
  });

  it('applies the type color as background on the badge wrapper', () => {
    render(<TypeBadge type="water" />);
    const label = screen.getByText('Eau');
    const wrapper = label.closest('span[style*="background-color"]');
    expect(wrapper).not.toBeNull();
    expect(wrapper).toHaveStyle({ backgroundColor: '#6390F0' });
  });
});
