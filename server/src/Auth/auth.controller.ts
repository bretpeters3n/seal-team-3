import { Controller, Get, Post, Body } from '@nestjs/common';
import { LogInDTO, SignUpDTO } from './auth.dto';
import { AuthServices } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authServices: AuthServices) {}

  @Post('/signUp')
  async signUp(@Body() signUpDTO: SignUpDTO): Promise<void | string> {
    return this.authServices.signUp(signUpDTO);
  }

  @Get('/logIn')
  async logIn(@Body() logInDTO: LogInDTO): Promise<string> {
    return this.authServices.logIn(logInDTO);
  }
}
