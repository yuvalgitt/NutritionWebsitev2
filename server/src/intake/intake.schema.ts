import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from "mongoose"

type Date = {
  day: number;
  month: number;
  year: number;
};

@Schema({ versionKey: false })
export class Intake {
  @Prop({ type : mongoose.Schema.Types.ObjectId, required : true, ref :'User'})
  userForeignKey : mongoose.Schema.Types.ObjectId

  @Prop({ type : mongoose.Schema.Types.ObjectId, required : true, ref :'Food'})
  foodForeignKey : mongoose.Schema.Types.ObjectId

  @Prop({
    type: {
      minute : { type: Number, required: true },
      hour : { type: Number, required: true },
      day: { type: Number, required: true },
      month: { type: Number, required: true },
      year: { type: Number, required: true },
      _id : false
    }
  })
  date: Date;

  @Prop()
  amount: number;

  @Prop()
  name: string;

  @Prop()
  amountInGrams: number;
}

export const intakeSchema = SchemaFactory.createForClass(Intake);
