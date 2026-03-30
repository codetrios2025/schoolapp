import express from "express";
import { authGuard, roleGuard } from "../middlewares/auth.js";
import {
  listOrganizations,
  getOrganization,
  createOrganization,
  updateOrganization,
  deleteOrganization,
} from "../controllers/organizationController.js";

const router = express.Router();

router.get("/", authGuard, roleGuard("superadmin"), listOrganizations);
router.post("/", authGuard, roleGuard("superadmin"), createOrganization);
router.get("/:id", authGuard, roleGuard("superadmin"), getOrganization);
router.put("/:id", authGuard, roleGuard("superadmin"), updateOrganization);
router.delete("/:id", authGuard, roleGuard("superadmin"), deleteOrganization);

router.get("/:id", authGuard, roleGuard("superadmin"), async (req, res) => {
  const org = await Organization.findByPk(req.params.id);
  if (!org) return res.status(404).json({ error: "Organization not found" });
  res.json(org);
});

router.put("/:id", authGuard, roleGuard("superadmin"), async (req, res) => {
  await Organization.update(req.body, { where: { organizationId: req.params.id } });
  res.sendStatus(204);
});

router.delete("/:id", authGuard, roleGuard("superadmin"), async (req, res) => {
  await Organization.destroy({ where: { organizationId: req.params.id } });
  res.sendStatus(204);
});

export default router;
