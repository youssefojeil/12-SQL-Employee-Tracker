INSERT INTO department (name)
VALUES ("Engineering"),
       ("Finance"),
       ("Legal"),
       ("Sales");

INSERT INTO roles (title, salary, department_id)
VALUES ("Sales Lead", 100000, 4),
       ("Lead Engineer", 150000, 1),
       ("Product Engineer", 90000, 1),
       ("Lawyer", 135000, 3),
       ("Account Manager", 85000, 2),
       ("Program Manager", 95000, 2),
       ("Cloud Developer", 95000, 1);



INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("John", "Doe", 3, 2),
       ("James", "Smith", 4, 6),
       ("Maria","Garcia", 1, 0),
       ("James", "Johnson", 6, 2);
