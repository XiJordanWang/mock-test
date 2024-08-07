import { SpeakingDetials, SpeakingTest } from "@/app/test/interface";
import axios from "./axiosConfig";

export const start = async () => {
  const response = await axios.patch<SpeakingTest>("/speaking/start");
  return response.data;
};

export const getQuestion = async (id: number) => {
  const response = await axios.get<SpeakingDetials>(`/speaking/${id}`);
  return response.data;
};

export const uploadAudio = async (audioBlob: Blob, id: number) => {
  const formData = new FormData();
  formData.append("file", audioBlob, "recording.mp3");

  try {
    const response = await axios.post(`/files/upload/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log("Upload successful:", response.data);
  } catch (error) {
    console.error("Failed to upload audio:", error);
  }
};

export const submit = async () => {
  await axios.patch("/speaking/submit");
};
