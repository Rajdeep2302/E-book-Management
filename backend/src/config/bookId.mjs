import { bookID } from "../model/bookID.mjs";

const createBookID = async (name = "") => {
  const prefix =
    name?.substring(0, 5)?.toUpperCase()?.trim() || "B00K";

  while (true) {
    const random = Math.floor(100000 + Math.random() * 900000);
    const id = `${prefix}${random}`;

    const exists = await bookID(id); // must return true/false

    if (!exists) return id;
  }
};

export default createBookID;
