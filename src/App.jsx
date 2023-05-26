import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Views from "./components/Views";

function App() {
  return (
    <>
      <BrowserRouter>
        <p>App</p>
        <Views />
      </BrowserRouter>
    </>
  );
}

export default App;
