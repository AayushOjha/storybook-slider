import { useEffect, useState } from "react";
import "./handle.css"
// import { useEffect } from "react";

interface IHandleProps {
  state?: "normal" | "hovered" | "focused";
  type: "left" | "right";
  handleMouseDown: (thumb: "left" | "right") => () => void;
  value: number | number[];
  size?: "24px" | "32px";
}

const Handle = ({
  state = "normal",
  size = "24px",
  handleMouseDown,
  type,
  value,
}: IHandleProps) => {

  const [leftPercentage, setLeftPercentage] = useState(type == 'left' ? '0%' : '100%')

  useEffect(() => {
    if (Array.isArray(value)) {
      if (type === 'left') {
        setLeftPercentage(`${(value[0])}%`)
      }else{
        setLeftPercentage(`${(value[1])}%`)
      }
    }else{
      setLeftPercentage(`${value as number}%`)
    }
  }, [value])

  return (
    <div
      className={`slider-thumb thumb-${type} ${size == '32px' ? 'large' : ''} ${state}-state`}
      style={{
        left: leftPercentage,
      }}
      onMouseDown={handleMouseDown(type)}
    >
      <div className={`slider-thumb-inner ${size == '32px' ? 'large' : ''}`}/>
    </div>
  );
};

export { Handle };
