import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import { HashRouter } from "react-router-dom";
import Views from "./components/Views";
import UserContext from "./components/AccountContext";
import NavBar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <UserContext>
        <HashRouter>
          <NavBar />
          <Views />
          <Footer />
        </HashRouter>
      </UserContext>
    </>
  );
}

export default App;
