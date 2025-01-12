import express from "express";
import { Request, Response, NextFunction } from "express";
import { z } from "zod";

import type {
  NewEntry,
  NewPatientEntry,
  NonSensitivePatientEntry,
  Patient,
} from "../types";
import patientsService from "../services/patientsService";
import { newPatientSchema } from "../utils";
import { UUIDTypes } from "uuid";

const router = express.Router();

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    newPatientSchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

const errorMiddleware = (
  error: unknown,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof z.ZodError) {
    res.status(400).send({ error: error.issues });
    console.log(error);
  } else {
    next();
  }
};

router.get("/", (_req, res: Response<NonSensitivePatientEntry[]>) => {
  res.send(patientsService.getNonSensitivePatientEntries());
});

router.get("/:id", (req, res: Response<Patient>, next: NextFunction) => {
  try {
    res.send(patientsService.getPatientByID(req.params.id));
  } catch (error: unknown) {
    next(error);
  }
});

router.post(
  "/",
  newPatientParser,
  (req: Request<unknown, unknown, NewPatientEntry>, res: Response<Patient>) => {
    const addedEntry = patientsService.addPatient(req.body);
    res.json(addedEntry);
  }
);

router.post(
  "/:id/entries",
  (
    req: Request<{ id: UUIDTypes }, unknown, NewEntry>,
    res,
    next: NextFunction
  ) => {
    try {
      const newPatient = patientsService.addEntry({
        id: req.params.id,
        entry: req.body,
      });
      res.json(newPatient);
    } catch (error) {
      next(error);
    }
  }
);

router.use(errorMiddleware);

export default router;
