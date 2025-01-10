import { useState, useEffect } from "react";
import axios from "axios";
import { Route, Link, Routes, useMatch, PathMatch } from "react-router-dom";
import { Button, Divider, Container, Typography } from "@mui/material";

import { apiBaseUrl } from "./constants";
import { Patient } from "./types";

import patientService from "./services/patients";
import PatientListPage from "./components/PatientListPage";
import PatientDetail from "./components/PatientDetail";

const App = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [patient, setPatient] = useState<Patient | null>(null);
  const match = useMatch("/patients/:id");

  const fetchPatientDetail = async (match: PathMatch<"id"> | null) => {
    if (match && match.params.id) {
      const result = await patientService.getPatient(match.params.id);
      result ? setPatient(result) : null;
    } else {
      setPatient(null);
    }
  };

  useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      const patients = await patientService.getAll();
      setPatients(patients);
    };
    void fetchPatientList();
    fetchPatientDetail(match);
  }, [match]);

  return (
    <div className="App">
      <Container>
        <Typography variant="h3" style={{ marginBottom: "0.5em" }}>
          Patientor
        </Typography>
        <Button component={Link} to="/" variant="contained" color="primary">
          Home
        </Button>
        <Divider hidden />
        <Routes>
          <Route
            path="/"
            element={
              <PatientListPage patients={patients} setPatients={setPatients} />
            }
          />
          <Route
            path="patients/:id"
            element={<PatientDetail patient={patient} />}
          />
        </Routes>
      </Container>
    </div>
  );
};

export default App;
