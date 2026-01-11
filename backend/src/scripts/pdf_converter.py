import sys
import os
import json
import fitz  # pip install pymupdf

def convert_pdf(pdf_path, output_dir, file_id):
    try:
        # 1. Validation: Check if PDF exists
        if not os.path.exists(pdf_path):
            return {"success": False, "error": f"Python cannot find PDF at: {pdf_path}"}

        # 2. Create output directory if missing
        if not os.path.exists(output_dir):
            os.makedirs(output_dir)

        # 3. Open PDF
        doc = fitz.open(pdf_path)
        saved_files = []

        # 4. Convert Pages
        for i, page in enumerate(doc):
            # Zoom = 2 (approx 150 DPI)
            matrix = fitz.Matrix(2, 2)
            pix = page.get_pixmap(matrix=matrix)

            filename = f"{file_id}_page_{i+1}.png"
            # Use os.path.join for safe paths
            output_path = os.path.join(output_dir, filename)
            
            pix.save(output_path)
            saved_files.append(output_path)

        return {"success": True, "files": saved_files}

    except Exception as e:
        return {"success": False, "error": str(e)}

if __name__ == "__main__":
    # Receive arguments from Node.js
    if len(sys.argv) < 4:
        print(json.dumps({"success": False, "error": "Missing arguments"}))
        sys.exit(1)

    in_pdf = sys.argv[1]
    out_dir = sys.argv[2]
    f_id = sys.argv[3]

    result = convert_pdf(in_pdf, out_dir, f_id)
    
    # Print JSON result for Node.js to capture
    print(json.dumps(result))