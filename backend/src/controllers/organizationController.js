import { Organization } from "../models/index.js";

export const listOrganizations = async (req, res) => {
  const organizations = await Organization.find();
  res.json(organizations);
};

export const getOrganization = async (req, res) => {
  const organization = await Organization.findOne({ organizationId: req.params.id });
  if (!organization) return res.status(404).json({ error: "Organization not found" });
  res.json(organization);
};

export const createOrganization = async (req, res) => {
  const org = await Organization.create(req.body);
  res.status(201).json(org);
};

export const updateOrganization = async (req, res) => {
  const org = await Organization.findOneAndUpdate(
    { organizationId: req.params.id },
    req.body,
    { new: true }
  );
  if (!org) return res.status(404).json({ error: "Organization not found" });
  res.json(org);
};

export const deleteOrganization = async (req, res) => {
  const org = await Organization.findOneAndDelete({ organizationId: req.params.id });
  if (!org) return res.status(404).json({ error: "Organization not found" });
  res.sendStatus(204);
};
