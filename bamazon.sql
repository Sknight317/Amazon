DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
    item_id INT AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(45) NULL,
    product_sales DECIMAL(5,2) NOT NULL DEFAULT '0',
    department_name VARCHAR(45) NULL,
    price DECIMAL(5,2),
    stock_quantity INT(5),
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Halloween Bucket", "Toys", 5.99, 76);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Baby Alive Doll", "Toys", 19.99, 64);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Patio Table and Chairs Set", "Outdoor", 58.99, 54);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Princess Storytime Books (Set of 4)", "Toys", 5.99, 76);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Car Trunk Organizer", "Home", 15.99, 49);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Inflatable Pool Raft", "Outdoor", 13.00, 51);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Striped Beach Towel (Set of 2)", "Accessories", 12.00, 62);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Luggage Tags (Set of 4)", "Travel", 4.00, 91);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Luggage Travel Cubes (Set of 4)", "Travel", 12.99, 94);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Black Hardshell Suitcase", "Travel", 75.99, 37);