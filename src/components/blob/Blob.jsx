import React from "react";
import "./blob.css";
import { useDroppable } from "@dnd-kit/core";
//This needs to be droppable
const Blob = (props) => {
  const { isOver, setNodeRef } = useDroppable({
    id: "drop-item",
  });

  return (
    <div className="blob-container">
      <div className="dropped-items-container" id="drop-item" ref={setNodeRef}>
        {props.children}
      </div>
      <div className="blob"></div>
    </div>
  );
};

export default Blob;
