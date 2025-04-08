const express = require("express");
const router = express.Router();
const client = require("../db/client");

//GET/api/faculty
router.get("/", async (req, res) => {
  try {
    const { rows } = await client.query("SELECT * FROM faculty ORDER BY id ASC;");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching faculty");
  }
});

//GET /api/faculty/:id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const { rows } = await client.query(
      `
       SELECT * FROM faculty WHERE id = $1 
        `,
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).send("Professor not found");
    }

    //Get departrment info?? wt fuckkk
    const { rows: department } = await client.query(
      `
        SELECT * FROM departments WHERE id = $1
        `,
      [rows[0].department_id]
    );

    res.json({ ...rows[0], department: department[0] });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching professor details");
  }
});

module.exports = router;
