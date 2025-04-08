const client = require("./client");
require("dotenv").config();

async function dropTables() {
  console.log("Dropping all tables..."); ///DELETE CONSOLE LOG
  await client.query(`
        DROP TABLE IF EXISTS faculty;
        DROP TABLE IF EXISTS departments;
        DROP TABLE IF EXISTS admins;
        `);
}

async function createTables() {
  console.log("Creating Tables..."); ////DELETE CONSOLE LOG
  await client.query(`
        CREATE TABLE departments (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL, 
        description TEXT, 
        banner_image TEXT, 
        contact_email TEXT
     );
       
        CREATE TABLE faculty (
        id SERIAL PRIMARY KEY, 
        name TEXT NOT NULL,
        email TEXT,
        bio TEXT, 
        profile_image TEXT, 
        department_id INTEGER REFERENCES departments(id)
     );

        CREATE TABLE admins (
        id SERIAL PRIMARY KEY, 
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL 
     );
  `);
}

async function seedData() {
  console.log("Seeding departments..."); ////DELETE CONSOLE LOG
  const { rows: departments } = await client.query(`
        INSERT INTO departments (name, description, banner_image, contact_email)
        VALUES 
          ('Defense Against the Dark Arts', 'Curses, Counter-Curses, and Defensive Magic.', 'dada.jpg', 'dada@hogwarts.edu'),
          ('Potions', 'The subtle science and exact art of potion-making.', 'potions.jpg', 'potions@hogwarts.edu'),
          ('Transfiguration', 'Changing the form and appearance of an object.', 'transfiguration.jpg', 'mcgonagall@hogwarts.edu')
      RETURNING *;
    `);

  console.log("Seeding faculty..."); ////DELETE CONSOLE LOG
  await client.query(`
      INSERT INTO faculty (name, email, bio, profile_image, department_id)
      VALUES 
         ('Severus Snape', 'snape@hogwarts.edu', 'Master of Potions.', 'snape.jpg', ${departments[1].id}),
         ('Remus Lupin', 'lupin@hogwarts.edu', 'Werewolf and DADA professor.', 'lupin.jpg', ${departments[0].id}),
         ('Minerva McGonagall', 'mcgonagall@hogwarts.edu', 'Strict but fair head of Transfiguration.', 'mcgonagall.jpg', ${departments[2].id});
    `);
}

async function seed() {
  try {
    await dropTables();
    await createTables();
    await seedData();
    console.log("Seeding complete");
  } catch (err) {
    console.error("Error seeding DB:", err);
  } finally {
  }
}

seed();
