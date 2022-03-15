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
import { TransactionServices } from './transaction.service';

@Controller('transactions')
@UseGuards(AuthGuard())
export class TransactionController {
  constructor(private transactionServices: TransactionServices) {}

  // TRANSACTION METHODS
  // Submit a transaction
  @Post('/postTransaction/:budgetID/:categoryID')
  async addTransaction(
    @GetUser() user: User,
    @Res() res: Response,
    @Body() transactionDTO: TransactionDTO,
    @Param('budgetID', new ValidateObjectId()) budgetID: MongoDBID,
    @Param('categoryID', new ValidateObjectId()) categoryID: MongoDBID
  ) {
    const newTransaction = await this.transactionServices.addTransaction(
      transactionDTO,
      user,
      budgetID,
      categoryID
    );
    return res.status(HttpStatus.OK).json({
      message: 'Transaction has been successfully added!',
      postedTransaction: newTransaction,
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

  // Fetch all transactions
  @Get('/allTransactions/:budgetID')
  async getAllTransactions(
    @GetUser() user: User,
    @Res() res: Response,
    @Param('budgetID', new ValidateObjectId()) budgetID: MongoDBID
  ) {
    const allTransactions = await this.transactionServices.getAllTransactions(
      user,
      budgetID
    );
    return res.status(HttpStatus.OK).json(allTransactions);
  }

  // Edit a transaction using its ID
  @Patch('/editTransaction/:transactionID')
  async editTransaction(
    @GetUser() user: User,
    @Res() res: Response,
    @Param('transactionID', new ValidateObjectId()) transactionID: MongoDBID,
    @Body() transactionDTO: TransactionDTO
  ) {
    const editableTransaction = await this.transactionServices.editTransaction(
      user,
      transactionID,
      transactionDTO
    );
    return res.status(HttpStatus.OK).json({
      message: 'Transaction has been successfully updated',
      editedTransaction: editableTransaction,
    });
  }

  // Delete a transaction using its ID
  @Delete('/deleteTransaction/:transactionID')
  async deleteTransaction(
    @GetUser() user: User,
    @Res() res: Response,
    @Param('transactionID', new ValidateObjectId()) transactionID: MongoDBID
  ) {
    const deletableTransaction =
      await this.transactionServices.deleteTransaction(user, transactionID);
    return res.status(HttpStatus.OK).json({
      message: 'Transaction has been deleted!',
      deletedTransaction: deletableTransaction,
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
}
