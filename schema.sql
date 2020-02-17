DROP DATABASE IF EXISTS employeesDB;

CREATE DATABASE employeesDB;

USE employeesDB;

CREATE TABLE employees
(
  id INT NOT NULL
  AUTO_INCREMENT,
  first_name VARCHAR (30) NOT NULL,
  last_name VARCHAR (30) NOT NULL,
  role_id INT NOT NULL,
  manager_id INT NULL,
  PRIMARY KEY(id)
);

  CREATE TABLE roles
  (
    id INT NOT NULL,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(10,2) NOT NULL,
    department_id INT NOT NULL,
    PRIMARY KEY (id)
  );

  CREATE TABLE departments
  (
    id INT NOT NULL,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
  );

  -- Inserted a set of records into the table
  INSERT INTO departments
    (id, name)
  VALUES
    ();

  INSERT INTO roles
    (id, title, salary, department_id)
  VALUES
    ();

  INSERT INTO employees
    (first_name, last_name, role_id, manager_id)
  VALUES
    ();

  SELECT *
  FROM departments;
  SELECT *
  FROM roles;
  SELECT *
  FROM employees;

  UPDATE departments
SET ____ = '', ____ = ''
WHERE ____ = _;

  UPDATE employees
SET ____ = '', ____ = ''
WHERE ____ = _;

  UPDATE roles
SET ____ = '', ____ = ''
WHERE ____ = _;

  SELECT top_albums.year, top_albums.album, top_albums.position, top5000.song, top5000.artist
  FROM top_albums INNER JOIN top5000 ON (top_albums.artist = top5000.artist AND top_albums.year = top5000.year) WHERE
  (top_albums.artist = ? AND top5000.artist = ?) ORDER BY top_albums.year, top_albums.position;

