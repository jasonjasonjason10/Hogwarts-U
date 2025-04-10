const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const router = express.Router();
const client = require("../db/client");

const SALT_ROUNDS = 10;

//POST /api/admin/register
router.post("/register", async (req, res) => {
  let { username, password } = req.body;

  try {
    username = username.toLowerCase();

    if (!username || !password) {
      return res.status(400).json({ message: "Username and password required" });
    }

    const existing = await client.query(/* sql */ `SELECT * FROM admins WHERE username = $1`, [username]);

    if (existing.rows.length) {
      return res.status(409).json({ message: "Username already taken" });
    }

    //HASHES PASSWORD??
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    //SAVE TO DB
    const { rows } = await client.query(/* sql */
      `INSERT INTO admins (username, password)
        VALUES ($1, $2)
        RETURNING id, username`,
      [username, hashedPassword]
    );

    const admin = rows[0];

    //Generate token
    const token = jwt.sign({ id: admin.id, username: admin.username }, process.env.JWT_SECRET, {
      expiresIn: "1w",
    });

    res.json({ message: "Registration successful", token, admin });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error registering admin" });
  }
});

//POST/api/admin/login
router.post("/login", async (req, res) => {
  let { username, password } = req.body;

  try {
    username = username.toLowerCase();

    if (!username || !password) {
      return res.status(400).json({ message: "Username and password required" });
    }

    //Checking if admin even exists dawg
    const { rows } = await client.query(/* sql */`SELECT * FROM admins WHERE username = $1`, [username]);

    const admin = rows[0];

    if (!admin) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    //Compare the entered password to the hashed one
    const validPassword = await bcrypt.compare(password, admin.password);

    if (!validPassword) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    //create a new token
    const token = jwt.sign({ id: admin.id, username: admin.username }, process.env.JWT_SECRET, {
      expiresIn: "1w",
    });

    res.json({ message: "Login successful", token, admin: { id: admin.id, username: admin.username } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error logging in" });
  }
});

const requireAdmin = require("../middleware/requireAdmin");

router.get("/me", requireAdmin, async (req, res) => {
  res.json({ id: req.user.id, username: req.user.username });
});

module.exports = router;
