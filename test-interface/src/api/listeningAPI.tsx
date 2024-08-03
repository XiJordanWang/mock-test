import { ListeningQuestion, ListeningTest } from "@/app/test/interface";
import axios from "./axiosConfig";

export const start = async () => {
  const response = await axios.put<ListeningTest>("/listening");
  return response.data;
};

export const getQuestion = async (id: number) => {
  const response = await axios.get<ListeningQuestion>(
    `/listening/question/${id}`
  );
  return response.data;
};

export const selectQuestion = async (
  questionId: number,
  selectionId: number
) => {
  await axios.patch(`/listening/select/${questionId}/${selectionId}`);
};

export const selectMutipleQuestion = async (
  questionId: number,
  selections: number[]
) => {
  await axios.patch(`/listening/select/${questionId}`, selections);
};

export const next = async () => {
  const response = await axios.put<ListeningTest>(`/listening/next`);
  return response.data;
};

export const changeSection = async () => {
  const response = await axios.patch<ListeningTest>(`/listening/next/section`);
  return response.data;
};

export const submit = async () => {
  await axios.patch(`/listening/submit`);
};
