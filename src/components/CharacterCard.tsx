import { useState } from 'react';
import {
  Shield,
  Heart,
  Swords,
  Copy,
  Check,
  UserPlus,
  BookmarkCheck,
  Sparkles,
  RefreshCw,
  Flame,
  BookOpen,
  Scroll,
} from 'lucide-react';
import { Character } from '../types.ts';
import { CLASS_DEFINITIONS, getStatModifier } from '../data/fantasyData.ts';
import { FantasyPortraitSvg } from './FantasyPortraitSvg.tsx';

interface CharacterCardProps {
  character: Character;
  onAddToParty: (char: Character) => void;
  isAlreadyInParty: boolean;
  onReroll: () => void;
  isRolling: boolean;
  onGeneratePortrait: () => void;
  onRegeneratePortrait: () => void;
  onGenerateBackstory: () => void;
}

export function CharacterCard({
  character,
  onAddToParty,
  isAlreadyInParty,
  onReroll,
  isRolling,
  onGeneratePortrait,
  onRegeneratePortrait,
  onGenerateBackstory,
}: CharacterCardProps) {
  const [copied, setCopied] = useState(false);
  const classDef = CLASS_DEFINITIONS[character.characterClass];

  const handleCopy = async () => {
    const text = `📜 ${character.name} ${character.title}
Class: ${character.characterClass} | Race: ${character.race} | Alignment: ${character.alignment}
HP: ${character.hp} | Armor Class: ${character.armorClass}
STR: ${character.stats.str} (${getStatModifier(character.stats.str)}) | DEX: ${character.stats.dex} (${getStatModifier(character.stats.dex)}) | CON: ${character.stats.con} (${getStatModifier(character.stats.con)})
INT: ${character.stats.int} (${getStatModifier(character.stats.int)}) | WIS: ${character.stats.wis} (${getStatModifier(character.stats.wis)}) | CHA: ${character.stats.cha} (${getStatModifier(character.stats.cha)})
Signature Technique: ${character.signatureAbility.name} - ${character.signatureAbility.description}
Starting Relic & Gear: ${character.startingGear}
Chronicle: ${character.backstory}`;

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  const statItems = [
    { label: 'STR', value: character.stats.str, key: 'str' as const },
    { label: 'DEX', value: character.stats.dex, key: 'dex' as const },
    { label: 'CON', value: character.stats.con, key: 'con' as const },
    { label: 'INT', value: character.stats.int, key: 'int' as const },
    { label: 'WIS', value: character.stats.wis, key: 'wis' as const },
    { label: 'CHA', value: character.stats.cha, key: 'cha' as const },
  ];

  return (
    <article
      className={`relative workbench-card rounded-2xl overflow-hidden corner-filigree transition-all duration-300 border border-[#a8652c]/50 shadow-[0_20px_50px_rgba(0,0,0,0.85),0_0_30px_rgba(180,83,9,0.12)] ${
        isRolling ? 'opacity-60 scale-[0.99] filter blur-[1px]' : 'opacity-100 scale-100'
      }`}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
        {/* Left Column: Portrait and Core Identity */}
        <div className="lg:col-span-5 relative bg-[#120d0a] flex flex-col justify-between overflow-hidden border-b lg:border-b-0 lg:border-r border-[#69391a]/50">
          <div className="relative aspect-square w-full bg-[#18110e] overflow-hidden flex items-center justify-center">
            {/* Cartoon Video-Game Fantasy Portrait (pure SVG, no API key required) */}
            <FantasyPortraitSvg
              seed={character.portraitSeed}
              characterClass={character.characterClass}
              race={character.race}
              name={character.name}
            />

            {/* Ambient Contrast Scrim */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#120d0a] via-transparent to-transparent pointer-events-none" />

            {/* Class Tag Overlay at bottom of portrait */}
            <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between pointer-events-none">
              <div>
                <span className="text-[11px] font-semibold tracking-wider text-amber-400 uppercase drop-shadow">
                  Class & Archetype
                </span>
                <p className="font-fantasy text-2xl font-bold text-amber-200 tracking-wide drop-shadow-[0_2px_10px_rgba(245,158,11,0.5)]">
                  {character.characterClass}
                </p>
              </div>

              <div className="bg-[#1f140e]/90 backdrop-blur-md border border-amber-500/50 rounded-lg px-2.5 py-1 flex items-center gap-1.5 shadow-[0_0_12px_rgba(245,158,11,0.2)]">
                <Shield className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span className="font-mono text-xs font-bold text-amber-200 tabular-nums">
                  AC {character.armorClass}
                </span>
              </div>
            </div>
          </div>

          {/* Portrait Action Controls (inside the character display area) */}
          <div className="px-4 py-3 bg-[#19110d] border-t border-[#69391a]/50 flex items-center justify-between gap-2 flex-wrap">
            <span className="text-[11px] font-medium text-[#ba9e84]">
              Alchemical Portrait
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onGeneratePortrait}
                className="px-3 py-1.5 text-xs font-semibold text-amber-200 bg-[#29170e] hover:bg-[#382013] active:scale-95 rounded-lg transition-colors border border-amber-700/60 shadow-[0_0_10px_rgba(180,83,9,0.15)] flex items-center gap-1.5 whitespace-nowrap shrink-0"
                title="Generate a fresh portrait for this character"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Generate Portrait</span>
              </button>
              <button
                type="button"
                onClick={onRegeneratePortrait}
                className="px-3 py-1.5 text-xs font-bold text-[#1a0e06] bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 active:scale-95 rounded-lg transition-colors border border-amber-300/40 shadow-[0_0_12px_rgba(245,158,11,0.3)] flex items-center gap-1.5 whitespace-nowrap shrink-0"
                title="Regenerate with a new visual variation"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Regenerate</span>
              </button>
            </div>
          </div>

          {/* Quick Vitality Bar - Burgundy Inset */}
          <div className="p-4 flex items-center justify-between border-t border-[#6e222d]/50 bg-gradient-to-r from-[#2c0910] via-[#1a0c0e] to-[#251009]">
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-rose-400 shrink-0" />
              <span className="text-xs text-[#ba9e84]">Vitality</span>
              <span className="font-mono text-sm font-bold text-rose-200 tabular-nums">
                {character.hp} HP
              </span>
            </div>
            <div className="text-xs text-[#ba9e84] flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              <span>Primary:</span>
              <span className="font-bold text-amber-300 uppercase">{classDef.primaryStat}</span>
            </div>
          </div>
        </div>

        {/* Right Column: Character Details, Stats, and Lore */}
        <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between bg-gradient-to-b from-[#18110d] to-[#120d0a]">
          <div>
            {/* Unboxed Metadata Line with bronze separators */}
            <div className="flex flex-wrap items-center gap-2 text-xs text-[#ba9e84] mb-2.5">
              <span className="font-semibold text-amber-200">{character.race}</span>
              <span aria-hidden="true" className="text-amber-700">·</span>
              <span>Level {character.level}</span>
              <span aria-hidden="true" className="text-amber-700">·</span>
              <span className="text-[#ebdcc9]">{character.alignment}</span>
              <span aria-hidden="true" className="text-amber-700">·</span>
              <span className="font-mono text-amber-600/90 tabular-nums">Rolled {character.generatedAt}</span>
            </div>

            {/* Character Full Name - Stylized Fantasy Font */}
            <h2 className="font-fantasy text-3xl sm:text-4xl font-extrabold tracking-wide leading-tight gold-gradient-text drop-shadow-[0_2px_15px_rgba(245,158,11,0.35)]">
              {character.name}
            </h2>
            <p className="font-medieval text-base sm:text-lg text-amber-400/90 italic mb-6">
              {character.title}
            </p>

            {/* 6 Tabular Attributes Grid - Alchemical Tablets */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-amber-400/90">
                  Ability Scores & Modifiers
                </span>
                <span className="text-xs text-[#a0856c]">4d6 Drop Lowest</span>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {statItems.map((stat) => {
                  const isPrimary = classDef.primaryStat === stat.key;
                  const mod = getStatModifier(stat.value);
                  return (
                    <div
                      key={stat.key}
                      className={`rounded-lg p-2.5 text-center transition-colors border ${
                        isPrimary
                          ? 'bg-gradient-to-b from-[#3d190e] to-[#200e07] border-amber-500/70 shadow-[0_0_15px_rgba(245,158,11,0.22)]'
                          : 'bg-[#160f0c] border-[#5e3419]/50'
                      }`}
                    >
                      <div className="text-[11px] font-semibold text-[#a88d75] tracking-wider">
                        {stat.label}
                      </div>
                      <div className="font-mono text-lg font-bold text-[#ebdcc9] tabular-nums leading-tight mt-0.5">
                        {stat.value}
                      </div>
                      <div
                        className={`font-mono text-xs font-bold tabular-nums ${
                          isPrimary ? 'text-amber-300' : 'text-amber-600/90'
                        }`}
                      >
                        {mod}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Signature Ability, Gear & Chronicle */}
            <div className="space-y-3.5 mb-6">
              {/* Signature Technique - Burgundy Velvet Inset */}
              <div className="p-3.5 bg-gradient-to-r from-[#2d0a12]/80 via-[#1b080d]/90 to-[#220a10]/80 border border-[#7a202d]/60 rounded-xl shadow-[inset_0_1px_0_rgba(244,114,182,0.15)]">
                <div className="flex items-center gap-2 mb-1">
                  <Sparkles className="w-4 h-4 text-amber-300 shrink-0" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-rose-300">
                    Signature Technique
                  </span>
                  <span className="text-xs text-rose-800">·</span>
                  <span className="text-xs font-bold text-amber-200">
                    {character.signatureAbility.name}
                  </span>
                </div>
                <p className="text-xs text-[#d6c4b2] leading-relaxed pl-6">
                  {character.signatureAbility.description}
                </p>
              </div>

              {/* Loadout - Bronze Frame */}
              <div className="p-3.5 bg-[#17100c] border border-[#5c3316]/50 rounded-xl">
                <div className="flex items-center gap-2 mb-1">
                  <Swords className="w-4 h-4 text-amber-500 shrink-0" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-amber-400/90">
                    Starting Relic & Loadout
                  </span>
                </div>
                <p className="text-xs text-[#ebdcc9] font-medium pl-6">
                  {character.startingGear}
                </p>
              </div>

              {/* Chronicle - Aged Parchment Scroll Inset with Generate Backstory Button */}
              <div className="p-3.5 bg-[#140e0b] border border-[#522d14]/50 rounded-xl space-y-2">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <div className="flex items-center gap-1.5">
                    <Scroll className="w-4 h-4 text-amber-500/90 shrink-0" />
                    <span className="text-xs font-semibold uppercase tracking-wider text-amber-500/90">
                      Chronicle & Origin
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={onGenerateBackstory}
                    className="px-2.5 py-1 text-xs font-semibold text-amber-200 bg-[#29170e] hover:bg-[#382013] active:scale-95 border border-amber-700/60 rounded-md transition-all shadow-sm flex items-center gap-1.5 whitespace-nowrap shrink-0"
                    title="Generate a unique origin story for this character"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                    <span>Generate Backstory</span>
                  </button>
                </div>
                <p className="text-xs text-[#cbb59d] italic leading-relaxed pt-1.5 border-t border-[#45240f]/40">
                  "{character.backstory}"
                </p>
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-4 border-t border-[#69391a]/40 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                onClick={() => onAddToParty(character)}
                disabled={isAlreadyInParty}
                className={`px-4 py-2 text-xs font-medium rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap shrink-0 border ${
                  isAlreadyInParty
                    ? 'bg-[#1f1612] text-[#8c7460] border-[#472c1c] cursor-default'
                    : 'bg-[#29170e] hover:bg-[#382013] text-amber-200 border-amber-700/60 active:scale-95 shadow-[0_0_10px_rgba(180,83,9,0.15)]'
                }`}
              >
                {isAlreadyInParty ? (
                  <>
                    <BookmarkCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    In Party
                  </>
                ) : (
                  <>
                    <UserPlus className="w-3.5 h-3.5 shrink-0 text-amber-400" />
                    Save to Party
                  </>
                )}
              </button>

              <button
                onClick={handleCopy}
                className="px-3 py-2 text-xs font-medium text-[#ebdcc9] bg-[#1e140f] hover:bg-[#2b1c15] border border-[#5c3418]/60 rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap shrink-0 active:scale-95 shadow-sm"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-amber-400/80 shrink-0" />
                    Copy Details
                  </>
                )}
              </button>
            </div>

            <button
              onClick={onReroll}
              disabled={isRolling}
              className="px-5 py-2.5 text-xs font-bold text-[#1a0f07] bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-yellow-300 active:scale-95 rounded-lg transition-all shadow-[0_0_20px_rgba(245,158,11,0.35)] border border-amber-300/40 flex items-center gap-2 whitespace-nowrap shrink-0 ml-auto"
            >
              <span>Forge Another Character</span>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
