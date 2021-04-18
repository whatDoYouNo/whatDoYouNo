import { useState } from "react";
import firebase from "./firebase";

const GameOver = ({ gamePoints, timer }) => {
  const [username, setUsername] = useState("");

  // dbRef.push({
  //   test: "IT WORKS",
  // });

  const handleSubmit = (e) => {
    e.preventDefault();
    const dbRef = firebase.database().ref();
    dbRef.push({
      name: username,
      time: timer,
      score: gamePoints,
    });

    setUsername("");
  };

  const handleNoFame = () => {
    
  }

  return (
    <>
      <h1>Game Over</h1>
      <h1>Your score: {gamePoints}</h1>
      <h1>Time: {timer}</h1>

      <form action="submit">
        <label htmlFor="usernameInput"> Username </label>
        <input
          type="text"
          name="usernameInput"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button type="submit" onClick={handleSubmit}>
          Submit to leader board
        </button>
        <button onClick={handleNoFame}>
          I dont want no fame.
        </button>
      </form>
    </>
  );
};

export default GameOver;
