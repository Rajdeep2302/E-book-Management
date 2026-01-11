import { Router } from "express";
import { getBooksOnly, uploads } from "../controllers/uploads.controller.mjs";
import { upload } from "../middleware/upload.mjs";
import createBookID from "../config/bookId.mjs";
import fs from "fs";
import path from "path";
import { coverPage } from "../middleware/coverPage.mjs";
import { protect } from "../middleware/auth.middleware.mjs";
import { getMe } from "../controllers/auth.controller.mjs";

const router = Router();

router.post(
  "/upload",
  // protect,
  // getMe,
  upload.fields([
    { name: "file", maxCount: 1 },
    { name: "coverImage", maxCount: 1 },
  ]),

  async (req, res, next) => {
    try {
      const { title } = req.body;

      if (!title) {
        return res.status(400).json({ message: "title required" });
      }

      const id = await createBookID(title);
      req.registration_id = id;

      const pdf = req.files.file?.[0];
      const cover = req.files.coverImage?.[0];

      const newPdfPath = path.join(path.dirname(pdf.path), `${id}.pdf`);
      fs.renameSync(pdf.path, newPdfPath);

      if (cover) {
        const newCoverPath = path.join(path.dirname(cover.path), `${id}.png`);
        fs.renameSync(cover.path, newCoverPath);
      }

      pdf.path = newPdfPath;
      pdf.filename = `${id}.pdf`;

      req.file = pdf;

      next();
    } catch (err) {
      next(err);
    }
  },
  uploads
);

router.get("/getBook", getBooksOnly)

export default router;
