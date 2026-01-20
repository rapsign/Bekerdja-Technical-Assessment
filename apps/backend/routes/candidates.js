const express = require("express");
const router = express.Router();
const { readCandidates, writeCandidates } = require("../helpers/file");
const { validateCandidate } = require("../utils/validators");

// Get all candidates
router.get("/", async (req, res) => {
  const candidates = await readCandidates();
  res.json(candidates);
});

// Add new candidate
router.post("/", async (req, res) => {
  if (!validateCandidate(req.body))
    return res.status(400).json({ error: "Invalid candidate data" });

  const candidates = await readCandidates();
  const newCandidate = { id: Date.now().toString(), ...req.body };
  candidates.push(newCandidate);
  await writeCandidates(candidates);
  res.status(201).json(newCandidate);
});

// Update candidate
router.put("/:id", async (req, res) => {
  const candidates = await readCandidates();
  const idx = candidates.findIndex((c) => c.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: "Not found" });

  candidates[idx] = { ...candidates[idx], ...req.body };
  await writeCandidates(candidates);
  res.json(candidates[idx]);
});

// Delete candidate
router.delete("/:id", async (req, res) => {
  let candidates = await readCandidates();
  const exists = candidates.some((c) => c.id === req.params.id);
  if (!exists) return res.status(404).json({ error: "Not found" });

  candidates = candidates.filter((c) => c.id !== req.params.id);
  await writeCandidates(candidates);
  res.status(204).send();
});

module.exports = router;
