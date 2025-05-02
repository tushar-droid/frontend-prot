import React from "react";
import "./optionscontainer.css";
import ItemButtons from "../itemButtons/ItemButtons";
const OptionsContainer = ({ listItems, side }) => {
  return (
    <div className="options-container">
      {listItems.map((item, index) => (
        <ItemButtons key={index} itemName={item} side={side} />
      ))}
    </div>
  );
};

export default OptionsContainer;
