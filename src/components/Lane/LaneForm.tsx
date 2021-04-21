import React from "react";
import { Lane } from "../types";
import { c, generateInstanceId } from "../helpers";

interface LaneFormProps {
  addLane: (lane: Lane) => void;
}

export function LaneForm({ addLane }: LaneFormProps) {
  const [isInputVisible, setIsInputVisible] = React.useState(false);
  const [shouldMarkAsComplete, setShouldMarkAsComplete] = React.useState(false);
  const [laneTitle, setLaneTitle] = React.useState("");

  const inputRef = React.useRef<HTMLInputElement>();

  const clear = () => {
    setLaneTitle("");
    setShouldMarkAsComplete(false);
    setIsInputVisible(false);
  };

  const createLane = () => {
    const newLane: Lane = {
      id: generateInstanceId(),
      title: laneTitle,
      items: [],
      data: {
        shouldMarkItemsComplete: shouldMarkAsComplete,
      },
    };

    addLane(newLane);
    clear();
  };

  if (isInputVisible) {
    return (
      <div className={c("lane")}>
        <div className={c("lane-input-wrapper")}>
          <input
            value={laneTitle}
            ref={inputRef}
            className={c("lane-input")}
            type="text"
            placeholder="Enter list title..."
            onChange={(e) => setLaneTitle(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                createLane();
              } else if (e.key === "Escape") {
                clear();
              }
            }}
          />
        </div>
        <div className={c("checkbox-wrapper")}>
          <div className={c("checkbox-label")}>
            Mark items in this list as complete
          </div>
          <div
            onClick={() => setShouldMarkAsComplete(!shouldMarkAsComplete)}
            className={`checkbox-container ${
              shouldMarkAsComplete ? "is-enabled" : ""
            }`}
          />
        </div>
        <div className={c("lane-input-actions")}>
          <button className={c("lane-action-add")} onClick={createLane}>
            Add list
          </button>
          <button className={c("lane-action-cancel")} onClick={clear}>
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={c("new-lane-button-wrapper")}>
      <button
        className={c("new-lane-button")}
        onClick={() => {
          setIsInputVisible(true);
          setTimeout(() => inputRef.current?.focus());
        }}
      >
        <span className={c("new-lane-button")}>+</span> Add a list
      </button>
    </div>
  );
}