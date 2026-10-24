import {
  CharacterClass,
  FantasyRace,
  Alignment,
  CharacterStats,
  Character,
  ClassDefinition,
} from '../types.ts';

export const PORTRAIT_MAP: Record<CharacterClass, string> = {
  Warrior: '/src/assets/images/fantasy_warrior_portrait_1792822684273.jpg',
  Mage: '/src/assets/images/fantasy_mage_portrait_1792822684578.jpg',
  Rogue: '/src/assets/images/fantasy_rogue_portrait_1792822685903.jpg',
  Ranger: '/src/assets/images/fantasy_ranger_portrait_1792822684981.jpg',
  Paladin: '/src/assets/images/fantasy_warrior_portrait_1792822684273.jpg',
  Cleric: '/src/assets/images/fantasy_mage_portrait_1792822684578.jpg',
  Druid: '/src/assets/images/fantasy_ranger_portrait_1792822684981.jpg',
  Bard: '/src/assets/images/fantasy_rogue_portrait_1792822685903.jpg',
};

export const CLASS_DEFINITIONS: Record<CharacterClass, ClassDefinition> = {
  Warrior: {
    name: 'Warrior',
    description: 'Masters of martial combat, heavy armor, and frontline tactics.',
    hitDie: 10,
    primaryStat: 'str',
    iconName: 'Shield',
    colorScheme: {
      border: 'border-amber-600/40',
      badgeBg: 'bg-amber-950/40',
      accent: 'text-amber-400',
      glow: 'shadow-amber-500/10',
    },
    portraitFallback: '/src/assets/images/fantasy_warrior_portrait_1792822684273.jpg',
    abilities: [
      { name: 'Shield Slam', description: 'Crushes enemy defenses, staggering foes and reinforcing battle posture.' },
      { name: 'Whirlwind Slash', description: 'Sweeps a heavy broadsword in a lethal 360-degree martial arc.' },
      { name: 'Battle Cry', description: 'Bolsters personal morale and shakes the resolve of adjacent enemies.' },
    ],
    startingWeapons: ['Engraved Runed Greatsword', 'Warhammer & Kite Shield', 'Twin Battleaxes'],
  },
  Mage: {
    name: 'Mage',
    description: 'Scholars of esoteric mysteries who command arcane forces.',
    hitDie: 6,
    primaryStat: 'int',
    iconName: 'Sparkles',
    colorScheme: {
      border: 'border-violet-600/40',
      badgeBg: 'bg-violet-950/40',
      accent: 'text-violet-400',
      glow: 'shadow-violet-500/10',
    },
    portraitFallback: '/src/assets/images/fantasy_mage_portrait_1792822684578.jpg',
    abilities: [
      { name: 'Arcane Nova', description: 'Detonates concentrated planar energy, warping local gravitational currents.' },
      { name: 'Chrono Rift', description: 'Briefly dilates the flow of time to anticipate incoming spells.' },
      { name: 'Frostfire Lance', description: 'Conjures a dual-elemental piercing projectile that slows upon impact.' },
    ],
    startingWeapons: ['Carved Crystal Staff', 'Tome of Astral Gateways & Wand', 'Enchanted Runed Athame'],
  },
  Rogue: {
    name: 'Rogue',
    description: 'Specialists in stealth, swift precision, and exploiting vulnerabilities.',
    hitDie: 8,
    primaryStat: 'dex',
    iconName: 'Venom',
    colorScheme: {
      border: 'border-emerald-600/40',
      badgeBg: 'bg-emerald-950/40',
      accent: 'text-emerald-400',
      glow: 'shadow-emerald-500/10',
    },
    portraitFallback: '/src/assets/images/fantasy_rogue_portrait_1792822685903.jpg',
    abilities: [
      { name: 'Shadowstep', description: 'Fades seamlessly into ambient darkness, reappearing behind an adversary.' },
      { name: 'Venomous Flurry', description: 'Strikes vital pressure points with coated silver daggers.' },
      { name: 'Smoke Veil', description: 'Deploys an obsidian smoke cloud to break line-of-sight instantly.' },
    ],
    startingWeapons: ['Dual Moon-Steel Daggers', 'Recurve Hand Crossbow', 'Serrated Stiletto & Lockpicks'],
  },
  Ranger: {
    name: 'Ranger',
    description: 'Deadly scouts and marksmen who live in balance with untamed nature.',
    hitDie: 10,
    primaryStat: 'dex',
    iconName: 'Crosshair',
    colorScheme: {
      border: 'border-lime-600/40',
      badgeBg: 'bg-lime-950/40',
      accent: 'text-lime-400',
      glow: 'shadow-lime-500/10',
    },
    portraitFallback: '/src/assets/images/fantasy_ranger_portrait_1792822684981.jpg',
    abilities: [
      { name: 'Hail of Thorns', description: 'Looses an arrow that bursts into razor-sharp brambles on impact.' },
      { name: 'Predator Mark', description: 'Tracks target movement through brush and reveals structural weaknesses.' },
      { name: 'Guerilla Retreat', description: 'Leaps back through woodland foliage while firing a suppressing volley.' },
    ],
    startingWeapons: ['Yew Longbow & Broadhead Quiver', 'Twin Hunting Sabres', 'Reinforced Composite Bow'],
  },
  Paladin: {
    name: 'Paladin',
    description: 'Holy champions bound by solemn oaths to protect the weak and banish evil.',
    hitDie: 10,
    primaryStat: 'cha',
    iconName: 'Sun',
    colorScheme: {
      border: 'border-yellow-500/40',
      badgeBg: 'bg-yellow-950/40',
      accent: 'text-yellow-400',
      glow: 'shadow-yellow-500/10',
    },
    portraitFallback: '/src/assets/images/fantasy_warrior_portrait_1792822684273.jpg',
    abilities: [
      { name: 'Radiant Smite', description: 'Channels solar wrath through the blade edge to incinerate darkness.' },
      { name: 'Aura of Resolve', description: 'Wards nearby allies against terror, confusion, and despair.' },
      { name: 'Lay on Hands', description: 'Restores vitality and cleanses afflictions with sacred warmth.' },
    ],
    startingWeapons: ['Gilded Sunblade & Tower Shield', 'Sanctified Morningstar', 'Heirloom Greatsword of Vows'],
  },
  Cleric: {
    name: 'Cleric',
    description: 'Devout intermediaries between mortals and cosmic pantheons.',
    hitDie: 8,
    primaryStat: 'wis',
    iconName: 'Cross',
    colorScheme: {
      border: 'border-cyan-600/40',
      badgeBg: 'bg-cyan-950/40',
      accent: 'text-cyan-400',
      glow: 'shadow-cyan-500/10',
    },
    portraitFallback: '/src/assets/images/fantasy_mage_portrait_1792822684578.jpg',
    abilities: [
      { name: 'Beacon of Grace', description: 'Summons a pillar of holy luminescence to heal and shield allies.' },
      { name: 'Turn Undead', description: 'Utters primordial litanies that cause corrupted spirits to flee in agony.' },
      { name: 'Guiding Light', description: 'Marks an enemy with celestial fire, guiding companion strikes.' },
    ],
    startingWeapons: ['Flanged Steel Mace & Holy Relic', 'Blessed Quarterstaff', 'Ceremonial War Pick'],
  },
  Druid: {
    name: 'Druid',
    description: 'Primal wardens who channel the seasons, wild beasts, and earth magic.',
    hitDie: 8,
    primaryStat: 'wis',
    iconName: 'Leaf',
    colorScheme: {
      border: 'border-teal-600/40',
      badgeBg: 'bg-teal-950/40',
      accent: 'text-teal-400',
      glow: 'shadow-teal-500/10',
    },
    portraitFallback: '/src/assets/images/fantasy_ranger_portrait_1792822684981.jpg',
    abilities: [
      { name: 'Primal Shape', description: 'Assumes the form of a dire wolf or cave bear in battle.' },
      { name: 'Entangling Roots', description: 'Erupts ancient root systems from stone to bind enemy feet.' },
      { name: 'Barkskin Ward', description: 'Hardens skin into petrified oak, turning aside sharp weapons.' },
    ],
    startingWeapons: ['Ironwood Club & Wooden Buckler', 'Living Scythe Staff', 'Carved Antler Dagger'],
  },
  Bard: {
    name: 'Bard',
    description: 'Charismatic performers whose melodies weave enchantments and fate itself.',
    hitDie: 8,
    primaryStat: 'cha',
    iconName: 'Music',
    colorScheme: {
      border: 'border-rose-600/40',
      badgeBg: 'bg-rose-950/40',
      accent: 'text-rose-400',
      glow: 'shadow-rose-500/10',
    },
    portraitFallback: '/src/assets/images/fantasy_rogue_portrait_1792822685903.jpg',
    abilities: [
      { name: 'Song of Discord', description: 'Plays a disorienting cadence that disrupts enemy spellcasters.' },
      { name: 'Inspirational Ballad', description: 'Inspires companions to surpass mortal limits during crisis.' },
      { name: 'Cutting Words', description: 'Undermines enemy confidence with razor-sharp improvised verse.' },
    ],
    startingWeapons: ['Silvered Rapier & Masterwork Lute', 'Ornate Blunderbuss & Flute', 'Duelist Foil'],
  },
};

export const FIRST_NAMES = [
  'Eldrin', 'Thorgar', 'Lyra', 'Kaelen', 'Valerius', 'Morrigan',
  'Bryn', 'Aurelia', 'Gideon', 'Sylas', 'Rowan', 'Zephyr',
  'Thalor', 'Cassian', 'Vespera', 'Doran', 'Kaelith', 'Isolde',
  'Faelen', 'Kragthor', 'Seraphina', 'Varok', 'Elowen', 'Jorun',
  'Astrid', 'Althea', 'Corvus', 'Torvi', 'Rune', 'Malakor',
  'Theron', 'Elira', 'Balthazar', 'Sariel', 'Garrick', 'Niamh',
  'Aric', 'Vaelin', 'Caelum', 'Iseult', 'Roderick', 'Morwen'
];

export const SURNAMES = [
  'Ironbreaker', 'Shadowveil', 'Moonwhisper', 'Emberfall', 'Dawnbringer',
  'Stormstrider', 'Oakenshield', 'Frostweaver', 'Silverflame', 'Bloodthorne',
  'Nightbreeze', 'Sunwalker', 'Runecarver', 'Starfall', 'Deepdelver',
  'Swiftblade', 'Wildheart', 'Duskveil', 'Thunderbrand', 'Grimward',
  'Valewarden', 'Ashford', 'Blackwood', 'Brightwater', 'Stonegaze'
];

export const TITLES = [
  'the Unyielding', 'the Spellbound', 'the Silent Whisper', 'the Sunforged',
  'the Ashen Blade', 'the Ancient', 'the Wanderer', 'the Oathkeeper',
  'the Shadowdancer', 'the Relentless', 'the Starwatcher', 'the Ironclad',
  'the Dreamweaver', 'of the Silver March', 'of the Iron Citadel',
  'the Pathfinder', 'the Stormborn', 'the Resolute', 'the Vigilant'
];

export const RACES: FantasyRace[] = [
  'Human',
  'High Elf',
  'Wood Elf',
  'Mountain Dwarf',
  'Tiefling',
  'Dragonborn',
  'Half-Orc',
  'Halfling',
];

export const ALIGNMENTS: Alignment[] = [
  'Lawful Good',
  'Neutral Good',
  'Chaotic Good',
  'Lawful Neutral',
  'True Neutral',
  'Chaotic Neutral',
];

export const BACKSTORIES = [
  'A veteran of the Ashpeak siege who laid down formal service to wander the borderlands as a sword-for-hire.',
  'Exiled from the High Spires after uncovering a forbidden script within the imperial archives.',
  'Raised among the frontier woodwards, trained to hunt beasts that seep through planar breaches.',
  'Last surviving scion of an ancient fallen house, seeking ancient relics to restore ancestral honor.',
  'A former gladiator from the sunken colosseum who won emancipation through cunning and unyielding grit.',
  'A solitary scholar who forged an oath upon an ancient standing stone during a total eclipse.',
  'Orphaned in the harbor slums, surviving on deft fingers and quick wits before adopting a sacred purpose.',
  'A temple acolyte who witnessed a divine vision of storm clouds gathering beyond the northern range.',
  'Caravan scout who survived a trek across the Whispering Wastes and returned with silver-flecked eyes.',
  'A master craftsman whose workshop was burned by bandit raiders, now questing for justice.',
];

function getRandomItem<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

// 4d6 drop lowest for authentic tabletop stats
function rollStat(isPrimary: boolean): number {
  const rolls = [
    Math.floor(Math.random() * 6) + 1,
    Math.floor(Math.random() * 6) + 1,
    Math.floor(Math.random() * 6) + 1,
    Math.floor(Math.random() * 6) + 1,
  ];
  rolls.sort((a, b) => a - b);
  const sum = rolls[1] + rolls[2] + rolls[3];
  // Ensure primary stat has strong heroic baseline (14-18)
  if (isPrimary && sum < 14) {
    return Math.floor(Math.random() * 4) + 14;
  }
  return sum;
}

export function getStatModifier(score: number): string {
  const mod = Math.floor((score - 10) / 2);
  return mod >= 0 ? `+${mod}` : `${mod}`;
}

export function generateCharacterBackstory(
  name: string,
  race: FantasyRace,
  characterClass: CharacterClass
): string {
  const firstName = name.split(' ')[0] || name;

  const leadIns = [
    `Raised within the wind-swept citadels of the northern rim, the ${race} ${characterClass} ${name} earned renown after turning back a vanguard of shadow beasts.`,
    `Before embracing the demanding path of a ${characterClass}, ${name} survived the treacherous perils of the Sunken Barrens as a solitary ${race} exile.`,
    `Trained in secluded mountain sanctums, the ${race} ${characterClass} ${name} mastered their martial arts after ancestral relics were plundered by rogue warlords.`,
    `Born under the portent of an eclipsed blood moon, ${name} discovered their destiny as a ${characterClass} when arcane sigils flared upon their skin.`,
    `Once a celebrated champion in the provincial tourneys, the ${race} ${name} cast aside earthly accolades to answer a sacred calling as a ${characterClass}.`,
    `Discovered as a wanderer along the Whispering Marshes, ${name} honed the instincts of a true ${characterClass} under the tutelage of an ancient ${race} mentor.`,
    `After surviving the sudden ruin of their highland outpost, the ${race} ${name} swore the solemn vows of a ${characterClass} to defend defenseless folk across the realms.`,
    `Having broken free from a forgotten underground stronghold, ${name} walks the surface kingdom as an indomitable ${race} ${characterClass} bound by honor.`,
    `Guided by vivid ancestral dreams of planar upheaval, the ${race} ${characterClass} ${name} departed their sanctuary with only heirloom gear and iron resolve.`,
    `Following years spent deciphering forbidden borderland manuscripts, ${name} took up arms as a ${characterClass} to avert a looming catastrophe.`
  ];

  const conclusions = [
    `Now roaming the realm, they seek companions of pure courage to unearth the lost sanctums and restore balance to the frontier.`,
    `With their weapons consecrated and spirit tested, they hunt the hidden syndicate responsible for scattering their people to the winds.`,
    `Driven by an unyielding oath, ${firstName} pledges their blade and prowess to any fellowship daring enough to face the encroaching dark.`,
    `Now traversing uncharted borderlands, they journey toward the ancient ruins where their family's true destiny waits to be claimed.`,
    `Carrying their ancestral burdens with quiet pride, they refuse to rest until justice is wrought and the forgotten prophecies are fulfilled.`,
    `Bound by neither fear nor coin, they follow the shifting omens, determined to forge an immortal legend throughout the taverns and kingdoms.`,
    `Now lending their formidable discipline to the questing fellowships, they prepare to confront whatever nameless perils lurk beyond the veil.`
  ];

  const firstSentence = getRandomItem(leadIns);
  const secondSentence = getRandomItem(conclusions);
  return `${firstSentence} ${secondSentence}`;
}

export function generateRandomCharacter(requestedClass?: CharacterClass): Character {
  const classes: CharacterClass[] = [
    'Warrior',
    'Mage',
    'Rogue',
    'Ranger',
    'Paladin',
    'Cleric',
    'Druid',
    'Bard',
  ];

  const characterClass = requestedClass && classes.includes(requestedClass)
    ? requestedClass
    : getRandomItem(classes);

  const classDef = CLASS_DEFINITIONS[characterClass];
  const firstName = getRandomItem(FIRST_NAMES);
  const surname = getRandomItem(SURNAMES);
  const fullName = `${firstName} ${surname}`;
  const title = getRandomItem(TITLES);
  const race = getRandomItem(RACES);
  const alignment = getRandomItem(ALIGNMENTS);

  const stats: CharacterStats = {
    str: rollStat(classDef.primaryStat === 'str'),
    dex: rollStat(classDef.primaryStat === 'dex'),
    con: rollStat(classDef.primaryStat === 'con'),
    int: rollStat(classDef.primaryStat === 'int'),
    wis: rollStat(classDef.primaryStat === 'wis'),
    cha: rollStat(classDef.primaryStat === 'cha'),
  };

  const conMod = Math.floor((stats.con - 10) / 2);
  const dexMod = Math.floor((stats.dex - 10) / 2);
  const hp = Math.max(classDef.hitDie + conMod, 8);
  const armorClass = characterClass === 'Warrior' || characterClass === 'Paladin'
    ? 18
    : 10 + dexMod + (characterClass === 'Ranger' || characterClass === 'Rogue' ? 2 : 0);

  const ability = getRandomItem(classDef.abilities);
  const weapon = getRandomItem(classDef.startingWeapons);
  const backstory = generateCharacterBackstory(fullName, race, characterClass);

  return {
    id: `char-${Date.now()}-${Math.floor(Math.random() * 10000)}`,
    name: `${firstName} ${surname}`,
    title,
    characterClass,
    race,
    alignment,
    level: 1,
    hp,
    armorClass,
    stats,
    signatureAbility: ability,
    startingGear: weapon,
    backstory,
    portraitUrl: PORTRAIT_MAP[characterClass],
    portraitSeed: Math.floor(Math.random() * 1000000) + 1,
    hasGeneratedPortrait: true,
    generatedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  };
}
