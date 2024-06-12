import { useState, useRef, useEffect } from "react";
import { clamp } from "lodash";
import "./slider.css";
import "./handle.css";
import { Handle } from "./Handle";

type SliderType = "Continuous" | "Discreet";
type SliderSubtype = "Single" | "Range";

interface SliderProps {
  type: SliderType;
  subtype: SliderSubtype;
  // add default value
  onChange: (value: number | number[]) => void;
}

const Slider = ({ type, subtype, onChange }: SliderProps) => {
  const min = 0;
  const max = 100;
  const steps = 7;
  const stepSize = (max - min) / (steps - 1);

  const [value, setValue] = useState<number | number[]>(
    subtype === "Range" ? [min, max] : min
  );
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setValue(subtype === "Range" ? [min, max] : min);
  }, [subtype]);

  const getDiscreteValue = (newValue: number) => {
    const stepIndex = Math.floor(newValue / stepSize);
    let res = clamp(stepIndex * stepSize, 0, 100);
    return res;
  };

  const handleMouseDown = (thumb: "left" | "right") => () => {
    const slider = sliderRef.current;
    if (!slider) return;

    const onMouseMove = (moveEvent: MouseEvent) => {
      const rect = slider.getBoundingClientRect();
      const newValue = ((moveEvent.clientX - rect.left) / rect.width) * 100;

      if (type === "Discreet") {
        const discreteValue = getDiscreteValue(newValue);
        if (subtype === "Range" && Array.isArray(value)) {
          const newValueArray = [...value];
          if (thumb === "left") {
            newValueArray[0] = Math.min(discreteValue, newValueArray[1]);
          } else {
            newValueArray[1] = Math.max(discreteValue, newValueArray[0]);
          }
          setValue(newValueArray);
          onChange(newValueArray);
        } else {
          setValue(discreteValue);
          onChange(discreteValue);
        }
      } else {
        if (subtype === "Range" && Array.isArray(value)) {
          const newValueArray = [...value];
          if (thumb === "left") {
            newValueArray[0] = Math.min(
              Math.max(newValue, 0),
              newValueArray[1]
            );
          } else {
            newValueArray[1] = Math.max(
              Math.min(newValue, 100),
              newValueArray[0]
            );
          }
          setValue(newValueArray);
          onChange(newValueArray);
        } else {
          setValue(Math.min(Math.max(newValue, 0), 100));
          onChange(Math.max(newValue, 0));
        }
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
            left: Array.isArray(value)
              ? `${((value[0] - min) / (max - min)) * 100}%`
              : "0%",
            right: Array.isArray(value)
              ? `${100 - ((value[1] - min) / (max - min)) * 100}%`
              : `${100 - ((value as number) / max) * 100}%`,
          }}
        />
        {subtype === "Range" && Array.isArray(value) ? (
          <>
            <Handle
              type="left"
              value={value}
              handleMouseDown={handleMouseDown}
            />
            <Handle
              type="right"
              value={value}
              handleMouseDown={handleMouseDown}
            />
          </>
        ) : (
          <Handle type="left" value={value} handleMouseDown={handleMouseDown} />
        )}
      </div>
    </div>
  );
};

export { Slider };
