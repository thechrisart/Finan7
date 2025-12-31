
import React, { useState, useMemo, useCallback } from 'react';
import Logo from './components/Logo';
import FinancialTable from './components/FinancialTable';
import { FinancialItem, ExpenseItem, ExpenseCategory } from './types';
import { INITIAL_INCOMES, INITIAL_EXPENSES } from './constants';

const App: React.FC = () => {
  const [incomes, setIncomes] = useState<FinancialItem[]>(INITIAL_INCOMES);
  const [expenses, setExpenses] = useState<ExpenseItem[]>(INITIAL_EXPENSES);

  // Totals Calculations
  const totalIncomes = useMemo(() => incomes.reduce((acc, curr) => acc + curr.value, 0), [incomes]);
  const essentialExpenses = useMemo(() => expenses.filter(e => e.category === 'essential'), [expenses]);
  const nonEssentialExpenses = useMemo(() => expenses.filter(e => e.category === 'non-essential'), [expenses]);
  
  const totalEssential = useMemo(() => essentialExpenses.reduce((acc, curr) => acc + curr.value, 0), [essentialExpenses]);
  const totalNonEssential = useMemo(() => nonEssentialExpenses.reduce((acc, curr) => acc + curr.value, 0), [nonEssentialExpenses]);
  const grandTotalExpenses = totalEssential + totalNonEssential;
  
  const balance = totalIncomes - grandTotalExpenses;
  const emergencyReserva = grandTotalExpenses * 6; // Suggestion based on 6 months of expenses

  // Handlers
  const handleUpdateIncome = useCallback((id: string, updates: Partial<FinancialItem>) => {
    setIncomes(prev => prev.map(item => item.id === id ? { ...item, ...updates } : item));
  }, []);

  const handleUpdateExpense = useCallback((id: string, updates: Partial<ExpenseItem>) => {
    setExpenses(prev => prev.map(item => item.id === id ? { ...item, ...updates } : item));
  }, []);

  const handleAddIncome = () => {
    const newItem: FinancialItem = { id: crypto.randomUUID(), description: '', value: 0 };
    setIncomes(prev => [...prev, newItem]);
  };

  const handleAddExpense = (category: ExpenseCategory) => {
    const newItem: ExpenseItem = { id: crypto.randomUUID(), description: '', value: 0, category };
    setExpenses(prev => [...prev, newItem]);
  };

  const handleDeleteIncome = (id: string) => {
    setIncomes(prev => prev.filter(item => item.id !== id));
  };

  const handleDeleteExpense = (id: string) => {
    setExpenses(prev => prev.filter(item => item.id !== id));
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(val);
  };

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <header className="bg-white border-b border-slate-100 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Logo />
          <div className="hidden md:block text-slate-500 text-sm">
            Atualizado em: {new Date().toLocaleDateString('pt-BR')}
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Incomes and Summary */}
          <div className="lg:col-span-5 space-y-6">
            <FinancialTable 
              title="Entradas (Rendas)" 
              items={incomes}
              onUpdateItem={handleUpdateIncome}
              onAddItem={handleAddIncome}
              onDeleteItem={handleDeleteIncome}
              accentColor="yellow-400"
            />

            <div className="bg-slate-900 text-white p-5 rounded-xl shadow-lg border border-slate-800">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Saldo Mensal</span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${balance >= 0 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'}`}>
                  {balance >= 0 ? 'POSITIVO' : 'NEGATIVO'}
                </span>
              </div>
              <div className={`text-3xl font-black ${balance < 0 ? 'text-rose-400' : 'text-yellow-400'}`}>
                {formatCurrency(balance)}
              </div>
              <p className="mt-3 text-xs text-slate-400 leading-relaxed italic">
                "Este é o valor que sobrará (ou faltará) livre para investimentos ou lazer se seguir o planejado."
              </p>
            </div>

            <div className="bg-yellow-400 p-5 rounded-xl shadow-md border border-yellow-500/20">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-widest mb-1 opacity-60">Reserva de Emergência Ideal</h4>
              <div className="text-2xl font-black text-slate-900">
                {formatCurrency(emergencyReserva)}
              </div>
              <p className="mt-2 text-[10px] font-medium text-slate-800/70 leading-relaxed">
                Recomendação: Guarde 6x o valor de suas despesas mensais para segurança financeira.
              </p>
            </div>

            {/* Logo/Branding matching the original image style but modern */}
            <div className="pt-8 opacity-20 flex flex-col items-center">
               <div className="w-16 h-1 bg-slate-400 rounded-full mb-4"></div>
               <Logo />
               <p className="text-[10px] mt-2 text-slate-500 font-bold uppercase tracking-tighter">Smart Finance Tool</p>
            </div>
          </div>

          {/* Right Column: Expenses */}
          <div className="lg:col-span-7 space-y-6">
            <FinancialTable 
              title="Despesas Essenciais" 
              items={essentialExpenses}
              onUpdateItem={handleUpdateExpense}
              onAddItem={() => handleAddExpense('essential')}
              onDeleteItem={handleDeleteExpense}
              accentColor="slate-900"
              type="expense"
            />

            <FinancialTable 
              title="Despesas Não Essenciais" 
              items={nonEssentialExpenses}
              onUpdateItem={handleUpdateExpense}
              onAddItem={() => handleAddExpense('non-essential')}
              onDeleteItem={handleDeleteExpense}
              accentColor="slate-400"
              type="expense"
            />

            {/* Summary Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm text-center">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Total Incomes</span>
                <div className="text-lg font-bold text-slate-800">{formatCurrency(totalIncomes)}</div>
              </div>
              <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm text-center">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Total Essential</span>
                <div className="text-lg font-bold text-slate-800">{formatCurrency(totalEssential)}</div>
              </div>
              <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm text-center">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Grand Total</span>
                <div className="text-lg font-bold text-slate-800">{formatCurrency(grandTotalExpenses)}</div>
              </div>
            </div>
          </div>

        </div>
      </main>

      {/* Floating Action Bar (Mobile/Bottom) */}
      <div className="fixed bottom-0 left-0 right-0 bg-slate-900 text-white p-4 shadow-2xl border-t border-slate-800 md:hidden flex justify-between items-center">
        <div>
          <div className="text-[10px] text-slate-400 uppercase font-bold">Saldo Livre</div>
          <div className={`text-xl font-bold ${balance < 0 ? 'text-rose-400' : 'text-yellow-400'}`}>
            {formatCurrency(balance)}
          </div>
        </div>
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="bg-yellow-400 text-slate-900 w-10 h-10 rounded-full flex items-center justify-center font-bold"
        >
          ↑
        </button>
      </div>
    </div>
  );
};

export default App;
