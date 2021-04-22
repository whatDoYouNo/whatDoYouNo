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
    <section className="arcadeContainer">
      <h2><span>W</span><span>e</span><span>l</span><span>c</span><span>o</span><span>m</span><span>e</span> <span>!</span><span>!</span></h2>
      <p>
        You may think you no. But, do you really know what you no? Try this homophonous quiz and sea weather you know or knot.
      </p>
      <Link to="/Arcade">
        <button onClick={(e) => handleReset(e)}>Enter Arcade</button>
      </Link>
    </section>
  );
};

export default LandingPage;
