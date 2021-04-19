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
  return (
    <section className="leaderBoard">
      <h2>
        <span>L</span><span>e</span><span>a</span><span>d</span><span>e</span><span>r</span><span>B</span><span>o</span><span>a</span><span>r</span><span>d</span></h2>

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
    </section>
  );
};

export default HighScore;
