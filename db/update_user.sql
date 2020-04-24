update users
set email = $2
where id = $1
returning id, email;