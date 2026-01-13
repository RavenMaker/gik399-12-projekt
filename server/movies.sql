DROP TABLE IF EXISTS movies;
CREATE TABLE IF NOT EXISTS movies (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title VARCHAR(60) NOT NULL,
    year YEAR NOT NULL,
    category VARCHAR(40) NOT NULL
);

INSERT INTO movies (id,title, year, category) VALUES (1,'Sagan om att klara av kursen', 2026, 'GIK399-Grupp 12');
INSERT INTO movies (id,title, year, category) VALUES (2, 'Shutter Island', 2010, 'Psychological Thriller');
INSERT INTO movies (id,title, year, category) VALUES (3,'The Lord of the Rings: The Two Towers', 2002, 'Fantasy');
INSERT INTO movies (id,title, year, category) VALUES (4,'Saving Private Ryan', 1998, 'War');
INSERT INTO movies (id,title, year, category) VALUES (5,'The Wolf of Wall Street', 2013, 'Comedy');
INSERT INTO movies (id,title, year, category) VALUES (6,'Josee, the Tiger and the Fish', 2020, 'Romantic comedy');
INSERT INTO movies (id,title, year, category) VALUES (7,'Inception', 2010, 'Science Fiction');
INSERT INTO movies (id,title, year, category) VALUES (8,'The Dark Knight', 2008, 'Action');
INSERT INTO movies (id,title, year, category) VALUES (9,'Forrest Gump', 1994, 'Drama');
INSERT INTO movies (id,title, year, category) VALUES (10,'Parasite', 2019, 'Thriller');
INSERT INTO movies (id,title, year, category) VALUES (11,'Interstellar', 2014, 'Science Fiction');
INSERT INTO movies (id,title, year, category) VALUES (12,'Gladiator', 2000, 'Historical Drama');
INSERT INTO movies (id,title, year, category) VALUES (13,'Avatar', 2014, 'Sci-fi Action');
INSERT INTO movies (id,title, year, category) VALUES (14,'Happy Gilmore ', 1996, 'Comedy');
