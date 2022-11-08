const express = require("express");
const router = express.Router();
const multer = require("multer");
const files = require("../Model/ImgSchema");
const https = require("https");


//img storage path
const imgConfig = multer.diskStorage({
  destination: (req, file, callbck) => {
    callbck(null, "./uploads");
  },
  filename: (req, file, callbck) => {
    callbck(null, `image-${file.originalname}`);
  },
});
//img filter
const isImage = (req, file, callbck) => {
  if (file.mimetype.startsWith("image")) {
    callbck(null, true);
  } else {
    callbck(new Error("only images allowwed"));
  }
};

const upload = multer({
  storage: imgConfig,
  fileFilter: isImage,
});

router.post("/posting", upload.single("photo"), async (req, res) => {
  const { filename } = req.file;
  if (!filename) {
    res.status(401).json({ status: 401, message: "upload the file" });
  }
  try {
    const userdata = new files({
      imgPath: filename,
    });
    const finalResult = await userdata.save();
    res.status(201).json({ finalResult });
  } catch (error) {
    res.status(401).json({ status: 401, error });
  }
});

router.get("/geting", async (req, res) => {
  try {
    const getImgs = await files.find();
    res.status(201).json({ getImgs });
  } catch (error) {
    res.status(401).json({ status: 401, error });
  }
});

router.get('/download', (req, res) => {
  res.download('./uploads/image-about.jpg')
});

module.exports = router;
