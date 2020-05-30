import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
// Components
import Navbar from "./components/Navbar";
import Landing from "./components/Landing";
import AddGig from "./components/AddGig";
import GigsList from "./components/GigsList";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Route exact path="/" component={Landing} />
        <Route exact path="/gigs/add" component={AddGig} />
        <Route exact path="/gigs" component={GigsList} />
      </div>
    </Router>
  );
}

export default App;
