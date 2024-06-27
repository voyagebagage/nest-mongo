import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  IsArray,
  IsEmpty,
} from 'class-validator';
import { Category } from '../schema/item-for-sale.schema';
import { User } from '../../auth/schemas/user.schema';

export class UpdateItemForSaleDto {
  @IsOptional()
  @IsString()
  readonly title: string;

  @IsOptional()
  @IsString()
  readonly description: string;

  @IsOptional()
  @IsNumber()
  readonly price: number;

  @IsOptional()
  @IsBoolean()
  readonly isSold: boolean;

  @IsOptional()
  @IsEnum(Category, { message: 'Invalid category' })
  readonly category: Category;

  @IsOptional()
  @IsArray()
  readonly images: string[];

  @IsEmpty({ message: 'You cannot set the maker id of the item for sale' })
  readonly user: User;
}
