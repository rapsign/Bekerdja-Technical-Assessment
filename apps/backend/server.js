require("dotenv").config();

const express = require("express");
const cors = require("cors");
const candidatesRouter = require("./routes/candidates");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/candidates", candidatesRouter);

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
