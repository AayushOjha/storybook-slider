import React from "react";
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

  return (
    <>
      {/* <div className="slider-container"> */}
      <div className="slider-track">
        <div className="slider-thumb thumb-left">
          <div className="slider-thumb-inner" />
        </div>
      </div>
      {/* </div>; */}
    </>
  );
};

export { Slider };
