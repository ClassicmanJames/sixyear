import React, { CSSProperties, useState } from "react";
import Image from "next/image";

type Props = {};

const Loading = (props: Props) => {
  return (
    <div className="fixed z-50 h-screen w-screen bg-cyan-50 none">
      <div className="flex flex-col items-center justify-center h-screen">
        <Image
          src="/SUBLOGO1.png"
          width={200}
          height={200}
          alt="icon wisdom cleaning"
          className="animate-bounce duration-75"
        />
      </div>
    </div>
  );
};

export default Loading;
