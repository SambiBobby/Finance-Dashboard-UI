import React from 'react';
import { User } from '@phosphor-icons/react';
import { useFinance } from '../context/FinanceContext';

const Topbar = ({ activeTab }) => {
  const { activeRole } = useFinance();
  
  const title = activeTab === 'dashboard' ? 'Dashboard Overview' : 'Transactions';

  return (
    <header className="flex justify-between items-center p-4 md:py-6 md:px-10 bg-[#0f111a] sticky top-0 z-10 border-b border-border-color md:border-none">
      <h1 className="text-xl md:text-2xl font-semibold">{title}</h1>
      
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-surface border border-border-color flex items-center justify-center">
          <User size={20} />
        </div>
        <div className="flex flex-col">
          <span className="font-medium text-sm">Sambi Reddy</span>
          <span className={`text-xs px-2 py-0.5 rounded-md w-fit mt-0.5 ${
            activeRole === 'admin' 
              ? 'bg-accent-primary/10 text-accent-primary'
              : 'bg-surface text-slate-400'
          }`}>
            {activeRole === 'admin' ? 'Admin Mode' : 'Viewer Mode'}
          </span>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
