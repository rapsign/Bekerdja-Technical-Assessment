const fs = require("fs").promises;
const path = require("path");
const DATA_FILE = path.join(__dirname, "../../../data/data.json");

async function readCandidates() {
  try {
    const data = await fs.readFile(DATA_FILE, "utf-8");
    return JSON.parse(data || "[]");
  } catch (err) {
    if (err.code === "ENOENT") return [];
    throw err;
  }
}

async function writeCandidates(data) {
  await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2));
}

module.exports = { readCandidates, writeCandidates };
