import { useRef, useState } from "react";
import "./App.css";
import Blob from "./components/blob/Blob";
import { itemList } from "./utilities/itemList";
import OptionsContainer from "./components/optionsContainer/OptionsContainer";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import ItemButtons from "./components/itemButtons/ItemButtons";
import ResetButton from "./components/resetButton/ResetButton";
import GenerateButton from "./components/generateButton/GenerateButton";
import MaxLimitToast from "./components/MaxLimitToast/MaxLimitToast";

function App() {
  const items = itemList;
  const listSize = items.length;
  const [leftList, setLeftList] = useState(
    items.slice(0, Math.floor(listSize / 2))
  );
  const initialLeftList = useRef(new Set(leftList.slice()));
  const [rightList, setRightList] = useState(
    items.slice(Math.floor(listSize / 2), listSize + 1)
  );
  // const initialRightList = new Set(rightList);

  const [droppedItems, setDroppedItems] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const dragStart = (event) => {
    setActiveId(event.active.id);
  };

  const dragEnd = (event) => {
    const { active, over } = event;

    if (!over) {
      if (droppedItems.includes(active.id)) {
        setDroppedItems((items) => items.filter((item) => item != active.id));
        if (initialLeftList.current.has(active.id)) {
          setLeftList((items) => [...items, active.id]);
        } else setRightList((items) => [...items, active.id]);
      }
      setActiveId(null);
      return;
    } else if (over.id == "drop-item") {
      if (droppedItems.length == 5) {
        setShowToast(true);
        return;
      }
      if (leftList.includes(active.id)) {
        setLeftList((items) => items.filter((item) => item != active.id));
        setDroppedItems((items) => [...items, active.id]);
      } else if (rightList.includes(active.id)) {
        setRightList((items) => items.filter((item) => item != active.id));
        setDroppedItems((items) => [...items, active.id]);
      }
    }
    setActiveId(null);
  };

  const resetButtonHandler = () => {
    let leftItems = [];
    let rightItems = [];
    droppedItems.forEach((item) => {
      if (initialLeftList.current.has(item)) leftItems.push(item);
      else rightItems.push(item);
    });
    setLeftList([...leftList, ...leftItems]);
    setRightList([...rightList, ...rightItems]);
    setDroppedItems([]);
    return;
  };

  return (
    <>
      <DndContext onDragStart={dragStart} onDragEnd={dragEnd}>
        <div id="app">
          <div className="main-container-left">
            <OptionsContainer listItems={leftList} side="left" />
          </div>
          <div className="main-container-center">
            <ResetButton resetButtonHandler={resetButtonHandler} />
            <Blob>
              {droppedItems.map((item, index) => (
                <ItemButtons key={index} itemName={item} />
              ))}
            </Blob>

            <GenerateButton />
          </div>
          <div className="main-container-right">
            <OptionsContainer listItems={rightList} side="right" />
          </div>
        </div>
        <DragOverlay>
          {activeId ? <ItemButtons itemName={activeId} /> : null}
        </DragOverlay>
      </DndContext>
      <MaxLimitToast show={showToast} onClose={() => setShowToast(false)} />
    </>
  );
}

export default App;
