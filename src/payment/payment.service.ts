import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Stripe } from 'stripe';
import { ItemForSaleService } from '../item-for-sale/item-for-sale.service';
import { AuthService } from '../auth/auth.service';
import { Payment } from './schema/payment.schema';
import { CreatePaymentDto } from './dto/create-payment.dto';

@Injectable()
export class PaymentService {
  private stripe: Stripe;

  constructor(
    @InjectModel(Payment.name) private paymentModel: Model<Payment>,
    private itemService: ItemForSaleService,
    private authService: AuthService,
  ) {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2024-06-20',
    });
  }

  async create(
    createPaymentDto: CreatePaymentDto,
    itemId: string,
  ): Promise<Payment> {
    const { user, paymentMethodId } = createPaymentDto;
    const userId = user.toString();

    const itemFoundById = await this.itemService.findById(itemId);
    const userGotById = await this.authService.getUserById(userId);

    if (!itemFoundById) {
      throw new NotFoundException('Item not found');
    }

    if (!userGotById) {
      throw new NotFoundException('User not found');
    }

    const paymentIntent = await this.stripe.paymentIntents.create({
      amount: itemFoundById.price,
      currency: 'usd',
      payment_method: paymentMethodId,
      confirmation_method: 'manual',
      confirm: true,
      return_url: 'https://yourdomain.com/payment/thanks',
    });

    const payment = new this.paymentModel({
      item: itemId,
      user: userId,
      amount: paymentIntent.amount,
      currency: paymentIntent.currency,
      paymentMethodId,
      status: paymentIntent.status,
    });

    if (itemFoundById.price !== paymentIntent.amount) {
      throw new UnauthorizedException('Invalid payment amount');
    }

    return await payment.save();
  }

  async getPaymentWithDetails(paymentId: string): Promise<Payment> {
    const payment = await this.paymentModel
      .findById(paymentId)
      .populate('item')
      .populate('user')
      .exec();
    console.log('Payment details: ' + payment);

    return payment;
  }
}
