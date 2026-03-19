import { writable, derived } from 'svelte/store';
import type { Team, TeamSlot } from '$lib/types';

const emptySlot = (): TeamSlot => ({
  speciesId: null,
  formId: null,
  itemId: null,
  abilityId: null,
  natureId: 'hardy',
  evs: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
  ivs: { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 },
  moves: [null, null, null, null],
});

export const team = writable<Team>({
  slots: [emptySlot(), emptySlot(), emptySlot(), emptySlot(), emptySlot(), emptySlot()],
});

export const totalEVs = derived(team, ($t) =>
  $t.slots.reduce(
    (sum, s) => sum + (Object.values(s.evs) as number[]).reduce((a, b) => a + b, 0),
    0
  )
);
