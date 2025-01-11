import React, { useContext } from "react";

import { Box, Card, CardContent } from "@mui/material";
import Typography from "@mui/material/Typography";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import WorkIcon from "@mui/icons-material/Work";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { assertNever, Diagnosis, Entry, HealthCheckRating } from "../../types";
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

  const HealthCheckRatingDisplay = ({
    healthRating,
  }: {
    healthRating: HealthCheckRating;
  }) => {
    switch (healthRating) {
      case HealthCheckRating.Healthy:
        return <FavoriteIcon color="success" />;
      case HealthCheckRating.LowRisk:
        return <FavoriteIcon color="info" />;
      case HealthCheckRating.HighRisk:
        return <FavoriteIcon color="warning" />;
      case HealthCheckRating.CriticalRisk:
        return <FavoriteIcon color="error" />;
      default:
        return assertNever(healthRating);
    }
  };

  const HospitalEntryDetail = ({ entry }: { entry: Entry }) => {
    return (
      <Card>
        <CardContent>
          <div>
            {entry.date} <LocalHospitalIcon />
          </div>
          <div>
            <i>{entry.description}</i>
          </div>
          <div>diagnose by {entry.specialist}</div>
          {entry.diagnosisCodes
            ? diagnoseCodeDisplay(entry.diagnosisCodes)
            : null}
        </CardContent>
      </Card>
    );
  };

  const HealthCheckEntryDetail = ({ entry }: { entry: Entry }) => {
    if (entry.type === "HealthCheck") {
      return (
        <Card>
          <CardContent>
            <div>
              {entry.date} <FactCheckIcon />
            </div>
            <div>
              <i>{entry.description}</i>
            </div>
            <HealthCheckRatingDisplay healthRating={entry.healthCheckRating} />
            <div>diagnose by {entry.specialist}</div>
            {entry.diagnosisCodes
              ? diagnoseCodeDisplay(entry.diagnosisCodes)
              : null}
          </CardContent>
        </Card>
      );
    }
  };

  const OccupationalHealthcareEntryDetail = ({ entry }: { entry: Entry }) => {
    if (entry.type === "OccupationalHealthcare") {
      return (
        <Card>
          <CardContent>
            <div>
              {entry.date} <WorkIcon /> {entry.employerName}
            </div>
            <div>
              <i>{entry.description}</i>
            </div>
            <div>diagnose by {entry.specialist}</div>
            {entry.diagnosisCodes
              ? diagnoseCodeDisplay(entry.diagnosisCodes)
              : null}
          </CardContent>
        </Card>
      );
    }
  };

  const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
    switch (entry.type) {
      case "Hospital":
        return <HospitalEntryDetail entry={entry} />;
      case "HealthCheck":
        return <HealthCheckEntryDetail entry={entry} />;
      case "OccupationalHealthcare":
        return <OccupationalHealthcareEntryDetail entry={entry} />;
      default:
        return assertNever(entry);
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
      <Box
        sx={{
          width: "100%",
          display: "grid",
          gap: 2,
        }}
      >
        {entries.map((entry) => {
          return <EntryDetails entry={entry} key={entry.id} />;
        })}
      </Box>
    </div>
  );
};

export default Entries;
