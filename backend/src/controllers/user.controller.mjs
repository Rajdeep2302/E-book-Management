import { success, fail } from "../utils/response.mjs";
import User from "../model/user.model.mjs";
import createRegistrationID from "../config/registrationid.mjs";
import { hashPassword } from "../utils/hash.mjs";
import { sendMail } from "./mail.controller.mjs";
import { registrationMail } from "../mail/regstrationSuccesfull.mjs";

export const getUsers = async (req, res, next) => {
  try {
    const users = await User.findAll({});
    return success(res, "Users fetched", users.map(u => u.toJSON ? u.toJSON() : u));
  } catch (err) {
    next(err);
  }
};

export const createUser = async (req, res, next) => {
  try {
    let {
      name,
      email,
      phone,
      department,
      institute,
      password,
      student,
      teacher,
    } = req.body;

    // Basic validation
    if (!name) return fail(res, "Name is required", 400);
    if (!email) return fail(res, "Email is required", 400);
    if (!phone) return fail(res, "Phone is required", 400);
    if (!institute) return fail(res, "Institute is required", 400);
    if (!password) return fail(res, "Password is required", 400);

    const registration_id = await createRegistrationID(name);

    // Determine role
    let role = 'student';
    if (teacher) role = 'teacher';

    const subject = "Registration Successful";

    const successfulMail = await sendMail(
      email,
      subject,
      registrationMail(name, registration_id, email)
    );

    let user = null;

    if (successfulMail) {
      user = await User.create({
        name,
        email,
        phone,
        department,
        institute,
        password,
        role,
        isVerified: false
      });
    } else {
      return fail(res, "email send fail. please check the mail again.");
    }

    return success(res, "User created", user);
  } catch (err) {
    next(err);
  }
};
