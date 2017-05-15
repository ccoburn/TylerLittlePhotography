select media.id, media.url, media.clientAlbum, media.SampleAlbum, samplealbums.name from media
join samplealbums on media.samplealbum = samplealbums.id
where media.type = 'photo'
