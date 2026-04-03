import React, { useState } from 'react';
import { useFinance } from '../context/FinanceContext';
import { X } from '@phosphor-icons/react';

const TransactionModal = ({ onClose }) => {
  const { addTransaction } = useFinance();
  const [type, setType] = useState('expense');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [category, setCategory] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount || !date || !category) return;

    addTransaction({
      id: Date.now().toString(),
      type,
      amount: parseFloat(amount),
      date,
      category,
      description: category // Simplification from original request
    });
    
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-surface border border-border-color rounded-xl w-full max-w-[500px] shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
        
        <div className="flex items-center justify-between p-6 border-b border-border-color">
          <h3 className="text-xl font-semibold">New Transaction</h3>
          <button 
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-100 hover:bg-[#0f111a] rounded-md transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-5">
          
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-slate-400">Type</label>
            <div className="flex bg-[#0f111a] p-1 rounded-lg border border-border-color">
              <button
                type="button"
                onClick={() => setType('expense')}
                className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
                  type === 'expense' ? 'bg-surface shadow-sm text-slate-100' : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                Expense
              </button>
              <button
                type="button"
                onClick={() => setType('income')}
                className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
                  type === 'income' ? 'bg-surface shadow-sm text-slate-100' : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                Income
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-slate-400">Amount ($)</label>
              <input 
                type="number" 
                step="0.01" 
                required 
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="input-field"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-slate-400">Date</label>
              <input 
                type="date" 
                required 
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="input-field"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-slate-400">Category / Description</label>
            <input 
              type="text" 
              required 
              placeholder="e.g. Groceries, Salary, Rent"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="input-field"
            />
          </div>

          <div className="flex justify-end gap-3 mt-4">
            <button type="button" onClick={onClose} className="btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Save Transaction
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};

export default TransactionModal;
