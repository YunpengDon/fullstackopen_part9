import React, { useEffect, useState } from "react";
import "./App.css";
import { getDiaries, addDiary } from "../services/diaryService";
import {
  Visibility,
  Weather,
  DiaryEntry,
  NewDiaryEntry,
  ValidationError,
} from "../types";
import DiaryEntries from "./components/DiaryEntries";
import axios from "axios";
import Notification from "./components/Notification";

function App() {
  const visibilityOptions = Object.values(Visibility);
  const weatherOptions = Object.values(Weather);
  const [date, setDate] = useState<string>("");
  const [visibility, setVisibility] = useState<Visibility>(
    visibilityOptions[0],
  );
  const [weather, setWeather] = useState<Weather>(weatherOptions[0]);
  const [comment, setComment] = useState("");
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [notification, setNotification] = useState("");

  useEffect(() => {
    getDiaries().then((data) => {
      setDiaries(data);
    });
  }, []);

  const submitDiaryHandler = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const newDiary = {
      date,
      visibility,
      weather,
      comment,
    };
    addDiary(newDiary)
      .then((data) => {
        setDiaries(diaries.concat(data));
        setDate("");
        setVisibility(visibilityOptions[0]);
        setWeather(weatherOptions[0]);
        setComment("");
      })
      .catch((error) => {
        if (axios.isAxiosError(error)) {
          const errorMessage = error.response?.data?.error.map(
            (e: ValidationError) => {
              const field = e.path[0] as keyof NewDiaryEntry;
              return `Incorrect ${field}: ${newDiary[field]}`;
            },
          );
          setNotification("Error: " + errorMessage.join(", "));
          setTimeout(() => {
            setNotification("");
          }, 5000);
        }
      });
  };

  return (
    <div>
      <h2>Add new entry</h2>
      <Notification notification={notification} />
      <form onSubmit={submitDiaryHandler}>
        <div>
          date{" "}
          <input
            type="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
          />
        </div>
        <fieldset>
          <legend>visibility</legend>
          {visibilityOptions.map((option) => {
            return (
              <label key={option}>
                {option}
                <input
                  type="radio"
                  value={option}
                  onChange={() => setVisibility(option)}
                />
              </label>
            );
          })}
        </fieldset>
        <fieldset>
          <legend>weather</legend>
          {weatherOptions.map((option) => {
            return (
              <label key={option}>
                {option}
                <input
                  type="radio"
                  value={option}
                  onChange={() => setWeather(option)}
                />
              </label>
            );
          })}
        </fieldset>
        <div>
          comment{" "}
          <input
            type="text"
            value={comment}
            onChange={(event) => setComment(event.target.value)}
          />
        </div>
        <button type="submit">add</button>
      </form>
      <h2>Diary entries</h2>
      <DiaryEntries diaries={diaries} />
    </div>
  );
}

export default App;
