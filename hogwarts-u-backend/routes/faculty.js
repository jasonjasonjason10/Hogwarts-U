//This file is everything faculty related. View, add, delete, update. the GET routes are for displaying all faculty and faculty by id for the user in the browser on the front end. The POST routes will be specific to the admin. Only the logged in admin can trigger the post routes when added or deleting a faculty member.

const express = require("express");
const router = express.Router();
const client = require("../db/client");
const requireAdmin = require("../middleware/requireAdmin");

//GET/api/faculty
router.get("/", async (req, res) => {
  try {
    const { rows } = await client.query(/* sql */ "SELECT * FROM faculty ORDER BY id ASC;");
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
      /* sql */
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
      /* sql */
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

//POST /api/faculty -ADMINS ONLY!!
router.post("/", requireAdmin, async (req, res) => {
  const { name, email, bio, profile_image, department_id } = req.body;

  try {
    if (!name || !department_id) {
      return res.status(400).json({ message: "Name and Department are required" });
    }

    const { rows } = await client.query(
      /* sql */
      `
      INSERT INTO faculty (name, email, bio, profile_image, department_id)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
      `,
      [name, email, bio, profile_image, department_id]
    );
    res.status(201).json({ message: "Professor added", professor: rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error adding professor" });
  }
});

//DELET /api/faculty/:id - ADMIN ONLY!!
router.delete("/:id", requireAdmin, async (req, res) => {
  const { id } = req.params;

  try {
    const { rows } = await client.query(/* sql */ `DELETE FROM faculty WHERE id = $1 RETURNING *`, [id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Professor not found" });
    }

    res.json({ message: "Professor deleted", deleted: rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error deleting professor" });
  }
});

//PTACH/api/faculty/:id - ADMIN ONLY!!
router.patch("/:id", requireAdmin, async (req, res) => {
  const { id } = req.params;
  const { name, email, bio, profile_image, department_id } = req.body;

  try {
    const { rows } = await client.query(
      /* sql */
      `
      UPDATE faculty
      SET
      name = COALESCE($1, name),
      email = COALESCE($2, email),
      bio = COALESCE($3, bio),
      profile_image = COALESCE($4, profile_image),
      department_id = COALESCE ($5, department_id)
      WHERE id = $6
      RETURNING *;
      `,
      [name, email, bio, profile_image, department_id, id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Professor not found" });
    }

    res.json({ message: "Professor updated", professor: rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating professor" });
  }
});

module.exports = router;
