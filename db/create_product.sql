insert into products (
  product_name,
  price
) values (
  $1,
  $2
)
returning *;