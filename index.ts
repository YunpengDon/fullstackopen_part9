import express from "express";
import { Request, Response } from "express";

import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";

const app = express();

class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ValidationError";
    Object.setPrototypeOf(this, ValidationError.prototype);
  }
}
app.use(express.json())

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req: Request, res: Response) => {
  const { weight, height } = req.query;
  if (!weight || !height) {
    res.status(400).json({
      error: "Weight and height parameters are required!",
    });
  }
  if (isNaN(Number(weight)) || isNaN(Number(height))) {
    res.status(400).json({
      error: "malformatted parameters",
    });
  }
  const responseObject = {
    weight: Number(weight),
    height: Number(height),
    bmi: calculateBmi(Number(height), Number(weight)),
  };
  res.json(responseObject);
});

app.post('/exercises', (req, res, next) => {
  try {
    const {daily_exercises, target} = req.body;
    if (!daily_exercises || !target) {
      throw new ValidationError("parameters missing");
    }
    if (daily_exercises.some((hour:any) => isNaN(Number(hour))) || isNaN(Number(target))) {
      throw new ValidationError("malformatted parameters");
    }
  
    const result = calculateExercises(daily_exercises as number[], target as number)
    res.json(result)
    return
  } catch (error) {
   next(error)
  }
})

app.use((err:Error, _req: Request, res: Response, _next: express.NextFunction) => {
  if (err instanceof SyntaxError && 'body' in err) {
    res.status(400).json({ error: 'Invalid JSON format' });
    return
  }
  if (err instanceof ValidationError) {
    res.status(400).json({error: err.message})
    return
  }
  res.status(500).json({ error: 'Internal server error' });
})

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
