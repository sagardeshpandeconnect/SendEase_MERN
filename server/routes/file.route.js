const express = require("express");
const {
  uploadFile,
  downloadFile,
  deleteFile,
  fetchAllFiles,
  shareFile,
  upload,
} = require("../controllers/file.controller");

const router = express.Router();

router.get("/", fetchAllFiles);
router.get("/download/:id", downloadFile);
router.get("/share/:token", shareFile);
router.post("/upload", upload.single("file"), uploadFile);
router.delete("/delete/:_id", deleteFile);

module.exports = router;
