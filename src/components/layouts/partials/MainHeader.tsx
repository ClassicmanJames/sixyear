import Image from "next/image";
import React, { Fragment } from "react";
type Props = { children: React.ReactNode };
const MainHeader = () => {
  return (
    <Fragment>
      <div className={"bg-ccmu py-4 w-auto grid grid-cols-2"}>
        <div className="text-base ml-3 justify-self-start">
          <Image
            src="/SUBLOGO1.png"
            width={"40"}
            height={"50"}
            alt={"ssd"}
          ></Image>
        </div>

        <div className="text-base mr-3 justify-self-end"></div>
      </div>
    </Fragment>
  );
};
export default MainHeader;
