import React, { useState, useEffect, useContext } from "react";
import { SearchContext } from "../../context/search";
import axios from "axios";

const SearchResult = () => {
  const [gigs, setGigs] = useState([]);
  // We obtain the search term from Landing Sibling
  const search = useContext(SearchContext);
  const { value } = search;

  // We use search input to make a GET request of the data we want
  useEffect(() => {
    axios
      .get(`/gigs/search?term=${value}`)
      .then((res) => setGigs(res.data))
      .catch((err) => console.log(err));
  }, [value]);

  const searchResult =
    gigs &&
    gigs.map((gig) => (
      <div className="gig">
        <h3>{gig.title}</h3>
        <p>{gig.description}</p>
        <ul>
          <li>Budget: {gig.budget}</li>
          <li>
            <a href={`mailto:${gig.contactEmail}`} className="btn btn-reverse">
              Apply Now
            </a>
          </li>
        </ul>
        <div className="tech">
          <small>
            Technologies Needed: <span>{gig.tecnologies}</span>
          </small>
        </div>
      </div>
    ));

  const noGigs = <p>No gigs matched your input</p>;

  return (
    <div>
      <section id="gigs" className="container">
        <h1>All Gigs</h1>
        {gigs.length > 0 ? searchResult : noGigs}
      </section>
    </div>
  );
};

export default SearchResult;
