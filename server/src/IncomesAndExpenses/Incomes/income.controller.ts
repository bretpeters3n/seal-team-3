import {
  Controller,
  Get,
  Res,
  HttpStatus,
  Param,
  NotFoundException,
  Post,
  Body,
  Delete,
  Patch,
} from '@nestjs/common';
import { ValidateObjectId } from 'src/shared/pipes/validate-object-id.pipes';
import { IncomeDTO } from './dto/income.dto';
import { IncomeServices } from './income.service';

@Controller('Incomes')
export class IncomeController {
  constructor(private IncomeServices: IncomeServices) {}

  //INCOME METHODS
  // Submit an income
  @Post('/postIncome')
  async addIncome(@Res() res, @Body() incomeDTO: IncomeDTO) {
    const newIncome = await this.IncomeServices.addIncome(incomeDTO);
    return res.status(HttpStatus.OK).json({
      message: 'Income has been successfully added!',
      postedIncome: newIncome,
    });
  }

  // Fetch a particular income using its ID
  @Get('/postIncome/:incomeID')
  async getIncome(
    @Res() res,
    @Param('incomeID', new ValidateObjectId()) incomeID
  ) {
    const income = await this.IncomeServices.getIncome(incomeID);
    if (!income) {
      throw new NotFoundException('Income does not exist!');
    }
    return res.status(HttpStatus.OK).json(income);
  }

  // Fetch all incomes
  @Get('/allIncomes')
  async getAllIncomes(@Res() res) {
    const allIncomes = await this.IncomeServices.getAllIncomes();
    return res.status(HttpStatus.OK).json(allIncomes);
  }
  // figure out edit and delete functionality
  // Edit an income using its ID
  @Patch('/editIncome/:incomeID')
  async editIncome(
    @Res() res,
    @Param('incomeID', new ValidateObjectId()) incomeID,
    @Body() incomeDTO: IncomeDTO
  ) {
    const editableIncome = await this.IncomeServices.editIncome(
      incomeID,
      incomeDTO
    );
    if (!editableIncome) {
      throw new NotFoundException('Income does not exist!');
    }
    return res.status(HttpStatus.OK).json({
      message: 'Income has been successfully updated',
      editedIncome: editableIncome,
    });
  }

  // Delete an income using its ID
  @Delete('/deleteIncome/:incomeID')
  async deleteIncome(
    @Res() res,
    @Param('incomeID', new ValidateObjectId()) incomeID
  ) {
    const deletableIncome = await this.IncomeServices.deleteIncome(incomeID);
    if (!deletableIncome) {
      throw new NotFoundException('Income does not exist!');
    }
    return res.status(HttpStatus.OK).json({
      message: 'Income has been deleted!',
      deletedIncome: deletableIncome,
    });
  }
}
