interface TotalExercises {
  totalExercises: number;
}

const Total = (prop: TotalExercises) => {
  return <p>Number of exercises {prop.totalExercises}</p>;
};

export default Total;
