create table users (
  id serial primary key,
  email varchar(255),
  hash text
);

create table user_info (
  id serial primary key,
  first_name varchar(100),
  middle_name varchar(10),
  last_name varchar(100),
  phone_number varchar(50),
  user_id int unique references users(id)
);

create table products (
  id serial primary key,
  product_name varchar(100),
  price int
);

create table orders (
  id serial primary key,
  user_id int references users(id)
);

create table orders_products_join (
  order_id int references orders(id),
  product_id int references products(id)
);

create table suppliers (
  id serial primary key,
  supplier_name varchar(100),
  address text
);