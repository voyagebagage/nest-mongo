import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ItemForSale } from './schema/item-for-sale.schema';
import { ItemForSaleService } from './item-for-sale.service';
import { CreateItemForSaleDto } from './dto/create-item-for-sale.dto';
import { UpdateItemForSaleDto } from './dto/update-item-for-sale.dto';
import { Query as ExpressQuery } from 'express-serve-static-core';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/auth/schemas/user.schema';

@Controller('items')
export class ItemForSaleController {
  constructor(private itemForSaleService: ItemForSaleService) {}

  @Get()
  async getAllItems(@Query() query: ExpressQuery): Promise<ItemForSale[]> {
    return this.itemForSaleService.findAll(query);
  }

  @Post('add')
  @UseGuards(AuthGuard())
  async createItem(
    @Body() itemForSale: CreateItemForSaleDto,
    @Req() req: Request & { user: User },
  ): Promise<ItemForSale> {
    return this.itemForSaleService.create(itemForSale, req.user);
  }

  @Get(':id')
  async getItem(@Param('id') id: string): Promise<ItemForSale> {
    return this.itemForSaleService.findById(id);
  }

  @Put(':id')
  async updateItem(
    @Param('id') id: string,
    @Body() itemForSale: UpdateItemForSaleDto,
  ): Promise<ItemForSale> {
    return this.itemForSaleService.update(id, itemForSale);
  }

  @Delete(':id')
  async deleteItem(@Param('id') id: string): Promise<ItemForSale> {
    return this.itemForSaleService.delete(id);
  }
}
