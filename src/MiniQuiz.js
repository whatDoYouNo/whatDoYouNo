import homophones from './homophones';
import {useState, useEffect} from 'react';

const MiniQuiz = () => {

    const [gameData, setGameData] = useState({});
    const [gameCount, setGameCount] = useState(0)
    const randomBool = Boolean(Math.round(Math.random()));
    const [gamePoints, setGamePoints] = useState(0);

    useEffect( ()=>{
        const searchHomophone = () => {
            const index = Math.floor(Math.random() * homophones.length);
            console.log(index);
            const url = new URL(`https://api.datamuse.com/words`);
            url.search = new URLSearchParams({
                rel_hom : homophones[index],
                md: `d`
            });
    
            fetch(url)
            .then( res => res.json())
            .then( (jsonData) => {
                console.log(jsonData);
                if (jsonData[0] !== undefined && jsonData[0].defs !== undefined) {
                    setGameData({
                    wrong : homophones[index],
                    answer : jsonData[0].word,
                    definition : jsonData[0].defs[0]
                    })
                } else {
                    searchHomophone(homophones);
                }
            })  
        }
        

        searchHomophone();
    },[gameCount])

    return (
        <section>
            <p>{gameData.definition}</p>
            {/*<button onClick={()=>setGameCount(gameCount+1)}>{gameData.answer}</button>*/}
              
            
            {randomBool? <button onClick={()=>setGameCount(gameCount+1)}>{gameData.answer}</button> : <button>{gameData.wrong}</button>}
            {randomBool? <button onClick={()=>setGameCount(gameCount+1)}>{gameData.wrong}</button> : <button >{gameData.answer}</button>}
            
            {/* Initial boolean randomizer function that will give us a value of true or false*/} 
            {/* Check if the the value is true?*/} 
            {/* If so print answer to 1st button */} 
            {/* If not print the wrong answer to the 1st button*/} 
            {/* Print whichever remains to the second button depending on if the first button got the correct answer (was true)*/} 
        </section>      
    )
}

export default MiniQuiz;