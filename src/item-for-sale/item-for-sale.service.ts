import {
  BadRequestException,
  Injectable,
  NotFoundException,
  // UnauthorizedException,
} from '@nestjs/common';
import { ItemForSale } from './schema/item-for-sale.schema';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Query } from 'express-serve-static-core';
import { User } from '../auth/schemas/user.schema';

@Injectable()
export class ItemForSaleService {
  constructor(
    @InjectModel(ItemForSale.name)
    private itemForSaleModel: mongoose.Model<ItemForSale>,
  ) {}

  async findAll(query: Query): Promise<ItemForSale[]> {
    const resultPerPage = 20;
    const currentPage = Number(query.page) || 1;
    const skip = (currentPage - 1) * resultPerPage;
    // console.log();

    const searchItem = query.searchItem
      ? {
          //add the query.searchItem to tittle as well as descritpion
          $or: [
            { title: { $regex: query.searchItem, $options: 'i' } },
            { description: { $regex: query.searchItem, $options: 'i' } },
          ],
        }
      : {};

    return this.itemForSaleModel
      .find({ ...searchItem })
      .limit(resultPerPage)
      .skip(skip)
      .exec();
  }

  async create(item: ItemForSale, user: User): Promise<ItemForSale> {
    const data = Object.assign(item, { user: user._id });
    const newItem = new this.itemForSaleModel(data);
    return newItem.save();
  }

  async findById(id: string): Promise<ItemForSale> {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) {
      throw new BadRequestException('Invalid ID');
    }

    const item = await this.itemForSaleModel.findById(id).exec();

    if (!item) {
      throw new NotFoundException('Item not found');
    }
    return item;
  }

  async update(id: string, item: ItemForSale): Promise<ItemForSale> {
    return this.itemForSaleModel
      .findByIdAndUpdate(id, item, { new: true, runValidators: true })
      .exec();
  }

  async delete(id: string): Promise<ItemForSale> {
    return this.itemForSaleModel.findByIdAndDelete(id).exec();
  }
}
