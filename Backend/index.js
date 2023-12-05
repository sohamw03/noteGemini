const connectToMongo = require("./db");
const express = require("express");
const cors = require("cors");

connectToMongo();

const app = express();
const port = 5000;
app.listen(port, () => {
  console.log(`codeGemini backend listening on port ${port}`);
});

// Middlewares
app.use(cors());
app.use(express.json());

// Endpoints
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

module.exports = app;
