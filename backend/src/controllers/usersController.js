import bcrypt from "bcryptjs";
import { User } from "../models/index.js";

export const listUsers = async (req, res) => {
  const where = req.user.role === "superadmin" ? {} : { organizationId: req.user.organizationId };
  const users = await User.find(where);
  res.json(users);
};

export const getUser = async (req, res) => {
  const user = await User.findOne({ userId: req.params.id });
  if (!user) return res.status(404).json({ error: "User not found" });
  if (req.user.role !== "superadmin" && user.organizationId !== req.user.organizationId) {
    return res.status(403).json({ error: "Forbidden" });
  }
  res.json(user);
};

export const createUser = async (req, res) => {
  const payload = req.body;
  if (!payload.password) payload.password = "password123";
  payload.password = bcrypt.hashSync(payload.password, 10);
  if (req.user.role !== "superadmin") payload.organizationId = req.user.organizationId;
  const user = await User.create(payload);
  res.status(201).json(user);
};

export const updateUser = async (req, res) => {
  const data = { ...req.body };
  if (data.password) data.password = bcrypt.hashSync(data.password, 10);
  const user = await User.findOneAndUpdate(
    { userId: req.params.id },
    data,
    { new: true }
  );
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json(user);
};

export const deleteUser = async (req, res) => {
  const user = await User.findOneAndDelete({ userId: req.params.id });
  if (!user) return res.status(404).json({ error: "User not found" });
  res.sendStatus(204);
};
