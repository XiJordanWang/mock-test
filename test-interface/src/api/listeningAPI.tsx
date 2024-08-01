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

export const next = async () => {
  const response = await axios.put<ListeningTest>(`/listening/next`);
  return response.data;
};
