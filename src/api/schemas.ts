import { z } from 'zod';

const statSchema = z.object({
  base_stat: z.number(),
  stat: z.object({ name: z.string() }),
});

const typeSchema = z.object({
  slot: z.number(),
  type: z.object({ name: z.string() }),
});

const spritesSchema = z.object({
  front_default: z.string().nullable(),
  other: z
    .object({
      'official-artwork': z
        .object({ front_default: z.string().nullable() })
        .optional(),
      home: z.object({ front_default: z.string().nullable() }).optional(),
    })
    .optional(),
});

const criesSchema = z
  .object({
    latest: z.string().nullable().optional(),
    legacy: z.string().nullable().optional(),
  })
  .optional();

export const pokemonResponseSchema = z.object({
  id: z.number(),
  name: z.string(),
  height: z.number(),
  weight: z.number(),
  stats: z.array(statSchema),
  types: z.array(typeSchema),
  sprites: spritesSchema,
  cries: criesSchema,
});

export const speciesResponseSchema = z.object({
  id: z.number(),
  names: z.array(
    z.object({
      name: z.string(),
      language: z.object({ name: z.string() }),
    }),
  ),
  flavor_text_entries: z.array(
    z.object({
      flavor_text: z.string(),
      language: z.object({ name: z.string() }),
    }),
  ),
});

export type PokemonResponse = z.infer<typeof pokemonResponseSchema>;
export type SpeciesResponse = z.infer<typeof speciesResponseSchema>;

export interface Pokemon {
  id: number;
  name: string;
  displayName: string;
  types: string[];
  stats: {
    hp: number;
    attack: number;
    defense: number;
    specialAttack: number;
    specialDefense: number;
    speed: number;
  };
  sprite: string;
  cry: string | null;
  height: number;
  weight: number;
  flavorText: string;
}
