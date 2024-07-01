// src/payment/payment.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { ItemForSaleModule } from '../item-for-sale/item-for-sale.module'; //
import { AuthModule } from 'src/auth/auth.module';
import { Payment, PaymentSchema } from './schema/payment.schema';
// import { ItemForSaleSchema } from 'src/item-for-sale/schema/item-for-sale.schema';
// import { User, UserSchema } from 'src/auth/schemas/user.schema';

@Module({
  imports: [
    AuthModule,
    ItemForSaleModule,
    MongooseModule.forFeature([{ name: Payment.name, schema: PaymentSchema }]),
    // MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    // MongooseModule.forFeature([
    //   { name: ItemForSaleModule.name, schema: ItemForSaleSchema },
    // ]),
  ],
  controllers: [PaymentController],
  providers: [PaymentService],
  exports: [PaymentService],
})
export class PaymentModule {}
