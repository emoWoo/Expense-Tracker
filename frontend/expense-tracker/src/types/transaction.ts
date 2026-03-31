export interface Transaction {
  _id: string;
  amount: number;
  category?: string;
  source?: string;
  description: string;
  date: string;
}
