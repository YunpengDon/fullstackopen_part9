import express from "express";
import { Request, Response } from "express";

import { calculateBmi } from "./bmiCalculator";
const app = express();

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

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
