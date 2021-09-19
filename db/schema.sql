DROP DATABASE IF EXISTS ems_db;
CREATE DATABASE ems_db;

USE ems_db;

CREATE TABLE department (
  department_id INT AUTO_INCREMENT NOT NULL,
  department_name VARCHAR(30) NULL,
  PRIMARY KEY (department_id)
);

CREATE TABLE roles (
  role_id INT AUTO_INCREMENT NOT NULL,
  employee_title VARCHAR(30) NOT NULL,
  employee_salary DECIMAL NOT NULL,
  department_id INT NOT NULL,
  PRIMARY KEY (role_id),
  FOREIGN KEY (department_id) REFERENCES department(department_id)
);

CREATE TABLE employee (
  employee_id INT AUTO_INCREMENT NOT NULL,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT NOT NULL,
  manager_id INT,
  PRIMARY KEY (employee_id),
  FOREIGN KEY (role_id) REFERENCES roles(role_id),
  FOREIGN KEY (manager_id) REFERENCES employee(employee_id)
);

