import React from "react";
import { Box, Divider } from "@chakra-ui/react";
import useFileHandling from "./hooks/useFileHandling";
import useClipboard from "./hooks/useClipboard";
import FileUploadForm from "./components/FileUploadForm";
import UploadedFilesList from "./components/UploadedFilesList";
import LoadingModal from "./components/LoadingModal";

function App() {
  const {
    files,
    file,
    uploading,
    deleting,
    fileInputRef,
    handleFileChange,
    handleUpload,
    handleDelete,
    shareableUrl,
    progress,
  } = useFileHandling();
  const { copyButtonText, copyToClipboard } = useClipboard();

  return (
    <Box padding={4}>
      <FileUploadForm
        file={file}
        handleFileChange={handleFileChange}
        handleUpload={handleUpload}
        fileInputRef={fileInputRef}
      />
      <Divider border="2px solid blue" marginY={"4"} />
      <UploadedFilesList
        files={files}
        shareableUrl={shareableUrl}
        copyButtonText={copyButtonText}
        copyToClipboard={copyToClipboard}
        handleDelete={handleDelete}
      />
      <LoadingModal
        isOpen={uploading}
        message="File is being uploaded...
        Go to page No.1 to access the recently added files."
        progress={progress}
      />
      <LoadingModal isOpen={deleting} message="File is being deleted..." />
    </Box>
  );
}

export default App;
