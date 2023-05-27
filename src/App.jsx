import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Views from "./components/Views";
import UserContext from "./components/AccountContext";

function App() {
  return (
    <>
      <UserContext>
        <BrowserRouter>
          <p>App</p>
          <Views />
        </BrowserRouter>
      </UserContext>
    </>
  );
}

export default App;
