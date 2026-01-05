import { success, fail } from "../utils/response.mjs";
import { insertUser, getAllUsers } from "../model/user.model.mjs";
import createRegistrationID from "../config/registrationid.mjs";

export const getUsers = async (req, res, next) => {
  try {
    const users = await getAllUsers();
    return success(res, "Users fetched", users);
  } catch (err) {
    next(err);
  }
};

export const createUser = async (req, res, next) => {
  try {
    const { name } = req.body;

    if (!name) return fail(res, "Name is required", 400);

    const reg_id = await createRegistrationID(name);

    const user = await insertUser(name,reg_id);
    return success(res, "User created", user);
  } catch (err) {
    next(err);
  }
};
