
import React from 'react';
import { FinancialItem } from '../types';

interface FinancialTableProps {
  title: string;
  items: FinancialItem[];
  onUpdateItem: (id: string, updates: Partial<FinancialItem>) => void;
  onAddItem: () => void;
  onDeleteItem: (id: string) => void;
  accentColor?: string;
  type?: 'income' | 'expense';
}

const FinancialTable: React.FC<FinancialTableProps> = ({
  title,
  items,
  onUpdateItem,
  onAddItem,
  onDeleteItem,
  accentColor = 'yellow-400',
  type = 'income'
}) => {
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(val);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
      <div className={`bg-slate-900 text-white p-4 flex justify-between items-center`}>
        <h3 className="font-bold uppercase tracking-wider text-sm">{title}</h3>
        <button 
          onClick={onAddItem}
          className="text-xs bg-yellow-400 text-slate-900 px-3 py-1 rounded-md font-bold hover:bg-yellow-300 transition-colors"
        >
          + ADICIONAR
        </button>
      </div>
      <div className={`h-1 bg-${accentColor}`}></div>
      
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-slate-50 text-slate-500 uppercase text-[10px] font-bold">
            <th className="px-4 py-3 text-left">Descrição</th>
            <th className="px-4 py-3 text-right w-32">Valor (R$)</th>
            <th className="px-2 py-3 w-10"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {items.map((item) => (
            <tr key={item.id} className="group hover:bg-slate-50/50 transition-colors">
              <td className="px-4 py-2">
                <input
                  type="text"
                  value={item.description}
                  onChange={(e) => onUpdateItem(item.id, { description: e.target.value })}
                  className="w-full bg-transparent border-none focus:ring-1 focus:ring-yellow-400 rounded px-1 transition-all outline-none"
                  placeholder="Descrição do item..."
                />
              </td>
              <td className="px-4 py-2 text-right">
                <input
                  type="number"
                  value={item.value === 0 ? '' : item.value}
                  onChange={(e) => onUpdateItem(item.id, { value: parseFloat(e.target.value) || 0 })}
                  className="w-full text-right bg-transparent border-none focus:ring-1 focus:ring-yellow-400 rounded px-1 font-semibold transition-all outline-none"
                  placeholder="0,00"
                />
              </td>
              <td className="px-2 py-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  onClick={() => onDeleteItem(item.id)}
                  className="text-slate-300 hover:text-red-500 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
                </button>
              </td>
            </tr>
          ))}
          {items.length === 0 && (
            <tr>
              <td colSpan={3} className="px-4 py-8 text-center text-slate-400 italic">
                Nenhum item adicionado.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default FinancialTable;
