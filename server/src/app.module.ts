import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './Auth/auth.module';
import { BudgetModule } from './Budgets/budget.module';
import { FinanceTipsModule } from './FinanceTips/financeTips.module';
import { TransactionModule } from './Transactions/transaction.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI, {
      useNewUrlParser: true,
    }),
    AuthModule,
    BudgetModule,
    TransactionModule,
    FinanceTipsModule,
  ],
})
export class AppModule {}
