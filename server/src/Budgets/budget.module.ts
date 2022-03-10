import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/Auth/auth.module';
import { BudgetSchema } from './dataStructureFiles/budget.schema';
import { BudgetServices } from './budget.service';
import { BudgetController } from './budget.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'BudgetSchema', schema: BudgetSchema }]),
    AuthModule,
  ],
  providers: [BudgetServices],
  controllers: [BudgetController],
})
export class BudgetModule {}
