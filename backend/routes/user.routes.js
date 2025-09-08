import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
import { getUserForSidebar } from "../controllers/user.controller.js";

const router = Router();

router.route("/").get(verifyJWT, getUserForSidebar);

export default router;
