"use client";

import { Player } from "@lottiefiles/react-lottie-player";

const EggFlipAnimation = () => {
  return (
    <div className="flex justify-center items-center">
      <Player
        autoplay
        loop
        src="/animations/eggflip.json"
        style={{ height: "300px", width: "300px" }}
      />
    </div>
  );
};

export default EggFlipAnimation;
