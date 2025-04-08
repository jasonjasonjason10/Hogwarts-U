const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = 3000;

//This i smy middleware?
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

//Test route? have we done this before?
app.get("/", (req, res) => {
  res.send("WHAT THE FOOOOK!");
});

//Starting server??
app.listen(port, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
