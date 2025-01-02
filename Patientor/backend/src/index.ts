import express from 'express';
import cors from 'cors';
import diagnosesRouter from './routes/diagnoses';
const app = express();
app.use(express.json());
 
app.use(cors());
const PORT = 3001;

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

// Create a type Diagnosis and use it to create endpoint /api/diagnoses for fetching all diagnoses with HTTP GET.
app.use('/api/diagnoses', diagnosesRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});