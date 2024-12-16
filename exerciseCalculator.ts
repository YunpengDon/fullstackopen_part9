interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface ExercisesParameters {
  target: number;
  exerciseHours: number[];
}

const parseArguments = (args: string[]): ExercisesParameters => {
  if (args.length < 4) throw new Error("not enough arguments");
  if (args.slice(2).every((arg) => !isNaN(Number(arg)))) {
    return {
      target: Number(args[2]),
      exerciseHours: args.slice(3).map((arg) => Number(arg)),
    };
  } else {
    throw new Error("Provided values were not all numbers!");
  }
};

const giveRating = (average: number, target: number): number => {
  if (average < target) {
    return 1;
  } else if (average > 2 * target) {
    return 3;
  } else if (average >= target) {
    return 2;
  }
  return 0;
};

const giveRatingDescription = (rating: number): string => {
  switch (rating) {
    case 1:
      return "You need to work harder!";
    case 2:
      return "Not too bad but could be better";
    case 3:
      return "You are so great!";
    default:
      return "Something wrong";
  }
};

const calculateExercises = (
  exerciseHours: number[],
  target: number,
): Result => {
  const periodLength = exerciseHours.length;
  const trainingDays = exerciseHours.filter((time) => time > 0).length;
  const average =
    exerciseHours.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0,
    ) / periodLength;
  const success = average > target;
  const rating = giveRating(average, target);
  const ratingDescription = giveRatingDescription(rating);

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};


if (require.main === module) {
  try {
    const { target, exerciseHours } = parseArguments(process.argv);
    console.log(calculateExercises(exerciseHours, target));
  } catch (error: unknown) {
    let errorMessage = "Something bad happened.";
    if (error instanceof Error) {
      errorMessage += "Error: " + error.message;
    }
    console.log(errorMessage);
  }
}

export { ExercisesParameters, calculateExercises};
