import React, { useState, useEffect, useMemo } from "react";
import { Grid, GridItem, Button, Flex, Text, Skeleton } from "@chakra-ui/react";
import FileItem from "./FileItem";

const UploadedFilesList = ({
  files,
  shareableUrl,
  copyToClipboard,
  handleDelete,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const filesPerPage = 10;

  // Calculate total pages
  const totalPages = useMemo(
    () => Math.ceil(files.length / filesPerPage),
    [files.length]
  );

  // Calculate current files for the current page
  const currentFiles = useMemo(() => {
    const start = (currentPage - 1) * filesPerPage;
    return files.slice(start, start + filesPerPage);
  }, [files, currentPage]);

  // Skeleton count to match the number of current files or filesPerPage
  const skeletonCount = useMemo(
    () =>
      Math.min(files.length - (currentPage - 1) * filesPerPage, filesPerPage),
    [files.length, currentPage]
  );

  // Simulate loading effect
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, [files]);

  // Handle page change and reset loading
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    setLoading(true);
  };

  // Generate page numbers dynamically
  const renderPageNumbers = useMemo(() => {
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
    return pageNumbers.slice(
      Math.max(0, currentPage - 2),
      Math.min(currentPage + 1, totalPages)
    );
  }, [currentPage, totalPages]);

  // Render skeletons or file items
  const renderFiles = () => {
    if (loading) {
      return Array(skeletonCount || filesPerPage)
        .fill("")
        .map((_, index) => (
          <GridItem key={`skeleton-${index}`}>
            <Skeleton
              height={{ base: "10rem", md: "6rem" }}
              borderRadius="8px"
              marginTop="2"
            />
          </GridItem>
        ));
    }
    return currentFiles.map((file, index) => (
      <GridItem key={file._id}>
        <FileItem
          file={file}
          shareableUrl={shareableUrl}
          copyToClipboard={copyToClipboard}
          handleDelete={handleDelete}
          fileNo={index + 1}
        />
      </GridItem>
    ));
  };

  return (
    <>
      <Text fontWeight="semibold">Uploaded Files</Text>
      <Grid gap="1">{renderFiles()}</Grid>
      <Flex justifyContent="center" mt={4}>
        {currentPage > 1 && (
          <Button
            onClick={() => handlePageChange(currentPage - 1)}
            mr={2}
            _hover={{ bg: "teal.600" }}
            transition="background 0.3s ease"
          >
            Prev
          </Button>
        )}
        {renderPageNumbers.map((number) => (
          <Button
            key={`page-${number}`}
            onClick={() => handlePageChange(number)}
            colorScheme={number === currentPage ? "teal" : "gray"}
            mx={1}
            _hover={{ bg: "teal.600" }}
            transition="background 0.3s ease"
          >
            {number}
          </Button>
        ))}
        {currentPage < totalPages && (
          <Button
            onClick={() => handlePageChange(currentPage + 1)}
            ml={2}
            _hover={{ bg: "teal.600" }}
            transition="background 0.3s ease"
          >
            Next
          </Button>
        )}
      </Flex>
    </>
  );
};

export default UploadedFilesList;
