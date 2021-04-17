import homophones from './homophones';
import {useState, useEffect} from 'react';

const MiniQuiz = () => {

    const [gameData, setGameData] = useState({});
    const [gameCount, setGameCount] = useState(0)

    
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
            <button onClick={()=>setGameCount(gameCount+1)}>{gameData.answer}</button>
            <button onClick={()=>setGameCount(gameCount+1)}>{gameData.wrong}</button>   
        </section>      
    )
}

export default MiniQuiz;