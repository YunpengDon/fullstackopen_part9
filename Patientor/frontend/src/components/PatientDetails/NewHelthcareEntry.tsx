import { SyntheticEvent, useContext, useState } from "react";
import { Box, TextField, Typography, Stack, Button } from "@mui/material";
import { HealthCheckRating, NewEntry } from "../../types";
import patientService from "../../services/patients";
import { PatientDetailContext } from "./PatientDetail";
import { AxiosError } from "axios";

const NewHealthcareEntry = () => {
  const [
    patientDetail,
    setPatient,
    newEntryVisibility,
    setNewEntryVisibility,
    notification,
    setNotification,
  ] = useContext(PatientDetailContext);
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [specialist, setSpecialist] = useState<string>("");
  const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating>(
    HealthCheckRating.Healthy
  );
  const [diagnoseCodes, setDiagnosisCodes] = useState<string>("");

  const addNewEntryHandler = async (event: SyntheticEvent) => {
    event.preventDefault();
    const newEntry: NewEntry = {
      description,
      date,
      specialist,
      healthCheckRating,
      type: "HealthCheck",
    };
    console.log(`add new entry: ${JSON.stringify(newEntry)}`);
    try {
      const newPatient = await patientService.addHealthEntry(
        patientDetail.id,
        newEntry
      );
      setDescription("");
      setDate("");
      setSpecialist("");
      setHealthCheckRating(HealthCheckRating.Healthy);
      setDiagnosisCodes("");
      setPatient(newPatient);
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        console.log(error);
        setNotification({
          type: "error",
          message: error.response?.data.error[0].message,
        });
      } else {
        setNotification({
          type: "error",
          message: "An unexpected error occurred",
        });
      }
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    }
  };

  return (
    <form onSubmit={addNewEntryHandler}>
      <Box component="section" sx={{ p: 2, border: "1px dashed grey" }}>
        <Typography
          variant="h5"
          style={{ marginTop: "0.5em", marginBottom: "0.5em" }}
        >
          New Healthcare entry
        </Typography>
        <TextField
          required
          fullWidth
          margin="dense"
          id="description-input"
          label="Description"
          value={description}
          onChange={(event) => {
            setDescription(event.target.value);
          }}
        ></TextField>
        <TextField
          required
          fullWidth
          margin="dense"
          id="date-input"
          label="Date"
          value={date}
          onChange={(event) => {
            setDate(event.target.value);
          }}
        ></TextField>
        <TextField
          required
          fullWidth
          margin="dense"
          id="specialist-input"
          label="Specialist"
          value={specialist}
          onChange={(event) => {
            setSpecialist(event.target.value);
          }}
        ></TextField>
        <TextField
          required
          fullWidth
          margin="dense"
          id="healthcheck-rating-input"
          label="Healthcheck rating"
          value={healthCheckRating.toString()}
          onChange={(event) => {
            setHealthCheckRating(Number(event.target.value));
          }}
        ></TextField>
        <TextField
          fullWidth
          margin="dense"
          id="diagnosis-code-input"
          label="Diagnosis codes"
          value={diagnoseCodes}
          onChange={(event) => {
            setDiagnosisCodes(event.target.value);
          }}
        ></TextField>
        <Stack direction="row" justifyContent="space-between">
          <Button variant="outlined" color="error">
            CANCEL
          </Button>
          <Button variant="outlined" type="submit">
            ADD
          </Button>
        </Stack>
      </Box>
    </form>
  );
};

export default NewHealthcareEntry;
