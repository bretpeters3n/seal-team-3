import { MongoDBID } from 'src/shared/types';
import { IncomeOrExpense } from 'src/Transactions/dataStructureFiles/transaction.interfaces';

export class TransactionDTO {
  readonly title: string;
  readonly amount: number;
  type: IncomeOrExpense;
  date_posted: string;
  last_date_edited: string;
  category_id: MongoDBID;
}
