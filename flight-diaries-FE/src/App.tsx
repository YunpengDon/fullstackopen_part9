import React, { useEffect, useState } from "react";
import "./App.css";
import { getDiaries, addDiary } from "../services/diaryService";
import { Visibility, Weather, DiaryEntry } from "../types";

function App() {
  const [date, setDate] = useState('')
  const [visibility, setVisibility] = useState('')
  const [weather, setWeather] = useState('')
  const [comment, setComment] = useState('')
  const [diries, setDiaries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    getDiaries().then((data) => {
      console.log(data);
      setDiaries(data);
    });
  }, []);

  const submitDiaryHandler = (event: React.SyntheticEvent) => {
    event.preventDefault()
    const newDiary = {
      date,
      visibility,
      weather,
      comment
    } 
    console.log(newDiary);
    addDiary(newDiary)
  }

  return (
    <div>
      <h2>Add new entry</h2>
      <form onSubmit={submitDiaryHandler}>
        <div>
          date <input type="text" onChange={event => setDate(event.target.value)}/>
        </div>
        <div>
          visibility <input type="text" onChange={event => setVisibility(event.target.value)}/>
        </div>
        <div>
          weather <input type="text" onChange={event => setWeather(event.target.value)}/>
        </div>
        <div>
          comment <input type="text" onChange={event => setComment(event.target.value)}/>
        </div>
        <button type="submit">add</button>
      </form>
      <h2>Diary entries</h2>
      {diries.map((diary) => (
        <div key={diary.id}>
          <h3>{diary.date}</h3>
          <p>
            visibility: {diary.visibility}
            <br />
            weather: {diary.weather}
            {diary.comment ? (
              <>
                <br />
                comment: {diary.comment}
              </>
            ) : null}
          </p>
        </div>
      ))}
    </div>
  );
}

export default App;
