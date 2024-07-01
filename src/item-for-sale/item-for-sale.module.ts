import { Module } from '@nestjs/common';
import { ItemForSaleController } from './item-for-sale.controller';
import { ItemForSaleService } from './item-for-sale.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ItemForSaleSchema } from './schema/item-for-sale.schema';
import { AuthModule } from 'src/auth/auth.module';
import { StripeModule } from 'src/stripe/stripe.module';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([
      { name: 'ItemForSale', schema: ItemForSaleSchema },
    ]),
    StripeModule,
  ],
  controllers: [ItemForSaleController],
  providers: [ItemForSaleService],
})
export class ItemForSaleModule {}
