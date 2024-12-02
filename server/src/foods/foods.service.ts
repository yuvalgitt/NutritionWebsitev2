import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Food } from './foods.schema';
import { Model } from 'mongoose';
import { CreateFoodDto } from './dto/createFood.dto';
import { PatchFoodDto } from './dto/updateFood.dto';

@Injectable()
export class FoodsService {
  constructor(@InjectModel(Food.name) private foodModel: Model<Food>) {}

  createFood(createFoodDto: CreateFoodDto) {
    const newFood = new this.foodModel(createFoodDto);
    return newFood.save();
  }
  getFoods() {
    return this.foodModel.find();
  }
  getFoodByName(name: string) {
    return this.foodModel.find({ name: {$regex :  name  ,$options : 'i'}});
  }
  patchFood(id: string, patchFoodDto: PatchFoodDto) {
    return this.foodModel.findByIdAndUpdate(id, patchFoodDto, { new: true });
  }
  deleteFood(id: string) {
    return this.foodModel.findByIdAndDelete(id);
  }
}
