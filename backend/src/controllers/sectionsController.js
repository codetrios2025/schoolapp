import { Section } from "../models/index.js";

export const listSections = async (req, res) => {
  const where = req.user.role === "superadmin" ? {} : { organizationId: req.user.organizationId };
  res.json(await Section.find(where));
};

export const getSection = async (req, res) => {
  const section = await Section.findOne({ sectionId: req.params.id });
  if (!section) return res.status(404).json({ error: "Section not found" });
  res.json(section);
};

export const createSection = async (req, res) => {
  const data = { ...req.body };
  if (req.user.role !== "superadmin") data.organizationId = req.user.organizationId;
  const section = await Section.create(data);
  res.status(201).json(section);
};

export const updateSection = async (req, res) => {
  const section = await Section.findOneAndUpdate(
    { sectionId: req.params.id },
    req.body,
    { new: true }
  );
  if (!section) return res.status(404).json({ error: "Section not found" });
  res.json(section);
};

export const deleteSection = async (req, res) => {
  const section = await Section.findOneAndDelete({ sectionId: req.params.id });
  if (!section) return res.status(404).json({ error: "Section not found" });
  res.sendStatus(204);
};
