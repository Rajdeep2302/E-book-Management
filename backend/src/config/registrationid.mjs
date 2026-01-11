import { registration } from "../model/registration.mjs";

const createRegistrationID = async (name) => {
  const prefix = name?.substring(0, 3).toUpperCase();

  while (true) {
    const random = Math.floor(1000 + Math.random() * 9000);
    const id = `${prefix}${random}`;

    const exists = await registration(id);

    if (!exists) return id;
  }
};

export default createRegistrationID;
