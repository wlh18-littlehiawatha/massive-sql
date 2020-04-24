update suppliers
set supplier_name = $2,
    address = $3
where id = $1
returning *;