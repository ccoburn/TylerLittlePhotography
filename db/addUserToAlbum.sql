update clientalbums
set client = $1
where id = $2;
