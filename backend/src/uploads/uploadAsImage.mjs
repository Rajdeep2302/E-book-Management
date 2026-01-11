import { spawn } from "child_process";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const convertPdfToImages = (id, relativePdfPath) => {
  return new Promise((resolve, reject) => {
    
    // ✅ Python script path (bulletproof)
    const pythonScriptPath = path.join(__dirname, "../scripts/pdf_converter.py");

    // ✅ PDF Path (absolute)
    const absolutePdfPath = path.resolve(relativePdfPath);

    // ✅ Output Directory
    const outputDir = path.join(process.cwd(), "src/uploads/IMAGE", id);

    // Ensure directory exists
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    console.log("---- PDF CONVERTER DEBUG ----");
    console.log("Python Script:", pythonScriptPath);
    console.log("PDF:", absolutePdfPath);
    console.log("Output Folder:", outputDir);
    console.log("-----------------------------");

    // Pick correct python runtime
    const pythonCmd = process.platform === "win32" ? "python" : "python3";

    const pythonProcess = spawn(pythonCmd, [
      pythonScriptPath,
      absolutePdfPath,
      outputDir,
      id
    ]);

    let dataString = "";
    let errorString = "";

    pythonProcess.stdout.on("data", (data) => {
      dataString += data.toString();
    });

    pythonProcess.stderr.on("data", (data) => {
      errorString += data.toString();
    });

    pythonProcess.on("close", (code) => {
      if (code !== 0) {
        console.error("Python Error:", errorString);
        return reject(
          new Error(
            `Python script exited with code ${code}. Error: ${errorString}`
          )
        );
      }

      try {
        const result = JSON.parse(dataString);

        if (!result.success) {
          return reject(new Error(result.error || "Python returned failure"));
        }

        resolve(result.files.map((p) => ({ path: p })));
      } catch (e) {
        reject(
          new Error("Failed to parse Python JSON Output: " + dataString)
        );
      }
    });
  });
};
