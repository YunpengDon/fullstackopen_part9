import { v1 as uuid, UUIDTypes } from "uuid";
import patientsData from "../../data/patients-full";
import { z } from "zod";
import {
  type Patient,
  type NonSensitivePatientEntry,
  type NewPatientEntry,
  type NewEntry,
  type BaseEntry,
  type Entry,
  HealthCheckRating,
} from "../types";
import {
  dischargeSchema,
  parseDiagnosisCodes,
  sickLeaveSchema,
} from "../utils";

let patientList = patientsData;

const getPatients = (): Patient[] => {
  return patientList;
};

const getPatientByID = (id: UUIDTypes) => {
  return patientList.find((patient) => patient.id === id);
};

const getNonSensitivePatientEntries = (): NonSensitivePatientEntry[] => {
  return patientList.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (newPatienEntry: NewPatientEntry): Patient => {
  const newPatient: Patient = {
    id: uuid(),
    entries: [],
    ...newPatienEntry,
  };
  patientList.push(newPatient);
  return newPatient;
};

interface NewEntryInput {
  id: UUIDTypes;
  entry: NewEntry;
}

const addEntry = ({ id, entry }: NewEntryInput) => {
  const patient = getPatientByID(id);
  if (patient) {
    let newEntry: Entry;
    const baseEntry: BaseEntry = {
      id: uuid(),
      diagnosisCodes: parseDiagnosisCodes(entry),
      date: z.string().date(`Date is invalid: ${entry.date}`).parse(entry.date),
      specialist: z
        .string()
        .min(1, `Specialist is invalid: ${entry.specialist}`)
        .parse(entry.specialist),
      description: z
        .string()
        .min(1, `Description is invalid: ${entry.description}`)
        .parse(entry.description),
    };
    switch (entry.type) {
      case "Hospital":
        newEntry = {
          ...baseEntry,
          type: entry.type,
          discharge: dischargeSchema.parse(entry.discharge),
        };
        break;
      case "HealthCheck":
        newEntry = {
          ...baseEntry,
          type: entry.type,
          healthCheckRating: z
            .nativeEnum(HealthCheckRating, {
              message: `Value of healthCheckRating incorrect: ${entry.healthCheckRating}`,
            })
            .parse(entry.healthCheckRating),
        };
        break;
      case "OccupationalHealthcare":
        newEntry = {
          ...baseEntry,
          type: entry.type,
          employerName: z.string().parse(entry.employerName),
          sickLeave: sickLeaveSchema.optional().parse(entry.sickLeave),
        };
        break;
      default:
        throw new Error("Error: unknown Type");
    }

    const newPatient = {
      ...patient,
      entries: patient.entries.concat(newEntry),
    };
    patientList = patientList.map((patient) =>
      patient.id === id ? newPatient : patient
    );
    return newPatient;
  }
  throw new Error("Error: Can't find patient by id");
};

export default {
  getPatients,
  getPatientByID,
  getNonSensitivePatientEntries,
  addPatient,
  addEntry,
};
