### Schema

CREATE DATABASE employee_db;
USE employee_db;

CREATE TABLE departments
(
    id INT AUTO_INCREMENT,
    name VARCHAR(30),
    PRIMARY KEY(id)
);

CREATE TABLE roles
(
    id INT AUTO_INCREMENT,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY (department_id) REFERENCES departments(id)
);

CREATE TABLE employees
(
	id int AUTO_INCREMENT,
	first_name varchar(30) NOT NULL,
    last_name varchar(30) NOT NULL,
	role_id int NOT NULL,
    manager_id int,
	PRIMARY KEY (id),
    FOREIGN KEY (role_id) REFERENCES roles(id)
);


