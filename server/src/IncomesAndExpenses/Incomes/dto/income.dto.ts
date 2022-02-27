import { IncomeOrExpense } from 'src/IncomesAndExpenses/I&E.interfaces';

export class IncomeDTO {
  readonly title: string;
  readonly amount: number;
  readonly first_name: string;
  readonly last_name: string;
  type: IncomeOrExpense;
  date_posted: string;
  last_date_edited: string;
}
