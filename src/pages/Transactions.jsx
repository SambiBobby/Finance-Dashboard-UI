import React, { useState } from 'react';
import { useFinance } from '../context/FinanceContext';
import { MagnifyingGlass, Plus, Trash, FileDashed } from '@phosphor-icons/react';

const Transactions = ({ onOpenAddModal }) => {
  const { transactions, activeRole, deleteTransaction } = useFinance();
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('all');

  const filtered = transactions.filter(txn => {
    const matchesSearch = txn.description.toLowerCase().includes(search.toLowerCase()) || 
                          txn.category.toLowerCase().includes(search.toLowerCase());
    const matchesType = filterType === 'all' || txn.type === filterType;
    return matchesSearch && matchesType;
  }).sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className="card flex-1 flex flex-col overflow-hidden min-h-[500px]">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 shrink-0">
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <div className="relative">
            <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search transactions..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input-field pl-10 w-full sm:w-[250px]"
            />
          </div>
          <select 
            value={filterType} 
            onChange={(e) => setFilterType(e.target.value)} 
            className="input-field w-full sm:w-auto"
          >
            <option value="all">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>

        {activeRole === 'admin' && (
          <button onClick={onOpenAddModal} className="btn-primary w-full md:w-auto shrink-0">
            <Plus size={18} weight="bold" /> Add Transaction
          </button>
        )}
      </div>

      <div className="flex-1 overflow-x-auto min-h-0">
        <table className="w-full text-left border-collapse whitespace-nowrap">
          <thead className="sticky top-0 bg-surface z-10 box-shadow-sm">
            <tr>
              <th className="p-4 text-xs font-semibold text-slate-400 uppercase tracking-wide border-b border-border-color">Date</th>
              <th className="p-4 text-xs font-semibold text-slate-400 uppercase tracking-wide border-b border-border-color">Description / Category</th>
              <th className="p-4 text-xs font-semibold text-slate-400 uppercase tracking-wide border-b border-border-color">Type</th>
              <th className="p-4 text-xs font-semibold text-slate-400 uppercase tracking-wide border-b border-border-color text-right">Amount</th>
              {activeRole === 'admin' && <th className="p-4 text-xs font-semibold text-slate-400 uppercase tracking-wide border-b border-border-color text-center">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-20 text-center text-slate-500">
                  <div className="flex flex-col items-center gap-3">
                    <FileDashed size={48} className="opacity-50" />
                    <p>No transactions found.</p>
                  </div>
                </td>
              </tr>
            ) : (
              filtered.map(txn => (
                <tr key={txn.id} className="hover:bg-[#0f111a]/50 transition-colors group">
                  <td className="p-4 border-b border-border-color text-sm">
                    {new Date(txn.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                  </td>
                  <td className="p-4 border-b border-border-color">
                    <div className="font-medium">{txn.description}</div>
                    <div className="text-xs text-slate-400">{txn.category}</div>
                  </td>
                  <td className="p-4 border-b border-border-color">
                    <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${
                      txn.type === 'income' ? 'bg-success-bg text-success' : 'bg-danger-bg text-danger'
                    }`}>
                      {txn.type}
                    </span>
                  </td>
                  <td className={`p-4 border-b border-border-color text-right font-medium ${txn.type === 'income' ? 'text-success' : 'text-slate-100'}`}>
                    {txn.type === 'income' ? '+' : '-'}${Number(txn.amount).toFixed(2)}
                  </td>
                  {activeRole === 'admin' && (
                    <td className="p-4 border-b border-border-color text-center">
                      <button 
                        onClick={() => deleteTransaction(txn.id)}
                        className="p-2 text-slate-500 hover:text-danger hover:bg-danger-bg rounded-md transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
                        title="Delete"
                      >
                        <Trash size={18} />
                      </button>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Transactions;
