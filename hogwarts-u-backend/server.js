const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = 3000;

//This i smy middleware?
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

//Mount Routes??
app.use("/api/departments", require("./routes/departments"));
app.use("/api/faculty", require("./routes/faculty"));

//Test route? have we done this before?
app.get("/", (req, res) => {
  res.send("Welcome to Hogwarts API!");
});

//register admin route?
app.use("/api/admin", require("./routes/admin"));

//Starting server??
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
