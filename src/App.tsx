import { useState, useEffect, useCallback } from 'react';
import {
  Sparkles,
  Volume2,
  VolumeX,
  History,
  RotateCcw,
} from 'lucide-react';
import { Character, CharacterClass } from './types.ts';
import { generateRandomCharacter, generateCharacterBackstory } from './data/fantasyData.ts';
import { soundFX } from './utils/audio.ts';
import { Navbar } from './components/Navbar.tsx';
import { CharacterCard } from './components/CharacterCard.tsx';
import { PartyRoster } from './components/PartyRoster.tsx';
import { ClassCodex } from './components/ClassCodex.tsx';
import { CompendiumRules } from './components/CompendiumRules.tsx';
import { FantasyPortraitSvg } from './components/FantasyPortraitSvg.tsx';

export default function App() {
  const [character, setCharacter] = useState<Character>(() => generateRandomCharacter());
  const [party, setParty] = useState<Character[]>([]);
  const [history, setHistory] = useState<Character[]>([]);
  const [selectedClassFilter, setSelectedClassFilter] = useState<CharacterClass | 'All'>('All');
  const [activeTab, setActiveTab] = useState<'generator' | 'party' | 'classes' | 'compendium'>('generator');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isRolling, setIsRolling] = useState(false);

  // Sound sync
  const toggleSound = () => {
    soundFX.enabled = !soundEnabled;
    setSoundEnabled(!soundEnabled);
  };

  const handleGenerate = useCallback((targetClass?: CharacterClass) => {
    setIsRolling(true);
    soundFX.playRoll();

    const chosenClass = targetClass || (selectedClassFilter === 'All' ? undefined : selectedClassFilter);
    const newChar = generateRandomCharacter(chosenClass);

    setTimeout(() => {
      setCharacter(newChar);
      setHistory((prev) => [newChar, ...prev.slice(0, 7)]);
      setIsRolling(false);
    }, 150);
  }, [selectedClassFilter]);

  // Keyboard shortcut listener (Spacebar = Roll, M = Mute)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is in an input or textarea
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;

      if (e.code === 'Space') {
        e.preventDefault();
        handleGenerate();
      } else if (e.key === 'm' || e.key === 'M') {
        toggleSound();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleGenerate, soundEnabled]);

  const handleAddToParty = (char: Character) => {
    if (party.some((p) => p.id === char.id)) return;
    if (party.length >= 6) {
      alert('Your party is full (maximum 6 members). Disband or dismiss an adventurer first.');
      return;
    }
    soundFX.playClick();
    setParty((prev) => [...prev, char]);
  };

  const handleRemoveFromParty = (id: string) => {
    soundFX.playClick();
    setParty((prev) => prev.filter((p) => p.id !== id));
  };

  const handleClearParty = () => {
    soundFX.playClick();
    setParty([]);
  };

  const handleClassSelectAndRoll = (cls: CharacterClass) => {
    setSelectedClassFilter(cls);
    setActiveTab('generator');
    handleGenerate(cls);
  };

  const handleGeneratePortrait = () => {
    soundFX.playRoll();
    const nextSeed = Math.floor(Math.random() * 1000000) + 1;
    setCharacter((prev) => {
      const updated = {
        ...prev,
        portraitSeed: nextSeed,
        hasGeneratedPortrait: true,
      };
      setHistory((h) => h.map((c) => (c.id === updated.id ? updated : c)));
      return updated;
    });
  };

  const handleRegeneratePortrait = () => {
    soundFX.playRoll();
    setCharacter((prev) => {
      const nextSeed = prev.portraitSeed + Math.floor(Math.random() * 9999) + 17;
      const updated = {
        ...prev,
        portraitSeed: nextSeed,
        hasGeneratedPortrait: true,
      };
      setHistory((h) => h.map((c) => (c.id === updated.id ? updated : c)));
      return updated;
    });
  };

  const handleGenerateBackstory = () => {
    soundFX.playClick();
    const newBackstory = generateCharacterBackstory(
      character.name,
      character.race,
      character.characterClass
    );
    setCharacter((prev) => {
      const updated = {
        ...prev,
        backstory: newBackstory,
      };
      setHistory((h) => h.map((c) => (c.id === updated.id ? updated : c)));
      setParty((p) => p.map((c) => (c.id === updated.id ? updated : c)));
      return updated;
    });
  };

  const isAlreadyInParty = party.some((p) => p.id === character.id);

  const filterClasses: Array<CharacterClass | 'All'> = [
    'All',
    'Warrior',
    'Mage',
    'Rogue',
    'Ranger',
    'Paladin',
    'Cleric',
    'Druid',
    'Bard',
  ];

  return (
    <div className="min-h-screen bg-[#0c0908] text-[#ebdcc9] flex flex-col font-sans">
      {/* Top Bar Contract (3 zones) */}
      <Navbar
        onRoll={() => {
          setActiveTab('generator');
          handleGenerate();
        }}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        partyCount={party.length}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {activeTab === 'generator' && (
          <div className="space-y-8">
            {/* Hero Generator Controls - Workbench Panel */}
            <div className="workbench-panel rounded-2xl p-6 sm:p-8 corner-filigree border border-[#a8652c]/40 shadow-[0_15px_40px_rgba(0,0,0,0.85)]">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
                <div>
                  <h1 className="font-fantasy text-2xl sm:text-3xl font-extrabold gold-gradient-text tracking-wide drop-shadow-[0_2px_12px_rgba(245,158,11,0.3)]">
                    Alchemist's Character Crucible
                  </h1>
                  <p className="text-xs sm:text-sm text-[#ba9e84] mt-1 font-serif">
                    Ignite the arcane forge to summon a legendary hero steeped in ancient lore, martial skill, and runic armaments.
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <button
                    onClick={toggleSound}
                    className="p-2.5 rounded-lg bg-[#1a120e] border border-[#6b3d1b]/60 text-amber-400 hover:text-amber-200 hover:border-amber-500/60 transition-colors shadow-sm"
                    title={soundEnabled ? 'Mute sound effects (M)' : 'Enable sound effects (M)'}
                  >
                    {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                  </button>

                  <button
                    onClick={() => handleGenerate()}
                    disabled={isRolling}
                    className="px-6 py-3 text-sm font-bold text-[#1a0f07] bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-yellow-300 active:scale-95 rounded-xl transition-all shadow-[0_0_22px_rgba(245,158,11,0.4)] border border-amber-300/50 flex items-center gap-2 whitespace-nowrap shrink-0"
                  >
                    <Sparkles className={`w-4 h-4 ${isRolling ? 'animate-spin' : ''}`} />
                    <span>Generate Character</span>
                    <span className="hidden sm:inline-block ml-1 text-[11px] font-mono px-1.5 py-0.5 bg-amber-900/30 rounded text-[#1a0f07] font-semibold border border-amber-600/30">
                      Space
                    </span>
                  </button>
                </div>
              </div>

              {/* Class Filter Tabs / Segmented Controls */}
              <div className="pt-4 border-t border-[#69391a]/40">
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-xs font-semibold text-amber-400/90 uppercase tracking-wider">
                    Discipline & Class Crucible
                  </span>
                  <span className="text-xs text-[#a0856c]">
                    {selectedClassFilter === 'All' ? 'Alchemical roll from all archetypes' : `Consciously forging ${selectedClassFilter}`}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
                  {filterClasses.map((cls) => {
                    const isActive = selectedClassFilter === cls;
                    return (
                      <button
                        key={cls}
                        onClick={() => setSelectedClassFilter(cls)}
                        className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                          isActive
                            ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-[#1a0e06] font-bold shadow-[0_0_12px_rgba(245,158,11,0.3)] border border-amber-300/40'
                            : 'bg-[#18110e] text-[#a68c74] hover:text-amber-200 border border-[#5a3316]/60 hover:border-amber-600/60'
                        }`}
                      >
                        {cls}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Prominent Generated Character Showcase */}
            <section aria-label="Generated Character">
              <CharacterCard
                character={character}
                onAddToParty={handleAddToParty}
                isAlreadyInParty={isAlreadyInParty}
                onReroll={() => handleGenerate()}
                isRolling={isRolling}
                onGeneratePortrait={handleGeneratePortrait}
                onRegeneratePortrait={handleRegeneratePortrait}
                onGenerateBackstory={handleGenerateBackstory}
              />
            </section>

            {/* Quick Roll History Strip - Alchemist Desk Tray */}
            {history.length > 0 && (
              <div className="workbench-panel rounded-2xl p-5 border border-[#a8652c]/35 shadow-[0_10px_30px_rgba(0,0,0,0.7)]">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <History className="w-4 h-4 text-amber-400/80" />
                    <span className="text-xs font-semibold uppercase tracking-wider text-amber-300">
                      Recently Forged Grimoire Entries
                    </span>
                  </div>
                  <button
                    onClick={() => setHistory([])}
                    className="text-xs text-[#a0856c] hover:text-amber-200 transition-colors flex items-center gap-1"
                  >
                    <RotateCcw className="w-3 h-3" />
                    Clear Grimoire
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-2.5">
                  {history.map((histChar) => (
                    <button
                      key={histChar.id}
                      onClick={() => setCharacter(histChar)}
                      className={`text-left p-2 rounded-lg border transition-all flex items-center gap-2 ${
                        character.id === histChar.id
                          ? 'bg-[#241710] border-amber-400/90 shadow-[0_0_12px_rgba(245,158,11,0.25)]'
                          : 'bg-[#140e0b]/80 border-[#5a3316]/50 hover:border-amber-600/50'
                      }`}
                    >
                      <div className="w-9 h-9 rounded-md overflow-hidden bg-[#1f1510] border border-[#6b3e1c]/60 shrink-0 flex items-center justify-center">
                        <FantasyPortraitSvg
                          seed={histChar.portraitSeed}
                          characterClass={histChar.characterClass}
                          race={histChar.race}
                          name={histChar.name}
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-[10px] font-semibold uppercase tracking-wider text-amber-400 truncate">
                          {histChar.characterClass}
                        </div>
                        <div className="font-fantasy text-xs font-bold text-amber-100 truncate leading-tight">
                          {histChar.name.split(' ')[0]}
                        </div>
                        <div className="text-[10px] text-[#8c7460] font-mono tabular-nums">
                          {histChar.hp} HP
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'party' && (
          <PartyRoster
            party={party}
            onRemove={handleRemoveFromParty}
            onClear={handleClearParty}
            onSelectCharacter={(char) => {
              setCharacter(char);
              setActiveTab('generator');
            }}
            selectedId={character.id}
          />
        )}

        {activeTab === 'classes' && (
          <ClassCodex onSelectClassAndRoll={handleClassSelectAndRoll} />
        )}

        {activeTab === 'compendium' && <CompendiumRules />}
      </main>

      {/* Quiet Footer */}
      <footer className="border-t border-[#69391a]/30 py-6 text-center text-xs text-[#8f745e] bg-[#0d0907]/90">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="font-fantasy text-amber-400/80 tracking-wider">Mythic Crucible · Alchemical Character Engine</span>
          <span>Press Spacebar to roll instantly · Authentic 4d6 tabletop alchemy</span>
        </div>
      </footer>
    </div>
  );
}
