import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { Payment } from './schema/payment.schema';

import { AuthGuard } from '@nestjs/passport';

@Controller('payments')
export class PaymentController {
  constructor(private paymentService: PaymentService) {}

  @Get(':paymentId')
  async getPayment(@Param('paymentId') id: string): Promise<Payment> {
    return await this.paymentService.getPaymentWithDetails(id);
  }

  @Post('create/:itemId')
  @UseGuards(AuthGuard()) // Ensure this endpoint is protected
  async createPayment(
    @Param('itemId') itemId: string,
    @Body() body: CreatePaymentDto,
  ): Promise<Payment> {
    return await this.paymentService.create(body, itemId);
  }
}
