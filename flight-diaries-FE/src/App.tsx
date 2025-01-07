import { useEffect, useState } from "react";
import "./App.css";
import { getDiaries } from "../services/diaryService";
import { DiaryEntry } from "../types";


function App() {
  const [diries, setDiaries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    getDiaries().then(data => {
      console.log(data);
      setDiaries(data);
    });
  }, []);
  return (
    <div>
      <h2>Add new entry</h2>
      <form>
        <div>date <input type="text" /></div>
        <div>visibility <input type="text" /></div>
        <div>weather <input type="text" /></div>
        <div>comment <input type="text" /></div>
        <button type="submit">add</button>
      </form>
      <h2>Diary entries</h2>
      {diries.map(diary => (
        <div key={diary.id}>
        <h3>{diary.date}</h3>
        <p>
          visibility: {diary.visibility}
          <br />
          weather: {diary.weather}
          {diary.comment ? <><br />comment: {diary.comment}</>: null}
        </p>
        </div>
      ))}
    </div>
  );
}

export default App;
