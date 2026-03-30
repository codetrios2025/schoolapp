import { Class } from "../models/index.js";

export const listClasses = async (req, res) => {
  const where = req.user.role === "superadmin" ? {} : { organizationId: req.user.organizationId };
  res.json(await Class.find(where));
};

export const getClassById = async (req, res) => {
  const cls = await Class.findOne({ classId: req.params.id });
  if (!cls) return res.status(404).json({ error: "Class not found" });
  res.json(cls);
};

export const createClass = async (req, res) => {
  const data = { ...req.body };
  if (req.user.role !== "superadmin") data.organizationId = req.user.organizationId;
  const cls = await Class.create(data);
  res.status(201).json(cls);
};

export const updateClass = async (req, res) => {
  const cls = await Class.findOneAndUpdate(
    { classId: req.params.id },
    req.body,
    { new: true }
  );
  if (!cls) return res.status(404).json({ error: "Class not found" });
  res.json(cls);
};

export const deleteClass = async (req, res) => {
  const cls = await Class.findOneAndDelete({ classId: req.params.id });
  if (!cls) return res.status(404).json({ error: "Class not found" });
  res.sendStatus(204);
};
