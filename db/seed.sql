INSERT INTO department (department_id, department_name) 
VALUES (1, 'Information Technology');

INSERT INTO roles (role_id, employee_title, employee_salary, department_id)
VALUES (1, 'Manager', 100000, 1);

INSERT INTO employee(employee_id, first_name, last_name, role_id, manager_id)
VALUES (1, 'James', 'Li', 1, 1);