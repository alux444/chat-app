CREATE TABLE users (  
  id BIGSERIAL PRIMARY KEY,
  username VARCHAR(20) NOT NULL UNIQUE,
  password VARCHAR NOT NULL,
)

CREATE TABLE messages (
  id BIGSERIAL PRIMARY KEY,
  message VARCHAR(250) NOT NULL,
  username VARCHAR(20) NOT NULL,
)

INSERT INTO users(username, password) VALUES($1, $2)