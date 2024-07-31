import { ApiResponse, ReadingTest } from "@/app/test/interface";
import axios from "./axiosConfig";

export const start = async () => {
  const response = await axios.post<ReadingTest>("/reading/start");
  return response.data;
};

export const select = async (index: number, option: number) => {
  await axios.patch(`/reading/select/${index}/${option}`);
};

export const multipleSelect = async (index: number, options: number[]) => {
  await axios.patch(`/reading/select/${index}`, options);
};

export const nextQuestion = async (index: number) => {
  const response = await axios.put<ReadingTest>(`/reading/next/${index}`);
  return response.data;
};

export const backQuestion = async (index: number) => {
  const response = await axios.put<ReadingTest>(`/reading/back/${index}`);
  return response.data;
};

export const backToQuestion = async (index: number) => {
  const response = await axios.get<ReadingTest>(`/reading/question/${index}`);
  return response.data;
};

export const fetchReadingData = async (index: number) => {
  const response = await axios.get<ApiResponse>(`/reading/${index}`);
  return response.data;
};

export const submit = async () => {
  await axios.patch(`/reading`);
};
