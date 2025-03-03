import React from "react";

interface EggIconProps {
  color?: string;
  size?: number;
}

const EggIconSVG: React.FC<EggIconProps> = ({ color = "#ffc579", size = 24 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      width={size}
      height={size}
      role="img"
      aria-label="Egg Icon"
    >
      <path
        d="M53.6 29.8c-2.5-18-13.9-27.8-21.6-27.8S12.9 11.8 10.4 29.8c-2.4 18 5.5 32.2 21.6 32.2s24-14.2 21.6-32.2z"
        fill={color}
      />
    </svg>
  );
};

export default EggIconSVG;
