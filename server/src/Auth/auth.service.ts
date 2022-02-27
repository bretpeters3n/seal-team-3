import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { dateStamp } from 'src/utils/dateStamp';
import { LogInInterface, SignUpInterface } from './Auth.interfaces';
import { LogInDTO, SignUpDTO } from './auth.dto';

@Injectable()
export class AuthServices {
  constructor(
    @InjectModel('SignUpSchema')
    private readonly signUpModel: Model<SignUpInterface>,
    @InjectModel('LogInSchema')
    private readonly logInModel: Model<LogInInterface>
  ) {}

  async signUp(signupDTO: SignUpDTO): Promise<void | string> {
    const newUser = new this.signUpModel(signupDTO);
    newUser.date_created = dateStamp();
    try {
      await newUser.save();
      return 'User succesfully created!';
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('Username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async logIn(logInDTO: LogInDTO): Promise<string> {
    const { email } = logInDTO;
    const foundUser = this.logInModel.findOne({ email });
    if (foundUser) {
      return 'Successful login!';
    } else {
      throw new UnauthorizedException('Please check your login credentials');
    }
  }
}
