import express from 'express';
import { Response } from 'express';
import type { NonSensitivePatientEntry } from '../types';
import patientsService from '../services/patientsService';

const router = express.Router();

router.get('/', (_req, res: Response<NonSensitivePatientEntry[]>) => {
  res.send(patientsService.getNonSensitivePatientEntries());
});

export default router;