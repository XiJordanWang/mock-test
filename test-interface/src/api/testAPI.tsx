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
