import { emailVerification } from "../model/verification.mjs";
import { fail } from "../utils/response.mjs";

export const validateName = async (req, res, next) => {
  if (!req.body.name) {
    return res.status(400).json(await fail(res, "Name is required"));
  }
  next();
};


export const validateEmail = async (req, res, next) => {
  if (!req.body.email) {
    return res.status(400).json(await fail(res, "Email is required"));
  } else {
    const valid = await emailVerification(req.body.email);
    if(valid){
      return res.status(400).json(await fail(res, "EmailId is already register"));
    }
  }
  next();
};

export const validatePhone = async (req, res, next) => {
  if (!req.body.phone) {
    return res.status(400).json(await fail(res, "Phone no. is required"));
  }
  next(); 
};
