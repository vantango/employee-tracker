DROP DATABASE IF EXISTS employees_db;

CREATE DATABASE employees_db;

USE employees_db;

CREATE TABLE department (
    id INT AUTO_INCREMENT NOT NULL,
    name VARCHAR (30) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE role (
    id INT AUTO_INCREMENT NOT NULL,
    title VARCHAR (30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE employee (
    id INT AUTO_INCREMENT NOT NULL,
    first_name VARCHAR (30) NOT NULL,
    last_name VARCHAR (30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT,
    PRIMARY KEY (id)
);




-- INSERT INTO songs (title, artist, genre)
-- VALUES ("Never Gonna Give You Up", "Rick Astley", "80's Pop");

-- INSERT INTO songs (title, artist, genre)
-- VALUES ("Bohemian Rhapsody", "Queen", "Rock");

-- INSERT INTO songs (title, artist, genre)
-- VALUES ("Tommy's Theme", "Noisia", "Drum & Bass");

-- SELECT * FROM employees_db.songs;