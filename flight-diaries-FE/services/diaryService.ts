import axios from 'axios'
import { DiaryEntry, NewDiaryEntry } from "../types";

const baseUrl = 'http://localhost:3000/api/diaries'

export const getDiaries = async () => {
  const response = await axios.get<DiaryEntry[]>(baseUrl)
  return response.data
}

export const addDiary = async (newDiary) => {
  const response = await axios.post(baseUrl, newDiary)
  return response.data
}