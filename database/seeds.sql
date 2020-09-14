USE employee_db;

INSERT INTO departments (name) VALUES ('Sales');
INSERT INTO departments (name) VALUES ('Financial');
INSERT INTO departments (name) VALUES ('Human Recources');
INSERT INTO departments (name) VALUES ('Technology');
INSERT INTO departments (name) VALUES ('Legal');



INSERT INTO roles (title, salary, department_id) VALUES ('Sales Manager', '50000', '1');
INSERT INTO roles (title, salary, department_id) VALUES ('Sales Associate', '30000', '1');
INSERT INTO roles (title, salary, department_id) VALUES ('CFO', '120000', '2');
INSERT INTO roles (title, salary, department_id) VALUES ('
Accountant', '80000', '2');
INSERT INTO roles (title, salary, department_id) VALUES ('HR Rep', '50000', '3');
INSERT INTO roles (title, salary, department_id) VALUES ('Tech Lead', '110000', '4');
INSERT INTO roles (title, salary, department_id) VALUES ('Front-end Developer', '55000', '4');
INSERT INTO roles (title, salary, department_id) VALUES ('Lawyer', '110000', '5');
INSERT INTO roles (title, salary, department_id) VALUES ('Paralegal', '90000', '5');



INSERT INTO employees (first_name, last_name, role_id) VALUES ('Mike', 'Rotchburns', '1');
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('Ila', 'Vainal', '2', '1');
INSERT INTO employees (first_name, last_name, role_id) VALUES ('Ivana', 'Tinkle', '3');
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('Bob', 'Suruncle', '4', '3');
INSERT INTO employees (first_name, last_name, role_id) VALUES ('Anita', 'Bath', '5');
INSERT INTO employees (first_name, last_name, role_id) VALUES ('Jobe', 'Low', '6');
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('Harry', 'Azcrac', '7', '6');
INSERT INTO employees (first_name, last_name, role_id) VALUES ('Wayne', 'Kerr', '8');
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('Lee', 'Keyrear', '9', '8');


