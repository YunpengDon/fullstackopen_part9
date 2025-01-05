import CoursePart from "../../types";
import Part from "./Part";

interface CourseParts {
  courseParts: CoursePart[];
}

const Content = ({ courseParts }: CourseParts) => {
  return courseParts.map((course: CoursePart) => (
    <Part part={course} key={course.name} />
  ));
};

export default Content;
