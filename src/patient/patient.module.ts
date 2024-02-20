import { Module } from '@nestjs/common';
import { PatientService } from './patient.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PatientSchema, Patient } from './schemas/patient.schemas';
import { PatientController } from './patient.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Patient.name, schema: PatientSchema }]),
  ],
  controllers: [PatientController],
  providers: [PatientService],
})
export class PatientModule {}
