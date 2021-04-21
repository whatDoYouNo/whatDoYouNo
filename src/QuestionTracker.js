const QuestionTracker = ({gameCount, gameOver}) => {
    return(
        <h3 className="questionCount"> <span>question</span>  <span>{gameCount}</span> </h3>
    )
}

export default QuestionTracker;