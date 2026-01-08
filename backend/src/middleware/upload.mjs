import multer from "multer";
import fs from "fs";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let dir;

    if (file.fieldname === "file") {
      dir = path.join(process.cwd(), "src/uploads/PDF");
    } else if (file.fieldname === "coverImage") {
      dir = path.join(process.cwd(), "src/uploads/PAGE");
    }

    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },

  filename: (req, file, cb) => {
    const id = req.registration_id || `upload_${Date.now()}`;

    if (file.fieldname === "file") cb(null, `${id}.pdf`);
    else cb(null, `${id}.png`);
  },
});

export const upload = multer({ storage });
