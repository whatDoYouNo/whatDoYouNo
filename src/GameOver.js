import { useEffect, useState } from "react";
import Confetti from "react-confetti";
import { useHistory } from "react-router-dom";
import firebase from "./firebase";

const GameOver = ({ gamePoints, timer }) => {
  const [username, setUsername] = useState("");
  const history = useHistory();
  const [isConfetti, setIsConfetti] = useState(true);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (username !== "") {
      const dbRef = firebase.database().ref();
      dbRef.push({
        name: username,
        time: timer,
        score: gamePoints,
      });
      setUsername("");
    }
    //back to landing site
    history.push("/");
  };

  const handleNoFame = (e) => {
    e.preventDefault();
    //back to landing site
    history.push("/");
  };

  setTimeout(() => {
    setIsConfetti(false);
  }, 10000);

  return (
    <section className="gameOver">
      {isConfetti ? (
        <Confetti width={window.innerWidth} height={window.innerHeight} />
      ) : null}

      <h2>
        <span>G</span>
        <span>a</span>
        <span>m</span>
        <span>e</span> <span>O</span>
        <span>v</span>
        <span>e</span>
        <span>r</span>
      </h2>
      <h3>Your score : {gamePoints}</h3>
      <h3>Time : {timer}</h3>

      <form action="submit">
        <label htmlFor="usernameInput"> Name </label>
        <input
          type="text"
          name="usernameInput"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button type="submit" onClick={handleSubmit}>
          Submit to Leaderboard
        </button>
        <button onClick={handleNoFame}>I don't want no fame.</button>
      </form>
    </section>
  );
};

export default GameOver;
