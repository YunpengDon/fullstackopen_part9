import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import React, { createContext, useState } from "react";

import { Gender, Patient } from "../../types";
import Notification, { NotificationSchema } from "../Notification";
import Entries from "./Entries";
import NewHealthcareEntry from "./NewHelthcareEntry";
import { Button } from "@mui/material";

type PatientDetailContextType = [
  Patient,
  React.Dispatch<React.SetStateAction<Patient>>,
  boolean,
  React.Dispatch<React.SetStateAction<boolean>>,
  NotificationSchema | null,
  React.Dispatch<React.SetStateAction<NotificationSchema | null>>
];
export const PatientDetailContext = createContext<PatientDetailContextType>([
  {
    id: "",
    name: "",
    dateOfBirth: "",
    ssn: "",
    gender: Gender.Male,
    occupation: "",
    entries: [],
  },
  () => {},
  false,
  () => {},
  null,
  () => null,
]);

const PatientDetail = ({ patient }: { patient: Patient | null }) => {
  if (patient) {
    const [patientDetail, setPatient] = useState(patient);
    const [newEntryVisibility, setNewEntryVisibility] =
      useState<boolean>(false);
    const [notification, setNotification] = useState<NotificationSchema | null>(
      null
    );

    const context: PatientDetailContextType = [
      patientDetail,
      setPatient,
      newEntryVisibility,
      setNewEntryVisibility,
      notification,
      setNotification,
    ];
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

    return (
      <Box>
        <PatientDetailContext.Provider value={context}>
          <Typography variant="h4" style={{ marginTop: "0.5em" }}>
            {patientDetail.name} {getGenderIcon(patientDetail.gender)}
          </Typography>
          {patientDetail.ssn ? (
            <Typography variant="body1">ssn: {patientDetail.ssn}</Typography>
          ) : null}
          <Typography variant="body1">
            occupation: {patientDetail.occupation}
          </Typography>
          <Notification notification={notification} />
          <Box marginTop="0.5em">
            {newEntryVisibility ? (
              <NewHealthcareEntry />
            ) : (
              <Button
                variant="outlined"
                onClick={() => setNewEntryVisibility(true)}
              >
                New Entry
              </Button>
            )}
          </Box>
          <Entries entries={patientDetail.entries} />
        </PatientDetailContext.Provider>
      </Box>
    );
  } else {
    // return <div>Error: Patient cannot be found.</div>;
    return null;
  }
};

export default PatientDetail;
