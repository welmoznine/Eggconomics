"use client";

import dynamic from "next/dynamic";

const EggFlipAnimation = dynamic(() => import("./EggFlipAnimation"), { ssr: false });

const EggFlipWrapper = () => {
  return <EggFlipAnimation />;
};

export default EggFlipWrapper;
