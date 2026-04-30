import { useEffect, useState } from 'react';
import { getPokemon } from '../api/pokeapi';
import type { Pokemon } from '../api/schemas';

interface PokemonState {
  pokemon: Pokemon | null;
  loading: boolean;
  error: string | null;
}

export function usePokemon(idOrName: number | string): PokemonState {
  const [state, setState] = useState<PokemonState>({
    pokemon: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    let cancelled = false;
    setState((prev) => ({ ...prev, loading: true, error: null }));

    getPokemon(idOrName)
      .then((pokemon) => {
        if (cancelled) return;
        setState({ pokemon, loading: false, error: null });
      })
      .catch((error: unknown) => {
        if (cancelled) return;
        const message =
          error instanceof Error ? error.message : 'Erreur inconnue';
        setState({ pokemon: null, loading: false, error: message });
      });

    return () => {
      cancelled = true;
    };
  }, [idOrName]);

  return state;
}
