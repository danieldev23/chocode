export interface CreateTransactionDto {
  username: string;
  posting_date: string;
  transaction_date: string;
  credit_amount: string;
  debit_amount: string;
  currency: string;
  description: string;
  ref_no: string;
  created: Date;
}