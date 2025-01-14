import axios from "axios";

const BASE_URL = import.meta.env.VITE_APP_API_URL;
const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

export const fetchFiles = async () => {
  try {
    const response = await axiosInstance.get("/");
    return response.data;
  } catch (error) {
    console.error("Error fetching files:", error);
    throw error;
  }
};

export const uploadFile = async (file, onProgress) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await axiosInstance.post("/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: (progressEvent) => {
        console.log(progressEvent.loaded, progressEvent.total);
        if (onProgress) {
          const percentageCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          onProgress(percentageCompleted);
        }
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
};

export const deleteFile = async (id) => {
  try {
    const response = await axiosInstance.delete(`/delete/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting file:", error);
    throw error;
  }
};

export const shareableUrl = (token) => `${BASE_URL}/share/${token}`;
