
export interface FinancialItem {
  id: string;
  description: string;
  value: number;
}

export type ExpenseCategory = 'essential' | 'non-essential';

export interface ExpenseItem extends FinancialItem {
  category: ExpenseCategory;
}

export interface FinancialState {
  incomes: FinancialItem[];
  expenses: ExpenseItem[];
}
