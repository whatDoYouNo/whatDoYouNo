import { useState } from "react";
import { useHistory } from "react-router-dom";
import firebase from "./firebase";

const GameOver = ({ gamePoints, timer }) => {
  const [username, setUsername] = useState("");
  const history = useHistory();

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

    history.push("/");
  };

  const handleNoFame = (e) => {
    e.preventDefault();
    history.push("/");
  }

  return (
    <section className="gameOver">
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
        <button onClick={handleNoFame}>I dont want no fame.</button>
      </form>
    </section>
  );
};

export default GameOver;
