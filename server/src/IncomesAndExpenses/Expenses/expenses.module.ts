import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ExpenseController } from './expenses.controller';
import { ExpenseServices } from './expenses.service';
import { ExpenseSchema } from './schema/expense.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'ExpenseSchema', schema: ExpenseSchema },
    ]),
  ],
  providers: [ExpenseServices],
  controllers: [ExpenseController],
})
export class ExpenseModule {}
