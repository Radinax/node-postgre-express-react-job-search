import React, { useState, useEffect } from "react";
import axios from "axios";

const GigsList = () => {
  const [gigs, setGigs] = useState([]);

  useEffect(() => {
    axios
      .get("/gigs")
      .then((res) => setGigs(res.data))
      .catch((err) => console.log(err));
  }, []);

  const gigsList = gigs.map((gig) => (
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

  const noGigs = <p>No gigs available</p>;

  return (
    <div>
      <section id="gigs" className="container">
        <h1>All Gigs</h1>
        {gigs.length > 0 ? gigsList : noGigs}
      </section>
    </div>
  );
};

export default GigsList;
