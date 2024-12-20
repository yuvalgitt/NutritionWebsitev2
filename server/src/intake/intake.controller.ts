import { Body, Controller, Get, Post } from '@nestjs/common';
import { IntakeService } from './intake.service';
import { CreateIntakeDto } from './dto/createIntake.dto';

@Controller('intake')
export class IntakeController {
    constructor(private intakeService : IntakeService){}

    @Get()
    getAllIntakes() {
        return this.intakeService.getAllIntakes()
    }
    
    @Post()
    createIntake(@Body() createIntakeDto : CreateIntakeDto){
        return this.intakeService.createIntake(createIntakeDto)
    }
}
