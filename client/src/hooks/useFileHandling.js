import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import {
  fetchFiles,
  uploadFile,
  deleteFile,
  shareableUrl,
} from "../services/apiClient";
import formatFileSize from "../utils/formatFileSize";

const useFileHandling = () => {
  const [files, setFiles] = useState([]);
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const fileInputRef = useRef(null);

  // Fetch files from API and sort them
  const fetchFilesFromAPI = useCallback(async () => {
    try {
      const fetchedFiles = await fetchFiles();
      const sortedFiles = fetchedFiles.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setFiles(sortedFiles);
    } catch (error) {
      console.error("Error fetching files:", error);
    }
  }, []);

  useEffect(() => {
    fetchFilesFromAPI();
  }, [fetchFilesFromAPI]);

  // Memoize sorted files array
  const sortedFiles = useMemo(() => {
    return files.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }, [files]);

  // Handle file change
  const handleFileChange = useCallback((e) => {
    setFile(e.target.files[0]);
  }, []);

  // Handle file upload with progress tracking
  const handleUpload = useCallback(
    async (e) => {
      e.preventDefault();
      if (!file) {
        alert("Please select a file first!");
        return;
      }

      const allowedTypes = [
        "image/jpeg",
        "image/png",
        "application/pdf",
        "application/msword",
        "application/vnd.ms-excel",
        "application/zip",
        "application/dwg",
        "application/dxf",
        "video/mp4",
        "video/x-msvideo",
        "video/quicktime",
        "video/x-ms-wmv",
        "text/plain",
      ];
      if (!allowedTypes.includes(file.type)) {
        alert("File type not allowed.");
        return;
      }

      setProgress(0);
      try {
        setUploading(true);
        const onProgress = (percentage) => {
          setProgress(percentage);
        };
        await uploadFile(file, onProgress);
        setUploading(false);
        setFile(null);
        fetchFilesFromAPI();

        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      } catch (error) {
        setUploading(false);
        console.error("Error uploading file:", error);
        alert("Error uploading file");
      }
    },
    [file, fetchFilesFromAPI]
  );

  // Handle file delete
  const handleDelete = useCallback(
    async (id) => {
      setFiles((files) => files.filter((file) => file._id !== id));

      try {
        setDeleting(true);
        await deleteFile(id);
        setDeleting(false);
        fetchFilesFromAPI();
      } catch (error) {
        setDeleting(false);
        console.error("Error deleting file:", error);
        alert("Error deleting file");
      }
    },
    [fetchFilesFromAPI]
  );

  // Format file size memoized
  const formatFileSizeMemoized = useCallback((fileSizeInBytes) => {
    return formatFileSize(fileSizeInBytes);
  }, []);

  return {
    files: sortedFiles,
    file,
    uploading,
    progress, // Added progress for tracking
    deleting,
    fileInputRef,
    handleFileChange,
    handleUpload,
    handleDelete,
    shareableUrl,
    formatFileSize: formatFileSizeMemoized,
  };
};

export default useFileHandling;
