import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Patient } from './schemas/patient.schemas';
import mongoose from 'mongoose';

// interface FindAllResult {
//   patients: Patient[];
//   testcount: number;
// }
@Injectable()
export class PatientService {
  constructor(
    @InjectModel(Patient.name)
    private patientModel: mongoose.Model<Patient>,
  ) {}
}
