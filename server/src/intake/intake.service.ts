import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Intake } from './intake.schema';
import { CreateIntakeDto } from './dto/createIntake.dto';

@Injectable()
export class IntakeService {
    constructor(@InjectModel(Intake.name) private intakeModel: Model<Intake>){}

    createIntake(createIntakeDto : CreateIntakeDto) {
        const newIntake =  new this.intakeModel(createIntakeDto);
        return newIntake.save()
    }

    getAllIntakes(){
        return this.intakeModel.find()
    }
}
