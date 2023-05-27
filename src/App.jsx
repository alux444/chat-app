import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import Views from "./components/Views";
import UserContext from "./components/AccountContext";

function App() {
  return (
    <>
      <UserContext>
        <Router>
          <p>App</p>
          <Views />
        </Router>
      </UserContext>
    </>
  );
}

export default App;
