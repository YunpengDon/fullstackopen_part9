import CoursePart, { assertNever } from "../../types";

const Part = ({ part }: { part: CoursePart }) => {
  switch (part.kind) {
    case "basic":
      return (
        <p>
          <b>
            {part.name} {part.exerciseCount}
          </b>
          <br />
          <i>{part.description}</i>
        </p>
      );
    case "group":
      return (
        <p>
          <b>
            {part.name} {part.exerciseCount}
          </b>
          <br />
          project exercises {part.exerciseCount}
        </p>
      );
    case "background":
      return (
        <p>
          <b>
            {part.name} {part.exerciseCount}
          </b>
          <br />
          <i>{part.description}</i>
          <br />
          Submit to {part.backgroundMaterial}
        </p>
      );
    case "special":
      return (
        <p>
          <b>
            {part.name} {part.exerciseCount}
          </b>
          <br />
          <i>{part.description}</i>
          <br />
          required skills: {part.requirements.join(", ")}
        </p>
      );
    default:
      assertNever(part);
  }
};

export default Part;
