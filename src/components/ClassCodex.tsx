import { CharacterClass } from '../types.ts';
import { CLASS_DEFINITIONS } from '../data/fantasyData.ts';
import { Shield, Sparkles, Crosshair, Sun, Heart, Music, Leaf } from 'lucide-react';

interface ClassCodexProps {
  onSelectClassAndRoll: (cls: CharacterClass) => void;
}

const CLASS_ICONS: Record<CharacterClass, React.ComponentType<{ className?: string }>> = {
  Warrior: Shield,
  Mage: Sparkles,
  Rogue: Crosshair,
  Ranger: Crosshair,
  Paladin: Sun,
  Cleric: Heart,
  Druid: Leaf,
  Bard: Music,
};

export function ClassCodex({ onSelectClassAndRoll }: ClassCodexProps) {
  const classes = Object.values(CLASS_DEFINITIONS);

  return (
    <div className="space-y-6">
      <div className="text-center max-w-2xl mx-auto">
        <h3 className="font-fantasy text-3xl font-bold gold-gradient-text mb-2 drop-shadow-[0_2px_10px_rgba(245,158,11,0.3)]">
          Grimoire of Class Disciplines
        </h3>
        <p className="text-xs text-[#ba9e84] leading-relaxed font-serif">
          Consult the ancient codex of mortal and mystic callings. Select any archetype to channel its unique affinities through the crucible.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {classes.map((c) => {
          const Icon = CLASS_ICONS[c.name] || Shield;
          return (
            <div
              key={c.name}
              className="workbench-card rounded-xl p-5 flex flex-col justify-between border border-[#a8652c]/40 hover:border-amber-500/60 transition-all shadow-[0_10px_25px_rgba(0,0,0,0.7)] corner-filigree"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-lg bg-[#241710] border border-amber-600/50 flex items-center justify-center text-amber-300 shadow-[0_0_12px_rgba(217,119,6,0.2)]">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="font-mono text-xs font-semibold text-amber-400/90">
                    d{c.hitDie} Hit Die
                  </span>
                </div>

                <h4 className="font-fantasy text-xl font-bold gold-gradient-text mb-1">
                  {c.name}
                </h4>
                <p className="text-xs text-[#ba9e84] leading-relaxed mb-4">
                  {c.description}
                </p>

                <div className="space-y-2 mb-4 pt-3 border-t border-[#69391a]/30">
                  <div className="text-[11px] font-semibold text-amber-400/90 uppercase tracking-wider">
                    Core Arcana & Feats
                  </div>
                  {c.abilities.map((ab) => (
                    <div key={ab.name} className="text-xs text-[#d6c4b2]">
                      <span className="font-medium text-amber-200">· {ab.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => onSelectClassAndRoll(c.name)}
                className="w-full py-2 text-xs font-bold text-amber-200 bg-[#241710] hover:bg-[#342016] border border-amber-700/60 hover:border-amber-400 hover:text-amber-100 rounded-lg transition-colors active:scale-95 shadow-sm"
              >
                Inscribe {c.name}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
