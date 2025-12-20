import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Signup() {
  // initializing use state with empty object later updated as users details
  const [details, setDetails] = useState({
    name:"",
    email:"",
    password:"",
    geoLocation:"",
  });
  //handling submit event and passing information to backend ----->

  const handleSubmit = async(e)=>{
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/createuser",{
      method:'POST',
      headers: {
        'Content-Type':'application/json',
      },

      //send entered details to the backend ===>

      body:JSON.stringify({
        name: details.name,
        email: details.email,
        password: details.password,
        location: details.geoLocation,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (!json.success) {
      alert("Enter Valid Details");
    }
  };

  // when user type something it will automatically update the value of target ==

  const handleChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  /// Form related stuff --->
  return (
    <>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="Name" className="form-label">
              Name
            </label>
            <input
              type="text"
              name="name"
              className="form-control"
              value={details.name}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              name="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              value={details.email}
              onChange={handleChange}
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              name="password"
              className="form-control"
              id="exampleInputPassword1"
              value={details.password}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleAddress" className="form-label">
              Address
            </label>
            <input
              type="text"
              name="geoLocation"
              className="form-control"
              id="exampleAddress"
              value={details.geoLocation}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="mr-3 btn text-white  bg-success">
            Submit
          </button>
          <Link to="/login" className="m-3 btn text-white bg-danger">
            Already a User
          </Link>
        </form>
      </div>
    </>
  );
}
