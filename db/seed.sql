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
VALUES ("John", "Doe", 100, 20),
       ("James", "Smith", 20, 400),
       ("Maria","Garcia", 10, 20),
       ("James", "Johnson", 15, 400);
