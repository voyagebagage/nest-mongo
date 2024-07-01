import {
  IsNotEmpty,
  IsMongoId,
  IsEmpty,
  IsString,
  IsOptional,
} from 'class-validator';
import { Types } from 'mongoose';

export class CreatePaymentDto {
  @IsNotEmpty()
  @IsMongoId()
  user: Types.ObjectId;

  @IsOptional()
  @IsMongoId()
  item: Types.ObjectId;

  @IsEmpty()
  amount: number;

  @IsNotEmpty()
  currency: string = 'usd';
  @IsNotEmpty()
  @IsString()
  paymentMethodId: string;

  @IsEmpty()
  status: string;
}
