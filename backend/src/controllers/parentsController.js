import { Parent } from "../models/index.js";

export const listParents = async (req, res) => {
  const where = req.user.role === "superadmin" ? {} : { organizationId: req.user.organizationId };
  res.json(await Parent.find(where));
};

export const getParent = async (req, res) => {
  const parent = await Parent.findOne({ parentId: req.params.id });
  if (!parent) return res.status(404).json({ error: "Parent not found" });
  res.json(parent);
};

export const createParent = async (req, res) => {
  const data = { ...req.body };
  if (req.user.role !== "superadmin") data.organizationId = req.user.organizationId;
  const parent = await Parent.create(data);
  res.status(201).json(parent);
};

export const updateParent = async (req, res) => {
  const parent = await Parent.findOneAndUpdate(
    { parentId: req.params.id },
    req.body,
    { new: true }
  );
  if (!parent) return res.status(404).json({ error: "Parent not found" });
  res.json(parent);
};

export const deleteParent = async (req, res) => {
  const parent = await Parent.findOneAndDelete({ parentId: req.params.id });
  if (!parent) return res.status(404).json({ error: "Parent not found" });
  res.sendStatus(204);
};
