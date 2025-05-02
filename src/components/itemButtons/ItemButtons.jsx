import React from "react";
import "./itembuttons.css";
const ItemButtons = ({ itemName }) => {
  return <button className="item-button">{itemName}</button>;
};

export default ItemButtons;
