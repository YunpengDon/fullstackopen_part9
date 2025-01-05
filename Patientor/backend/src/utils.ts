import { z } from "zod";
import { Gender, NewPatientEntry } from "./types";

export const newPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.string().date(),
  ssn: z.string(),
  gender: z.nativeEnum(Gender),
  occupation: z.string()
});


const toNewPatient = (object: unknown):NewPatientEntry => {
  return newPatientSchema.parse(object);
};

export default toNewPatient;