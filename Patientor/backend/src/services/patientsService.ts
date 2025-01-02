import patientsData from '../../data/patients';
import type { Patient, NonSensitivePatientEntry } from '../types';

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

export default {
  getPatients,
  getNonSensitivePatientEntries
};