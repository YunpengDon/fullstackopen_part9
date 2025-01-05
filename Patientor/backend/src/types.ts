import { z } from "zod";
import { newPatientSchema } from "./utils";

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
};

export enum Gender {
  Male = 'male',
  Female = 'female',
  Ohter = 'other',
}

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string
}

export type NonSensitivePatientEntry = Omit<Patient, 'ssn'>;

// export type NewPatientEntry = Omit<Patient, 'id'>;
export type NewPatientEntry = z.infer<typeof newPatientSchema>;