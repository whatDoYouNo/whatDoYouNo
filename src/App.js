import firebase from './firebase';
import MiniQuiz from './MiniQuiz';
import Timer from './Timer';
import homophones from './homophones';
import "./App.scss";
import {useState, useEffect} from 'react';

function App() {
    const [gameData, setGameData] = useState({});
    const [gameCount, setGameCount] = useState(0)
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
    <div className="App">
      <Timer />
      <MiniQuiz 
      gameCount={gameCount}
      setGameCount={setGameCount}

      gamePoints={gamePoints}
      setGamePoints={setGamePoints}

      gameData={gameData}
      setGameData={setGameData}
      />
      
    </div>
  );
}

export default App;
