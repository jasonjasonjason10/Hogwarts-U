//This file is for everything department related. The GET routes are to view all departments by anyone visiting the page. The POST routes will be for admins only to delete, add or update.

const express = require("express");
const router = express.Router();
const client = require("../db/client");
const requireAdmin = require("../middleware/requireAdmin");

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

//PATCH/api/departments/:id -ADMIN ONLY!! this will lwt the admin make changes to the departments. NOTE: that we have :id so that will be a req.params not req.body NOTE: this is not to add or remove faculty from department, this is only to make changes to the department info.
router.patch("/:id", requireAdmin, async (req, res) => {
  const { id } = req.params;
  const { name, description, banner_image, contact_email } = req.body;

  try {
    const { rows } = await client.query(
      /*sql*/
      `
      UPDATE departments
      SET
      name = COALESCE ($1, name),
      description = COALESCE ($2, description),
      banner_image = COALESCE ($3, banner_image),
      contact_email =COALESCE ($4, contact_email)
      WHERE id = $5
      RETURNING *;
      `,
      [name, description, banner_image, contact_email, id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Department not found" });
    }

    res.json({ message: "Department updated", department: rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating Department" });
  }
});

//POST /api/departments
router.post("/", requireAdmin, async (req, res) => {
  const { name, description, banner_image, contact_email } = req.body;
  try {
    if (!name) {
      return res.status(400).json({ message: "Department name is required" });
    }

    const { rows } = await client.query(
      /*sql*/
      `
      INSERT INTO departments ( name, description, banner_image, contact_email)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
      `,
      [name, description, banner_image, contact_email]
    );

    res.status(201).json({ message: "Department created", department: rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating department" });
  }
});

//DELETE /api/departmens/:id
router.delete("/:id", requireAdmin, async (req, res) => {
  const { id } = req.params;

  try {
    //check if any faculty still belong to this departmen
    const { rows: faculty } = await client.query(/*sql*/ `SELECT * FROM faculty WHERE department_id = $1`, [id]);
    if (faculty.length > 0) {
      return res.status(400).json({
        message: "Can not delete department with assigned faculty",
      });
    }

    const { rows } = await client.query(/*sql*/ `DELETE FROM departments WHERE id = $1 RETURNING *;`, [id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Department not found" });
    }

    res.json({ message: "Department deleted", department: rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error deleting department" });
  }
});

module.exports = router;
