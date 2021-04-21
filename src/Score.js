const Score = ({gamePoints}) => {
    return(
        <h3 className="scoreCount"><span>score</span>
        <span>{gamePoints}</span> </h3>
    )
}

export default Score;