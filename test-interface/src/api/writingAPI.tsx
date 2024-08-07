import { Writing, WritingTest } from "@/app/test/interface";
import axios from "./axiosConfig";

export const start = async () => {
  const response = await axios.put<WritingTest>("/writing/start");
  return response.data;
};

export const finish = async () => {
  await axios.delete("/writing");
};

export const getQuestion = async (id: number) => {
  const response = await axios.get<Writing>(`/writing/${id}`);
  return response.data;
};

export const updateMyWriting = async (id: number, answer: string) => {
  await axios.patch(`/writing/${id}`, answer);
};
