import { Body, Controller, Delete, Get, HttpException, Param, Post } from '@nestjs/common';
import { IntakeService } from './intake.service';
import mongoose, { mongo } from "mongoose";
import { CreateIntakeDto } from './dto/createIntake.dto';

@Controller('intake')
export class IntakeController {
    constructor(private intakeService : IntakeService){}

    @Get()
    getAllIntakes() {
        return this.intakeService.getAllIntakes()
    }

    @Get(':id')
    getIntakesById(@Param('id') id : string){
        if(!mongoose.Types.ObjectId.isValid(id))
            throw new HttpException('invalid id',400)
        return this.intakeService.getIntakesById(id)
    }
    
    @Post()
    createIntake(@Body() createIntakeDto : CreateIntakeDto){
        return this.intakeService.createIntake(createIntakeDto)
    }

    @Delete(":id")
    deleteIntake(@Param('id') id : string){
        if(!mongoose.Types.ObjectId.isValid(id))
            throw new HttpException('invalid id',400)
        return this.intakeService.removeIntakeById(id)
    }
}
