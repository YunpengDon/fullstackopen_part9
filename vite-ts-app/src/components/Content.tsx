interface Course {
  name: string;
  exerciseCount: number;
};

interface CourseParts {
  courseParts: Course[];
}

const Content = ({courseParts}: CourseParts) => {
  return (
    courseParts.map((course: Course) => (
    <p key={course.name}>
        {course.name} {course.exerciseCount}
    </p>
    ))
  )
}

export default Content