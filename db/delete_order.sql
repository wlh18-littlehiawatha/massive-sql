delete from orders_products_join
where order_id = $1;

delete from orders
where id = $1
returning *;