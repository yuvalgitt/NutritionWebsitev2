import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Post,
} from '@nestjs/common';
import { IntakeService } from './intake.service';
import mongoose, { mongo } from 'mongoose';
import { CreateIntakeDto } from './dto/createIntake.dto';
import { isNumber } from 'class-validator';

@Controller('intake')
export class IntakeController {
  constructor(private intakeService: IntakeService) {}

  @Get()
  getAllIntakes() {
    return this.intakeService.getAllIntakes();
  }

  @Get(':id')
  getIntakesById(@Param('id') id: string) {
    if (!mongoose.Types.ObjectId.isValid(id))
      throw new HttpException('invalid id', 400);
    return this.intakeService.getIntakesById(id);
  }

  @Get(':id/:year/:month')
  getMonthlyIntakesById(
    @Param('id') id: string,
    @Param('year') year: number,
    @Param('month') month: number,
  ) {
    if (
      !mongoose.Types.ObjectId.isValid(id) ||
      !isNumber(+year) ||
      !isNumber(+month)
    ) {
      throw new HttpException('invalid request', 400);
    }

    return this.intakeService.getIntakesByYearMonth(id , year , month );
  }

  @Get(':id/:year/:month/:day')
  getDailyIntakesById(
    @Param('id') id: string,
    @Param('year') year: number,
    @Param('month') month: number,
    @Param('day') day: number,
  ) {
    if (
      !mongoose.Types.ObjectId.isValid(id) ||
      !isNumber(+year) ||
      !isNumber(+month) ||
      !isNumber(+day)
    ) {
      throw new HttpException('invalid request', 400);
    }

    return this.intakeService.getIntakesByYearMonthDay(id , year , month , day);
  }

  @Post()
  createIntake(@Body() createIntakeDto: CreateIntakeDto) {
    return this.intakeService.createIntake(createIntakeDto);
  }

  @Delete(':id')
  deleteIntake(@Param('id') id: string) {
    if (!mongoose.Types.ObjectId.isValid(id))
      throw new HttpException('invalid id', 400);
    return this.intakeService.removeIntakeById(id);
  }
}
