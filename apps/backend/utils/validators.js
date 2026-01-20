function validateCandidate(candidate) {
  const { name, phone, position, status } = candidate;
  if (!name || !phone || !position || !status) return false;
  return true;
}

module.exports = { validateCandidate };
