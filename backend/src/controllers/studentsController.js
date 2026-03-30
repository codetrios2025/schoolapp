import { Student } from "../models/index.js";

export const listStudents = async (req, res) => {
  const where = req.user.role === "superadmin" ? {} : { organizationId: req.user.organizationId };
  if (req.query.classId) where.classId = req.query.classId;
  if (req.query.sectionId) where.sectionId = req.query.sectionId;
  res.json(await Student.find(where));
};

export const getStudent = async (req, res) => {
  const student = await Student.findOne({ studentId: req.params.id });
  if (!student) return res.status(404).json({ error: "Student not found" });
  res.json(student);
};

export const createStudent = async (req, res) => {
  const data = { ...req.body };
  if (req.user.role !== "superadmin") data.organizationId = req.user.organizationId;
  const student = await Student.create(data);
  res.status(201).json(student);
};

export const updateStudent = async (req, res) => {
  const student = await Student.findOneAndUpdate(
    { studentId: req.params.id },
    req.body,
    { new: true }
  );
  if (!student) return res.status(404).json({ error: "Student not found" });
  res.json(student);
};

export const deleteStudent = async (req, res) => {
  const student = await Student.findOneAndDelete({ studentId: req.params.id });
  if (!student) return res.status(404).json({ error: "Student not found" });
  res.sendStatus(204);
};
