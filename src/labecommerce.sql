-- Active: 1680207880606@@127.0.0.1@3306
-- Active: 1680051755800@@127.0.0.1@3306
-- Active: 1680051755800@@127.0.0.1@3306

SELECT * FROM  usuarioxs;

--usuários
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




-- INSERT INTO products 
-- (id, name, price, category) 
-- VALUES 
-- -- ('product1', 'Monitor LG 24', 699.99, 'Eletrônicos');


INSERT INTO products 
(id, name, price, category)
VALUES
('produto2', 'lampada', 651.94, 'Eletrônicos');


INSERT INTO products (id, name, price, category)
VALUES ('product2', 'lampada', 651.94, 'Eletrônicos');
 
SELECT * FROM products;

DELETE FROM usuarioxs WHERE id = 'usuariox4';
DELETE FROM products WHERE id = 'produto2';


UPDATE usuarioxs SET email = 'new_email@example.com' WHERE id = 'usuariox1';

UPDATE products SET price = 799.99 WHERE id = 'product2';


SELECT * FROM usuarioxs ORDER BY email ASC;
SELECT * FROM products ORDER BY price ASC LIMIT 20 OFFSET 0;
SELECT * FROM products WHERE price BETWEEN 100.00 AND 300.00 ORDER BY price ASC;



CREATE TABLE purchases (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    total_price REAL NOT NULL,
    paid INTEGER NOT NULL,
    delivered_at TEXT,
    buyer_id TEXT NOT NULL,
    FOREIGN KEY (buyer_id) REFERENCES usuarioxs (id)
);

-- Set the default value for "paid" to 0 (false)
ALTER TABLE purchases ADD DEFAULT 0 TO paid;


INSERT INTO purchases (id, total_price, paid, delivered_at, buyer_id)
VALUES
('pedido1', RANDOM()*500, 0, null, 'usuariox1'),
('pedido2', RANDOM()*500, 0, null, 'usuariox1'),
('pedido3', RANDOM()*500, 0, null, 'usuariox2'),
('pedido4', RANDOM()*500, 0, null, 'usuariox2'),
('pedido5', RANDOM()*500, 0, null, 'usuariox3'),
('pedido6', RANDOM()*500, 0, null, 'usuariox3');


UPDATE purchases SET delivered_at = DATETIME('now') WHERE id = 'pedido1';


SELECT purchases.id, purchases.total_price, purchases.paid, purchases.delivered_at, products.name, products.price, products.category
FROM purchases
JOIN products ON purchases.id = products.id
WHERE purchases.buyer_id = 'usuariox1'
ORDER BY purchases.delivered_at DESC;