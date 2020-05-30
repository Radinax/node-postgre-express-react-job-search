import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

const Landing = () => {
  const [technologies, setTechnologies] = useState("");
  const history = useHistory();

  const onChange = (e) => setTechnologies(e.target.value);
  const onSubmit = (e) => {
    e.preventDefault();
    axios
      .get("/gigs/search", { params: { term: technologies } })
      .then(() => history.push(`/gigs/search?=${technologies}`))
      .catch((err) => console.log(err));
  };
  return (
    <div>
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
    </div>
  );
};

export default Landing;
