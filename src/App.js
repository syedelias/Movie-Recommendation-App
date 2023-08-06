import logo from "./logo.svg";
import "./App.css";
import Header from "./Components/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import LogIn from "./Components/LogIn";
import SingUp from "./Components/SignUp";
import ViewMovie from "./Components/ViewMovie";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Header />} />
          <Route path="/signUp" element={<SingUp />} />
          <Route path="/logIn" element={<LogIn />} />
          <Route path="/review/:id" element={<ViewMovie />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
