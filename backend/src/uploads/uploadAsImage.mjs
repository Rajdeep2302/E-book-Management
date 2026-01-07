import { spawn } from "child_process";
import path from "path";

export const convertPdfToImages = (id, relativePdfPath) => {
  return new Promise((resolve, reject) => {
    
    // 1. Resolve Absolute Paths
    // We assume the python script is in the root of the project
    const pythonScriptPath = path.join(process.cwd(), "src\\scripts\\pdf_converter.py");
    
    // The PDF path coming from Multer is usually relative or absolute. 
    // We force it to absolute just to be sure.
    const absolutePdfPath = path.resolve(relativePdfPath);
    
    // Define where images go
    const outputDir = path.join(process.cwd(), "src/uploads/IMAGE", id);

    console.log("--- DEBUG PATHS ---");
    console.log("Script:", pythonScriptPath);
    console.log("PDF:", absolutePdfPath);
    console.log("Output:", outputDir);
    console.log("-------------------");

    // 2. Spawn Python
    // IMPORTANT: On some systems, you might need "python3" instead of "python"
    const pythonProcess = spawn("python", [
      pythonScriptPath,
      absolutePdfPath,
      outputDir,
      id
    ]);

    let dataString = "";
    let errorString = "";

    // 3. Capture Output
    pythonProcess.stdout.on("data", (data) => {
      dataString += data.toString();
    });

    pythonProcess.stderr.on("data", (data) => {
      errorString += data.toString();
    });

    // 4. Handle Completion
    pythonProcess.on("close", (code) => {
      if (code !== 0) {
        console.error("Python Stderr:", errorString);
        return reject(new Error(`Python script exited with code ${code}. Error: ${errorString}`));
      }

      try {
        const result = JSON.parse(dataString);
        if (result.success) {
          resolve(result.files.map((p) => ({ path: p })));
        } else {
          reject(new Error(result.error));
        }
      } catch (e) {
        reject(new Error("Failed to parse Python JSON: " + dataString));
      }
    });
  });
};