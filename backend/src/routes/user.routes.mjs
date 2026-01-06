import { Router } from "express";
import { getUsers, createUser } from "../controllers/user.controller.mjs";
import { validateEmail, validateName, validatePhone } from "../middleware/validate.mjs";

const router = Router();

router.get("/all/", getUsers);

router.post("/signup/", validateName, validateEmail, validatePhone, createUser);


export default router;
