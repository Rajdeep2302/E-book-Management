import { Router } from "express";
import { getUsers, createUser } from "../controllers/user.controller.mjs";
import { validateName } from "../middleware/validate.mjs";

const router = Router();

router.get("/", getUsers);

router.post("/", validateName, createUser);


export default router;
