import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './Auth/auth.module';
import { BudgetModule } from './Budgets/budget.module';
import { TransactionModule } from './Transactions/transaction.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nest-budgety', {
      useNewUrlParser: true,
    }),
    AuthModule,
    BudgetModule,
    TransactionModule,
  ],
})
export class AppModule {}
