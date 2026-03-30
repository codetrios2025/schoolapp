import express from "express";
import { authGuard, roleGuard, tenantGuard } from "../middlewares/auth.js";
import {
  listTeacherAssignments,
  createTeacherAssignment,
  updateTeacherAssignment,
  deleteTeacherAssignment,
} from "../controllers/teacherAssignmentController.js";

const router = express.Router();

router.get("/", authGuard, roleGuard("superadmin", "admin", "teacher"), tenantGuard, listTeacherAssignments);
router.post("/", authGuard, roleGuard("superadmin", "admin"), tenantGuard, createTeacherAssignment);
router.put("/:id", authGuard, roleGuard("superadmin", "admin"), tenantGuard, updateTeacherAssignment);
router.delete("/:id", authGuard, roleGuard("superadmin", "admin"), tenantGuard, deleteTeacherAssignment);

export default router;
