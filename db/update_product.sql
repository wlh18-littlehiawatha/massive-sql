update products
set product_name = $2,
    price = $3
where id = $1
returning *;