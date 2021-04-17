const GameOver = ({gamePoints, timer}) => {
    return(
        <>
            <h1>Game Over</h1>
            <h1>Your score: {gamePoints}</h1>
            <h1>Time: {timer}</h1>
        </>
    )
}

export default GameOver;