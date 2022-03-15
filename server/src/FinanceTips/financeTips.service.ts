import { Injectable } from '@nestjs/common';
import { FINANCETIPS } from './constants';
import { FinanceTip } from './dataStructureFiles/financeTips.interfaces';

@Injectable()
export class FinanceTipsServices {
  // getAllFinancialTips
  async getAllFinancialTips(): Promise<ReadonlyArray<FinanceTip>> {
    return FINANCETIPS;
  }
}
