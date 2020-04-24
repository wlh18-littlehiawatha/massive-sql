insert into suppliers (
  supplier_name,
  address
) values (
  $1,
  $2
)
returning *;