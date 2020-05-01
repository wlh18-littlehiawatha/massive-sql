select o.id as order_id, o.user_id, array_agg( p.id ) as products from orders o
join orders_products_join opj on o.id = opj.order_id
join products p on opj.product_id = p.id
group by o.id;