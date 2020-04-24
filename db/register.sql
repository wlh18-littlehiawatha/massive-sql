insert into users (
  email,
  hash
) values (
  $1,
  $2
)
returning *;