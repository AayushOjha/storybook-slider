import React from "react";
import "./slider.css"

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
  const [value, setValue] = React.useState<number | number[]>(
    subtype === "Range" ? [min, max] : min
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue =
      subtype === "Range"
        ? [
            parseFloat(event.target.value.split(",")[0]),
            parseFloat(event.target.value.split(",")[1]),
          ]
        : parseFloat(event.target.value);
    setValue(newValue);
    onChange(newValue);
  };

  const renderSlider = () => {
    if (type === "Continuous") {
      if (subtype === "Single") {
        return (
          <input
            type="range"
            min={min}
            max={max}
            value={value as number}
            onChange={handleChange}
          />
        );
      } else {
        return (
          <input
            type="range"
            min={min}
            max={max}
            value={(value as number[]).join(",")}
            onChange={handleChange}
            multiple
          />
        );
      }
    } else if (type === "Discreet" && steps) {
      const stepSize = (max - min) / (steps - 1);

      if (subtype === "Single") {
        return (
          <input
            type="range"
            min={min}
            max={max}
            step={stepSize}
            value={value as number}
            onChange={handleChange}
          />
        );
      } else {
        return (
          <input
            type="range"
            min={min}
            max={max}
            step={stepSize}
            value={(value as number[]).join(",")}
            onChange={handleChange}
            multiple
          />
        );
      }
    }
    return null;
  };

  return <div>{renderSlider()}</div>;
};

export { Slider };
