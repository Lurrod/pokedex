import { useCallback, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MAX_POKEMON_ID, MIN_POKEMON_ID } from '../api/pokeapi';
import { useAnimatedCounter } from '../hooks/useAnimatedCounter';
import { useKeyboardNav } from '../hooks/useKeyboardNav';
import { usePokemon } from '../hooks/usePokemon';
import { useTypewriter } from '../hooks/useTypewriter';
import { clampPokemonId } from '../utils/format';
import { colorForType } from '../utils/typeColors';
import { CornerBrackets } from './CornerBrackets';
import { GridBackground } from './GridBackground';
import { Hologram } from './Hologram';
import { HudHeader } from './HudHeader';
import { NavControls } from './NavControls';
import { ParticleBackground } from './ParticleBackground';
import { SearchBar } from './SearchBar';
import { StatsPanel } from './StatsPanel';
import { TypeBadge } from './TypeBadge';

export function Pokedex() {
  const [query, setQuery] = useState<number | string>(MIN_POKEMON_ID);
  const { pokemon, loading, error } = usePokemon(query);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const goPrev = useCallback(() => {
    const baseId =
      typeof query === 'number'
        ? query
        : (pokemon?.id ?? MIN_POKEMON_ID);
    setQuery(clampPokemonId(baseId - 1, MIN_POKEMON_ID, MAX_POKEMON_ID));
  }, [query, pokemon]);

  const goNext = useCallback(() => {
    const baseId =
      typeof query === 'number'
        ? query
        : (pokemon?.id ?? MIN_POKEMON_ID);
    setQuery(clampPokemonId(baseId + 1, MIN_POKEMON_ID, MAX_POKEMON_ID));
  }, [query, pokemon]);

  const goRandom = useCallback(() => {
    const random =
      Math.floor(Math.random() * (MAX_POKEMON_ID - MIN_POKEMON_ID + 1)) +
      MIN_POKEMON_ID;
    setQuery(random);
  }, []);

  const playCry = useCallback(() => {
    if (!pokemon?.cry) return;
    if (!audioRef.current) {
      audioRef.current = new Audio();
    }
    audioRef.current.src = pokemon.cry;
    audioRef.current.volume = 0.4;
    void audioRef.current.play().catch(() => {});
  }, [pokemon]);

  useKeyboardNav({ onPrev: goPrev, onNext: goNext, onRandom: goRandom });

  const tint = colorForType(pokemon?.types[0]);
  const status = error ? 'error' : loading ? 'scanning' : 'online';

  function handleSearch(input: string): void {
    const asNumber = Number(input);
    setQuery(
      Number.isFinite(asNumber) && asNumber > 0
        ? Math.floor(asNumber)
        : input.toLowerCase(),
    );
  }

  return (
    <>
      <GridBackground tint={tint} />
      <ParticleBackground tint={tint} />

      <div className="relative flex min-h-screen flex-col">
        <HudHeader status={status} pokemonCount={MAX_POKEMON_ID} />

        <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-4 p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]"
          >
            {/* LEFT: hologram + controls */}
            <div className="flex flex-col gap-3">
              <SearchBar onSearch={handleSearch} disabled={loading} />
              <Hologram pokemon={pokemon} loading={loading} error={error} />
              <NavControls
                onPrev={goPrev}
                onNext={goNext}
                onRandom={goRandom}
                color={tint}
              />

              <motion.button
                type="button"
                onClick={playCry}
                disabled={!pokemon?.cry}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="hud-panel flex items-center justify-center gap-3 rounded-md py-2 font-display text-[10px] font-bold uppercase tracking-[0.3em] text-neon-cyan transition-opacity disabled:opacity-30"
              >
                <Equalizer color={tint} />
                <span className="text-glow-soft">Jouer le cri</span>
                <Equalizer color={tint} reversed />
              </motion.button>
            </div>

            {/* RIGHT: identity + stats + bio */}
            <div className="flex flex-col gap-3">
              <NameBanner
                pokemon={pokemon}
                tint={tint}
                loading={loading}
                error={error}
              />

              <FlavorBox text={pokemon?.flavorText ?? ''} tint={tint} />

              <div className="hud-panel relative flex-1 rounded-md p-4">
                <CornerBrackets color={tint} />
                <SectionTitle label="DONNÉES" tint={tint} />
                <div className="mt-3 min-h-[260px]">
                  <AnimatePresence mode="wait">
                    {pokemon && !loading ? (
                      <motion.div
                        key={pokemon.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <StatsPanel pokemon={pokemon} />
                      </motion.div>
                    ) : (
                      <p className="py-12 text-center font-display text-[10px] uppercase tracking-[0.4em] text-neon-cyan/40">
                        {loading ? '// Acquisition…' : '// En attente'}
                      </p>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </motion.div>
        </main>

        <footer className="border-t border-neon-cyan/20 px-4 py-2 text-center font-mono text-[10px] uppercase tracking-[0.3em] text-neon-cyan/50">
          [ ← / → ] navigation &nbsp;•&nbsp; [ espace ] aléatoire
        </footer>
      </div>
    </>
  );
}

interface NameBannerProps {
  pokemon: import('../api/schemas').Pokemon | null;
  tint: string;
  loading: boolean;
  error: string | null;
}

function NameBanner({ pokemon, tint, loading, error }: NameBannerProps) {
  const id = useAnimatedCounter(pokemon?.id ?? 0, 500);
  const typedName = useTypewriter(pokemon?.displayName ?? '', 35);

  const headline = error
    ? '// SIGNAL PERDU'
    : loading || !pokemon
      ? '// SCANNING…'
      : typedName;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
      className="hud-panel relative overflow-hidden rounded-md p-4"
    >
      <CornerBrackets color={tint} />

      <div className="flex items-baseline justify-between gap-3">
        <p
          className="font-mono text-xs font-bold tabular-nums tracking-widest"
          style={{ color: tint }}
        >
          N° <span className="text-glow">{String(id).padStart(4, '0')}</span>
        </p>
        <p className="font-display text-[9px] uppercase tracking-[0.4em] text-neon-cyan/60">
          INDEX
        </p>
      </div>

      <h2
        className="mt-1 min-h-[2.25rem] font-display text-3xl font-black uppercase tracking-wide text-glow"
        style={{ color: pokemon ? tint : '#22d3ee' }}
      >
        {headline}
        <span className="ml-1 inline-block w-2 animate-blink" aria-hidden>
          ▌
        </span>
      </h2>

      <div className="mt-3 flex flex-wrap gap-2">
        <AnimatePresence>
          {pokemon?.types.map((type, i) => (
            <TypeBadge key={`${pokemon.id}-${type}`} type={type} delay={i * 0.1} />
          ))}
        </AnimatePresence>
      </div>

      {/* Horizontal scan beam */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 w-1/3 animate-scan-h"
        style={{
          background: `linear-gradient(90deg, transparent, ${tint}33, transparent)`,
        }}
      />
    </motion.div>
  );
}

interface FlavorBoxProps {
  text: string;
  tint: string;
}

function FlavorBox({ text, tint }: FlavorBoxProps) {
  const typed = useTypewriter(text, 18);
  if (!text) return null;

  return (
    <div className="hud-panel relative rounded-md p-4">
      <CornerBrackets color={tint} />
      <SectionTitle label="BIO" tint={tint} />
      <p className="mt-2 font-mono text-xs leading-relaxed text-slate-200/90">
        {typed}
        <span className="ml-1 inline-block w-1.5 animate-blink" aria-hidden>
          ▌
        </span>
      </p>
    </div>
  );
}

interface SectionTitleProps {
  label: string;
  tint: string;
}

function SectionTitle({ label, tint }: SectionTitleProps) {
  return (
    <div className="flex items-center gap-2">
      <span
        className="block h-1.5 w-1.5 animate-pulse-slow rounded-full"
        style={{
          backgroundColor: tint,
          boxShadow: `0 0 8px ${tint}`,
        }}
      />
      <h3
        className="font-display text-[10px] font-bold uppercase tracking-[0.4em]"
        style={{ color: tint }}
      >
        {label}
      </h3>
      <div
        className="h-px flex-1 opacity-40"
        style={{ background: `linear-gradient(90deg, ${tint}, transparent)` }}
      />
    </div>
  );
}

interface EqualizerProps {
  color: string;
  reversed?: boolean;
}

function Equalizer({ color, reversed }: EqualizerProps) {
  const bars = [0, 1, 2, 3, 4];
  return (
    <span className="flex h-3 items-end gap-0.5" aria-hidden>
      {bars.map((i) => (
        <span
          key={i}
          className="block w-0.5 rounded-sm"
          style={{
            backgroundColor: color,
            height: `${30 + Math.sin((i + (reversed ? 2 : 0)) * 0.9) * 30 + 40}%`,
            boxShadow: `0 0 4px ${color}`,
            animation: 'pulse 1.2s ease-in-out infinite',
            animationDelay: `${(reversed ? bars.length - i : i) * 0.1}s`,
          }}
        />
      ))}
    </span>
  );
}
