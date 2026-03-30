import { TeacherAssignment } from "../models/index.js";

export const listTeacherAssignments = async (req, res) => {
  const where = req.user.role === "superadmin" ? {} : { organizationId: req.user.organizationId };
  if (req.user.role === "teacher") where.userId = req.user.userId;
  res.json(await TeacherAssignment.find(where));
};

export const createTeacherAssignment = async (req, res) => {
  const data = { ...req.body };
  if (req.user.role !== "superadmin") data.organizationId = req.user.organizationId;
  const assignment = await TeacherAssignment.create(data);
  res.status(201).json(assignment);
};

export const updateTeacherAssignment = async (req, res) => {
  const assignment = await TeacherAssignment.findOneAndUpdate(
    { id: req.params.id },
    req.body,
    { new: true }
  );
  if (!assignment) return res.status(404).json({ error: "Teacher assignment not found" });
  res.json(assignment);
};

export const deleteTeacherAssignment = async (req, res) => {
  const assignment = await TeacherAssignment.findOneAndDelete({ id: req.params.id });
  if (!assignment) return res.status(404).json({ error: "Teacher assignment not found" });
  res.sendStatus(204);
};
