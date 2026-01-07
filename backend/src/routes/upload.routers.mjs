import { Router } from "express";
import { uploads } from "../controllers/uploads.controller.mjs";
import { upload } from "../middleware/upload.mjs";
import createBookID from "../config/bookId.mjs";
import fs from "fs";
import path from "path";

const router = Router();

router.post(
  "/upload",
  upload.single("bookPDF"),
  async (req, res, next) => {
    try {
      const { title } = req.body;
      if (!title) return res.status(400).json({ message: "title required" });

      const id = await createBookID(title);
      req.registration_id = id;

      // REAL uploaded file path
      const oldPath = req.file.path;

      // rename in same dir
      const newPath = path.join(path.dirname(oldPath), `${id}.pdf`);

      fs.renameSync(oldPath, newPath);

      // update multer file info
      req.file.filename = `${id}.pdf`;
      req.file.path = newPath;

      next();
    } catch (err) {
      next(err);
    }
  },
  uploads
);

export default router;
