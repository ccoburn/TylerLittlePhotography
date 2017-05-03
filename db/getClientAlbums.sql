select clientalbums.id, clientalbums.name, clientalbums.jobdate, clientalbums.cover, users.username from ClientAlbums
join users on clientalbums.client = users.id
where client = $1
