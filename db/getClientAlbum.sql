select media.type, media.url, media.clientalbum, clientalbums.name from media
join clientalbums on media.clientalbum = clientalbums.id
where clientalbum = $1;
