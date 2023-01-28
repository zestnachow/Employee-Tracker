INSERT INTO department (name)
VALUES ("Executive"),
("Sales"),
("Engineering"),
("Finance"),
("Legal");

INSERT INTO role (title, salary, department_id)
VALUES ("CEO", 1000000, 1), 
("Sales Lead", 100000, 2),
("Salesperson", 80000, 2),
("Lead Engineer", 150000, 3),
("Software Engineer", 120000, 3),
("Account Manager", 160000, 4),
("Accountant", 125000, 4),
("Legal Team Lead", 250000, 5),
("Lawyer", 190000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Zach", "Weston", 1, NULL),
("Don", "Draper", 2, 1),
("Willy", "Loman", 3, 2),
("Tony", "Stark", 4, 1),
("Elliot", "Alderson", 5, 4),
("Hermes", "Conrad", 6, 1),
("Skyler", "White", 7, 6),
("Elle", "Woods", 8, 1),
("Atticus", "Finch", 9, 8);

