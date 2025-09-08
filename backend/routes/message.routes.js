import { Router } from "express";
import { sendMessage, getMessages } from "../controllers/message.controller.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";

const router = Router();

// proctected route
router.route("/send/:id").post(verifyJWT, sendMessage);
router.route("/:id").get(verifyJWT, getMessages);

export default router;
