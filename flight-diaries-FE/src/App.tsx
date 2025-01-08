import React, { useEffect, useState } from "react";
import "./App.css";
import { getDiaries, addDiary } from "../services/diaryService";
import { Visibility, Weather, DiaryEntry, NewDiaryEntry, ValidationError} from "../types";
import DiaryEntries from "./components/DiaryEntries";
import axios from "axios";
import Notification from "./components/Notification";

function App() {
  const [date, setDate] = useState('')
  const [visibility, setVisibility] = useState('')
  const [weather, setWeather] = useState('')
  const [comment, setComment] = useState('')
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [notification, setNotification] = useState('')

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
    addDiary(newDiary).then((data) => {
      setDiaries(diaries.concat(data))
      setDate('')
      setVisibility('')
      setWeather('')
      setComment('')
    }
    ).catch(error => 
      {if (axios.isAxiosError(error)) {
        console.log(error);
        const errorMessage = error.response?.data?.error.map((e: ValidationError) => {
          const field = e.path[0] as keyof NewDiaryEntry
          return `Incorrect ${field}: ${newDiary[field]}`;
        })
        console.log(errorMessage.join(", "));
        setNotification('Error: ' + errorMessage.join(", "))
        setTimeout(() => {
          setNotification('')
        }, 5000);
      }
    }
    )
  }

  return (
    <div>
      <h2>Add new entry</h2>
      <Notification notification={notification}/>
      <form onSubmit={submitDiaryHandler}>
        <div>
          date <input type="text" value={date} onChange={event => setDate(event.target.value)}/>
        </div>
        <div>
          visibility <input type="text" value={visibility} onChange={event => setVisibility(event.target.value)}/>
        </div>
        <div>
          weather <input type="text" value={weather} onChange={event => setWeather(event.target.value)}/>
        </div>
        <div>
          comment <input type="text" value={comment} onChange={event => setComment(event.target.value)}/>
        </div>
        <button type="submit">add</button>
      </form>
      <h2>Diary entries</h2>
      <DiaryEntries diaries={diaries}/>
    </div>
  );
}

export default App;
