import Typography from "@mui/material/Typography";
import { useContext } from "react";
import { Diagnosis, Entry } from "../../types";
import { DiagnosesContext } from "../../App";

const Entries = ({ entries }: { entries: Entry[] }) => {
  const diagnoses = useContext(DiagnosesContext);

  const diagnoseCodeDisplay = (diagnoseCode: Array<Diagnosis["code"]>) => {
    if (diagnoseCode.length !== 0) {
      return (
        <ul>
          {diagnoseCode.map((code) => (
            <li key={code}>
              {code} {diagnoses.find((d) => d.code === code)?.name}
            </li>
          ))}
        </ul>
      );
    }
  };

  return (
    <div>
      <Typography
        variant="h5"
        style={{ marginTop: "0.5em", marginBottom: "0.5em" }}
      >
        entries
      </Typography>
      {entries.map((entry) => {
        return (
          <div key={entry.id}>
            <div>
              {entry.date} {entry.description}
            </div>
            {entry.diagnosisCodes
              ? diagnoseCodeDisplay(entry.diagnosisCodes)
              : null}
          </div>
        );
      })}
    </div>
  );
};

export default Entries;
