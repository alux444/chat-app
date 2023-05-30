import React from "react";

const About = () => {
  return (
    <div>
      <p>This is a simple chat app project.</p>
      <p>
        It was created with ReactJS for frontend and MaterialsUI for the styling
      </p>
      <p>PostgreSQL is used for the databasing for users and messages.</p>
      <p>
        The server uses ExpressJS, Redis and SocketsIO for live communication
        and session storage.
      </p>

      <div>
        The source code of this app can be found{" "}
        <a
          href="https://github.com/alux444/chat-app"
          target="_blank"
          rel="noreferrer"
        >
          here
        </a>
      </div>
    </div>
  );
};

export default About;
