import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { User } from "../models/index.js";

dotenv.config();

export const authGuard = async (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) return res.status(401).send({ error: "Missing token" });

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ userId: payload.userId });
    if (!user) return res.status(401).send({ error: "Invalid user" });
    req.user = user;
    next();
  } catch (err) {
    res.status(401).send({ error: "Invalid token" });
  }
};

export const roleGuard = (...roles) => (req, res, next) => {
  if (!req.user || !roles.includes(req.user.role)) {
    return res.status(403).json({ error: "Forbidden" });
  }
  next();
};

export const tenantGuard = (req, res, next) => {
  if (req.user.role === "superadmin") return next();
  const orgId = req.body.organizationId || req.query.organizationId || req.params.organizationId;
  if (!orgId || Number(orgId) !== req.user.organizationId) {
    return res.status(403).json({ error: "Organization mismatch" });
  }
  next();
};
