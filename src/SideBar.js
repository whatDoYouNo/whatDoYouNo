import HighScore from "./HighScore";
import { useState } from "react";

const SideBar = () => {
  const [sideBarActive, setSideBarActive] = useState(false);
  const [nameOfClass, setNameOfClass] = useState("leaderBoard");

  const handleClick = () => {
    setSideBarActive(!sideBarActive);
    if (!sideBarActive) {
      setNameOfClass("leaderBoard active");
    } else {
      setNameOfClass("leaderBoard");
    }
  };

  return (
    <>
      <aside
        className="drawer"
        tabIndex="0"
        onClick={handleClick}
        onFocus={handleClick}
      >
        <h2 className="vertical">
          <span>L</span>
          <span>e</span>
          <span>a</span>
          <span>d</span>
          <span>e</span>
          <span>r</span>
          <span>B</span>
          <span>o</span>
          <span>a</span>
          <span>r</span>
          <span>d</span>
          <span>&lt;&lt;</span>
        </h2>
        <HighScore nameOfClass={nameOfClass} />
      </aside>
    </>
  );
};

export default SideBar;
