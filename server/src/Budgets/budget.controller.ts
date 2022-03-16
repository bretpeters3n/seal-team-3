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
  NotFoundException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { User } from 'src/Auth/dataStructureFiles/auth.interfaces';
import { GetUser } from 'src/Auth/get-user.decorator';
import { ValidateObjectId } from 'src/shared/pipes/validate-object-id.pipes';
import { MongoDBID } from 'src/shared/types';
import { BudgetServices } from './budget.service';
import { BudgetDTO } from './dataStructureFiles/budget.dto';

@Controller('budgets')
@UseGuards(AuthGuard())
export class BudgetController {
  constructor(private budgetServices: BudgetServices) {}

  //BUDGET METHODS

  // Create a budget
  @Post('/createBudget')
  async createBudget(
    @GetUser() user: User,
    @Res() res: Response,
    @Body() budgetDTO: BudgetDTO
  ) {
    const newBudget = await this.budgetServices.createBudget(budgetDTO, user);
    return res.status(HttpStatus.OK).json({
      message: 'Budget has been successfully added!',
      createdBudget: newBudget,
    });
  }

  // Fetch all budgets
  @Get('/getAllBudgets')
  async getAllCreatedBudgets(@GetUser() user: User, @Res() res: Response) {
    const allBudgets = await this.budgetServices.getAllBudgets(user);
    return res.status(HttpStatus.OK).json(allBudgets);
  }

  // Fetch budget by ID
  @Get('/getBudget/:budgetID')
  async getBudgetById(
    @GetUser() user: User,
    @Res() res: Response,
    @Param('budgetID', new ValidateObjectId()) budgetID: MongoDBID
  ) {
    const foundBudget = await this.budgetServices.getBudgetById(user, budgetID);
    if (!foundBudget) {
      throw new NotFoundException(
        'Budget does not exist or cannot be found, check your ID!'
      );
    }
    return res.status(HttpStatus.OK).json(foundBudget);
  }

  // Edit a budget using its ID
  @Patch('/editBudget/:budgetID')
  async editBudget(
    @GetUser() user: User,
    @Res() res: Response,
    @Param('budgetID', new ValidateObjectId()) budgetID: MongoDBID,
    @Body() budgetDTO: BudgetDTO
  ) {
    const editableBudget = await this.budgetServices.editBudget(
      user,
      budgetID,
      budgetDTO
    );
    return res.status(HttpStatus.OK).json({
      message: 'Budget has been successfully updated',
      editedBudget: editableBudget,
    });
  }
}
