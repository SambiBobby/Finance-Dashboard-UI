import React, { useMemo } from 'react';
import { useFinance } from '../context/FinanceContext';
import { Wallet, ArrowDownLeft, ArrowUpRight, WarningCircle, TrendUp, TrendDown } from '@phosphor-icons/react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const Dashboard = () => {
  const { transactions } = useFinance();

  const { totalBalance, totalIncome, totalExpense } = useMemo(() => {
    let income = 0;
    let expense = 0;
    transactions.forEach(t => {
      if (t.type === 'income') income += Number(t.amount);
      if (t.type === 'expense') expense += Number(t.amount);
    });
    return {
      totalIncome: income,
      totalExpense: expense,
      totalBalance: income - expense
    };
  }, [transactions]);

  const formatCurrency = (val) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);

  // Chart Data preparation
  const lineData = useMemo(() => {
    const sorted = [...transactions].sort((a, b) => new Date(a.date) - new Date(b.date));
    let balance = 0;
    return sorted.map(t => {
      balance += t.type === 'income' ? Number(t.amount) : -Number(t.amount);
      return {
        date: new Date(t.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        balance
      };
    });
  }, [transactions]);

  const pieData = useMemo(() => {
    const categories = {};
    transactions.filter(t => t.type === 'expense').forEach(t => {
      categories[t.category] = (categories[t.category] || 0) + Number(t.amount);
    });
    return Object.entries(categories).map(([name, value]) => ({ name, value }));
  }, [transactions]);

  const PIE_COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

  // Insights Data preparation
  const insights = useMemo(() => {
    const categories = {};
    let highestCat = 'N/A';
    let highestAmt = 0;

    let curMonthExpense = 0;
    let prevMonthExpense = 0;

    const now = new Date();
    const curMonth = now.getMonth();
    const curYear = now.getFullYear();

    transactions.forEach(t => {
      if (t.type === 'expense') {
        // Highest Category
        categories[t.category] = (categories[t.category] || 0) + Number(t.amount);
        if (categories[t.category] > highestAmt) {
          highestAmt = categories[t.category];
          highestCat = t.category;
        }

        // Monthly
        const d = new Date(t.date);
        if (d.getFullYear() === curYear) {
          if (d.getMonth() === curMonth) curMonthExpense += Number(t.amount);
          else if (d.getMonth() === curMonth - 1) prevMonthExpense += Number(t.amount);
        } else if (d.getFullYear() === curYear - 1 && d.getMonth() === 11 && curMonth === 0) {
          prevMonthExpense += Number(t.amount);
        }
      }
    });

    let comparisonText = 'No prior data';
    let diffPercent = 0;
    if (prevMonthExpense > 0) {
      const diff = curMonthExpense - prevMonthExpense;
      diffPercent = (diff / prevMonthExpense) * 100;
      comparisonText = `${diff > 0 ? 'Up' : 'Down'} ${Math.abs(diffPercent).toFixed(1)}% from last month`;
    } else if (curMonthExpense > 0) {
      comparisonText = 'First month of tracking';
    }

    return {
      highestCat: highestAmt > 0 ? `${highestCat} ($${highestAmt.toFixed(2)})` : 'No expenses yet',
      comparisonText,
      diffPercent
    };
  }, [transactions]);

  return (
    <div className="flex flex-col gap-6 h-full w-full">
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card flex items-center gap-4 hover:-translate-y-1 transition-transform">
          <div className="w-12 h-12 rounded-lg bg-accent-primary/15 text-accent-primary flex items-center justify-center">
            <Wallet size={24} weight="fill" />
          </div>
          <div>
            <span className="text-sm text-slate-400 font-medium">Total Balance</span>
            <h2 className="text-2xl font-semibold tracking-tight">{formatCurrency(totalBalance)}</h2>
          </div>
        </div>
        <div className="card flex items-center gap-4 hover:-translate-y-1 transition-transform">
          <div className="w-12 h-12 rounded-lg bg-success-bg text-success flex items-center justify-center">
            <ArrowDownLeft size={24} weight="bold" />
          </div>
          <div>
            <span className="text-sm text-slate-400 font-medium">Total Income</span>
            <h2 className="text-2xl font-semibold tracking-tight">{formatCurrency(totalIncome)}</h2>
          </div>
        </div>
        <div className="card flex items-center gap-4 hover:-translate-y-1 transition-transform">
          <div className="w-12 h-12 rounded-lg bg-danger-bg text-danger flex items-center justify-center">
            <ArrowUpRight size={24} weight="bold" />
          </div>
          <div>
            <span className="text-sm text-slate-400 font-medium">Total Expenses</span>
            <h2 className="text-2xl font-semibold tracking-tight">{formatCurrency(totalExpense)}</h2>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0">
        
        <div className="card lg:col-span-2 flex flex-col min-h-[300px]">
          <h3 className="font-semibold mb-4">Balance & Spending Trend</h3>
          <div className="flex-1 w-full min-h-0 relative">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <XAxis dataKey="date" stroke="#94a3b8" tick={{fontSize: 12}} dy={10} axisLine={false} tickLine={false} />
                <YAxis stroke="#94a3b8" tick={{fontSize: 12}} dx={-10} axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1a1d27', borderColor: '#334155', borderRadius: '8px' }} 
                  itemStyle={{color: '#f8fafc'}} 
                />
                <Line type="monotone" dataKey="balance" stroke="#6366f1" strokeWidth={3} dot={{r: 4}} activeDot={{r: 6}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="flex flex-col gap-6 min-h-0">
          <div className="card flex flex-col flex-1 min-h-[250px]">
            <h3 className="font-semibold mb-2">Spending Breakdown</h3>
            <div className="flex-1 w-full relative min-h-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius="60%"
                    outerRadius="80%"
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#1a1d27', borderColor: '#334155', borderRadius: '8px' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            {/* Custom mini legend */}
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 mt-2">
              {pieData.map((entry, index) => (
                <div key={entry.name} className="flex items-center gap-1.5 text-xs text-slate-300">
                  <div className="w-2.5 h-2.5 rounded-full" style={{backgroundColor: PIE_COLORS[index % PIE_COLORS.length]}}></div>
                  {entry.name}
                </div>
              ))}
            </div>
          </div>

          <div className="card flex flex-col">
            <h3 className="font-semibold mb-4">Insights</h3>
            <div className="flex flex-col gap-4">
              
              <div className="flex items-start gap-4 pb-4 border-b border-border-color">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 bg-warning-bg text-warning">
                  <WarningCircle size={20} weight="fill" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-slate-400 font-medium">Highest Spending</span>
                  <span className="text-sm font-medium mt-0.5">{insights.highestCat}</span>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 bg-accent-primary/15 text-accent-primary">
                   {insights.diffPercent > 0 ? (
                      <TrendUp size={20} weight="bold" className="text-danger" />
                   ) : (
                      <TrendDown size={20} weight="bold" className="text-success" />
                   )}
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-slate-400 font-medium">Monthly Comparison</span>
                  <span className="text-sm font-medium mt-0.5">{insights.comparisonText}</span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
