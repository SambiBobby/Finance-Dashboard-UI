import React, { createContext, useContext, useState, useEffect } from 'react';

const FinanceContext = createContext();

export const useFinance = () => useContext(FinanceContext);

const INITIAL_MOCK_DATA = [
  { id: '1', date: '2026-04-01', description: 'Salary', category: 'Income', type: 'income', amount: 5000.00 },
  { id: '2', date: '2026-04-02', description: 'Grocery Store', category: 'Food', type: 'expense', amount: 150.75 },
  { id: '3', date: '2026-04-03', description: 'Electricity Bill', category: 'Utilities', type: 'expense', amount: 95.00 },
  { id: '4', date: '2026-04-05', description: 'Netflix Subscription', category: 'Entertainment', type: 'expense', amount: 15.99 },
  { id: '5', date: '2026-03-28', description: 'Freelance Design', category: 'Income', type: 'income', amount: 1200.00 },
  { id: '6', date: '2026-03-25', description: 'Restaurant', category: 'Food', type: 'expense', amount: 85.50 },
  { id: '7', date: '2026-03-15', description: 'Internet Bill', category: 'Utilities', type: 'expense', amount: 60.00 },
  { id: '8', date: '2026-03-10', description: 'Gym Membership', category: 'Health', type: 'expense', amount: 50.00 },
];

export const FinanceProvider = ({ children }) => {
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('zorvyn_transactions_react');
    return saved ? JSON.parse(saved) : INITIAL_MOCK_DATA;
  });

  const [activeRole, setActiveRole] = useState('viewer');
  
  useEffect(() => {
    localStorage.setItem('zorvyn_transactions_react', JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = (txn) => {
    setTransactions(prev => [...prev, txn]);
  };

  const deleteTransaction = (id) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  return (
    <FinanceContext.Provider value={{
      transactions,
      addTransaction,
      deleteTransaction,
      activeRole,
      setActiveRole
    }}>
      {children}
    </FinanceContext.Provider>
  );
};
