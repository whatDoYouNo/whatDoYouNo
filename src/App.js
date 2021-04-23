/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.scss";

import Header from "./Header";
import homophones from "./homophones";
import MiniQuiz from "./MiniQuiz";
import Timer from "./Timer";
import Score from "./Score";
import QuestionTracker from "./QuestionTracker";
import GameOver from "./GameOver";
import Footer from "./Footer";
import LandingPage from "./LandingPage";
import SideBar from "./SideBar";

function App() {
  //state variable to hold data from API fetch. This variable stores the data of the current question.
  const [gameData, setGameData] = useState({
    definition: "",
  });
  //another state variable to hold data from API fetch. This variable stores the data of the next question.
  const [buffer, setBuffer] = useState({
    definition: "",
  });

  //state variable to keep track of question number
  const [gameCount, setGameCount] = useState(1);
  //state variable to keep track of User's Score ( how many questions the user has answered correctly)
  const [gamePoints, setGamePoints] = useState(0);
  //state variable used for conditional rendering of gameover screen
  const [gameOver, setGameOver] = useState(false);
  //state variable used to differentiate first render of app
  const [initialRender, setInitialRender] = useState(true);
  //state variable to extract information about time from timer.js
  const [timer, setTimer] = useState(0);
  //state variable that is changed to pass different classes to miniquiz.js 
  const [miniQuizClass, setMiniQuizClass] = useState("miniQuiz");
  //A Random boolean that is passed to miniquiz.js as a property. This random boolean is used for logic in determining if the left or right button should contain the correct answer in each question.
  const randomBoolCurrent = useRef();
  //A second boolean used for the buffer's randomization logic
  const randomBoolBuffer = useRef();
  //State variable used to determine if the user is allowed to click a button (prevents user from pressing buttons during animation)
  const [questionAvailable, setQuestionAvailable] = useState(true);

  //function for api call. "Randomly Generates" a pair of homophones along with a definition using datamuse API
  //the setFunction parameter is used to determine which state variable the API call will be stored in. 
  const searchHomophone = (setFunction) => {
    const index = Math.floor(Math.random() * homophones.length);
    const url = new URL(`https://api.datamuse.com/words`);
    url.search = new URLSearchParams({
      rel_hom: homophones[index],
      md: `d`,
    });

    fetch(url)
      .then((res) => res.json())
      .then((jsonData) => {
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

  //this use effect occurs on app mount. 
  useEffect(() => {
    //Two random booleans are generated
    randomBoolCurrent.current = Boolean(Math.round(Math.random()));
    randomBoolBuffer.current = Boolean(Math.round(Math.random()));
    //Data from API is fetched twice. The first time sets the current question's data and the next API call sets the buffer's data.
    searchHomophone(setGameData);
    searchHomophone(setBuffer);
  }, []);

  //this use effect occurs when the user advances a question (answers correctly or incorrectly)
  useEffect(() => {
    //If the user is not done the game....
    if (gameCount < 11) {
      //After 1 second of delay....... (This is done to account for the duration of the sliding transition)
      setTimeout(() => {
        //This if statement prevents this code from running if this is the first render (component mount)
        if (!initialRender) {
          //Current question's data is set to the buffer's data
          setGameData(buffer);
          //The current question's boolean for button logic is set to the buffer's boolean
          randomBoolCurrent.current = randomBoolBuffer.current;
          //After 100ms of delay..... (this is done to prevent some visual bugs that occur due to async functions)
          setTimeout(() => {
            //Buffer recieves new set of data from API
            searchHomophone(setBuffer);
            //Buffer generates a new boolean for button logic
            randomBoolBuffer.current = Boolean(Math.round(Math.random()));
          }, 100);
        } else {
          //If it was the initial render(mount), then set initialRender boolean to false
          setInitialRender(false);
        }
      }, 1000);
      //If the user has advanced pass the 10th question...
    } else{
      //Initiate gameover behaviour
      setGameOver(true);
      //Reset initialRender variable
      setInitialRender(true);
    }
  }, [gameCount]);

  return (
    <div className="App">
      {/* Header is always rendered */}
      <Header />

       {/* Landing page initially renders */}
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

      {/* Game components render conditionally. They only render if the game is not over. If game is over, then gameover component renders instead*/}
          <Route path="/Arcade">
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
                    containerClass={"bufferContainer"}
                    gameCount={gameCount}
                    setGameCount={setGameCount}
                    gamePoints={gamePoints}
                    setGamePoints={setGamePoints}
                    gameData={buffer}
                    setGameData={setGameData}
                    miniQuizClass={miniQuizClass}
                    setMiniQuizClass={setMiniQuizClass}
                    randomBool={randomBoolBuffer.current}
                    questionAvailable={questionAvailable}
                    setQuestionAvailable={setQuestionAvailable}
                  />
                  <MiniQuiz
                    containerClass={"quizContainer"}
                    gameCount={gameCount}
                    setGameCount={setGameCount}
                    gamePoints={gamePoints}
                    setGamePoints={setGamePoints}
                    gameData={gameData}
                    setGameData={setGameData}
                    miniQuizClass={miniQuizClass}
                    setMiniQuizClass={setMiniQuizClass}
                    randomBool={randomBoolCurrent.current}
                    questionAvailable={questionAvailable}
                    setQuestionAvailable={setQuestionAvailable}
                  />
                </div>
              </>
            )}
          </Route>
        </Router>
      </main>
      {/*Sidebar and footer always render*/}
      <SideBar />
      <Footer />
    </div>
  );
}

export default App;
