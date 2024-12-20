import { Module } from '@nestjs/common';
import { IntakeController } from './intake.controller';
import { IntakeService } from './intake.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Intake, intakeSchema } from './intake.schema';

@Module({
  controllers: [IntakeController],
  providers: [IntakeService],
  imports: [
    MongooseModule.forFeature([
      {
        name : Intake.name,
        schema: intakeSchema
      }
    ])
  ]
})
export class IntakeModule {}
