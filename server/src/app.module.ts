import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './Auth/auth.module';
import { TransactionModule } from './Transactions/transaction.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nest-budgety', {
      useNewUrlParser: true,
    }),
    AuthModule,
    TransactionModule,
  ],
})
export class AppModule {}
