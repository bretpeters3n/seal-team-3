import { Controller, Get, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { FinanceTipsServices } from './financeTips.service';

@Controller('financeTips')
export class FinanceTipsController {
  constructor(private financeTipsServices: FinanceTipsServices) {}

  // Fetch all FinanceTips
  @Get('/getAllFinanceTips')
  async getAllFinanceTips(@Res() res: Response) {
    const allFinanceTips = await this.financeTipsServices.getAllFinancialTips();
    return res.status(HttpStatus.OK).json(allFinanceTips);
  }
}
