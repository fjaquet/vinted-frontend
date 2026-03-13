import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import HomePage from "./pages/Home";

import "./App.css";
import OfferPage from "./pages/Offer";
import Header from "./components/Header";
import SignupPage from "./pages/Signup";
import LoginPage from "./pages/Login";

function App() {
  const [filterTitle, setFilterTitle] = useState("");
  const [ascPrice, setAscPrice] = useState(true);
  const [prices, setPrices] = useState([0, 200]);

  return (
    <>
      <Router>
        <Header
          filterTitle={filterTitle}
          setFilterTitle={setFilterTitle}
          ascPrice={ascPrice}
          setAscPrice={setAscPrice}
          prices={prices}
          setPrices={setPrices}
        />
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                filterTitle={filterTitle}
                ascPrice={ascPrice}
                prices={prices}
              />
            }
          />
          <Route path="/offer/:id" element={<OfferPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
