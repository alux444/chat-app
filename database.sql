CREATE TABLE users (  
  id BIGSERIAL PRIMARY KEY,
  username VARCHAR(20) NOT NULL UNIQUE,
  password VARCHAR NOT NULL,
)

CREATE TABLE messages (
  id BIGSERIAL PRIMARY KEY,
  message VARCHAR(500) NOT NULL,
  username VARCHAR(20) NOT NULL,
  time DATE NOT NULL,
  chatroom VARCHAR(20) NOT NULL
)

INSERT INTO users(username, password) VALUES($1, $2)
INSERT INTO messages(message, username) VALUES($1, $2)