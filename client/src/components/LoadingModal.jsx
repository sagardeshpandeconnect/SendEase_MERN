import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Progress,
  Text,
} from "@chakra-ui/react";

const ProgressSection = ({ progress }) => (
  <>
    <Text marginY="2" fontWeight="bold">
      Status: {progress}%
    </Text>
    <Progress
      value={progress}
      size="md"
      colorScheme="blue"
      borderRadius="md"
      marginBottom="2"
    />
  </>
);

const LoadingModal = ({ isOpen, message, progress }) => (
  <Modal isOpen={isOpen} size={{ base: "xs", md: "md" }} isCentered>
    <ModalOverlay />
    <ModalContent>
      <ModalBody>
        <Text fontWeight="bold" fontSize="large" marginY="2">
          Please wait...
        </Text>
        {message}
        {typeof progress === "number" && (
          <ProgressSection progress={progress} />
        )}
      </ModalBody>
    </ModalContent>
  </Modal>
);

export default LoadingModal;
