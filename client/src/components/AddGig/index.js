import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

const AddGig = () => {
  const [title, setTitle] = useState("");
  const [technologies, setTechnologies] = useState("");
  const [budget, setBudget] = useState("");
  const [description, setDescription] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const history = useHistory();

  // Send a Job Offer (Gig)
  const onSubmit = (e) => {
    e.preventDefault();
    const gig = {
      title,
      tecnologies: technologies,
      budget,
      description,
      contactEmail,
    };
    axios
      .post("/gigs/add", { ...gig })
      .then(() => history.push("/gigs"))
      .catch((err) => console.log(err));
  };

  return (
    <section id="add" className="container">
      <div className="form-wrap">
        <h1>Add A Gig</h1>
        <p>
          Your contact email will be shared with registered users to apply to
          your gig
        </p>
        <form onSubmit={onSubmit}>
          <div className="input-group">
            <label>Gig Title</label>
            <input
              type="text"
              name="title"
              id="title"
              className="input-box"
              placeholder="eg. Small Wordpress website, React developer"
              maxlength="100"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label>Technologies Needed</label>
            <input
              type="text"
              name="tecnologies"
              id="tecnologies"
              className="input-box"
              placeholder="eg. javascript, react, PHP"
              maxlength="100"
              value={technologies}
              onChange={(e) => setTechnologies(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label>Budget (Leave blank for unknown)</label>
            <input
              type="number"
              name="budget"
              id="budget"
              className="input-box"
              placeholder="eg. 500, 5000, 10000"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label>Gig Description</label>
            <textarea
              name="description"
              id="description"
              className="input-box"
              placeholder="Describe the details of the gig"
              rows="10"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div className="input-group">
            <label>Contact Email</label>
            <input
              type="email"
              name="contactEmail"
              id="contactEmail"
              className="input-box"
              placeholder="Enter an email"
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
            />
          </div>
          <input type="submit" value="Submit" className="btn btn-reverse" />
        </form>
      </div>
    </section>
  );
};

export default AddGig;
