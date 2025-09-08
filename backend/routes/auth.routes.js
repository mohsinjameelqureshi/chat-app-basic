import { Router } from "express";
import {
  login,
  logout,
  singup,
  refreshAccessToken,
} from "../controllers/auth.controller.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";

const router = Router();

router.route("/signup").post(singup);
router.route("/login").post(login);
router.route("/logout").post(verifyJWT, logout);
router.route("/refresh-token").post(refreshAccessToken);

export default router;
