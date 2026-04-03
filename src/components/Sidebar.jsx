import React from 'react';
import { Infinity, SquaresFour, ListDashes } from '@phosphor-icons/react';
import { useFinance } from '../context/FinanceContext';

const Sidebar = ({ activeTab, setActiveTab }) => {
  const { activeRole, setActiveRole } = useFinance();

  return (
    <aside className="w-full md:w-[260px] bg-surface border-b md:border-b-0 md:border-r border-border-color flex flex-row md:flex-col py-4 md:py-6 shrink-0 justify-between md:justify-start z-20">
      <div className="flex items-center gap-3 px-4 md:px-6 md:pb-8 font-bold text-xl">
        <Infinity weight="fill" className="text-accent-primary text-2xl md:text-3xl" />
        <span className="hidden md:block">Zorvyn Finance</span>
      </div>

      <nav className="flex flex-row md:flex-col gap-2 px-4 flex-1">
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${
            activeTab === 'dashboard'
              ? 'bg-accent-primary/10 text-accent-primary'
              : 'text-slate-400 hover:bg-[#0f111a] hover:text-white'
          }`}
        >
          <SquaresFour size={20} />
          <span className="hidden md:block">Dashboard</span>
        </button>
        <button
          onClick={() => setActiveTab('transactions')}
          className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${
            activeTab === 'transactions'
              ? 'bg-accent-primary/10 text-accent-primary'
              : 'text-slate-400 hover:bg-[#0f111a] hover:text-white'
          }`}
        >
          <ListDashes size={20} />
          <span className="hidden md:block">Transactions</span>
        </button>
      </nav>

      <div className="px-4 md:px-6 md:pt-6 md:border-t border-border-color mt-auto flex items-center md:items-stretch h-full md:h-auto">
        <div className="flex flex-col">
          <label className="hidden md:block text-xs text-slate-400 uppercase tracking-wide mb-2 font-semibold">
            Active Role
          </label>
          <select
            value={activeRole}
            onChange={(e) => setActiveRole(e.target.value)}
            className="input-field py-2 text-sm max-w-[120px] md:max-w-none"
          >
            <option value="viewer">Viewer</option>
            <option value="admin">Admin</option>
          </select>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
