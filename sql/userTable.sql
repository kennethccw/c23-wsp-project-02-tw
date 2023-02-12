DROP TABLE IF EXISTS each_processing;
DROP TABLE IF EXISTS products_rates_map;
-- DROP TABLE IF EXISTS purchase_record_products_map;
-- DROP TABLE IF EXISTS purchase_record_map;
DROP TABLE IF EXISTS purchase_record;
DROP TABLE IF EXISTS decision;
DROP TABLE IF EXISTS comments;
-- DROP TABLE IF EXISTS shopping_cart;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS rates;
DROP TABLE IF EXISTS category;
DROP TABLE IF EXISTS brands;
DROP TABLE IF EXISTS origin;
DROP TABLE IF EXISTS users;
CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  username VARCHAR(255),
  password VARCHAR(255),
  email VARCHAR(255),
  mobile INT,
  birthday date,
  subscription BOOLEAN
);
CREATE TABLE origin (id SERIAL PRIMARY KEY, name VARCHAR(255));
CREATE TABLE brands (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255),
  decription VARCHAR(255)
);
CREATE TABLE category (id SERIAL PRIMARY KEY, name VARCHAR(255));
CREATE TABLE purchase_record (
  id SERIAL PRIMARY KEY NOT NULL,
  create_date date,
  delivery_status VARCHAR(255)
);
CREATE TABLE rates (id SERIAL PRIMARY KEY NOT NULL, score int);
CREATE TABLE products (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255),
  image VARCHAR(255),
  description VARCHAR(255),
  price decimal,
  stock boolean,
  updated_at date,
  sales_quantity integer,
  origin_id integer,
  brands_id integer,
  category_id integer,
  FOREIGN KEY (origin_id) REFERENCES origin(id),
  FOREIGN KEY (brands_id) REFERENCES brands(id),
  FOREIGN KEY (category_id) REFERENCES category(id)
);
CREATE TABLE comments (
  id SERIAL PRIMARY KEY NOT NULL,
  comments VARCHAR(255),
  product_id integer,
  FOREIGN KEY (product_id) REFERENCES products(id)
);
CREATE TABLE decision (
  id SERIAL PRIMARY KEY NOT NULL,
  quantity integer,
  total_price_per_product decimal,
  created_date date,
  users_id integer,
  product_id integer,
  FOREIGN KEY (users_id) REFERENCES users(id),
  FOREIGN KEY (product_id) REFERENCES products(id)
);
CREATE TABLE products_rates_map (
  id SERIAL PRIMARY KEY NOT NULL,
  products_id integer,
  rates_id integer,
  FOREIGN KEY (products_id) REFERENCES products(id),
  FOREIGN KEY (rates_id) REFERENCES rates(id)
);
CREATE TABLE each_processing (
  id SERIAL PRIMARY KEY NOT NULL,
  purchase_record_id integer,
  product_id integer,
  users_id integer,
  FOREIGN KEY (purchase_record_id) REFERENCES purchase_record(id),
  FOREIGN KEY (product_id) REFERENCES products(id),
  FOREIGN KEY (users_id) REFERENCES users(id)
);

/* ............. build users table ................................. */
-- SELECT *
-- FROM users;
-- INSERT INTO users (
--     username,
--     email,
--     password,
--     subscription,
--     birthday,
--     mobile
--   )
-- VALUES (
--     'kennethccw',
--     'kennethccw1998@gmail.com',
--     '1234',
--     true,
--     '1998-10-17',
--     92153298
--   ),
--   (
--     'abc',
--     'abc@gmail.com',
--     '2345',
--     true,
--     '2000-10-18',
--     12345678
--   ),
--   (
--     'bcd',
--     'bcd@gmail.com',
--     '3456',
--     true,
--     '2000-11-18',
--     87654321
--   );
-- /* ...............build brands table............................... */
-- SELECT *
-- FROM brands;
-- INSERT INTO brands (name, decription)
-- VALUES ('ichiran', 'since 1990'),
--   ('NISSIN', 'since 1800'),
--   ('NONG-SHIM_SHIN', 'since 1700')
--   /* ................. build orderPerTime table .................................... */
-- SELECT *
-- FROM purchase_record;
-- INSERT INTO  purchase_record(
--     total_price,
--     create_date,
--     delivery_status,
--     comment,
--     users_id
--   )
-- VALUES (
--     '123.3',
--     '2020-01-01',
--     1,
--     'very good',
--     1
--   ),
--   (
--     '200',
--     '2021-02-01',
--     0,
--     'ok',
--     2
--   ),
--   (
--     '350',
--     '2022-03-01',
--     0,
--     'nice',
--     3
--   )
--   /* .................build products table .................... */
-- SELECT *
-- FROM products;
-- INSERT INTO products (
--     name,
--     image,
--     description,
--     price,
--     stock,
--     updated_at,
--     sales_quantity,
--     origin_id,
--     brands_id,
--     category_id
--   )
-- VALUES (
--     'ichiranTonkotsu noodles',
--     'ichiranTonkotsu.jpg',
--     'a nice noodles',
--     20.1,
--     300,
--     '2022-11-01',
--     300000,
--     1,
--     1,
--     1
--   ),
--   (
--     'NISSIN_NOODLE_SEAFOOD noodles',
--     'NISSIN_NOODLE_SEAFOOD.jpg',
--     'a BAD noodles',
--     203.1,
--     300,
--     '2022-10-01',
--     60000,
--     2,
--     2,
--     1
--   ),
--   (
--     'NONG_SHIM_SHIN_RAMEN',
--     'NONG_SHIM_SHIN_RAMEN.jpg',
--     'a PERFECT noodles',
--     50.1,
--     300,
--     '2022-09-01',
--     300000000,
--     3,
--     3,
--     1
--   )
--   /* .......... build origin table...... */
-- SELECT *
-- FROM origin;
-- INSERT INTO origin (name)
-- VALUES ('japan'),
--   ('china'),
--   ('usa')
--   /* ........... build category table .... */
-- SELECT *
-- FROM category;
-- INSERT INTO category (name)
-- VALUES ('cupNoodles'),
--   ('drinks'),
--   ('snacks')
--   /* .......... build rates table .....*/
-- SELECT *
-- FROM rates;
-- INSERT INTO rates (score)
-- VALUES (1),
--   (2),
--   (3),
--   (4),
--   (5)
-- /* UPDATE students SET level = level+5 WHERE date_of_birth < '1990-01-01'; */
-- /* DELETE FROM students WHERE level < 15; */