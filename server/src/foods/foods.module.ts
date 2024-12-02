import { Module } from '@nestjs/common';
import { FoodsController } from './foods.controller';
import { FoodsService } from './foods.service';
import { Food, foodSchema } from './foods.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  controllers: [FoodsController],
  providers: [FoodsService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Food.name,
        schema: foodSchema,
      },
    ]),
  ],
})
export class FoodsModule {}
