import { useState } from 'react';
import { Trash2, Copy, Check, Users, Shield, Heart } from 'lucide-react';
import { Character } from '../types.ts';
import { getStatModifier } from '../data/fantasyData.ts';
import { FantasyPortraitSvg } from './FantasyPortraitSvg.tsx';

interface PartyRosterProps {
  party: Character[];
  onRemove: (id: string) => void;
  onClear: () => void;
  onSelectCharacter: (char: Character) => void;
  selectedId?: string;
}

export function PartyRoster({
  party,
  onRemove,
  onClear,
  onSelectCharacter,
  selectedId,
}: PartyRosterProps) {
  const [copiedAll, setCopiedAll] = useState(false);

  const handleExportParty = async () => {
    if (party.length === 0) return;
    const text = party
      .map(
        (c, idx) =>
          `[#${idx + 1}] ${c.name} ${c.title}
Class: ${c.characterClass} | Race: ${c.race} | Alignment: ${c.alignment}
HP: ${c.hp} | AC: ${c.armorClass}
STR ${c.stats.str} (${getStatModifier(c.stats.str)}) | DEX ${c.stats.dex} (${getStatModifier(c.stats.dex)}) | CON ${c.stats.con} (${getStatModifier(c.stats.con)})
INT ${c.stats.int} (${getStatModifier(c.stats.int)}) | WIS ${c.stats.wis} (${getStatModifier(c.stats.wis)}) | CHA ${c.stats.cha} (${getStatModifier(c.stats.cha)})
Technique: ${c.signatureAbility.name} - ${c.signatureAbility.description}
Gear: ${c.startingGear}
Story: ${c.backstory}
`
      )
      .join('\n----------------------------------------\n\n');

    try {
      await navigator.clipboard.writeText(text);
      setCopiedAll(true);
      setTimeout(() => setCopiedAll(false), 2000);
    } catch {
      // fallback
    }
  };

  if (party.length === 0) {
    return (
      <div className="workbench-panel border border-[#a8652c]/40 rounded-2xl p-8 text-center max-w-xl mx-auto shadow-2xl corner-filigree">
        <div className="w-12 h-12 rounded-full bg-[#241710] border border-[#6b3e1c]/60 text-amber-400 flex items-center justify-center mx-auto mb-3 shadow-[0_0_15px_rgba(217,119,6,0.15)]">
          <Users className="w-6 h-6" />
        </div>
        <h3 className="font-fantasy text-xl font-bold gold-gradient-text mb-1">
          No Adventurers Inscribed
        </h3>
        <p className="text-xs text-[#ba9e84] leading-relaxed max-w-sm mx-auto mb-4 font-serif">
          Consult the crucible, forge formidable heroes, and bind them to your questing fellowship grimoire.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h3 className="font-fantasy text-2xl font-bold gold-gradient-text">
            Alchemical Fellowship Roster
          </h3>
          <p className="text-xs text-[#ba9e84]">
            {party.length} of 6 companions bound by oath
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportParty}
            className="px-3 py-1.5 text-xs font-semibold text-amber-200 bg-[#241710] hover:bg-[#342117] border border-amber-700/60 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0 shadow-sm"
          >
            {copiedAll ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                Copied Roster
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-amber-400" />
                Copy Fellowship Grimoire
              </>
            )}
          </button>
          <button
            onClick={onClear}
            className="px-3 py-1.5 text-xs font-semibold text-rose-300 hover:text-rose-100 bg-[#290a10] hover:bg-[#3d0f19] border border-rose-800/60 rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-sm"
          >
            Disband Fellowship
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {party.map((char) => {
          const isSelected = selectedId === char.id;
          return (
            <div
              key={char.id}
              onClick={() => onSelectCharacter(char)}
              className={`cursor-pointer workbench-card rounded-xl p-4 transition-all border ${
                isSelected
                  ? 'border-amber-400 bg-[#281811] shadow-[0_0_20px_rgba(245,158,11,0.25)]'
                  : 'border-[#6e3c1b]/50 hover:border-amber-600/60'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="w-14 h-14 rounded-lg overflow-hidden bg-[#18100c] shrink-0 border border-amber-600/40 flex items-center justify-center shadow-sm">
                  <FantasyPortraitSvg
                    seed={char.portraitSeed}
                    characterClass={char.characterClass}
                    race={char.race}
                    name={char.name}
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-[11px] font-bold text-amber-400 tracking-wider uppercase truncate">
                      {char.characterClass}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onRemove(char.id);
                      }}
                      className="p-1 text-[#8f745e] hover:text-rose-400 transition-colors"
                      title="Dismiss from fellowship"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <h4 className="font-fantasy text-sm font-bold text-amber-200 truncate">
                    {char.name}
                  </h4>
                  <p className="text-[11px] text-[#ba9e84] truncate">
                    {char.race} · Level {char.level}
                  </p>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-[#69391a]/40 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 text-rose-300">
                  <Heart className="w-3 h-3 text-rose-400" />
                  <span className="font-mono tabular-nums">{char.hp} HP</span>
                </div>
                <div className="flex items-center gap-1.5 text-amber-300">
                  <Shield className="w-3 h-3 text-amber-400" />
                  <span className="font-mono tabular-nums">AC {char.armorClass}</span>
                </div>
                <div className="text-[11px] text-[#cbb59d] truncate max-w-[120px]">
                  {char.signatureAbility.name}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
