import { useState } from "react";
import "./App.css";
import Blob from "./components/blob/Blob";
import { itemList } from "./utilities/itemList";

function App() {
  const items = itemList;

  return (
    <>
      <div id="app">
        <Blob />
      </div>
    </>
  );
}

export default App;
