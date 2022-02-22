import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { IncomeController } from './income.controller';
import { IncomeServices } from './income.service';
import { IncomeSchema } from './schema/income.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'IncomeSchema', schema: IncomeSchema }]),
  ],
  providers: [IncomeServices],
  controllers: [IncomeController],
})
export class IncomeModule {}
