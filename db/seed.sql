INSERT INTO department (name)
VALUES ("Engineering"),
       ("Finance"),
       ("Legal"),
       ("Sales");

INSERT INTO roles (title, salary, department_id)
VALUES ("Sales Lead", 100000, 800),
       ("Lead Engineer", 150000, 776),
       ("Product Engineer", 90000, 776),
       ("Lawyer", 135000, 400),
       ("Account Manager", 85000, 500),
       ("Program Manager", 95000, 500),
       ("Cloud Developer", 95000, 774);



INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("John", "Doe", 100, 20),
       ("James", "Smith", 20, 400),
       ("Maria","Garcia", 10, 20),
       ("James", "Johnson" 15, 400),
