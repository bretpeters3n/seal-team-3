import { Controller, Get, Post, Body } from "@nestjs/common";
import { LogInDTO, SignUpDTO } from "./dataStructureFiles/auth.dto";
import { AuthServices } from "./auth.service";

@Controller("auth")
export class AuthController {
  constructor(private authServices: AuthServices) {}

  @Post("/signUp")
  async signUp(@Body() signUpDTO: SignUpDTO): Promise<void> {
    return this.authServices.createUser(signUpDTO);
  }

  @Post("/logIn")
  async logIn(@Body() logInDTO: LogInDTO): Promise<{ accessToken: string }> {
    return this.authServices.logIn(logInDTO);
  }
}
