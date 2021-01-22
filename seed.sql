USE employees_db;

INSERT INTO department (name)
VALUES ("Engineering");

INSERT INTO role (title, salary, department_id)
VALUES ("Manager", 150000, 1), ("Software Engineer", 120000, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Ron", "Swanson", 1, NULL), ("John", "Doe", 2, 1);

SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;

-- INSERT * FROM department;
-- INSERT * FROM role;
-- INSERT * FROM employee;