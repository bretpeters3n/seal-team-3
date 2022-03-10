import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/Auth/auth.module';
import { ExpenseSchema, IncomeSchema } from './dataStructureFiles/transaction.schema';
import { TransactionController } from './transaction.controller';
import { TransactionServices } from './transaction.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'IncomeSchema', schema: IncomeSchema },
      { name: 'ExpenseSchema', schema: ExpenseSchema },
    ]),
    AuthModule,
  ],
  providers: [TransactionServices],
  controllers: [TransactionController],
})
export class TransactionModule {}
