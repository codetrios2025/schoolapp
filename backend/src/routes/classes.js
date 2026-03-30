import express from "express";
import { authGuard, roleGuard, tenantGuard } from "../middlewares/auth.js";
import {
  listClasses,
  getClassById,
  createClass,
  updateClass,
  deleteClass,
} from "../controllers/classesController.js";

const router = express.Router();

router.get("/", authGuard, roleGuard("superadmin", "admin", "teacher"), tenantGuard, listClasses);
router.post("/", authGuard, roleGuard("superadmin", "admin"), tenantGuard, createClass);
router.get("/:id", authGuard, roleGuard("superadmin", "admin", "teacher"), tenantGuard, getClassById);
router.put("/:id", authGuard, roleGuard("superadmin", "admin"), tenantGuard, updateClass);
router.delete("/:id", authGuard, roleGuard("superadmin", "admin"), tenantGuard, deleteClass);

export default router;
