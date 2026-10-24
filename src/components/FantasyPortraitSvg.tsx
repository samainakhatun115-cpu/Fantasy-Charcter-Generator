import { useMemo } from 'react';
import { CharacterClass, FantasyRace } from '../types.ts';

interface FantasyPortraitSvgProps {
  seed: number;
  characterClass: CharacterClass;
  race: FantasyRace;
  name: string;
  className?: string;
}

// Simple deterministic PRNG for reproducible variations from a seed
function createPrng(initialSeed: number) {
  let s = initialSeed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

export function FantasyPortraitSvg({
  seed,
  characterClass,
  race,
  name,
  className = '',
}: FantasyPortraitSvgProps) {
  const visual = useMemo(() => {
    // Combine name string hash and seed for seed generation
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = (hash << 5) - hash + name.charCodeAt(i);
      hash |= 0;
    }
    const rand = createPrng(Math.abs(hash) + seed * 7919);

    // 1. Background Palettes (Cartoon/Video Game mood)
    const bgPalettes = [
      { from: '#1e1b4b', to: '#4338ca', aura: '#818cf8', name: 'Arcane Rift' },
      { from: '#311010', to: '#7f1d1d', aura: '#f87171', name: 'Crimson Keep' },
      { from: '#064e3b', to: '#047857', aura: '#34d399', name: 'Verdant Forest' },
      { from: '#451a03', to: '#b45309', aura: '#fbbf24', name: 'Molten Forge' },
      { from: '#0f172a', to: '#334155', aura: '#94a3b8', name: 'Shadow Citadel' },
      { from: '#172554', to: '#1d4ed8', aura: '#60a5fa', name: 'Celestial Spire' },
    ];
    const bg = bgPalettes[Math.floor(rand() * bgPalettes.length)];

    // 2. Race-based Skin Tones
    let baseSkin = '#fcd34d';
    let shadowSkin = '#f59e0b';
    let isOrc = race === 'Half-Orc';
    let isTiefling = race === 'Tiefling';
    let isElf = race === 'High Elf' || race === 'Wood Elf';
    let isDwarf = race === 'Mountain Dwarf';
    let isDragonborn = race === 'Dragonborn';

    if (isOrc) {
      baseSkin = '#65a30d';
      shadowSkin = '#4d7c0f';
    } else if (isTiefling) {
      const redTone = rand() > 0.5;
      baseSkin = redTone ? '#dc2626' : '#9333ea';
      shadowSkin = redTone ? '#991b1b' : '#6b21a8';
    } else if (isDragonborn) {
      const scaleTones = ['#0284c7', '#d97706', '#dc2626', '#475569'];
      baseSkin = scaleTones[Math.floor(rand() * scaleTones.length)];
      shadowSkin = '#0f172a';
    } else if (race === 'Wood Elf') {
      baseSkin = '#d97706';
      shadowSkin = '#b45309';
    } else if (race === 'High Elf') {
      baseSkin = '#fef08a';
      shadowSkin = '#fde047';
    } else if (isDwarf) {
      baseSkin = '#fb923c';
      shadowSkin = '#ea580c';
    } else {
      // Human / Halfling variations
      const humanTones = [
        { base: '#fed7aa', shadow: '#fba56b' },
        { base: '#fde047', shadow: '#eab308' },
        { base: '#d97706', shadow: '#92400e' },
        { base: '#78350f', shadow: '#451a03' },
      ];
      const selected = humanTones[Math.floor(rand() * humanTones.length)];
      baseSkin = selected.base;
      shadowSkin = selected.shadow;
    }

    // 3. Hair Colors
    const hairColors = [
      { fill: '#f8fafc', stroke: '#cbd5e1', highlight: '#ffffff' }, // Silver
      { fill: '#0f172a', stroke: '#020617', highlight: '#334155' }, // Raven Black
      { fill: '#ea580c', stroke: '#9a3412', highlight: '#fdba74' }, // Flame Orange
      { fill: '#fbbf24', stroke: '#b45309', highlight: '#fef08a' }, // Golden Blonde
      { fill: '#7c3aed', stroke: '#5b21b6', highlight: '#c4b5fd' }, // Arcane Violet
      { fill: '#059669', stroke: '#065f46', highlight: '#6ee7b7' }, // Emerald
      { fill: '#78350f', stroke: '#451a03', highlight: '#b45309' }, // Auburn
    ];
    const hair = hairColors[Math.floor(rand() * hairColors.length)];

    // 4. Eye Colors
    const eyeColors = ['#38bdf8', '#34d399', '#f59e0b', '#ec4899', '#a855f7', '#ef4444'];
    const eyeColor = eyeColors[Math.floor(rand() * eyeColors.length)];

    // 5. Hair Style (0 to 5)
    const hairStyle = Math.floor(rand() * 6);

    // 6. Armor / Attire styling
    let armorColor = '#475569';
    let armorTrim = '#f59e0b';
    if (characterClass === 'Warrior' || characterClass === 'Paladin') {
      armorColor = characterClass === 'Paladin' ? '#f8fafc' : '#334155';
      armorTrim = '#fbbf24';
    } else if (characterClass === 'Mage') {
      armorColor = '#312e81';
      armorTrim = '#c084fc';
    } else if (characterClass === 'Rogue') {
      armorColor = '#18181b';
      armorTrim = '#10b981';
    } else if (characterClass === 'Ranger' || characterClass === 'Druid') {
      armorColor = '#14532d';
      armorTrim = '#86efac';
    } else if (characterClass === 'Bard') {
      armorColor = '#831843';
      armorTrim = '#f472b6';
    }

    // 7. Expressions
    const expression = Math.floor(rand() * 4); // 0 = smirk, 1 = serious, 2 = battle grin, 3 = mystical

    // 8. Facial feature / war paint
    const faceMarking = Math.floor(rand() * 5); // 0 = none, 1 = eye scar, 2 = war paint stripes, 3 = forehead rune, 4 = cheek tattoo

    // 9. Facial hair (Dwarves always have beard, others occasional)
    const hasBeard = isDwarf ? true : rand() > 0.65;
    const beardStyle = Math.floor(rand() * 3); // 0 = braided, 1 = full, 2 = goatee

    // 10. Accessories / Headgear
    const headgear = Math.floor(rand() * 5); // 0 = none, 1 = cowl/hood, 2 = horned/circlet, 3 = headband, 4 = visor/eyepatch

    // 11. Aura particles
    const particleCount = 8;
    const particles = Array.from({ length: particleCount }).map((_, i) => ({
      cx: 40 + rand() * 320,
      cy: 40 + rand() * 320,
      r: 2 + rand() * 5,
      opacity: 0.3 + rand() * 0.5,
    }));

    return {
      bg,
      baseSkin,
      shadowSkin,
      isOrc,
      isTiefling,
      isElf,
      isDwarf,
      isDragonborn,
      hair,
      eyeColor,
      hairStyle,
      armorColor,
      armorTrim,
      expression,
      faceMarking,
      hasBeard,
      beardStyle,
      headgear,
      particles,
    };
  }, [seed, characterClass, race, name]);

  const {
    bg,
    baseSkin,
    shadowSkin,
    isOrc,
    isTiefling,
    isElf,
    isDwarf,
    hair,
    eyeColor,
    hairStyle,
    armorColor,
    armorTrim,
    expression,
    faceMarking,
    hasBeard,
    beardStyle,
    headgear,
    particles,
  } = visual;

  return (
    <svg
      viewBox="0 0 400 400"
      className={`w-full h-full select-none ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={`Cartoon video-game portrait of ${name}`}
    >
      <defs>
        {/* Dynamic Background Gradient */}
        <linearGradient id={`bgGrad-${seed}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={bg.from} />
          <stop offset="100%" stopColor={bg.to} />
        </linearGradient>

        {/* Ambient Halo Radial Gradient */}
        <radialGradient id={`haloGrad-${seed}`} cx="50%" cy="45%" r="60%">
          <stop offset="0%" stopColor={bg.aura} stopOpacity="0.45" />
          <stop offset="80%" stopColor={bg.aura} stopOpacity="0.05" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0" />
        </radialGradient>

        {/* Metal / Armor Gradient */}
        <linearGradient id={`armorGrad-${seed}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={armorColor} />
          <stop offset="100%" stopColor="#0f172a" />
        </linearGradient>

        {/* Hair Highlight Gradient */}
        <linearGradient id={`hairGrad-${seed}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={hair.highlight} />
          <stop offset="50%" stopColor={hair.fill} />
          <stop offset="100%" stopColor={hair.stroke} />
        </linearGradient>

        <clipPath id={`avatarClip-${seed}`}>
          <rect x="0" y="0" width="400" height="400" rx="16" />
        </clipPath>
      </defs>

      <g clipPath={`url(#avatarClip-${seed})`}>
        {/* 1. Backdrop */}
        <rect width="400" height="400" fill={`url(#bgGrad-${seed})`} />
        <circle cx="200" cy="180" r="160" fill={`url(#haloGrad-${seed})`} />

        {/* Backdrop Video-Game Geometric Runes & Embers */}
        <circle cx="200" cy="180" r="145" fill="none" stroke={bg.aura} strokeWidth="1.5" strokeDasharray="6 8" opacity="0.4" />
        <circle cx="200" cy="180" r="125" fill="none" stroke={bg.aura} strokeWidth="1" strokeDasharray="16 12" opacity="0.3" />

        {particles.map((p, idx) => (
          <circle
            key={idx}
            cx={p.cx}
            cy={p.cy}
            r={p.r}
            fill={bg.aura}
            opacity={p.opacity}
          />
        ))}

        {/* 2. Character Torso & Shoulder Armor */}
        <g id="torso">
          {/* Cape / Mantle behind */}
          <path
            d="M 100 280 C 70 320, 50 380, 40 400 L 360 400 C 350 380, 330 320, 300 280 Z"
            fill="#090d16"
            stroke="#020617"
            strokeWidth="4"
          />

          {/* Shoulders / Pauldrons */}
          <path
            d="M 120 280 L 70 340 L 90 400 L 310 400 L 330 340 L 280 280 Z"
            fill={`url(#armorGrad-${seed})`}
            stroke="#0f172a"
            strokeWidth="5"
          />

          {/* Pauldron plates */}
          <path
            d="M 80 320 C 110 300, 130 290, 150 300 L 130 370 L 70 350 Z"
            fill={armorColor}
            stroke={armorTrim}
            strokeWidth="3"
          />
          <path
            d="M 320 320 C 290 300, 270 290, 250 300 L 270 370 L 330 350 Z"
            fill={armorColor}
            stroke={armorTrim}
            strokeWidth="3"
          />

          {/* Chestplate Center Emblem */}
          <path
            d="M 170 320 L 200 300 L 230 320 L 200 380 Z"
            fill="#1e293b"
            stroke={armorTrim}
            strokeWidth="3"
          />
          <circle cx="200" cy="335" r="8" fill={armorTrim} />

          {/* Neck */}
          <path
            d="M 175 220 L 175 275 C 185 285, 215 285, 225 275 L 225 220 Z"
            fill={shadowSkin}
            stroke="#0f172a"
            strokeWidth="4"
          />
        </g>

        {/* 3. Ears & Horns (Behind Head) */}
        {isTiefling && (
          <g id="tiefling-horns">
            <path
              d="M 140 140 C 90 120, 70 50, 120 20 C 130 50, 140 90, 150 120 Z"
              fill="#450a0a"
              stroke="#0f172a"
              strokeWidth="4"
            />
            <path
              d="M 260 140 C 310 120, 330 50, 280 20 C 270 50, 260 90, 250 120 Z"
              fill="#450a0a"
              stroke="#0f172a"
              strokeWidth="4"
            />
          </g>
        )}

        {isElf && (
          <g id="elf-ears">
            <path
              d="M 145 150 C 90 140, 70 120, 60 110 C 85 135, 120 160, 145 170 Z"
              fill={baseSkin}
              stroke="#0f172a"
              strokeWidth="4"
            />
            <path
              d="M 255 150 C 310 140, 330 120, 340 110 C 315 135, 280 160, 255 170 Z"
              fill={baseSkin}
              stroke="#0f172a"
              strokeWidth="4"
            />
          </g>
        )}

        {/* 4. Head / Face Shape */}
        <g id="head">
          <ellipse
            cx="200"
            cy="170"
            rx={isDwarf ? "68" : "62"}
            ry={isDwarf ? "62" : "68"}
            fill={baseSkin}
            stroke="#0f172a"
            strokeWidth="5"
          />

          {/* Chin / Jaw Shading */}
          <path
            d="M 155 190 C 170 230, 230 230, 245 190 C 225 220, 175 220, 155 190 Z"
            fill={shadowSkin}
            opacity="0.6"
          />

          {/* Standard Round Ears for non-elves */}
          {!isElf && (
            <>
              <ellipse cx="138" cy="170" rx="9" ry="14" fill={baseSkin} stroke="#0f172a" strokeWidth="4" />
              <ellipse cx="262" cy="170" rx="9" ry="14" fill={baseSkin} stroke="#0f172a" strokeWidth="4" />
            </>
          )}
        </g>

        {/* 5. Eyes & Eyebrows */}
        <g id="eyes">
          {/* Eyebrows */}
          <path
            d={
              expression === 2
                ? "M 155 138 Q 170 146 185 140"
                : "M 155 142 Q 170 134 185 140"
            }
            stroke={hair.stroke}
            strokeWidth="6"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d={
              expression === 2
                ? "M 245 138 Q 230 146 215 140"
                : "M 245 142 Q 230 134 215 140"
            }
            stroke={hair.stroke}
            strokeWidth="6"
            strokeLinecap="round"
            fill="none"
          />

          {/* Eye Whites */}
          <ellipse cx="170" cy="158" rx="14" ry="10" fill="#ffffff" stroke="#0f172a" strokeWidth="3" />
          <ellipse cx="230" cy="158" rx="14" ry="10" fill="#ffffff" stroke="#0f172a" strokeWidth="3" />

          {/* Irises */}
          <circle cx="170" cy="158" r="7" fill={eyeColor} />
          <circle cx="230" cy="158" r="7" fill={eyeColor} />

          {/* Pupils */}
          <circle cx="170" cy="158" r="3.5" fill="#090d16" />
          <circle cx="230" cy="158" r="3.5" fill="#090d16" />

          {/* Cartoon Eye Glint Highlights */}
          <circle cx="168" cy="155" r="2" fill="#ffffff" />
          <circle cx="228" cy="155" r="2" fill="#ffffff" />
        </g>

        {/* 6. Nose & Mouth */}
        <g id="nose-and-mouth">
          {/* Nose */}
          <path
            d="M 197 165 L 204 178 L 195 180"
            stroke="#0f172a"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />

          {/* Mouth */}
          {expression === 0 && (
            // Smirk
            <path d="M 185 198 Q 205 200 218 193" stroke="#0f172a" strokeWidth="4" strokeLinecap="round" fill="none" />
          )}
          {expression === 1 && (
            // Stoic serious
            <line x1="185" y1="198" x2="215" y2="198" stroke="#0f172a" strokeWidth="4" strokeLinecap="round" />
          )}
          {expression === 2 && (
            // Battle Grin
            <path d="M 182 195 Q 200 210 218 195 Z" fill="#ffffff" stroke="#0f172a" strokeWidth="3.5" />
          )}
          {expression === 3 && (
            // Calm Mystical
            <path d="M 188 197 Q 200 203 212 197" stroke="#0f172a" strokeWidth="3.5" strokeLinecap="round" fill="none" />
          )}

          {/* Orc Tusks */}
          {isOrc && (
            <g id="orc-tusks">
              <polygon points="182,198 185,188 188,198" fill="#f8fafc" stroke="#0f172a" strokeWidth="2" />
              <polygon points="212,198 215,188 218,198" fill="#f8fafc" stroke="#0f172a" strokeWidth="2" />
            </g>
          )}

          {/* War Paint / Scars */}
          {faceMarking === 1 && (
            // Eye scar
            <line x1="168" y1="140" x2="174" y2="175" stroke="#991b1b" strokeWidth="3" strokeLinecap="round" opacity="0.85" />
          )}
          {faceMarking === 2 && (
            // Tribal cheek stripes
            <g opacity="0.8">
              <line x1="145" y1="175" x2="160" y2="185" stroke="#dc2626" strokeWidth="3" strokeLinecap="round" />
              <line x1="148" y1="182" x2="163" y2="192" stroke="#dc2626" strokeWidth="3" strokeLinecap="round" />
              <line x1="255" y1="175" x2="240" y2="185" stroke="#dc2626" strokeWidth="3" strokeLinecap="round" />
              <line x1="252" y1="182" x2="237" y2="192" stroke="#dc2626" strokeWidth="3" strokeLinecap="round" />
            </g>
          )}
          {faceMarking === 3 && (
            // Forehead glowing rune
            <polygon points="200,120 205,128 200,136 195,128" fill={eyeColor} stroke="#0f172a" strokeWidth="1.5" />
          )}
        </g>

        {/* 7. Facial Hair */}
        {hasBeard && (
          <g id="beard">
            {beardStyle === 0 ? (
              // Epic Braided Beard (Dwarf style)
              <g>
                <path
                  d="M 150 185 C 150 250, 170 300, 200 320 C 230 300, 250 250, 250 185 C 230 200, 170 200, 150 185 Z"
                  fill={`url(#hairGrad-${seed})`}
                  stroke="#0f172a"
                  strokeWidth="4"
                />
                {/* Beard clasps */}
                <rect x="190" y="270" width="20" height="8" rx="2" fill="#f59e0b" stroke="#0f172a" strokeWidth="2" />
                <rect x="192" y="295" width="16" height="8" rx="2" fill="#f59e0b" stroke="#0f172a" strokeWidth="2" />
              </g>
            ) : beardStyle === 1 ? (
              // Full Rugged Beard
              <path
                d="M 152 185 C 150 230, 170 260, 200 265 C 230 260, 250 230, 248 185 C 230 200, 170 200, 152 185 Z"
                fill={hair.stroke}
                stroke="#0f172a"
                strokeWidth="4"
              />
            ) : (
              // Goatee / Stubble
              <path
                d="M 188 202 C 188 225, 212 225, 212 202 Z"
                fill={hair.stroke}
                stroke="#0f172a"
                strokeWidth="3"
              />
            )}
          </g>
        )}

        {/* 8. Hair Style (Front & Bangs) */}
        <g id="hair">
          {headgear === 1 ? (
            // Cowl / Rogue Hood
            <path
              d="M 130 180 C 120 90, 150 70, 200 65 C 250 70, 280 90, 270 180 C 275 220, 260 230, 250 230 C 255 180, 250 110, 200 105 C 150 110, 145 180, 150 230 C 140 230, 125 220, 130 180 Z"
              fill={armorColor}
              stroke="#0f172a"
              strokeWidth="5"
            />
          ) : hairStyle === 0 ? (
            // Spiky Anime Hero Hair
            <path
              d="M 130 150 L 110 110 L 140 100 L 130 65 L 170 70 L 180 40 L 210 55 L 235 42 L 245 70 L 275 65 L 265 100 L 290 115 L 270 150 C 265 120, 240 110, 200 115 C 160 110, 135 120, 130 150 Z"
              fill={`url(#hairGrad-${seed})`}
              stroke="#0f172a"
              strokeWidth="4.5"
              strokeLinejoin="round"
            />
          ) : hairStyle === 1 ? (
            // Long Flowing Elven Mane
            <path
              d="M 130 150 C 115 110, 140 60, 200 60 C 260 60, 285 110, 270 150 C 285 200, 280 260, 290 320 L 260 320 C 255 240, 265 130, 230 120 C 200 120, 170 120, 140 120 C 135 130, 145 240, 140 320 L 110 320 C 120 260, 115 200, 130 150 Z"
              fill={`url(#hairGrad-${seed})`}
              stroke="#0f172a"
              strokeWidth="4.5"
            />
          ) : hairStyle === 2 ? (
            // Warrior Topknot / Ponytail
            <g>
              <ellipse cx="200" cy="45" rx="16" ry="14" fill={hair.fill} stroke="#0f172a" strokeWidth="4" />
              <rect x="194" y="55" width="12" height="6" fill="#f59e0b" stroke="#0f172a" strokeWidth="2" />
              <path
                d="M 135 150 C 130 90, 150 70, 200 68 C 250 70, 270 90, 265 150 C 255 125, 230 115, 200 115 C 170 115, 145 125, 135 150 Z"
                fill={`url(#hairGrad-${seed})`}
                stroke="#0f172a"
                strokeWidth="4.5"
              />
            </g>
          ) : hairStyle === 3 ? (
            // Swept Undercut
            <path
              d="M 135 145 C 135 105, 155 75, 200 70 C 255 65, 275 95, 275 120 C 265 125, 235 115, 190 120 C 150 125, 140 135, 135 145 Z"
              fill={`url(#hairGrad-${seed})`}
              stroke="#0f172a"
              strokeWidth="4.5"
            />
          ) : hairStyle === 4 ? (
            // Wild Barbarian Curls
            <path
              d="M 130 145 Q 110 110 135 85 Q 160 55 200 60 Q 240 55 265 85 Q 290 110 270 145 C 255 120, 230 115, 200 115 C 170 115, 145 120, 130 145 Z"
              fill={`url(#hairGrad-${seed})`}
              stroke="#0f172a"
              strokeWidth="4.5"
            />
          ) : (
            // Short Crop with Headband
            <g>
              <path
                d="M 135 140 C 135 90, 160 75, 200 75 C 240 75, 265 90, 265 140 C 250 125, 230 118, 200 118 C 170 118, 150 125, 135 140 Z"
                fill={`url(#hairGrad-${seed})`}
                stroke="#0f172a"
                strokeWidth="4"
              />
              <path d="M 134 135 C 160 120, 240 120, 266 135" stroke="#f59e0b" strokeWidth="6" fill="none" />
            </g>
          )}

          {/* Circlet / Crown if headgear === 2 */}
          {headgear === 2 && (
            <path
              d="M 135 130 Q 200 110 265 130 L 260 120 Q 200 100 140 120 Z"
              fill="#fbbf24"
              stroke="#0f172a"
              strokeWidth="3"
            />
          )}
        </g>

        {/* 9. Video Game Fantasy Card Frame & Corner Brackets */}
        <g id="game-frame" pointerEvents="none">
          {/* Subtle outer vignette frame */}
          <rect
            x="4"
            y="4"
            width="392"
            height="392"
            rx="12"
            fill="none"
            stroke="rgba(0,0,0,0.5)"
            strokeWidth="8"
          />

          <rect
            x="8"
            y="8"
            width="384"
            height="384"
            rx="8"
            fill="none"
            stroke={armorTrim}
            strokeWidth="2"
            opacity="0.8"
          />

          {/* Gilded Corner Brackets */}
          {/* Top-Left */}
          <path d="M 10 32 L 10 10 L 32 10" fill="none" stroke={armorTrim} strokeWidth="4" strokeLinecap="square" />
          <circle cx="14" cy="14" r="3" fill="#ffffff" />

          {/* Top-Right */}
          <path d="M 390 32 L 390 10 L 368 10" fill="none" stroke={armorTrim} strokeWidth="4" strokeLinecap="square" />
          <circle cx="386" cy="14" r="3" fill="#ffffff" />

          {/* Bottom-Left */}
          <path d="M 10 368 L 10 390 L 32 390" fill="none" stroke={armorTrim} strokeWidth="4" strokeLinecap="square" />
          <circle cx="14" cy="386" r="3" fill="#ffffff" />

          {/* Bottom-Right */}
          <path d="M 390 368 L 390 390 L 368 390" fill="none" stroke={armorTrim} strokeWidth="4" strokeLinecap="square" />
          <circle cx="386" cy="386" r="3" fill="#ffffff" />
        </g>
      </g>
    </svg>
  );
}
