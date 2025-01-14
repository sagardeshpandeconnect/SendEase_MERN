import React, { useState } from "react";
import { Box, Button, Text } from "@chakra-ui/react";
import { DeleteIcon, DownloadIcon, CopyIcon } from "@chakra-ui/icons";
import convertToIST from "../utils/convertToIST";
import formatFileSize from "../utils/formatFileSize";

const FileItem = ({
  file,
  shareableUrl,
  copyToClipboard,
  handleDelete,
  fileNo,
}) => {
  const [copyButtonText, setCopyButtonText] = useState(
    <Button
      leftIcon={<CopyIcon />}
      colorScheme="blue"
      variant="solid"
      size="sm"
    >
      Copy Link
    </Button>
  );

  const handleCopyClick = () => {
    copyToClipboard(shareableUrl(file.token));
    setCopyButtonText(
      <Button colorScheme="blue" variant="solid" size="sm">
        Copied
      </Button>
    );
    setTimeout(() => {
      setCopyButtonText(
        <Button
          leftIcon={<CopyIcon />}
          colorScheme="blue"
          variant="solid"
          size="sm"
        >
          Copy Link
        </Button>
      );
    }, 2000);
  };

  return (
    <Box
      mt={2}
      borderWidth="1px"
      borderRadius="lg"
      p={2}
      borderColor={"GrayText"}
      display="grid"
      gridTemplateColumns={{ base: "1fr", lg: "1fr 4fr 3fr" }} // Stack on mobile, 1:3:3 on larger screens
      gap={4}
      alignItems="center"
    >
      <Text>
        <Text as="span" fontWeight="semibold">
          File Number
        </Text>
        {` : ${fileNo}`}
      </Text>

      <Box>
        <Text>
          <Text as="span" fontWeight="semibold">
            File Name
          </Text>
          {` : ${file.filename}`}
        </Text>
        <Box display="flex" gap={3}>
          <Text>
            <Text as="span" fontWeight="semibold">
              Uploaded on
            </Text>
            {` : ${convertToIST(file.createdAt)}`}
          </Text>
          <Text>
            <Text as="span" fontWeight="semibold">
              File Size
            </Text>
            {` : ${formatFileSize(file.size)}`}
          </Text>
        </Box>

        <Text>
          <Text as="span" fontWeight="semibold">
            Shareable Link
          </Text>
          <a
            href={shareableUrl(file.token)}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Text as={"span"} wordBreak="break-all" overflowWrap="break-word">
              {` : ${shareableUrl(file.token)} `}
            </Text>
          </a>
        </Text>
      </Box>

      <Box
        display="flex"
        gap={2}
        alignItems="center"
        justifyContent={"space-evenly"}
      >
        <Button colorScheme="teal" leftIcon={<DownloadIcon />} size="sm">
          <a
            href={`http://localhost:3001/download/${file._id}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Download
          </a>
        </Button>
        <Box onClick={handleCopyClick}>{copyButtonText}</Box>
        <Button
          colorScheme="red"
          onClick={() => handleDelete(file._id)}
          leftIcon={<DeleteIcon />}
          size="sm"
        >
          Delete File
        </Button>
      </Box>
    </Box>
  );
};

export default FileItem;
