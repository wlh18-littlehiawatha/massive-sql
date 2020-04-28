insert into orders_products_join (
  order_id,
  product_id
) values (
  $1,
  $2
)
returning *;