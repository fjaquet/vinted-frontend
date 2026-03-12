import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home";

import "./App.css";
import OfferPage from "./pages/Offer";
import Header from "./components/Header";
import SignupPage from "./pages/Signup";
import LoginPage from "./pages/Login";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/offer/:id" element={<OfferPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
