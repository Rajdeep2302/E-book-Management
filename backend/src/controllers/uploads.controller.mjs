import UploadFile from "../model/uploadFIles.mjs";
import { convertPdfToImages } from "../uploads/uploadAsImage.mjs"; // Adjust import path if needed
import { fail } from "../utils/response.mjs";

export const uploads = async (req, res) => {
  try {
    const {
      title,
      author,
      description,
      category,
      documentType,
      language,
      year,
      isABook
    } = req.body;

    // Validation
    if (!title) return fail(res, "title is required", 400);
    if (!author) return fail(res, "author is required", 400);
    if (!category) return fail(res, "category is required", 400);
    if (!language) return fail(res, "language is required", 400);
    if (!year) return fail(res, "Year is required", 400);
    if (!isABook) return fail(res, "something went Wrong", 400);

    // File Validation
    if (!req.file) return fail(res, "needed is required", 400);

    // user ID
    const user_id = 102;
    // // user ID
    // if (!req.user || !req.user.id) {
    //   return fail(res, "Unauthorized user", 401);
    // }

    // const user_id = req.user.id;

    // Use ID from router
    const registration_id = req.registration_id;
    const bookFile = registration_id + ".pdf";
    const coverFile = registration_id + ".png";

    // Call Conversion
    const result = await convertPdfToImages(registration_id, req.file.path);

    const upload = await UploadFile.create({
      user_id,
      registration_id,
      title,
      author,
      description,
      category,
      language,
      year,
      documentType,
      bookFile,
      coverFile,
      isABook
    });

    return res.json({
      success: true,
      message: "File uploaded and converted",
      images: result.map((r) => r.path),
    });
  } catch (e) {
    console.error(e);
    return fail(res, "upload fail: " + e.message);
  }
};

export const getBooksOnly = async (req, res) => {

}