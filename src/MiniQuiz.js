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

  //This function is called when the user click the correct answer
  const handleCorrect = () => {
    //The following only proceeds if the user clicked during a time when they were allowed to (not during transition)
    if (questionAvailable){
      //Question number goes up by 1
      setGameCount(gameCount + 1);
      //User's Score goes up by 1
      setGamePoints(gamePoints + 1);
      //This class modification initiates the the transition animation done in CSS
      setMiniQuizClass("miniQuiz correct");
      //Lock the user out from further inputting  button clicks until the transition animation is finished
      setQuestionAvailable(false);
      //after 1.1 seconds (which is the duration of the transition)....
      setTimeout(() => {
        //Reset the class back to normal
        setMiniQuizClass("miniQuiz");
        //Allow the user to click an answer again
        setQuestionAvailable(true);
      }, 1100);
    };
  }

  //This function is called when the user clicks an incorrect answer. Similar logic to the above code except User's score is not increased by one, and a different class modification is done to apply the incorrect answer transition.
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
        {/* If API promise has not yet been resolved, return jsx for a loading animation */}
        {gameData.definition === "" ? (
          <LoadingWheel />
        ) : (
          <>
            <p className="definition">
              {/* string manipulation to turn definition data fetched from API into a more appropriate format for the app to display */}
              {gameData.definition.slice(gameData.definition.indexOf("\t"))}
            </p>
            <div>
              {/* Based on the random boolean generated in app.js, this component will either put the correct answer on the left button or the right button. */}
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
      </section>
    </div>
  );
};

export default MiniQuiz;
