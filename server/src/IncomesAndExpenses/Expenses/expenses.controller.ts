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
import { ExpenseDTO } from './dto/Expense.dto';
import { ExpenseServices } from './expenses.service';

@Controller('Expenses')
export class ExpenseController {
  constructor(private ExpenseServices: ExpenseServices) {}

  //EXPENSE METHODS
  // Submit an expense
  @Post('/postExpense')
  async addExpense(@Res() res, @Body() expenseDTO: ExpenseDTO) {
    const newExpense = await this.ExpenseServices.addExpense(expenseDTO);
    return res.status(HttpStatus.OK).json({
      message: 'Expense has been successfully added!',
      postedExpense: newExpense,
    });
  }

  // Fetch a particular expense using its ID
  @Get('/postExpense/:expenseID')
  async getPost(
    @Res() res,
    @Param('expenseID', new ValidateObjectId()) expenseID
  ) {
    const expense = await this.ExpenseServices.getExpense(expenseID);
    if (!expense) {
      throw new NotFoundException('Expense does not exist!');
    }
    return res.status(HttpStatus.OK).json(expense);
  }

  // Fetch all expenses
  @Get('/allExpenses')
  async getPosts(@Res() res) {
    const expenses = await this.ExpenseServices.getAllExpenses();
    return res.status(HttpStatus.OK).json(expenses);
  }

  // Edit expense using its ID
  @Patch('/editExpense/:expenseID')
  async editExpense(
    @Res() res,
    @Param('expenseID', new ValidateObjectId()) expenseID,
    @Body() expenseDTO: ExpenseDTO
  ) {
    const editableExpense = await this.ExpenseServices.editExpense(
      expenseID,
      expenseDTO
    );
    if (!editableExpense) {
      throw new NotFoundException('Expense does not exist!');
    }
    return res.status(HttpStatus.OK).json({
      message: 'Expense has been successfully updated',
      editedExpense: editableExpense,
      originalPostDate: editableExpense.date_posted,
      editedPostDate: editableExpense.last_date_edited,
    });
  }

  // Delete an expense using its ID
  @Delete('/deleteExpense/:expenseID')
  async deletePost(
    @Res() res,
    @Param('expenseID', new ValidateObjectId()) expenseID
  ) {
    const deletableExpense = await this.ExpenseServices.deleteExpense(
      expenseID
    );
    if (!deletableExpense) {
      throw new NotFoundException('Expense does not exist!');
    }
    return res.status(HttpStatus.OK).json({
      message: 'Expense has been deleted!',
      deletedExpense: deletableExpense,
    });
  }
}
