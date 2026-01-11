const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:8000/api";

interface UploadPayload {
  resourceType: "book" | "note";
  title: string;
  author: string;
  description?: string;
  category: string;
  language?: string;
  year?: string;
  pages?: string;
  documentType?: string;
  file: File;
  coverImage?: File | null;
}

export const uploadResourceData = async (data: UploadPayload) => {
  const token = localStorage.getItem("authToken");

  const formData = new FormData();

  // ✅ SEND resourceType → isABook
  formData.append(
    "isABook",
    String(data.resourceType === "book")
  );

  formData.append("title", data.title);
  formData.append("author", data.author);

  if (data.description)
    formData.append("description", data.description);

  formData.append("category", data.category);

  if (data.language)
    formData.append("language", data.language);

  if (data.year)
    formData.append("year", data.year);

  if (data.pages)
    formData.append("pages", data.pages);

  if (data.documentType)
    formData.append("documentType", data.documentType);

  // files
  formData.append("file", data.file);

  if (data.coverImage)
    formData.append("coverImage", data.coverImage);

  const res = await fetch(`${API_BASE_URL}/upload/upload`, {
    method: "POST",
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: formData,
  });

  const json = await res.json();

  if (!res.ok) {
    throw new Error(json?.message || "Upload failed");
  }

  return json;
};
