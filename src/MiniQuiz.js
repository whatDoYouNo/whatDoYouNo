import LoadingWheel from "./LoadingWheel";


const MiniQuiz = ({
  containerClass,
  gameCount,
  setGameCount,
  gamePoints,
  setGamePoints,
  gameData,
  miniQuizClass,
  setMiniQuizClass,
  randomBool,
  questionAvailable,
  setQuestionAvailable
 
}) => {

  const handleCorrect = () => {
    if (questionAvailable){
      setGameCount(gameCount + 1);
      setGamePoints(gamePoints + 1);
      setMiniQuizClass("miniQuiz correct");
      setQuestionAvailable(false);
      setTimeout(() => {
        setMiniQuizClass("miniQuiz");
        setQuestionAvailable(true);
      }, 1100);
    };
  }

  const handleIncorrect = () => {
    if (questionAvailable){
      setMiniQuizClass("miniQuiz incorrect");
      setGameCount(gameCount + 1);
      setQuestionAvailable(false);
      setTimeout(() => {
        setMiniQuizClass("miniQuiz");
        setQuestionAvailable(true);
      }, 1100);
    };
  }

  return (
    <div className={containerClass}>
      <section className={miniQuizClass}>
        {gameData.definition === "" ? (
          <LoadingWheel />
        ) : (
          <>
            <p className="definition">
              {gameData.definition.slice(gameData.definition.indexOf("\t"))}
            </p>
            <div>
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
            </div>
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
