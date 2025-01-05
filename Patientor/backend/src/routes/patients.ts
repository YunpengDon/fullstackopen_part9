import express from 'express';
import { Request, Response, NextFunction } from 'express';
import { z } from "zod";

import type { NewPatientEntry, NonSensitivePatientEntry, Patient} from '../types';
import patientsService from '../services/patientsService';
import {newPatientSchema} from '../utils';

const router = express.Router();

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    newPatientSchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

const errorMiddleware = (error: unknown, _req: Request, res: Response, next: NextFunction) => {
  if (error instanceof z.ZodError) {
    res.status(400).send({ error: error.issues});
  } else {
    next();
  }
};

router.get('/', (_req, res: Response<NonSensitivePatientEntry[]>) => {
  res.send(patientsService.getNonSensitivePatientEntries());
});

router.post('/', newPatientParser,(req: Request<unknown, unknown, NewPatientEntry>, res: Response<Patient>) => {
  const addedEntry = patientsService.addPatient(req.body);
  res.json(addedEntry);
});

router.use(errorMiddleware);

export default router;