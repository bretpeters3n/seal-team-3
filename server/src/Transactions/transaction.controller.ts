import {
  Controller,
  Get,
  Res,
  HttpStatus,
  Param,
  Post,
  Body,
  Delete,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { User } from 'src/Auth/dataStructureFiles/auth.interfaces';
import { GetUser } from 'src/Auth/get-user.decorator';
import { ValidateObjectId } from 'src/shared/pipes/validate-object-id.pipes';
import { MongoDBID } from 'src/shared/types';
import { TransactionDTO } from './dataStructureFiles/transaction.dto';
import { IncomeOrExpense } from './dataStructureFiles/transaction.interfaces';
import { TransactionServices } from './transaction.service';

@Controller('transactions')
@UseGuards(AuthGuard())
export class TransactionController {
  constructor(private transactionServices: TransactionServices) {}

  //INCOME METHODS
  // Submit an income
  @Post('/postIncome')
  async addIncome(
    @GetUser() user: User,
    @Res() res: Response,
    @Body() transactionDTO: TransactionDTO
  ) {
    const newIncome = await this.transactionServices.addTransaction(
      transactionDTO,
      user,
      IncomeOrExpense.INCOME
    );
    return res.status(HttpStatus.OK).json({
      message: 'Income has been successfully added!',
      postedIncome: newIncome,
    });
  }

  // Fetch a particular income using its ID
  // @Get('/getIncome/:incomeID')
  // async getIncome(
  //   @GetUser() user: User,
  //   @Res() res: Response,
  //   @Param('incomeID', new ValidateObjectId()) incomeID: MongoDBID
  // ) {
  //   const foundIncome = await this.transactionServices.getTransaction(
  //     user._id,
  //     incomeID,
  //     IncomeOrExpense.INCOME
  //   );
  //   if (!foundIncome) {
  //     throw new NotFoundException('Income does not exist!');
  //   }
  //   return res.status(HttpStatus.OK).json(foundIncome);
  // }

  // Fetch all incomes
  @Get('/allIncomes/:budgetID')
  async getAllIncomes(
    @GetUser() user: User,
    @Res() res: Response,
    @Param('budgetID', new ValidateObjectId()) budgetID: MongoDBID
  ) {
    const allIncomes = await this.transactionServices.getAllTransactions(
      user,
      IncomeOrExpense.INCOME,
      budgetID
    );
    return res.status(HttpStatus.OK).json(allIncomes);
  }

  // Edit an income using its ID
  @Patch('/editIncome/:incomeID')
  async editIncome(
    @GetUser() user: User,
    @Res() res: Response,
    @Param('incomeID', new ValidateObjectId()) incomeID: MongoDBID,
    @Body() transactionDTO: TransactionDTO
  ) {
    const editableIncome = await this.transactionServices.editTransaction(
      user,
      incomeID,
      transactionDTO,
      IncomeOrExpense.INCOME
    );
    return res.status(HttpStatus.OK).json({
      message: 'Income has been successfully updated',
      editedIncome: editableIncome,
    });
  }

  // Delete an income using its ID
  @Delete('/deleteIncome/:incomeID')
  async deleteIncome(
    @GetUser() user: User,
    @Res() res: Response,
    @Param('incomeID', new ValidateObjectId()) incomeID: MongoDBID
  ) {
    const deletableIncome = await this.transactionServices.deleteTransaction(
      user,
      incomeID,
      IncomeOrExpense.INCOME
    );
    return res.status(HttpStatus.OK).json({
      message: 'Income has been deleted!',
      deletedIncome: deletableIncome,
    });
  }

  //EXPENSE METHODS
  // Submit an expense
  @Post('/postExpense')
  async addExpense(
    @GetUser() user: User,
    @Res() res: Response,
    @Body() transactionDTO: TransactionDTO
  ) {
    const newExpense = await this.transactionServices.addTransaction(
      transactionDTO,
      user,
      IncomeOrExpense.EXPENSE
    );
    return res.status(HttpStatus.OK).json({
      message: 'Expense has been successfully added!',
      postedExpense: newExpense,
    });
  }

  // Fetch a particular expense using its ID
  // @Get('/getExpense/:expenseID')
  // async getExpense(
  //   @GetUser() user: User,
  //   @Res() res: Response,
  //   @Param('expenseID', new ValidateObjectId()) expenseID: MongoDBID
  // ) {
  //   const foundExpense = await this.transactionServices.getTransaction(
  //     user._id,
  //     expenseID,
  //     IncomeOrExpense.EXPENSE
  //   );
  //   if (!foundExpense) {
  //     throw new NotFoundException('Expense does not exist!');
  //   }
  //   return res.status(HttpStatus.OK).json(foundExpense);
  // }

  // Fetch all expenses
  @Get('/allExpenses/:budgetID')
  async getExpenses(
    @GetUser() user: User,
    @Res() res: Response,
    @Param('budgetID', new ValidateObjectId()) budgetID: MongoDBID
  ) {
    const allExpenses = await this.transactionServices.getAllTransactions(
      user,
      IncomeOrExpense.EXPENSE,
      budgetID
    );
    return res.status(HttpStatus.OK).json(allExpenses);
  }

  // Edit expense using its ID
  @Patch('/editExpense/:expenseID')
  async editExpense(
    @GetUser() user: User,
    @Res() res: Response,
    @Param('expenseID', new ValidateObjectId()) expenseID: MongoDBID,
    @Body() transactionDTO: TransactionDTO
  ) {
    const editableExpense = await this.transactionServices.editTransaction(
      user,
      expenseID,
      transactionDTO,
      IncomeOrExpense.EXPENSE
    );
    return res.status(HttpStatus.OK).json({
      message: 'Expense has been successfully updated',
      editedExpense: editableExpense,
      originalPostDate: editableExpense.date_posted,
      editedPostDate: editableExpense.last_date_edited,
    });
  }

  // Delete an expense using its ID
  @Delete('/deleteExpense/:expenseID')
  async deleteExpense(
    @GetUser() user: User,
    @Res() res: Response,
    @Param('expenseID', new ValidateObjectId()) expenseID: MongoDBID
  ) {
    const deletableExpense = await this.transactionServices.deleteTransaction(
      user,
      expenseID,
      IncomeOrExpense.EXPENSE
    );
    return res.status(HttpStatus.OK).json({
      message: 'Expense has been deleted!',
      deletedExpense: deletableExpense,
    });
  }
}
