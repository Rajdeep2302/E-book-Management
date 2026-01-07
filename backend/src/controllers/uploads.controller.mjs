import { convertPdfToImages } from "../uploads/uploadAsImage.mjs"; // Adjust import path if needed
import { fail } from "../utils/response.mjs";

export const uploads = async (req, res) => {
  try {
    const { title, author, category, language } = req.body;

    // Validation
    if (!title) return fail(res, "title is required", 400);
    if (!author) return fail(res, "author is required", 400);
    if (!category) return fail(res, "category is required", 400);
    if (!language) return fail(res, "language is required", 400);

    // File Validation
    if (!req.file) return fail(res, "bookPDF is required", 400);

    // Use ID from router
    const registration_id = req.registration_id;

    // Call Conversion
    const result = await convertPdfToImages(registration_id, req.file.path);

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