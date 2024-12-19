import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ versionKey: false })
export class Food {
  @Prop({ unique: true })
  name: string;

  @Prop()
  calories: number;

  @Prop()
  carbohydrates: number;

  @Prop()
  fats: number;

  @Prop()
  proteins: number;

  @Prop()
  imgUrl : string

  @Prop()
  portionSize : number;
}

export const foodSchema = SchemaFactory.createForClass(Food)
