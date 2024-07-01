import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsArray,
  IsOptional,
  IsEmpty,
} from 'class-validator';
import { Category } from '../schema/item-for-sale.schema';
import { User } from '../../auth/schemas/user.schema';

export class CreateItemForSaleDto {
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @IsNotEmpty()
  @IsNumber()
  readonly price: number;

  @IsNotEmpty()
  @IsString()
  readonly currency: string;

  @IsNotEmpty()
  @IsBoolean()
  readonly isSold: boolean;

  @IsNotEmpty()
  @IsEnum(Category, { message: 'Invalid category' })
  readonly category: Category;

  @IsOptional()
  @IsArray()
  readonly images: string[];

  @IsEmpty({ message: 'You cannot set the maker id of the item for sale' })
  readonly user: User;
}
