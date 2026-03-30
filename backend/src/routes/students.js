import express from "express";
import { authGuard, roleGuard, tenantGuard } from "../middlewares/auth.js";
import {
  listStudents,
  getStudent,
  createStudent,
  updateStudent,
  deleteStudent,
} from "../controllers/studentsController.js";

const router = express.Router();

router.get("/", authGuard, roleGuard("superadmin", "admin", "teacher"), tenantGuard, listStudents);
router.post("/", authGuard, roleGuard("superadmin", "admin"), tenantGuard, createStudent);
router.get("/:id", authGuard, roleGuard("superadmin", "admin", "teacher"), tenantGuard, getStudent);
router.put("/:id", authGuard, roleGuard("superadmin", "admin"), tenantGuard, updateStudent);
router.delete("/:id", authGuard, roleGuard("superadmin", "admin"), tenantGuard, deleteStudent);

export default router;
