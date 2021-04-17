import { useEffect, useState } from "react";
import firebase from "./firebase";

const HighScore = () => {
  const [highScores, setHighScores] = useState([]);

  useEffect(() => {
    const dbRef = firebase.database().ref();

    dbRef.on("value", (res) => {
      const data = res.val();
      const newState = [];

      for (let key in data) {
        newState.push({
          key: key,
          ...data[key],
          // comments: [],
        });
      }

      setHighScores(newState);
    });
  }, []);
  console.log(highScores);
  return (
    <>
      <h1>HighScore</h1>

      <ul>
        {highScores.map((highscore, index) => {
          const { name, score, time } = highscore;
          return (
            <li key={index}>
              <span>{name}:</span>
              <span>{score}</span>
              <span>{time}</span>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default HighScore;
