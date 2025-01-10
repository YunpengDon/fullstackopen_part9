import { v1 as uuid, UUIDTypes } from "uuid";
import patientsData from "../../data/patients";
import type {
  Patient,
  NonSensitivePatientEntry,
  NewPatientEntry,
} from "../types";

const getPatients = (): Patient[] => {
  return patientsData;
};

const getPatientByID = (id: UUIDTypes) => {
  return patientsData.find((patient) => patient.id === id);
};

const getNonSensitivePatientEntries = (): NonSensitivePatientEntry[] => {
  return patientsData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (entry: NewPatientEntry): Patient => {
  const newPatient: Patient = {
    id: uuid(),
    entries: [],
    ...entry,
  };
  patientsData.push(newPatient);
  return newPatient;
};

export default {
  getPatients,
  getPatientByID,
  getNonSensitivePatientEntries,
  addPatient,
};
