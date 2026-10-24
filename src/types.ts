export type CharacterClass =
  | 'Warrior'
  | 'Mage'
  | 'Rogue'
  | 'Ranger'
  | 'Paladin'
  | 'Cleric'
  | 'Druid'
  | 'Bard';

export type FantasyRace =
  | 'Human'
  | 'High Elf'
  | 'Wood Elf'
  | 'Mountain Dwarf'
  | 'Tiefling'
  | 'Dragonborn'
  | 'Half-Orc'
  | 'Halfling';

export type Alignment =
  | 'Lawful Good'
  | 'Neutral Good'
  | 'Chaotic Good'
  | 'Lawful Neutral'
  | 'True Neutral'
  | 'Chaotic Neutral'
  | 'Lawful Evil'
  | 'Neutral Evil'
  | 'Chaotic Evil';

export interface CharacterStats {
  str: number;
  dex: number;
  con: number;
  int: number;
  wis: number;
  cha: number;
}

export interface Character {
  id: string;
  name: string;
  title: string;
  characterClass: CharacterClass;
  race: FantasyRace;
  alignment: Alignment;
  level: number;
  hp: number;
  armorClass: number;
  stats: CharacterStats;
  signatureAbility: {
    name: string;
    description: string;
  };
  startingGear: string;
  backstory: string;
  portraitUrl?: string;
  portraitSeed: number;
  hasGeneratedPortrait: boolean;
  generatedAt: string;
}

export interface ClassDefinition {
  name: CharacterClass;
  description: string;
  hitDie: number;
  primaryStat: keyof CharacterStats;
  iconName: string;
  colorScheme: {
    border: string;
    badgeBg: string;
    accent: string;
    glow: string;
  };
  portraitFallback: string;
  abilities: Array<{ name: string; description: string }>;
  startingWeapons: string[];
}
