import {useState, useEffect} from 'react';

const Timer = ({gameCount, setTimer}) => {
    const [minutes,setMinutes] = useState(0);
    const [seconds,setSeconds]= useState(0);
    let time = 0;
    
    useEffect(() => {
        startTimer();
      },[]);



    const startTimer = () =>{
        //timer that updates the value of minutes and seconds every second
        let interval = setInterval ( () => {
            if (gameCount >= 11){
                clearInterval(interval);
                
            } else {
                time = time+1
                setTimer(time);
                setMinutes(Math.floor(time / 60))
                setSeconds(Math.floor(time % 60))        
            }
        }, 1000)
    }

    return(
        <h2>{minutes} : { seconds < 10 ? `0${ seconds }` : seconds }</h2>
    )
}

export default Timer