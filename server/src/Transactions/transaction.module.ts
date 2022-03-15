import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/Auth/auth.module';
import { BudgetModule } from 'src/Budgets/budget.module';
import { TransactionSchema } from './dataStructureFiles/transaction.schema';
import { TransactionController } from './transaction.controller';
import { TransactionServices } from './transaction.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'TransactionSchema', schema: TransactionSchema },
    ]),
    AuthModule,
    BudgetModule,
  ],
  providers: [TransactionServices],
  controllers: [TransactionController],
})
export class TransactionModule {}
