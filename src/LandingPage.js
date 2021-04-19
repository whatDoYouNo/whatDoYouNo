import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="arcadeContainer">
      <h2>Welcome !!</h2>
      <Link to="/Arcade">
        <button>Arcade</button>
      </Link>
    </div>
  );
};

export default LandingPage;
