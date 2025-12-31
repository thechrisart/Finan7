
import { FinancialItem, ExpenseItem } from './types';

export const INITIAL_INCOMES: FinancialItem[] = [
  { id: 'i1', description: 'SALÁRIO LÍQUIDO DE [PESSOA 01]', value: 0 },
  { id: 'i2', description: 'VALE-ALIMENTAÇÃO DE [PESSOA 01]', value: 0 },
  { id: 'i3', description: 'VALE-REFEIÇÃO DE [PESSOA 01]', value: 0 },
  { id: 'i4', description: 'SALÁRIO LÍQUIDO DE [PESSOA 02]', value: 0 },
  { id: 'i5', description: 'OUTRAS ENTRADAS 01 (AVON, UBER...)', value: 0 },
];

export const INITIAL_EXPENSES: ExpenseItem[] = [
  { id: 'e1', category: 'essential', description: 'MORADIA (ALUGUEL/FINANCIAMENTO)', value: 0 },
  { id: 'e2', category: 'essential', description: 'CONDOMÍNIO', value: 0 },
  { id: 'e3', category: 'essential', description: 'SUPERMERCADO', value: 0 },
  { id: 'e4', category: 'essential', description: 'LUZ / GÁS / ÁGUA', value: 0 },
  { id: 'e5', category: 'essential', description: 'PLANO DE SAÚDE', value: 0 },
  { id: 'e6', category: 'non-essential', description: 'CARTÃO DE CRÉDITO', value: 0 },
  { id: 'e7', category: 'non-essential', description: 'COMBUSTÍVEL', value: 0 },
  { id: 'e8', category: 'non-essential', description: 'FARMÁCIA / ANIMAIS', value: 0 },
  { id: 'e9', category: 'non-essential', description: 'INTERNET / STREAMING', value: 0 },
  { id: 'e10', category: 'non-essential', description: 'SAÍDAS / LAZER', value: 0 },
];
