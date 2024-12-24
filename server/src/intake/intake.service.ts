import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Intake } from './intake.schema';
import { CreateIntakeDto } from './dto/createIntake.dto';

@Injectable()
export class IntakeService {
  constructor(@InjectModel(Intake.name) private intakeModel: Model<Intake>) {}

  createIntake(createIntakeDto: CreateIntakeDto) {
    const newIntake = new this.intakeModel(createIntakeDto);
    return newIntake.save();
  }

  getAllIntakes() {
    return this.intakeModel.find();
  }

  getIntakesById(id: string) {
    return this.intakeModel.find({ userForeignKey: id });
  }

  getIntakesByYearMonth(
    id: string,
    year: number,
    month: number,
  ) {
    return this.intakeModel.find({
      userForeignKey: id,
      'date.year': year,
      'date.month': month
    });
  }

  getIntakesByYearMonthDay(
    id: string,
    year: number,
    month: number,
    day: number,
  ) {
    return this.intakeModel.find({
      userForeignKey: id,
      'date.year': year,
      'date.month': month,
      'date.day': day,
    });
  }

  async removeIntakeById(id: string) {
    const response = await this.intakeModel.findOneAndDelete({ _id: id });
    return `successfuly removed : ${response}`;
  }
}
