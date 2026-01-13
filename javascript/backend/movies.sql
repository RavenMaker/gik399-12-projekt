DROP TABLE IF EXISTS movies;
CREATE TABLE IF NOT EXISTS movies (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    year INTEGER NOT NULL,
    category TEXT NOT NULL,
    director TEXT NOT NULL
);

INSERT INTO movies (title, year, category, director) VALUES ('Shutter Island', 2009, 'Psychological Thriller', 'Martin Scorsese');
INSERT INTO movies (title, year, category, director) VALUES ('The Lord of the Rings: The Two Towers', 2002, 'Fantasy', 'Peter Jackson');
INSERT INTO movies (title, year, category, director) VALUES ('Saving Private Ryan', 1998, 'War', 'Steven Spielberg');
INSERT INTO movies (title, year, category, director) VALUES ('The Wolf of Wall Street', 2013, 'Comedy', 'Martin Scorsese');
INSERT INTO movies (title, year, category, director) VALUES ('Josee, the Tiger and the Fish', 2020, 'Romantic comedy', 'Kôtarô Tamura');
INSERT INTO movies (title, year, category, director) VALUES ('Inception', 2010, 'Science Fiction', 'Christopher Nolan');
INSERT INTO movies (title, year, category, director) VALUES ('The Dark Knight', 2008, 'Action', 'Christopher Nolan');
INSERT INTO movies (title, year, category, director) VALUES ('Forrest Gump', 1994, 'Drama', 'Robert Zemeckis');
INSERT INTO movies (title, year, category, director) VALUES ('Parasite', 2019, 'Thriller', 'Bong Joon-ho');
INSERT INTO movies (title, year, category, director) VALUES ('Interstellar', 2014, 'Science Fiction', 'Christopher Nolan');
INSERT INTO movies (title, year, category, director) VALUES ('Gladiator', 2000, 'Historical Drama', 'Ridley Scott');
insert into movies (title, year, category director ) VALUES ("sagaon om att klara kursen", 2026, "GIK399", "grupp 12");

-- Hämtar alla filmer--
Select * from movies;

--Hämtar bara Science Fiction filmer --
Select * FROM movies WHERE category = 'Science Fiction';

-- Sorterar filmer efter år--
Select * From movies ORDER BY YEAR DESC;

--Uppdate--
UPDATE movies
SET year = 2010
WHERE title = 'Shutter Island';

--Delete--
Delete FROM movies
WHERE title = 'inception'


