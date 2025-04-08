DROP TABLE IF EXISTS faculty;
DROP TABLE IF EXISTS  departments;
DROP TABLE IF EXISTS admins;

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