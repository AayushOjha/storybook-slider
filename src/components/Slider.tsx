import React, { useState, useRef } from "react";
import "./slider.css";

type SliderType = "Continuous" | "Discreet";
type SliderSubtype = "Single" | "Range";

interface SliderProps {
  type: SliderType;
  subtype: SliderSubtype;
  steps?: number; // Max 10 steps, applicable for 'Discreet' type only
  min?: number;
  max?: number;
  onChange: (value: number | number[]) => void;
}

const Slider = ({
  type,
  subtype,
  steps,
  min = 0,
  max = 100,
  onChange,
}: SliderProps) => {
  const [value, setValue] = useState<number | number[]>(
    subtype === "Range" ? [min, max] : min
  );
  const sliderRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (thumb: "left" | "right") => (event: React.MouseEvent) => {
    const slider = sliderRef.current;
    if (!slider) return;

    const onMouseMove = (moveEvent: MouseEvent) => {
      const rect = slider.getBoundingClientRect();
      const newValue = ((moveEvent.clientX - rect.left) / rect.width) * 100;

      if (subtype === "Range" && Array.isArray(value)) {
        const newValueArray = [...value];
        if (thumb === "left") {
          newValueArray[0] = Math.min(Math.max(newValue, 0), newValueArray[1]);

        } else {
          newValueArray[1] = Math.max(Math.min(newValue, 100), newValueArray[0]);
        }
        setValue(newValueArray);
        onChange(newValueArray);
      } else {
        setValue(newValue);
        onChange(newValue);
      }
    };

    const onMouseUp = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };


  return (
    <div className="slider-container" ref={sliderRef}>
      <div className="slider-track">
        <div
          className="slider-highlight"
          style={{
            left: Array.isArray(value) ? `${((value[0] - min) / (max - min)) * 100}%` : "0%",
            right: Array.isArray(value) ? `${100 - ((value[1] - min) / (max - min)) * 100}%` : `${100 - ((value as number) / max) * 100}%`,
          }}
        />
        {subtype === "Range" && Array.isArray(value) ? (
          <>
            <div
              className="slider-thumb thumb-left"
              style={{
                left: `${((value[0] - min) / (max - min)) * 100}%`,
              }}
              onMouseDown={handleMouseDown("left")}
            >
              <div className="slider-thumb-inner" />
            </div>
            <div
              className="slider-thumb thumb-right"
              style={{
                left: `${((value[1] - min) / (max - min)) * 100}%`,
              }}
              onMouseDown={handleMouseDown("right")}
            >
              <div className="slider-thumb-inner" />
            </div>
          </>
        ) : (
          <div
            className="slider-thumb thumb-left"
            style={{
              left: `${((value as number - min) / (max - min)) * 100}%`,
            }}
            onMouseDown={handleMouseDown("left")}
          >
            <div className="slider-thumb-inner" />
          </div>
        )}
      </div>
    </div>
  );
};

export { Slider };
