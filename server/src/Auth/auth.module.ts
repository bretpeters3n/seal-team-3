import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthController } from './auth.controller';
import { LogInSchema, SignUpSchema } from './auth.schema';
import { AuthServices } from './auth.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'SignUpSchema', schema: SignUpSchema },
      { name: 'LogInSchema', schema: LogInSchema },
    ]),
  ],
  providers: [AuthServices],
  controllers: [AuthController],
})
export class AuthModule {}
