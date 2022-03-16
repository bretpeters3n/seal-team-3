import { Module } from '@nestjs/common';
import { AuthModule } from 'src/Auth/auth.module';
import { FinanceTipsServices } from './financeTips.service';
import { FinanceTipsController } from './financialTips.controller';

@Module({
  imports: [AuthModule],
  providers: [FinanceTipsServices],
  controllers: [FinanceTipsController],
})
export class FinanceTipsModule {}
