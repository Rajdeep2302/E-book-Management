import multer from "multer";
import fs from "fs";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Use absolute path for safety
    const dir = path.join(process.cwd(), "src/uploads/PDF");

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    cb(null, dir);
  },

  filename: (req, file, cb) => {
    // Generate a unique ID if not provided, or use the one from request
    // Note: req.registration_id might be undefined here depending on router order.
    // Ideally, we use a timestamp or random name here to avoid collisions.
    const uniqueName = req.registration_id || `upload_${Date.now()}`;
    cb(null, `${uniqueName}.pdf`);
  },
});

export const upload = multer({ storage });