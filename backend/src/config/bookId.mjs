import { bookID } from "../model/bookID.mjs";

const createBookID = async (name) => {
  const prefix = name;

  while (true) {
    const random = Math.floor(100000 + Math.random() * 900000);
    const id = `${prefix}${random}`;

    const exists = await bookID(id);

    if (!exists) return id;
  }
};

export default createBookID;