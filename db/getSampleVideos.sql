select media.type, media.url, media.samplealbum, samplealbums.name from media
join samplealbums on media.samplealbum = samplealbums.id
where samplealbum = $1;
