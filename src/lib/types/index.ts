// Shared TypeScript types for the Pokémon Team Builder.
// Expand these as datasets and features are wired in.

export type StatId = 'hp' | 'atk' | 'def' | 'spa' | 'spd' | 'spe';
export type NatureId =
  | 'hardy' | 'lonely' | 'brave' | 'adamant' | 'naughty'
  | 'bold' | 'docile' | 'relaxed' | 'impish' | 'lax'
  | 'timid' | 'hasty' | 'serious' | 'jolly' | 'naive'
  | 'modest' | 'mild' | 'quiet' | 'bashful' | 'rash'
  | 'calm' | 'gentle' | 'sassy' | 'careful' | 'quirky';

export type EVSpread = Record<StatId, number>;
export type IVSpread = Record<StatId, number>;

export interface TeamSlot {
  speciesId: string | null;
  formId: string | null;
  itemId: string | null;
  abilityId: string | null;
  natureId: NatureId;
  evs: EVSpread;
  ivs: IVSpread;
  moves: (string | null)[];
}

export interface Team {
  slots: [TeamSlot, TeamSlot, TeamSlot, TeamSlot, TeamSlot, TeamSlot];
}
