# chat-app
This is a fullstack chat app created with ReactJS, styled with MaterialsUI. The backend server uses ExpressJS,, SocketIO and Redis for managing user sessions. The user database is stored in PostgreSQL.

# To run locally:
1. Ensure your device has Postgres installed.
 - In your postgres database, create these tables: 

CREATE TABLE users (  
  id BIGSERIAL PRIMARY KEY,
  username VARCHAR(20) NOT NULL UNIQUE,
  password VARCHAR NOT NULL,
);

CREATE TABLE messages (
  id BIGSERIAL PRIMARY KEY,
  message VARCHAR(500) NOT NULL,
  username VARCHAR(20) NOT NULL,
  time DATE NOT NULL,
  chatroom VARCHAR(20) NOT NULL
);

2. npm install (installs dependencies from package.json)

3. Create .env file in the project folder with:

VITE_DATABASE_NAME=(Your database name here)

VITE_DATABASE_HOST=(Your database hostname here)

VITE_DATABASE_USER=(Your database username here)

VITE_DATABASE_PASSWORD=(Your database password here)

VITE_DATABASE_PORT=5432 (Default postgres port)

COOKIE_SECRET=(Your cookie here (can be any random string))

CLIENT_URL=http://localhost:5173 (Default Vite port)

VITE_SERVER_URL=http://localhost:4000 

NODE_ENV=production

PORT=4000

4. npm test (starts the local server)
5. npm run dev (starts the app)
