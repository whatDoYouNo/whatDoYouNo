import firebase from './firebase';
import MiniQuiz from './MiniQuiz';
import Timer from './Timer';
import "./App.scss";

function App() {
  return (
    <div className="App">
      <Timer />
      <MiniQuiz />
      
    </div>
  );
}

export default App;
