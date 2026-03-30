import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { User } from "../models/index.js";

dotenv.config();

const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).send({ error: "Invalid credentials" });
  }
  const token = jwt.sign({ userId: user.userId, role: user.role, organizationId: user.organizationId }, process.env.JWT_SECRET, { expiresIn: "8h" });
  res.send({ token, user });
});

export default router;
