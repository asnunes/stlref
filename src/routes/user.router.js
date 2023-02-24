import { Router } from "express";
import {
  signInBodyValidation,
  userValidation,
} from "../middlewares/user.middleware.js";
import {
  signIn,
  signUp,
  getUserMe,
  getUsersRanking,
} from "../controllers/user.controller.js";
import authValidation from "../middlewares/auth.validation.js";
const router = Router();

router.post("/signup", userValidation, signUp);
router.post("/signin", signInBodyValidation, signIn);
router.get("/users/me", authValidation, getUserMe);
router.get("/ranking", getUsersRanking);
export default router;
