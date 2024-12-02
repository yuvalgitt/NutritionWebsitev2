import {
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { FoodsService } from './foods.service';
import { CreateFoodDto } from './dto/createFood.dto';
import { isString } from 'class-validator';
import { PatchFoodDto } from './dto/updateFood.dto';
import mongoose from 'mongoose'

@Controller('foods')
export class FoodsController {
  constructor(private foodService: FoodsService) {}

  @Post()
  createFood(@Body() createFoodDto: CreateFoodDto) {
    return this.foodService.createFood(createFoodDto);
  }

  @Get()
  getFoods() {
    return this.foodService.getFoods();
  }

  @Get(':id')
  getFoodById(@Param('id') id : string) {
    if(!mongoose.Types.ObjectId.isValid(id))
      throw new HttpException('bad request' , 400)
    return 'you didnt make the service buddy'
  }

  @Get('name/:name')
  async getFoodByName(@Param('name') name: string) {
    if (!isString(name)) throw new HttpException('name not string', 400);

    const food = this.foodService.getFoodByName(name);
    if (!food) throw new HttpException('food not found', 404);

    return food;
  }

  @Patch(':id')
  patchFood(@Param('id') id: string, @Body() patchFoodDto: PatchFoodDto) {
    if(!mongoose.Types.ObjectId.isValid(id))
        throw new HttpException('invalid id ', 400)

    const patchedFood = this.foodService.patchFood(id,patchFoodDto)
    if(!patchedFood)
        throw new HttpException('no food found',404)

    return patchedFood
  }

  
}
