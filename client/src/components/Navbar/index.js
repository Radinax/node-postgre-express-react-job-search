import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <header className="inner">
        <h2>
          <Link to="/">
            <i className="fas fa-code"></i>
            CodeGig
          </Link>
        </h2>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/gigs">All Gigs</Link>
            </li>
            <li>
              <Link to="/gigs/add">Add Gig</Link>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
