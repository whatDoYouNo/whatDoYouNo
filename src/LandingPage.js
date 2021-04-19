import React from "react";
import { Link } from "react-router-dom";

const LandingPage = ({
  setGameCount,
  setGamePoints,
  setGameOver,
  setTimer,
}) => {
  const handleReset = () => {
    setGameCount(1);
    setGamePoints(0);
    setGameOver(false);
    setTimer(0);
  };

  return (
    <div className="arcadeContainer">
      <h2>Welcome !!</h2>
      <Link to="/Arcade">
        <button onClick={(e) => handleReset(e)}>Arcade</button>
      </Link>
    </div>
  );
};

export default LandingPage;
