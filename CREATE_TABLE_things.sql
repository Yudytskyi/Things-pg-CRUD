DROP TABLE IF EXISTS things_db;

CREATE TABLE things (
    id serial PRIMARY KEY,
    body text NOT NULL CHECK (body !~ '^\s*$'),
    "createdAt" timestamp DEFAULT current_timestamp,
    "updatedAt" timestamp
);

ALTER TABLE
    things_db DROP CONSTRAINT "things_db_body_check";

ALTER TABLE
    things_db
ADD
    CONSTRAINT "things_db_body_check" CHECK (body !~ '^\s*$');