import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './Auth/auth.module';
import { ExpenseModule } from './IncomesAndExpenses/Expenses/expenses.module';
import { IncomeModule } from './IncomesAndExpenses/Incomes/income.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nest-budgety', {
      useNewUrlParser: true,
    }),
    AuthModule,
    IncomeModule,
    ExpenseModule,
  ],
})
export class AppModule {}
