import { SyntheticEvent, useContext, useState } from "react";
import {
  Box,
  TextField,
  Typography,
  Stack,
  Button,
  RadioGroup,
  Radio,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  Chip,
  SelectChangeEvent,
} from "@mui/material";
import { Theme, useTheme } from "@mui/material/styles";
import { AxiosError } from "axios";

import {
  assertNever,
  EntryType,
  HealthCheckRating,
  NewEntry,
} from "../../types";
import patientService from "../../services/patients";
import { PatientDetailContext } from "./PatientDetail";
import diagnosisData from "../../../data/diagnoses";

// Styles for multi-select
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      // width: 250,
    },
  },
};
function getStyles(name: string, personName: readonly string[], theme: Theme) {
  return {
    fontWeight: personName.includes(name)
      ? theme.typography.fontWeightMedium
      : theme.typography.fontWeightRegular,
  };
}

// Main Component
const NewHealthcareEntry = () => {
  const theme = useTheme();
  const [
    patientDetail,
    setPatient,
    newEntryVisibility,
    setNewEntryVisibility,
    _,
    setNotification,
  ] = useContext(PatientDetailContext);

  if (!newEntryVisibility) {
    return null;
  }
  const [entryType, setEntryType] = useState<EntryType>("HealthCheck");
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [specialist, setSpecialist] = useState<string>("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);

  const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating>(
    HealthCheckRating.Healthy
  );
  const [dischargeCriteria, setDischargeCriteria] = useState<string>("");
  const [dischargeDate, setDischargeDate] = useState<string>("");

  const [employerName, setEmployerName] = useState<string>("");
  const [sickleaveStartDate, setSickleaveStartDate] = useState<string>("");
  const [sickleaveEndDate, setSickleaveEndDate] = useState<string>("");

  const handleDiagnosesCodesChange = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = event;

    // assure value is an array
    const selectedValues = typeof value === "string" ? value.split(",") : value;
    setDiagnosisCodes(selectedValues);
  };

  const addNewEntryHandler = async (event: SyntheticEvent) => {
    event.preventDefault();
    let newEntry: NewEntry;
    switch (entryType) {
      case "HealthCheck":
        newEntry = {
          description,
          date,
          specialist,
          healthCheckRating,
          type: "HealthCheck",
        };
        break;
      case "Hospital":
        newEntry = {
          description,
          date,
          specialist,
          type: "Hospital",
          discharge: {
            date: dischargeDate,
            criteria: dischargeCriteria,
          },
        };
        break;
      case "OccupationalHealthcare":
        newEntry = {
          description,
          date,
          specialist,
          type: "OccupationalHealthcare",
          employerName: employerName,
        };
        if (sickleaveStartDate || sickleaveEndDate) {
          newEntry = {
            ...newEntry,
            sickLeave: {
              startDate: sickleaveStartDate,
              endDate: sickleaveEndDate,
            },
          };
        }
        break;
      default:
        return assertNever(entryType);
    }
    if (diagnosisCodes.length > 0) {
      newEntry = {
        ...newEntry,
        diagnosisCodes,
      };
    }

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
      setDiagnosisCodes([]);
      setDischargeCriteria("");
      setDischargeDate("");
      setEmployerName("");
      setSickleaveStartDate("");
      setSickleaveEndDate("");
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

        <FormControl>
          <FormLabel id="entry-type">Entry type</FormLabel>
          <RadioGroup
            row
            aria-labelledby="entry-type"
            defaultValue="HealthCheck"
            name="entry-type-group"
            onChange={(event) => {
              setEntryType(event.target.value as EntryType);
            }}
          >
            <FormControlLabel
              value="HealthCheck"
              control={<Radio />}
              label="Health Check"
            />
            <FormControlLabel
              value="Hospital"
              control={<Radio />}
              label="Hospital"
            />
            <FormControlLabel
              value="OccupationalHealthcare"
              control={<Radio />}
              label="Occupational Healthcare"
            />
          </RadioGroup>
        </FormControl>

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
          type="date"
          value={date}
          onChange={(event) => {
            setDate(event.target.value);
          }}
          InputLabelProps={{
            shrink: true,
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

        {/* DiagnosisCodes */}
        <FormControl fullWidth margin="dense">
          <InputLabel id="diagnosis-codes-label">Diagnosis codes</InputLabel>
          <Select
            labelId="diagnosis-codes-label"
            id="diagnosis-codes"
            multiple
            value={diagnosisCodes}
            onChange={handleDiagnosesCodesChange}
            input={
              <OutlinedInput id="diagnosis-codes" label="Diagnosis codes" />
            }
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
            MenuProps={MenuProps}
          >
            {diagnosisData.map((item) => (
              <MenuItem
                key={item.code}
                value={item.code}
                style={getStyles(item.code, diagnosisCodes, theme)}
              >
                {item.code} {item.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {entryType === "HealthCheck" ? (
          <>
            <FormControl fullWidth margin="dense">
              <InputLabel id="demo-simple-select-label">
                Healthcheck rating
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={healthCheckRating}
                label="Healthcheck rating"
                onChange={(event) => {
                  setHealthCheckRating(Number(event.target.value));
                }}
              >
                {Object.entries(HealthCheckRating)
                  .filter(([key]) => isNaN(Number(key)))
                  .map(([key, value]) => (
                    <MenuItem key={key} value={value}>
                      {key}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </>
        ) : null}
        {entryType === "Hospital" ? (
          <>
            <TextField
              required
              fullWidth
              margin="dense"
              id="discharge-criteria-input"
              label="Discharge criteria"
              value={dischargeCriteria}
              onChange={(event) => {
                setDischargeCriteria(event.target.value);
              }}
            ></TextField>
            <TextField
              required
              fullWidth
              type="date"
              margin="dense"
              id="discharge-date-input"
              label="Discharge date"
              value={dischargeDate}
              onChange={(event) => {
                setDischargeDate(event.target.value);
              }}
              InputLabelProps={{
                shrink: true,
              }}
            ></TextField>
          </>
        ) : null}
        {entryType === "OccupationalHealthcare" ? (
          <>
            <TextField
              required
              fullWidth
              margin="dense"
              id="employer-name-input"
              label="Employer name"
              value={employerName}
              onChange={(event) => {
                setEmployerName(event.target.value);
              }}
            ></TextField>
            <TextField
              fullWidth
              type="date"
              margin="dense"
              id="sickleave-start-date-input"
              label="Sickleave start date"
              value={sickleaveStartDate}
              onChange={(event) => {
                setSickleaveStartDate(event.target.value);
              }}
              InputLabelProps={{
                shrink: true,
              }}
            ></TextField>
            <TextField
              fullWidth
              type="date"
              margin="dense"
              id="sickleave-end-date-input"
              label="Sickleave end date"
              value={sickleaveEndDate}
              onChange={(event) => {
                setSickleaveEndDate(event.target.value);
              }}
              InputLabelProps={{
                shrink: true,
              }}
            ></TextField>
          </>
        ) : null}
        <Stack direction="row" justifyContent="space-between">
          <Button
            variant="outlined"
            color="error"
            onClick={() => setNewEntryVisibility(false)}
          >
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
