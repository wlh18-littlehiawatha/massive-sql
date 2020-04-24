# Foreign Key Related Errors

### You cannot insert a foreign key that does not exist on the referenced table:

```
insert or update on table "table_a" violates foreign key constraint "table_b_table_a_id_fkey"
```

#### Example: 

```sql
create table users (
  id serial primary key,
  email varchar(255),
  password text
);

create table user_info (
  id serial primary key,
  first_name varchar(100),
  last_name varchar(100),
  phone_number varchar(50),
  user_id int unique references users(id)
);

insert into users (
  email,
  password
) values (
  'john@john.com',
  'passwordASDF'
);

insert into user_info (
  first_name,
  last_name,
  user_id
) values (
  'John',
  'Redd',
  100
);
```

The above code would result in the following error:

```
insert or update on table "user_info" violates foreign key constraint "user_info_user_id_fkey"
```

because there is not a primary key with a value of 100 on the users table as it currently stands.

Replacing the last insert statement with this: 

```sql
insert into user_info (
  first_name,
  last_name,
  user_id
) values (
  'John',
  'Redd',
  1
);
```

would result in an acceptable insertion because there is a primary key with the value of 1 in the users table.


### You cannot delete a row that has rows on other tables that currently depend on it.

```
update or delete on table "table_a" violates foreign key constraint "table_b_table_a_id_fkey" on table "table_b"
```

#### Example:

```sql
create table users (
  id serial primary key,
  email varchar(255),
  password text
);

create table user_info (
  id serial primary key,
  first_name varchar(100),
  last_name varchar(100),
  phone_number varchar(50),
  user_id int unique references users(id)
);

insert into users (
  email,
  password
) values (
  'john@john.com',
  'passwordASDF'
);

insert into user_info (
  first_name,
  last_name,
  user_id
) values (
  'John',
  'Redd',
  1
);

delete from users
where id = 1;
```

The above code would result in the following error:

```
update or delete on table "users" violates foreign key constraint "user_info_user_id_fkey" on table "user_info"
```

because user_info has row that refers to and depends on the row on users that has the primary key with a value of 1. We must first delete the dependent rows before we can delete the row with dependents. Replacing the delete statement from above with the follow will result in a proper deletion.

```sql
delete from user_info
where user_id = 1;

delete from users
where id = 1;
```