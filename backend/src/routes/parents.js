import express from "express";
import { authGuard, roleGuard, tenantGuard } from "../middlewares/auth.js";
import {
  listParents,
  getParent,
  createParent,
  updateParent,
  deleteParent,
} from "../controllers/parentsController.js";

const router = express.Router();

router.get("/", authGuard, roleGuard("superadmin", "admin", "teacher"), tenantGuard, listParents);
router.post("/", authGuard, roleGuard("superadmin", "admin"), tenantGuard, createParent);
router.get("/:id", authGuard, roleGuard("superadmin", "admin", "teacher"), tenantGuard, getParent);
router.put("/:id", authGuard, roleGuard("superadmin", "admin"), tenantGuard, updateParent);
router.delete("/:id", authGuard, roleGuard("superadmin", "admin"), tenantGuard, deleteParent);

export default router;
