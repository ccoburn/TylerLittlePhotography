CREATE TABLE Users (
  id SERIAL PRIMARY KEY,
  username varchar(100),
  authid varchar(100),
  Admin boolean
  album integer references clientalbums(id)
);

INSERT into Users (username, authid, admin)
values (*, *, true);

CREATE TABLE ClientAlbums (
  id SERIAL PRIMARY KEY,
  Name varchar(40),
  JobDate date,
  cover varchar(500),
);

insert into ClientAlbums (Name, JobDate, cover)
  values ('Test Wedding', '2011-12-24', 'imgurl');


CREATE TABLE SampleAlbums (
  id SERIAL PRIMARY KEY,
  Name varchar(40),
  type varchar(40),
  cover varchar(500)

);

insert into SampleAlbums (name, type, cover)
  values ('Wedding', 'photo', 'imgurl'),
  ('Families', 'photo', 'imgurl'),
  ('Couples', 'photo', 'imgurl'),
  ('Weddings', 'video', 'imgurl'),
  ('Personal', 'video', 'imgurl'),
  ('Business', 'video', 'imgurl');


CREATE TABLE Media (
  id SERIAL PRIMARY KEY,
  Type varchar(40),
  url varchar(500),
  ClientAlbum integer references ClientAlbums(id),
  SampleAlbum integer references SampleAlbums(id)
);

insert into Media (Type, url, ClientAlbum, SampleAlbum)
  values ('photo', 'https://s3-us-west-2.amazonaws.com/tyler-little-photography/wedding-photography-30.jpg', 1, 1);
