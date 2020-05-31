import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
// Components
import Navbar from "./components/Navbar";
import Landing from "./components/Landing";
import AddGig from "./components/AddGig";
import GigsList from "./components/GigsList";
import SearchResult from "./components/SearchResult";
// Context
import { SearchProvider } from "./context/search";
import "./App.css";

const App = () => {
  const [searchValue, setSearchValue] = useState("");

  // Callback function to obtain search term from Landing to send to SearchResult
  const searchHandler = (value) => setSearchValue(value);

  return (
    <Router>
      <div className="App">
        <Navbar />
        <SearchProvider value={{ value: searchValue, handler: searchHandler }}>
          <Route exact path="/" component={Landing} />
          <Route exact path="/gigs/add" component={AddGig} />
          <Route exact path="/gigs" component={GigsList} />
          <Route exact path="/gigs/search" component={SearchResult} />
        </SearchProvider>
      </div>
    </Router>
  );
};

export default App;
