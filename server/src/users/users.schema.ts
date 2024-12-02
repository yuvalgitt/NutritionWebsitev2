import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

type DateOfBirth = {
  day: number;
  month: number;
  year: number;
};

@Schema({ versionKey: false })
export class User {
  @Prop({ unique: true })
  username: string;

  @Prop()
  displayName: string;

  @Prop()
  avatarUrl: string;

  @Prop()
  password: string;

  @Prop({
    type: {
      day: { type: Number, required: true },
      month: { type: Number, required: true },
      year: { type: Number, required: true },
    },
  })
  dateOfBirth: DateOfBirth;

  @Prop({ unique: true })
  email: string;

  @Prop()
  isAdmin: boolean;

  @Prop()
  AvatarUrl: string;
}

export const userSchema = SchemaFactory.createForClass(User);
