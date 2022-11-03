--job title, role id, department & salary
SELECT  roles.id, roles.title, roles.department_id, department.name, roles.salary
FROM roles
JOIN department ON roles.department_id = department.id;

-- employees
-- employee id, first name, last name, job title, department, salary and manager

SELECT employee.id, employee.first_name, employee.last_name, employee.role_id, roles.title, roles.salary, roles.department_id, department.name
FROM employee
JOIN roles ON roles.id = employee.role_id
JOIN department ON roles.department_id = department.id;