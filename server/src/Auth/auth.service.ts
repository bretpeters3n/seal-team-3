import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { dateStamp } from 'src/utils/dateStamp';
import { User } from './Auth.interfaces';
import { LogInDTO, SignUpDTO } from './auth.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from './jwt-payload';

@Injectable()
export class AuthServices {
  constructor(
    @InjectModel('UserSchema')
    private readonly authModel: Model<User>,
    private jwtService: JwtService
  ) {}

  async createUser(signupDTO: SignUpDTO): Promise<void> {
    // user info comes in as DTO, gets stamped with date, password is destructured, hashed, and salted.
    // If there are no users with this name, it is saved, otherwise it returns an error.
    // Password is encrypted and user is created with an origin date.
    const newUser = new this.authModel(signupDTO);
    newUser.accountCreated = dateStamp();
    const { password } = newUser;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    newUser.password = hashedPassword;
    try {
      await newUser.save();
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('Email already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async logIn(logInDTO: LogInDTO): Promise<{ accessToken: string }> {
    // destructures DTO to find user by email.
    const { email, password } = logInDTO;
    const user = await this.authModel.findOne({ email });
    // if a user exists and their password matches the encrypted password we have stored,
    // then we return an accesstoken.
    // if not, we throw an error.
    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = { email };
      const accessToken: string = this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException('Please check your login credentials');
    }
  }
}
