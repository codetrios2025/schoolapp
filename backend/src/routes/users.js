import express from "express";
import { authGuard, roleGuard, tenantGuard } from "../middlewares/auth.js";
import {
  listUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/usersController.js";

const router = express.Router();

router.get("/", authGuard, roleGuard("superadmin", "admin"), tenantGuard, listUsers);
router.post("/", authGuard, roleGuard("superadmin", "admin"), tenantGuard, createUser);
router.get("/:id", authGuard, roleGuard("superadmin", "admin"), tenantGuard, getUser);
router.put("/:id", authGuard, roleGuard("superadmin", "admin"), tenantGuard, updateUser);
router.delete("/:id", authGuard, roleGuard("superadmin", "admin"), tenantGuard, deleteUser);

export default router;
