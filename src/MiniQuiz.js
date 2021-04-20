import LoadingWheel from "./LoadingWheel";
import { useState } from "react";

const MiniQuiz = ({
  gameCount,
  setGameCount,
  gamePoints,
  setGamePoints,
  gameData,
}) => {
  const [miniQuizClass, setMiniQuizClass] = useState("miniQuiz");

  const randomBool = Boolean(Math.round(Math.random()));
  const handleCorrect = () => {
    setGameCount(gameCount + 1);
    setGamePoints(gamePoints + 1);
    setMiniQuizClass("miniQuiz correct");
    setTimeout(() => {
      setMiniQuizClass("miniQuiz");
    }, 250);
  };

  const handleIncorrect = () => {
    setMiniQuizClass("miniQuiz incorrect");

    setGameCount(gameCount + 1);

    setTimeout(() => {
      setMiniQuizClass("miniQuiz");
    }, 250);
  };

  return (
    <div className="quizContainer">
      <section className={miniQuizClass}>
        {gameData.definition === "" ? (
          <LoadingWheel />
        ) : (
          <>
            <p className="definition">
              {gameData.definition.slice(gameData.definition.indexOf("\t"))}
            </p>
            {/*<button onClick={()=>setGameCount(gameCount+1)}>{gameData.answer}</button>*/}

            {randomBool ? (
              <button onClick={handleCorrect}>{gameData.answer}</button>
            ) : (
              <button onClick={handleIncorrect}>{gameData.wrong}</button>
            )}

            {randomBool ? (
              <button onClick={handleIncorrect}>{gameData.wrong}</button>
            ) : (
              <button onClick={handleCorrect}>{gameData.answer}</button>
            )}
          </>
        )}
        {/* Initial boolean randomizer function that will give us a value of true or false*/}
        {/* Check if the the value is true?*/}
        {/* If so print answer to 1st button */}
        {/* If not print the wrong answer to the 1st button*/}
        {/* Print whichever remains to the second button depending on if the first button got the correct answer (was true)*/}
      </section>
    </div>
  );
};

export default MiniQuiz;
