select users.id, users.username, users.album, clientalbums.name, clientalbums.jobdate, clientalbums.cover from Users
join clientalbums on clientalbums.id = users.album
where users.id = $1
