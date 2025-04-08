const express = require("express");
const router = express.Router();
const client = require("../db/client");

//GET /api/departments
router.get("/", async (req, res) => {
  try {
    const { rows } = await client.query("SELECT * FROM departments ORDER BY id ASC;");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching departments");
  }
});

//GET /api/departments/:id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const { rows } = await client.query(
      `
        SELECT * FROM departments WHERE id = $1
        `,
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).send("Department not found");
    }

    //Also get faculty for this department?? WTHellyante
    const { rows: faculty } = await client.query(
      `
        SELECT * FROM faculty WHERE department_id = $1
        `,
      [id]
    );

    res.json({ ...rows[0], faculty });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching department details");
  }
});

module.exports = router;
