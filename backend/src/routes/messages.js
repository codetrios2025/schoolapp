import express from "express";
import { authGuard } from "../middlewares/auth.js";
import {
  sendMessage,
  listMessages,
  getMessage,
} from "../controllers/messagesController.js";

const router = express.Router();

router.post("/", authGuard, sendMessage);
router.get("/", authGuard, listMessages);
router.get("/:id", authGuard, getMessage);

export default router;
