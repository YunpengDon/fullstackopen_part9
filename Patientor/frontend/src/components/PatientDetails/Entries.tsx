import Typography from "@mui/material/Typography";

import { Diagnosis, Entry } from "../../types";

const Entries = ({ entries }: { entries: Entry[] }) => {
  const diagnoseCodeDisplay = (diagnoseCode: Array<Diagnosis["code"]>) => {
    if (diagnoseCode.length !== 0) {
      return (
        <ul>
          {diagnoseCode.map((code) => (
            <li key={code}>{code}</li>
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
