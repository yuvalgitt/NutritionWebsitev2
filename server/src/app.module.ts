import { Module } from '@nestjs/common';
import { FoodsModule } from './foods/foods.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { IntakeModule } from './intake/intake.module';

@Module({
  imports: [
    FoodsModule,
    MongooseModule.forRoot('mongodb://127.0.0.1/NutritionProject'),
    UsersModule,
    IntakeModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
