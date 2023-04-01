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