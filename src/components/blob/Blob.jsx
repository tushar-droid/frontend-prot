import React, { useEffect, useState } from "react";
import "./blob.css";
import { useDroppable } from "@dnd-kit/core";
import { gsap } from "gsap";
import Flip from "gsap/Flip";
gsap.registerPlugin(Flip);

//This needs to be droppable
const Blob = (props) => {
  const [grid, setGrid] = useState([]);

  const { isOver, setNodeRef } = useDroppable({
    id: "drop-item",
  });

  const animationToRunOnObjectDrop = () => {
    let temp = [];
    if (Object.keys(props.children).length == 1) {
      for (let i = 0; i < 9; i++) {
        if (i == 4) temp.push(props.children[0]);
        else temp.push("");
      }
    } else if (Object.keys(props.children).length == 2) {
      for (let i = 0; i < 9; i++) {
        if (i == 3) temp.push(props.children[0]);
        else if (i == 5) temp.push(props.children[1]);
        else temp.push("");
      }
    } else if (Object.keys(props.children).length == 3) {
      for (let i = 0; i < 9; i++) {
        if (i == 0) temp.push(props.children[0]);
        else if (i == 2) temp.push(props.children[1]);
        else if (i == 7) temp.push(props.children[2]);
        else temp.push("");
      }
    } else if (Object.keys(props.children).length == 4) {
      for (let i = 0; i < 9; i++) {
        if (i == 0) temp.push(props.children[0]);
        else if (i == 2) temp.push(props.children[1]);
        else if (i == 6) temp.push(props.children[2]);
        else if (i == 8) temp.push(props.children[3]);
        else temp.push("");
      }
    } else if (Object.keys(props.children).length == 5) {
      for (let i = 0; i < 9; i++) {
        if (i == 0) temp.push(props.children[0]);
        else if (i == 2) temp.push(props.children[1]);
        else if (i == 6) temp.push(props.children[2]);
        else if (i == 8) temp.push(props.children[3]);
        else if (i == 4) temp.push(props.children[4]);
        else temp.push("");
      }
    }
    setGrid(temp);
  };
  useEffect(() => {
    console.log("ran");
    const elements = document.querySelectorAll("#drop-item .drag-item");
    if (elements.length > 0) {
      const state = Flip.getState(elements);
      animationToRunOnObjectDrop();
      requestAnimationFrame(() => {
        Flip.from(state, {
          duration: 0.6,
          ease: "power2.inOut",
        });
      });
    } else {
      animationToRunOnObjectDrop();
    }
  }, [Object.keys(props.children).length]);

  // useEffect(() => {
  //   const state = Flip.getState(".drag-item");
  //   animationToRunOnObjectDrop();

  //   requestAnimationFrame(() => {
  //     //After change
  //     Flip.from(state, {
  //       duration: 0.6,
  //       ease: "power2.inOut",
  //     });
  //   });
  // }, [Object.keys(props.children).length]);

  return (
    <div className="blob-container">
      <div className="dropped-items-container" id="drop-item" ref={setNodeRef}>
        {grid.map((it) => (it ? it : <div className="empty-container"></div>))}
      </div>
      <div className="blob"></div>
    </div>
  );
};

export default Blob;
