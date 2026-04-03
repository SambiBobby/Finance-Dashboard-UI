import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import TransactionModal from './components/TransactionModal';
import { useFinance } from './context/FinanceContext';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { activeRole } = useFinance();

  return (
    <div className="flex h-screen overflow-hidden bg-[#0f111a] text-slate-100">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 flex flex-col overflow-y-auto">
        <Topbar activeTab={activeTab} />
        
        <div className="p-4 md:p-10 flex-1 flex flex-col">
          {activeTab === 'dashboard' && <Dashboard />}
          {activeTab === 'transactions' && (
            <Transactions onOpenAddModal={() => setIsModalOpen(true)} />
          )}
        </div>
      </main>

      {isModalOpen && activeRole === 'admin' && (
        <TransactionModal onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
}

export default App;
