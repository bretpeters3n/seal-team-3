import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { dateStamp } from 'src/utils/dateStamp';
import {
  budgetDummyData,
  BudgetInterface,
} from './dataStructureFiles/budget.interfaces';
import { MongoDBID } from 'src/shared/types';
import { User } from 'src/Auth/dataStructureFiles/auth.interfaces';
import { BudgetDTO } from './dataStructureFiles/budget.dto';
import { serveBudgetTitleOptions } from './utils';

@Injectable()
export class BudgetServices {
  constructor(
    @InjectModel('BudgetSchema')
    private readonly budgetModel: Model<BudgetInterface>
  ) {}

  // ALL BUDGET SERVICE METHODS
  async createBudget(
    budgetDTO: BudgetDTO,
    user: User
  ): Promise<BudgetInterface> {
    const newBudget = new this.budgetModel(budgetDTO);
    newBudget.date_created = dateStamp();
    newBudget.last_date_edited = dateStamp();
    newBudget.user_id = user._id;
    newBudget.created = true;
    return newBudget.save();
  }

  async getAllBudgets(user: User): Promise<BudgetInterface[] | string[]> {
    const allBudgetOptions = serveBudgetTitleOptions();
    const allBudgets = await this.budgetModel.find().exec();
    if (allBudgets) {
      const currentUserBudgets = allBudgets.filter(
        (budget) => budget.user_id === user.id
      );
      allBudgetOptions.forEach((budgetTitle) =>
        currentUserBudgets.forEach((createdBudget) => {
          if (createdBudget.title === budgetTitle) {
            allBudgetOptions.splice(
              allBudgetOptions.indexOf(budgetTitle),
              1,
              createdBudget
            );
          }
        })
      );
      return allBudgetOptions;
    }
    throw new UnauthorizedException('User must own budgets');
  }

  async editBudget(
    user: User,
    budgetID: MongoDBID,
    budgetDTO: BudgetDTO
  ): Promise<BudgetInterface> {
    const editableBudget = await this.budgetModel.findByIdAndUpdate(
      budgetID,
      budgetDTO,
      {
        new: true,
      }
    );
    editableBudget.last_date_edited = dateStamp();
    if (editableBudget === null) {
      throw new NotFoundException('Budget does not exist!');
    } else if (user._id.toString() === editableBudget.user_id) {
      return editableBudget;
    } else if (user._id.toString() !== editableBudget.user_id) {
      throw new UnauthorizedException('User must own budget');
    }
  }
}
