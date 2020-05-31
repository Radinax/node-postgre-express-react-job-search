import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { SearchContext } from "../../context/search";

const Landing = () => {
  const [technologies, setTechnologies] = useState("");
  const history = useHistory();
  // We get callback function from our Provider in App.js
  const search = useContext(SearchContext);
  const { handler } = search;

  // Sending search terms to Parent App.js
  useEffect(() => {
    handler(technologies);
  }, [technologies, handler]);

  // Set search input into local state
  const onChange = (e) => setTechnologies(e.target.value);
  // Send search input as params to the server
  const onSubmit = (e) => {
    e.preventDefault();
    axios
      .get("/gigs/search", { params: { term: technologies } })
      .then(() => history.push("/gigs/search"))
      .catch((err) => console.log(err));
  };

  return (
    <section id="search" className="search-wrap">
      <h1>Find A Coding Gig</h1>
      <form onSubmit={onSubmit} className="search-form">
        <i className="fas fa-search"></i>
        <input
          onChange={onChange}
          value={technologies}
          type="search"
          name="term"
          placeholder="Javascript, PHP, Rails, etc..."
        />
        <input type="submit" value="Search" />
      </form>
    </section>
  );
};

export default Landing;
