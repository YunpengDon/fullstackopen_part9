import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";

import { Patient } from "../types";

const PatientDetail = ({ patient }: { patient: Patient | null }) => {
  const getGenderIcon = (gender: string) => {
    switch (gender.toLowerCase()) {
      case "male":
        return <MaleIcon />;
      case "female":
        return <FemaleIcon />;
      default:
        return gender;
    }
  };

  if (patient) {
    return (
      <Box>
        <Typography variant="h4" style={{ marginTop: "0.5em" }}>
          {patient.name} {getGenderIcon(patient.gender)}
        </Typography>
        {patient.ssn ? (
          <Typography variant="body1">ssn: {patient.ssn}</Typography>
        ) : null}
        <Typography variant="body1">
          occupation: {patient.occupation}
        </Typography>
      </Box>
    );
  } else {
    // return <div>Error: Patient cannot be found.</div>;
    return null;
  }
};

export default PatientDetail;
