import React from "react";
import "./itembuttons.css";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
//This needs to be Draggable
const ItemButtons = ({ itemName, side }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: itemName,
  });
  const style = {
    transform: CSS.Translate.toString(transform),
  };
  return (
    <button
      className="item-button drag-item"
      style={style}
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      side={side}
    >
      {itemName}
    </button>
  );
};

export default ItemButtons;
