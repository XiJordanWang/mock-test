import { TestResult } from "@/app/test/interface";
import axios from "./axiosConfig";

export const getLast = async () => {
  const response = await axios.get<TestResult>("/test/last");
  return response.data;
};

export const getAverage = async () => {
  const response = await axios.get<TestResult>("/test/average");
  return response.data;
};

export const getTasks = async () => {
  try {
    const response = await axios.get("/tasks");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch tasks:", error);
    return [];
  }
};

export const taskComplete = async (id: number, completed: boolean) => {
  await axios.post(`/tasks/${id}/complete`, {
    completed: completed,
  });
};
