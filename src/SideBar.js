import HighScore from "./HighScore";
import {useState} from "react";

const SideBar = () => {
const [sideBarActive, setSideBarActive] = useState(false);
const [nameOfClass, setNameOfClass] = useState('leaderBoard')

const handleClick = ()=>{
    setSideBarActive(!sideBarActive);

    if (!sideBarActive){
        setNameOfClass('leaderBoard active')    
    } else{
        setNameOfClass('leaderBoard')
    }

}

    return(
        <>
            <aside className="drawer" onClick={handleClick}>
                <HighScore nameOfClass={nameOfClass} />
            </aside>
        </>
        
        
    )
}

export default SideBar