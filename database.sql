CREATE TABLE users (  
  id BIGSERIAL PRIMARY KEY,
  username VARCHAR(20) NOT NULL UNIQUE,
  password VARCHAR NOT NULL,
)

INSERT INTO users(username, password) VALUES($1, $2)