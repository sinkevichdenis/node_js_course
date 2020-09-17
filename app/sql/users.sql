CREATE TABLE Users (
id SERIAL PRIMARY KEY NOT NULL,
login VARCHAR(50) NOT NULL,
password VARCHAR(50) NOT NULL,
age INTEGER NOT NULL,
is_deleted BOOLEAN DEFAULT false
);

INSERT INTO Users (login, password, age)
VALUES ("test", "test", 10), ("test1", "test1", 11), ("test2", "test2", 12), ("nick", "nick1990", 20);
