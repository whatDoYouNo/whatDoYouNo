import { useState, useEffect,useRef } from "react";
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
import SideBar from "./SideBar";


function App() {
  const [gameData, setGameData] = useState({
    definition: "",
  });
  const [buffer, setBuffer] = useState({
    definition: "",
  });

  const [gameCount, setGameCount] = useState(1);
  const [gamePoints, setGamePoints] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [initialRender, setInitialRender] = useState(true);
  const [timer, setTimer] = useState(0);
  const [miniQuizClass, setMiniQuizClass] = useState("miniQuiz");
  const randomBool = useRef();
  const randomBool2 = useRef();
  const [questionAvailable,setQuestionAvailable] = useState(true);
  
  


  const searchHomophone = (setFunction) => {
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
          setFunction({
            wrong: homophones[index],
            answer: jsonData[0].word,
            definition: jsonData[0].defs[0],
          });
        } else {
          searchHomophone(setFunction);
        }
      });
  };  


  useEffect(() => {
    randomBool.current= Boolean(Math.round(Math.random()))
    randomBool2.current= Boolean(Math.round(Math.random()))
    searchHomophone(setGameData);
    searchHomophone(setBuffer);
     }, []);


useEffect(() => {
  setTimeout(() => {
    if(!initialRender){
      
    setGameData(buffer)
    randomBool2.current=randomBool.current
    setTimeout(()=>{
      
      searchHomophone(setBuffer);
      randomBool.current= Boolean(Math.round(Math.random()))
    },100)
    } else {
      setInitialRender(false)
    };
    

    
  },1000 );
  }, [gameCount]);



  useEffect(() => {
    if (gameCount >= 11) {
      setGameOver(true);
      setInitialRender(true);
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
              setInitialRender={setInitialRender}
            />
          </Route>

          <Route path="/Arcade">
            {/* Arcade */}
            {gameOver ? (
              <>
                <GameOver gamePoints={gamePoints} timer={timer} />
              </>
            ) : (
              <>
                <div className="timerBar">
                  <QuestionTracker gameCount={gameCount} gameOver={gameOver} />
                  <Timer setTimer={setTimer} />
                  <Score gamePoints={gamePoints} />
                </div>
                <div className="miniQuizContainer">
                <MiniQuiz
                    containerClass={'bufferContainer'}
                    gameCount={gameCount}
                    setGameCount={setGameCount}
                    gamePoints={gamePoints}
                    setGamePoints={setGamePoints}
                    gameData={buffer}
                    setGameData={setGameData}
                    miniQuizClass={miniQuizClass}
                    setMiniQuizClass={setMiniQuizClass}
                    randomBool={randomBool.current}
                    questionAvailable={questionAvailable}
                    setQuestionAvailable={setQuestionAvailable}

                />
                  <MiniQuiz
                    containerClass={'quizContainer'}
                    gameCount={gameCount}
                    setGameCount={setGameCount}
                    gamePoints={gamePoints}
                    setGamePoints={setGamePoints}
                    gameData={gameData}
                    setGameData={setGameData}
                    miniQuizClass={miniQuizClass}
                    setMiniQuizClass={setMiniQuizClass}
                    randomBool={randomBool2.current}
                    questionAvailable={questionAvailable}
                    setQuestionAvailable={setQuestionAvailable}


                  />

                </div>


              </>
            )}
          </Route>
        </Router>
      </main>
      
      <SideBar />
      <Footer />
    </div>
  );
}

export default App;
