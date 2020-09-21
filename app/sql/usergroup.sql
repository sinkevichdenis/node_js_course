CREATE TABLE UserGroup (
id SERIAL PRIMARY KEY NOT NULL,
user_id INTEGER REFERENCES Users (id),
group_id INTEGER REFERENCES Groups (id)
);

INSERT INTO UserGroup (user_id, group_id)
VALUES (6, 1), (4, 2);
