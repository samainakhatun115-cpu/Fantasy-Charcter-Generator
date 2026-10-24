interface NavbarProps {
  onRoll: () => void;
  activeTab: 'generator' | 'party' | 'classes' | 'compendium';
  setActiveTab: (tab: 'generator' | 'party' | 'classes' | 'compendium') => void;
  partyCount: number;
}

export function Navbar({ onRoll, activeTab, setActiveTab, partyCount }: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 bg-[#140e0b]/95 backdrop-blur-md border-b border-amber-900/40 shadow-[0_4px_25px_rgba(0,0,0,0.8)]">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-6 py-4">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => setActiveTab('generator')}
          className="font-fantasy text-xl font-bold tracking-widest text-amber-300 hover:text-amber-200 transition-colors whitespace-nowrap shrink-0 text-left drop-shadow-[0_2px_8px_rgba(217,119,6,0.3)]"
        >
          MYTHIC FORGE
        </button>

        {/* Zone 2: 4 concise single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#c8b49e]">
          <button
            onClick={() => setActiveTab('generator')}
            className={`whitespace-nowrap shrink-0 transition-colors hover:text-amber-300 ${
              activeTab === 'generator' ? 'text-amber-400 font-semibold underline underline-offset-8 decoration-amber-500/60' : ''
            }`}
          >
            Generator
          </button>
          <button
            onClick={() => setActiveTab('party')}
            className={`whitespace-nowrap shrink-0 transition-colors hover:text-amber-300 ${
              activeTab === 'party' ? 'text-amber-400 font-semibold underline underline-offset-8 decoration-amber-500/60' : ''
            }`}
          >
            Party Roster ({partyCount})
          </button>
          <button
            onClick={() => setActiveTab('classes')}
            className={`whitespace-nowrap shrink-0 transition-colors hover:text-amber-300 ${
              activeTab === 'classes' ? 'text-amber-400 font-semibold underline underline-offset-8 decoration-amber-500/60' : ''
            }`}
          >
            Class Codex
          </button>
          <button
            onClick={() => setActiveTab('compendium')}
            className={`whitespace-nowrap shrink-0 transition-colors hover:text-amber-300 ${
              activeTab === 'compendium' ? 'text-amber-400 font-semibold underline underline-offset-8 decoration-amber-500/60' : ''
            }`}
          >
            Compendium Rules
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onRoll}
            className="px-4 py-2 text-xs font-semibold text-[#1a0f07] bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-yellow-300 active:scale-95 transition-all rounded-lg shadow-[0_0_15px_rgba(245,158,11,0.25)] border border-amber-300/40 whitespace-nowrap shrink-0"
          >
            Roll Character
          </button>
        </div>
      </div>
    </header>
  );
}
