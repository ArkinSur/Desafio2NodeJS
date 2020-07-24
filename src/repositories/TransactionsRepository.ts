import Transaction from '../models/Transaction';

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}
interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const totalIncomeTransactions = this.transactions.filter(
      item => item.type === 'income',
    );
    const array1: number[] = [0];
    totalIncomeTransactions.forEach(item => {
      array1.push(item.value);
    });
    const totalIncome = array1.reduce((prevItem, item) => {
      return prevItem + item;
    });

    const totalOutcomeTransactions = this.transactions.filter(
      item => item.type === 'outcome',
    );

    const array2: number[] = [0];
    totalOutcomeTransactions.forEach(item => {
      array2.push(item.value);
    });
    const totalOutcome = array2.reduce((prevItem, item) => {
      return prevItem + item;
    });

    const balance: Balance = {
      income: totalIncome,
      outcome: totalOutcome,
      total: totalIncome - totalOutcome,
    };

    return balance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, type, value });
    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
