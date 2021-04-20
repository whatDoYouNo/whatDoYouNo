import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./App.scss";

import Header from "./Header";
import homophones from "./homophones";
import MiniQuiz from "./MiniQuiz";
import Timer from "./Timer";
import Score from "./Score";
import QuestionTracker from "./QuestionTracker";
import GameOver from "./GameOver";
import HighScore from "./HighScore";
import Footer from "./Footer";
import LandingPage from "./LandingPage";

function App() {
  const [gameData, setGameData] = useState({
    definition: "",
  });
  const [gameCount, setGameCount] = useState(1);
  const [gamePoints, setGamePoints] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    const searchHomophone = () => {
      const index = Math.floor(Math.random() * homophones.length);
      // console.log(index);
      const url = new URL(`https://api.datamuse.com/words`);
      url.search = new URLSearchParams({
        rel_hom: homophones[index],
        md: `d`,
      });

      fetch(url)
        .then((res) => res.json())
        .then((jsonData) => {
          // console.log(jsonData);
          if (jsonData[0] !== undefined && jsonData[0].defs !== undefined) {
            setGameData({
              wrong: homophones[index],
              answer: jsonData[0].word,
              definition: jsonData[0].defs[0],
            });
          } else {
            searchHomophone(homophones);
          }
        });
    };
    searchHomophone();
  }, [gameCount]);

  useEffect(() => {
    if (gameCount >= 11) {
      setGameOver(true);
    }
  }, [gameCount]);

  return (
    <div className="App">
      <Header />

      <main className="wrapper">
        <Router>
          <Route exact path="/">
            <LandingPage
              setGameCount={setGameCount}
              setGamePoints={setGamePoints}
              setGameOver={setGameOver}
              setTimer={setTimer}
            />
          </Route>

          <Route path="/Arcade">
            {/* Arcade */}
            {gameOver ? (
              <>
                <GameOver gamePoints={gamePoints} timer={timer} />
                <HighScore />
              </>
            ) : (
              <>
                <div className="timerBar">
                  <QuestionTracker gameCount={gameCount} gameOver={gameOver} />
                  <Timer setTimer={setTimer} />
                  <Score gamePoints={gamePoints} />
                </div>

                <MiniQuiz
                  gameCount={gameCount}
                  setGameCount={setGameCount}
                  gamePoints={gamePoints}
                  setGamePoints={setGamePoints}
                  gameData={gameData}
                  setGameData={setGameData}
                />

                <HighScore />
              </>
            )}
          </Route>
        </Router>
      </main>

      <Footer />
    </div>
  );
}

export default App;
