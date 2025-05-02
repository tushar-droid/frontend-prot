import { useState } from "react";
import "./App.css";
import Blob from "./components/blob/Blob";
import { itemList } from "./utilities/itemList";
import OptionsContainer from "./components/optionsContainer/OptionsContainer";

function App() {
  const items = itemList;
  const listSize = items.length;
  const leftList = items.slice(0, Math.floor(listSize / 2));
  const rightList = items.slice(Math.floor(listSize / 2), listSize + 1);

  return (
    <>
      <div id="app">
        <div className="main-container-left">
          <OptionsContainer listItems={leftList} />
        </div>
        <div className="main-container-center">
          <Blob />
        </div>
        <div className="main-container-right">
          <OptionsContainer listItems={rightList} />
        </div>
      </div>
    </>
  );
}

export default App;
