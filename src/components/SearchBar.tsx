import { useState, type FormEvent } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  disabled?: boolean;
}

export function SearchBar({ onSearch, disabled }: SearchBarProps) {
  const [value, setValue] = useState('');

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = value.trim();
    if (!trimmed) return;
    onSearch(trimmed);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="group flex w-full items-center gap-2 rounded-md border border-neon-cyan/40 bg-black/40 px-3 py-1.5 text-sm font-mono backdrop-blur-md transition-all focus-within:border-neon-cyan focus-within:shadow-neon-cyan"
    >
      <span
        aria-hidden
        className="font-display text-[10px] font-bold uppercase tracking-widest text-neon-cyan text-glow-soft"
      >
        &gt;_
      </span>
      <input
        type="search"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="nom ou n°…"
        disabled={disabled}
        aria-label="Rechercher un Pokémon"
        className="flex-1 bg-transparent text-neon-cyan caret-neon-cyan placeholder:text-neon-cyan/40 focus:outline-none"
      />
      <button
        type="submit"
        disabled={disabled}
        className="rounded border border-neon-cyan/60 bg-neon-cyan/10 px-2.5 py-0.5 font-display text-[10px] font-bold uppercase tracking-[0.2em] text-neon-cyan text-glow-soft transition-all hover:bg-neon-cyan/20 hover:shadow-neon-cyan disabled:opacity-40"
      >
        SCAN
      </button>
    </form>
  );
}
