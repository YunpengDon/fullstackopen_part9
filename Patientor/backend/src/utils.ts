import { z } from "zod";
import { Diagnosis, Gender, NewPatientEntry } from "./types";

export const newPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.string().date(),
  ssn: z.string(),
  gender: z.nativeEnum(Gender),
  occupation: z.string(),
});

const toNewPatient = (object: unknown): NewPatientEntry => {
  return newPatientSchema.parse(object);
};

export const parseDiagnosisCodes = (
  object: unknown
): Array<Diagnosis["code"]> => {
  if (!object || typeof object !== "object" || !("diagnosisCodes" in object)) {
    // we will just trust the data to be in correct form
    return [] as Array<Diagnosis["code"]>;
  }

  return object.diagnosisCodes as Array<Diagnosis["code"]>;
};

export const dischargeSchema = z.object({
  date: z.string().date(`Value of dischargeSchema incorrect: {input}`),
  criteria: z.string().min(1),
});

export const sickLeaveSchema = z.object({
  startDate: z.string().date(`Value of sickLeave.startDate incorrect: {input}`),
  endDate: z.string().date(`Value of sickLeave.endDate incorrect: {input}`),
});

export default toNewPatient;
