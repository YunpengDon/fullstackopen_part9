import { v1 as uuid } from "uuid";
import patientsData from '../../data/patients';
import type { Patient, NonSensitivePatientEntry, NewPatientEntry } from '../types';

const getPatients = ():Patient[] => {
  return patientsData;
};

const getNonSensitivePatientEntries = (): NonSensitivePatientEntry[] => {
  return patientsData.map(({id, name, dateOfBirth, gender, occupation}) => ({
    id,
    name,
    dateOfBirth,
    gender, 
    occupation
  }));
};

const addPatient = (entry: NewPatientEntry):Patient => {
  const newPatient: Patient = {
    id: uuid(),
    ...entry
  };
  patientsData.push(newPatient);
  return newPatient;
};

export default {
  getPatients,
  getNonSensitivePatientEntries,
  addPatient
};