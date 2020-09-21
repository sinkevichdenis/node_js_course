CREATE TYPE permission_types AS ENUM ("READ", "WRITE", "DELETE", "SHARE", "UPLOAD_FILES");

CREATE TABLE Groups (
id SERIAL PRIMARY KEY NOT NULL,
name VARCHAR(50) NOT NULL,
permissions permission_types NOT NULL
);

INSERT INTO Groups (name, permissions)
VALUES ("Only-read", "READ"), ("Only-write", "WRITE");
