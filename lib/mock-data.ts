export interface Transaction {
  id: string;
  title: string;
  amount: number;
  type: 'INCOME' | 'EXPENSE';
  category: string;
  date: string;
}

export const mockTransactions: Transaction[] = [
  {
    id: '1',
    title: 'Lương tháng này',
    amount: 5000000,
    type: 'INCOME',
    category: 'Thu nhập',
    date: '2026-08-01',
  },
  {
    id: '2',
    title: 'Tiền ăn uống',
    amount: 150000,
    type: 'EXPENSE',
    category: 'Ăn uống',
    date: '2026-08-10',
  },
  {
    id: '3',
    title: 'Mua sách lập trình',
    amount: 200000,
    type: 'EXPENSE',
    category: 'Học tập',
    date: '2026-08-11',
  },
];