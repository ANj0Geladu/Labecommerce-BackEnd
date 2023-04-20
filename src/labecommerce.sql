-- Active: 1680207880606@@127.0.0.1@3306
-- Active: 1680051755800@@127.0.0.1@3306
-- Active: 1680051755800@@127.0.0.1@3306

SELECT * FROM  usuarioxs;


CREATE TABLE usuarioxs (
id TEXT PRIMARY KEY UNIQUE NOT NULL,
email TEXT UNIQUE NOT NULL,
password TEXT NOT NULL
);

INSERT INTO usuarioxs (id, email, password) VALUES
('usuariox1', 'usuariox1@example.com', 'password1'),
('usuariox2', 'usuariox2@example.com', 'password2'),
('usuariox3', 'usuariox3@example.com', 'password3');

 

SELECT * FROM products;

-- INSERT INTO products ();

CREATE TABLE products (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    category TEXT NOT NULL
);

--------aprofundamento SQL

SELECT * FROM usuarioxs;

SELECT * FROM products;

INSERT INTO usuarioxs
 (id, email, password) 
 VALUES 
 ('usuariox4', 'usuariox4@example.com', 'password4');


INSERT INTO products 
(id, name, price, category) 
VALUES ('product1', 'Monitor LG 24"', 699.99, 'Eletrônicos');


SELECT * FROM products WHERE id = 'product1';
DELETE FROM usuarioxs WHERE id = 'usuariox4';
DELETE FROM products WHERE id = 'product1';


UPDATE usuarioxs SET email = 'new_email@example.com' WHERE id = 'usuariox1';


UPDATE products SET price = 799.99 WHERE id = 'product2';


SELECT * FROM usuarioxs ORDER BY email ASC;
SELECT * FROM products ORDER BY price ASC LIMIT 20 OFFSET 0;
SELECT * FROM products WHERE price BETWEEN 100.00 AND 300.00 ORDER BY price ASC;




