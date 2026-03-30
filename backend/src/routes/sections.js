import express from "express";
import { authGuard, roleGuard, tenantGuard } from "../middlewares/auth.js";
import {
  listSections,
  getSection,
  createSection,
  updateSection,
  deleteSection,
} from "../controllers/sectionsController.js";

const router = express.Router();

router.get("/", authGuard, roleGuard("superadmin", "admin", "teacher"), tenantGuard, listSections);
router.post("/", authGuard, roleGuard("superadmin", "admin"), tenantGuard, createSection);
router.get("/:id", authGuard, roleGuard("superadmin", "admin", "teacher"), tenantGuard, getSection);
router.put("/:id", authGuard, roleGuard("superadmin", "admin"), tenantGuard, updateSection);
router.delete("/:id", authGuard, roleGuard("superadmin", "admin"), tenantGuard, deleteSection);

export default router;
