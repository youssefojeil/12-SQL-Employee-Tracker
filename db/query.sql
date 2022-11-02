--job title, role id, department & salary
SELECT  roles.id, roles.title, roles.department_id, department.name, roles.salary
FROM roles
JOIN department ON roles.department_id = department.id;