# Pokédex // v3.0

Pokédex futuriste — interface HUD avec hologramme, scanlines, particules néon et palette dynamique selon le type du Pokémon affiché. Propulsé par [PokéAPI](https://pokeapi.co).

## Stack

- ⚡ **Vite 5** + **React 18** + **TypeScript** strict
- 🎨 **Tailwind CSS** + **Framer Motion** (animations) + Canvas (particules)
- 🛡️ **Zod** pour valider les réponses API
- 🧪 **Vitest** + **Testing Library**
- 🔤 Polices : **Orbitron** (display) + **JetBrains Mono** (chiffres)
- 🌐 PokéAPI — 1025 Pokémon, noms et descriptions en français

## Démarrer

```bash
npm install
npm run dev
```

Ouvre http://localhost:5173.

## Scripts

| Commande | Description |
|---|---|
| `npm run dev` | Serveur de dev (HMR) |
| `npm run build` | Build de production (`dist/`) |
| `npm run preview` | Sert le build local |
| `npm test` | Tests unitaires (Vitest) |
| `npm run test:watch` | Tests en mode watch |
| `npm run typecheck` | Vérification TypeScript |

## Fonctionnalités

- 🔍 Recherche par **nom** (anglais) ou **numéro**
- ⬅️ ➡️ Navigation : clavier (`←` / `→`) ou boutons HUD
- 🎲 Pokémon aléatoire (`Espace` ou bouton « Aléatoire »)
- 🔊 Cri du Pokémon au clic
- 📱 Responsive (mobile / desktop)
- ♿ A11y : `aria-label`, `role="status"`, focus visible

## Style HUD futuriste

- Grille perspective animée + particules néon scintillantes
- Hologramme central avec **3 anneaux concentriques** rotatifs (sens et vitesses différents), crosshair, scanline verticale, ombre de base
- Panneaux glassmorphism (`backdrop-blur` + bordure cyan + coins biseautés)
- Header HUD avec LED de statut (online / scanning / error)
- Teinte globale qui s'adapte au **type principal** du Pokémon

## Animations

- 🎬 Entrée en stagger sur tous les panneaux
- ✍️ **Typewriter** sur le nom et la description
- 🔢 **Compteurs animés** (ID, taille, poids, valeurs de stats) avec easing cubique
- 📊 Barres de stats avec **shimmer** glissant + glow néon
- 💎 Badges de type avec shimmer et hover spring
- 🌊 Beam de scan horizontal qui balaie le panneau du nom
- 📡 Scanline verticale qui balaie l'hologramme
- 🎵 Equalizer animé sur le bouton « Jouer le cri »
- 🔘 Boutons : hover/tap spring + shimmer + glow

## Structure

```
src/
├── api/                    # Client PokéAPI
│   ├── pokeapi.ts          # fetch + cache + buildPokemon
│   └── schemas.ts          # schémas Zod + type Pokemon
├── components/
│   ├── Pokedex.tsx         # composition + layout principal
│   ├── HudHeader.tsx       # barre supérieure (logo, statut)
│   ├── Hologram.tsx        # affichage du Pokémon (anneaux, scan)
│   ├── StatsPanel.tsx      # taille, poids, barres de stats
│   ├── StatBar.tsx         # une barre animée
│   ├── TypeBadge.tsx       # badge de type avec glow
│   ├── NavControls.tsx     # boutons prev / random / next
│   ├── SearchBar.tsx       # input terminal
│   ├── ParticleBackground.tsx  # canvas particules néon
│   ├── GridBackground.tsx  # grille perspective animée
│   ├── CornerBrackets.tsx  # crochets aux 4 coins
│   └── LoadingIndicator.tsx
├── hooks/
│   ├── usePokemon.ts       # fetch + loading/error
│   ├── useKeyboardNav.ts   # ← / → / espace
│   ├── useTypewriter.ts    # texte typé caractère par caractère
│   └── useAnimatedCounter.ts # compteur avec easing
├── utils/
│   ├── typeColors.ts       # couleurs + labels FR par type
│   └── format.ts           # ID, taille, poids, clamp
└── __tests__/              # tests unitaires (Vitest)
```

## Tests

17 tests unitaires couvrant :
- formatage (ID, taille, poids, clamp avec wrap min/max)
- couleurs et labels par type (avec fallback)
- parsing API (`buildPokemon` : stats, sprites, nom FR, flavor text, ordre des types)
- composant `TypeBadge`
